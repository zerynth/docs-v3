# zOS Guide

The Zerynth OS can run Python firmware that are mostly hardware independent allowing a high reusability of code. Zerynth supports all the most used high-level features of Python like modules, classes, multithreading, callbacks, timers and exceptions, plus some hardware-related features like interrupts, PWM, digital I/O, etc.

The Zerynth OS is natively multithread and realtime. Indeed it is built on top of a [FreeRtos](https://www.freertos.org/), by wrapping its functionalities in a operative system abstraction layer (VOSAL). 

The inner mechanisms of the Zerynth OS are complex but can be reduced to a few components:


* **Python engine**: the Zerynth toolchain turns Python scripts into a set of bytecode objects, each one containing not only a sequence of instructions, but also enough information for memory management and error checking. Each bytecode instruction, called *opcode*, is exactly one byte in length with optional arguments going from 0 to 4 bytes. The Python engine simply scans the bytecode an opcode at time, executes the opcode in the current thread and continues to the next opcode until a stop is encountered. The bytecode closely resembles Python but introduces some embedded specific opcodes.
* **Global Interpreter Lock**: the GIL is an object shared by all Python threads; it coordinates the sequence of opcode execution between threads so that each opcode can be considered "atomic". This means that while thread-one is executing opcode "x", thread-one has the right to do so until the execution of "x" reaches the end. No other thread can stop it without compromising the engine integrity. When a Python thread goes to sleep, or its time quantum ends, the GIL is released so that another thread can take control of the Python engine.
* **Garbage Collector**: objects in Python have a life cycle. They are created and used by the programmer and must be removed when they are not needed anymore. While in low level languages the responsibility of freeing unused memory rests on the programmer, in Python it's the garbage collector (gc) duty. When necessary, a complete scan of the created object is performed in order to search the ones that can be removed safely. The OS gc algorithm is a mark-and-sweep-stop-the-world variant.
* **Interrupt Thread**: it is a very high priority thread that is woken up when an interrupt configured to run a Python function is fired. Python bytecode is executed outside of the ISR routine, but inside the Interrupt Thread. This way the Python function can allocate memory as a normal function. However, since the interrupt thread has the highest priority it is important to spend the least time possible inside it.
* **VOSAL**: it is the Zerynth OS operative system abstration layer. It contains functions provided by the underlying RTOS to create threads, semaphores and other multi-threading related objects. 
* **VHAL**: it is the Zerynth OS hardware abstraction layer. It contains functions to control the microcontroller peripherals: serial ports, SPI, I2C, ADC, PWM and so on. Each different Zerynth hardware has its own VHAL implementation so that the programmer calling C from Python can have an uniform hardware API across different architectures.


## Zerynth and Python

The Zerynth OS has been developed with the goal of making Python usable in the IoT world. Some features of Python have been discarded because they were too resource intensive, while non-Python features have been introduced because they were more functional in the embedded scenario. Here is a non comprehensive list: 

* Python Object size has been reduced as much as possible:

    * integers are signed and 31 bits wide, so that they can be represented with 4 bytes without additional overhead. 
    * garbage collectore overhead has been brought down to 8 bytes per object
    * names are not saved as strings in the bytecode; they are converted to 16 bits integers to occupy much less space. This apparently minor change leads to a series of important consequences. First of all, Zerynth becomes a less "dynamic" language with respect to Python, since introspection is not allowed. However on the pro side, Zerynth scripts can be statically analyzed to remove unused bytecode greatly reducing memory usage. Another important consequence is that *setattr* and *getattr* can not be used with non constant arguments.
    * sequences and dictionaries can have at most 65536 elements.
    * exceptions have been transformed from full fledged classes to a name organized in an inheritance tree. So an exception can't have methods, but it is faster to raise and to handle and it just takes 4 bytes of memory.

* Compilation has been moved outside the language; by removing the compile() and eval() builtins the OS shrinked greatly in size.
* Not so often used Python features have been removed. Closures, generators and decorators will be added in future updates in a modular way.
* True multi-threading with priorities has been introduced. CPython implementations use green-threads to emulate multi-threaded environments without relying on any native OS capabilities, and they are managed in user space instead of kernel space, enabling them to work in environments that do not have native thread support. In Zerynth each thread is a RTOS thread with its own memory and priority. Because of the GIL, only one thread can execute bytecode in a time quantum, but it is possible to have more than one non-Python thread running in parallel. For example, a complex driver can be structured as a VOSAL thread written in C to control hardware, with any number of Python threads running bytecode.
* New data structures have been introduced like shorts and short-array to hold sequences of 16 bits integers. Big integeres are supported as an importable module.



## OS API

C functions called from Python can create and handle Python entities like lists, tuples, dictionaries and so on. In the current version of zOS only a few selected Python data structures can be accessed from C. Since the internal organization of the OS may change without notice is very important to access OS structures via documented macros and functions only.

### PObject

The VM treats every Python object as a pointer to a **PObject** structure. There exist two types of PObjects: tagged and untagged. Tagged PObjects contains all the object information encoded in the 4 bytes of the pointer. Untagged objects are pointers to actual C structures. As a consequence, tagged PObjects are not allocated on the heap but reside on the stack of a frame of execution.

To better understand tagged PObjects imagine the case of integers: representing integers by allocating a PObject structure in memory is both a waste of ram and of computational power. Therefore small signed integers up to 31 bits are represented as [tagged pointers](https://en.wikipedia.org/wiki/Tagged_pointer). This “trick” is possible because a PObject pointer is 4 bytes (32 bits) and due to architecture constraints a valid PObject pointer is at least aligned to 2 or 4. In practical terms it means that the least significant bit of a valid PObject pointer is always 0: by “tagging” the PObject pointer, namely changing its lsb to 1, the VM is able to distinguish between concrete PObjects residing on the heap (untagged, lsb=0) and tagged PObjects (lsb=1). The representation of the number 42 as a tagged PObject follows:

```py
MSB                                                         LSB

0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1

^--- Sign bit                                       Bit 0---^ ^--- TAG = 1
```

Instead, an untagged PObject is a valid pointer to a C structure organized like this:

```py
GCH:  B0 B1 B2 B3 B4 B5 B6 B7
DATA: .....
```

where GCH is an 8 byte header holding both garbage collection info and type/size info; DATA is whatever fields are needed to implement the PObject.

### Macros


**`IS_TAGGED(obj)`**

Check if *obj* is tagged or untagged.


**`PTYPE(obj)`**

Extract type info from *obj* (both tagged or untagged)

**`PHEADERTYPE(obj)`**

Extract type info from *obj* (untagged only)

**`PSMALLINT`**

Type of a PObject representing a small integer (30 bits signed). Tagged.

**`PINTEGER`**

Type of a PObject representing an integer up to int64_t. Untagged.

**`PFLOAT`**

Type of a PObject representing a 64 bits float. Untagged.

**`PBOOL`**

Type of a PObject representing a boolean. Tagged.

**`PSTRING`**

Type of a PObject representing a string. Untagged.

**`PBYTES`**

Type of a PObject representing a byte immutable sequence. Untagged.

**`PBYTEARRAY`**

Type of a PObject representing a byte mutable sequence. Tagged.

**`PSHORTS`**

Type of a PObject representing a 16 bits unsigned integer immutable sequence. Untagged.
   
**`PSHORTARRAY`**

Type of a PObject representing a 16 bits unsigned integer mutable sequence. Untagged.

**`PLIST`**

Type of a PObject representing a mutable sequence of PObjects. Untagged.

**`PTUPLE`**

Type of a PObject representing an immutable sequence of PObjects. Untagged.

**`PRANGE`**

Type of a PObject representing a range. Untagged.

**`PFSET`**

Type of a PObject representing an immutable set. Untagged.

**`PSET`**

Type of a PObject representing a mutable set. Untagged.

**`PDICT`**

Type of a PObject representing a dictionary. Untagged.

**`PFUNCTION`**

Type of a PObject representing a function. Untagged.

**`PMETHOD`**

Type of a PObject representing a method. Untagged.

**`PCLASS`**

Type of a PObject representing a class. Untagged.

**`PINSTANCE`**

Type of a PObject representing an instance. Untagged.

**`PMODULE`**

Type of a PObject representing a module. Untagged.

**`PBUFFER`**

Type of a PObject representing a buffer. Untagged.

**`PSLICE`**

Type of a PObject representing a slice. Untagged.

**`PITERATOR`**

Type of a PObject representing an iterator over a sequence. Untagged.

**`PFRAME`**

Type of a PObject representing an execution frame. Untagged.


**`PNONE`**

Type of a PObject representing None. Tagged.

**`PEXCEPTION`**

Type of a PObject representing an exception. Tagged.

**`PNATIVE`**

Type of a PObject representing a native function. Tagged.

**`PTHREAD`**

Type of a PObject representing a Python thread. Untagged.

### Numbers

In the current version there are only three supported type of numbers: PSMALLINT, PINTEGER and PFLOAT.


**`PSMALLINT_NEW(x)`**
Return a tagged PObject of type PSMALLINT containing the integer value x. No overflow check is done.


**`PSMALLINT_VALUE(x)`**
Return the integer value contained in *x*, a PObject of type PSMALLINT.


**`IS_PSMALLINT(x)`**
Check if *x* is of type PSMALLINT.


**`INTEGER_VALUE(x)`**
Return the integer value contained in *x*; works for PSMALLINT and PINTEGER types.

**`PFLOAT_VALUE(x)`**
Return the float value contained in *x*, an untagged PObject of type PFLOAT.

#### Functions


**`pinteger_new(int64_t x)`**

Return a PINTEGER object with value *x*.

**`pfloat_new(double x)`**

Return a PFLOAT object with value *x*.

### Bool & None

Python has some special values of boolean type, True and False, and a special value None. Accessing such values can be done with the following macros:


**`IS_BOOL(x)`**

Return true if *x* is a PObject of type PBOOL.


**`PBOOL_TRUE`**

Return a tagged PObject of type PBOOL and value True.


**`PBOOL_FALSE`**

Return a tagged PObject of type PBOOL and value False.


**`MAKE_NONE`**

Return a tagged PObject of type PNONE and value None.

### Sequences

Python provides many objects representing sequences of items. Zerynth supports lists, tuples, bytes, bytearrays, strings and introduces shorts and shortarrays. All this PObjects must be created, accessed and manipulated through the following macros and functions.

#### Macros


**`PSEQUENCE_ELEMENTS(seq)`**

Return the elements of *seq*.


**`PSEQUENCE_ELEMENTS_SET(seq, n)`**

Set the number of elements of *seq* to *n*.

**`PSEQUENCE_SIZE(seq)`**

Return the maximum number of elements storable in *seq*.


**`PSEQUENCE_BYTES(seq)`**

Return a uint8_t pointer to the bytes stored in *seq*.


**`PSEQUENCE_SHORTS(seq)`**

Return a uint16_t pointer to the integers stored in *seq.*


**`PSEQUENCE_OBJECTS(seq)`**

Return a PObject** to the PObjects stored in *seq*.


**`PLIST_ITEM(lst, i)`**

Return the i-th item in lst with lst of type PLIST.


**`PLIST_SET_ITEM(lst, i, item)`**

Set the i-th item in lst, with  of type PLIST.


**`PTUPLE_ITEM(lst, i)`**

Return the i-th item in *lst* with *lst* of type PTUPLE.


**`PTUPLE_SET_ITEM(lst, i, item)`**


Set the i-th item in *lst* to *item*, with *lst* of type PTUPLE.

#### Functions



**`PObject *psequence_new(uint8_t type, uint16_t elements)`**

Create an empty sequence of type type with space for at least elements elements. If the requested sequence is mutable, sequence elements are set to 0; if it is immutable, sequence elementes are set to elements and the sequence storage filled with zero.

Return a pointer to the created sequence or NULL in case of failure.

**`PObject *pstring_new(uint16_t len, uint8_t *buf)`**

Create a sequence of type PSTRING with len elements. If buf is not NULL, len bytes from buf are used to initialize the string.

Return NULL on failure.

**`PObject *pbytes_new(uint16_t len, uint8_t *buf)`**

Create a sequence of type PBYTES with len elements. If buf is not NULL, len bytes from buf are used to initialize the sequence.

Return NULL on failure.

**`PObject *pshorts_new(uint16_t len, uint16_t *buf)`**

Create a sequence of type PSHORTS with len elements. If buf is not NULL, len words from buf are used to initialize the sequence.

Return NULL on failure.

**`PObject *ptuple_new(uint16_t len, PObject **buf)`**

Create a sequence of type PTUPLE with len elements. If buf is not NULL, len objects from buf are used to initialize the sequence.

Return NULL on failure.

**`PObject *plist_new(uint16_t len, PObject **buf)`**

Create a sequence of type PLIST with len elements. If buf is not NULL, len objects from buf are used to initialize the sequence. Sequence elements are set to len.

Return NULL on failure.

### Dictionaries and Sets

Some data structures in Python have functionalities similar to hash tables. In particular dictionaries are mappings from keys to values; set and frozenset are collections of items optimized to test the presence of a given item inside the set.Internally, the hash code of an item is calculated and used to find the item inside the structure in a fast way.

Dictionaries and sets must be created, managed and manipulated with the following functions and macros only. Set and dictionaries automatically grow as needed.

#### Macros


**`PHASH_ELEMENTS(obj)`**

Return the elements in *obj* with obj a PDICT, PSET or PFSET.


**`PHASH_SIZE(obj)`**

Return the total space for itens in *obj* with obj a PDICT, PSET or PFSET.


**`PCHECK_HASHABLE(obj)`**

Return true if *obj* is hashable, i.e. an hash can be calculated for *obj*.


**`pdict_put(f,k,v)`**

Add the hashable PObject  as a key and PObject v as value, in  of type PDICT.


**`pset_put(f,k)`**

Add the hashable PObject k in  of type PSET.


**`pdict_get(f,k)`**

Return the value associated with the hashable PObject  in  of type PDICT. Return NULL if *k* is not present.


**`pset_get(f,k)`**

Return  if the hashable PObject k is in  of type PSET or PFSET. Return NULL if *k* is not present.


**`pdict_del(f,k)`**

Remove k and its associated value from  of type PDICT. Return NULL if  is not present.


**`pset_del(f,k)`**

Remove *k* from *f*k in f of type PSET. Return NULL if  is not present.

#### Functions


**`PObject*pdict_new(int size)`**

Create an empty dictionary with enough space to hold *size pairs (key,value)

Return NULL on failure.


**`PObject*pset_new(int type,int size)`**

Create an empty set or frozenset depending on *type, with enough space to contain *size items.

Return NULL on failure.

### Exceptions

The following macros must be returned by functions declared with C_NATIVE to signal the result of the call and eventually rise an exception. Non builtin exception names can not be retrieved by VM system calls, so no exception macro exists; a workaround for this limitation is to pass exception names from Python and store them somewhere in a C structure to be raised when needed.


**`ERR_OK`**
Call successful.


**`ERR_TYPE_EXC`**
Raise TypeError.


**`ERR_ZERODIV_EXC`**
Raise ZeroDivisionError.


**`ERR_ATTRIBUTE_EXC`**
Raise AttributeError.


**`ERR_RUNTIME_EXC`**
Raise RuntimeError.


**`ERR_VALUE_EXC`**
Raise ValueError.


**`ERR_INDEX_EXC`**
Raise IndexError.


**`ERR_KEY_EXC`**
Raise KeyError.


**`ERR_NOT_IMPLEMENTED_EXC`**
Raise NotImplementedError.


**`ERR_UNSUPPORTED_EXC`**
Raise UnsupportedError.


**`ERR_OVERFLOW_EXC`**
Raise OverflowError.


**`ERR_STOP_ITERATION`**
Raise StopIteration.


**`ERR_NAME_EXC`**
Raise NameError.


**`ERR_IOERROR_EXC`**
Raise IOError.


**`ERR_IOERROR_EXC`**
Raise IOError.


**`ERR_CONNECTION_REF_EXC`**
Raise ConnectionRefusedError.


**`ERR_CONNECTION_RES_EXC`**
Raise ConnectionResetError.


**`ERR_CONNECTION_ABR_EXC`**
Raise ConnectionAbortedError.


**`ERR_TIMEOUT_EXC`**
Raise TimeoutError.


**`ERR_PERIPHERAL_ERROR_EXC`**
Raise PeripheralError.


**`ERR_PERIPHERAL_INVALID_PIN_EXC`**
Raise InvalidPinError.


**`ERR_PERIPHERAL_INVALID_HARDWARE_STATUS_EXC`**
Raise InvalidHardwareStatusError.


**`ERR_PERIPHERAL_INITIALIZATION_ERROR`**
Raise HardwareInitializationError.
 
