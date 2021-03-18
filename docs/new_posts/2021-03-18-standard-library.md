---
layout: blog
title: Standard Library
---
# Zerynth Builtins

This module contains builtins functions and constants. It is automatically loaded and it's not needed to prefix the
module name to call its functions. For example it is not necessary to write ``__builtins__.print()`` but only ``print()`` will suffice.

## Builtins Constants

Zerynth OS defines the following Python builtin constants:

* ```False```: the false value of the boolean type. Assignments to ```False``` are illegal and raise a ```SyntaxError```.
* ```True```: the true value of the boolean type. Assignments to ```True``` are illegal and raise a ```SyntaxError```.
* ```None```: The sole value of the type ``NoneType``.  ``None`` is frequently used to indicate represent the absence of a value, as when default arguments are not passed to a function. Assignments to ``None`` are illegal and raise a ```SyntaxError```.


Zerynth OS recognizes a set of pre-defined uppercase names representing constants:

    * GPIO Names:

      * ``D0`` to ``D256`` representing the names of gpios.
      * ``LED0`` to ``LED32`` representing the names of the board leds.
      * ``BTN0`` to ``BTN32`` representing the names of the board buttons.

    * GPIO Modes and Values:

      * ``INPUT, OUTPUT, INPUT_PULLUP, INPUT_PULLDOWN, OUTPUT_PUSHPULL, OUTPUT_OPENDRAIN, INPUT_ANALOG`` representing gpio modes.
      * ``LOW, HIGH`` representing digital gpio states.

    * Time Units:

      * ``MICROS`` to select microseconds
      * ``MILLIS`` to select milliseconds
      * ``SECONDS`` to select seconds

    * Peripherals Names:

      * ``SERIAL0`` to ``SERIAL7`` representing the name of the nth serial port of a board.
      * ``I2C0`` to ``I2C7`` representing the name of the nth I2C bus

Additional names are defined depending on the selected board support package


## Builtin Exceptions

Zerynth OS exceptions are different from Python exceptions. In Python, exceptions are very powerful because they are implemented as classes, contain error messages, and one can examine the full execution stack when an exception is raised.
However, in the embedded world, resources are precious and keeping class definition in memory, creating a class instance everytime an exception is raised, can be very resource-consuming.

Zerynth OS exceptions are therefore implemented as error codes with optional error messages organized as a tree::

    Exception
      +-- StopIteration
      +-- ArithmeticError
      |    +-- FloatingPointError
      |    +-- OverflowError
      |    +-- ZeroDivisionError
      +-- AttributeError
      +-- LookupError
      |    +-- IndexError
      |    +-- KeyError
      +-- MemoryError
      +-- NameError
      +-- PeripheralError
      |    +-- InvalidPinError
      |    +-- InvalidHardwareStatusError
      |    +-- HardwareInitializationError
      +-- IOError
      |    +-- ConnectionError
      |    |    +-- ConnectionAbortedError
      |    |    +-- ConnectionRefusedError
      |    |    +-- ConnectionResetError
      |    +-- TimeoutError
      +-- RuntimeError
      |    +-- NotImplementedError
      |    +-- UnsupportedError
      +-- TypeError
      +-- ValueError


This way, the inheritance mechanism of classes is mantained and trasposed to the exception matching mechanism transparently.
The following is valid Zerynth code: ::

    try:
        # raise ZeroDivisionError
        x = 1/0
    except ArithmeticError as e:
        print(e)


The main difference between Zerynth exceptions and Python exceptions is in the way new exceptions are created and used.
To create a user defined exception in Zerynth you need to use the following code: ::

    new_exception(MyExceptionName, MyExceptionParent, MyErrorMessage)

The builtin function ``new_exception`` always needs 2 arguments and an optional message:

    * the first one is the user defined exception name
    * the second is the name of the parent exception in the exception tree
    * the third one is a static error message, where static in this context means that it is not stored in ram as a Python string.

Behind the scenes ``MyExceptionName`` is created and placed under ``MyExceptionParent`` in the exception tree. An exception object is returned.
The exception object can only be compared to other exceptions, printed or raised again.

When an exception is printed, the error message and the error type are printed.

Zerynth exceptions are not garbage collected. They also are not scoped: this means that an exception defined in a module is not contained in that module, but it is moved at builtin scope, so that it can be accessible by all other modules simply by name.
This feature has a drawback: two modules defining an exception with the same name, can't be compiled in the same program. Exception names must be *manually* scoped by correctly choosing them (i.e. preprending the module name to the actual name).

Exceptions can be thrown by C code. Any custom defined exception is exposed as a C macro named as the Python excepion and prefixed with ```ZEXC_``` (i.e. ```ZEXC_MyExceptionName```).


## Builtin Functions

.. function:: int(x=0,base=10)

   Return an integer object constructed from a number or string *x*, or return
   ``0`` if no arguments are given.  If *x* is a floating point number, it is
   truncated towards zero.

   If *x* is not a number or if *base* is given, then *x* must be a string,
   :class:`bytes`, or :class:`bytearray` instance representing an :integer
   in radix *base*.  Optionally, the literal can be
   preceded by ``+`` or ``-`` (with no space in between) and surrounded by
   whitespace.  A base-n literal consists of the digits 0 to n-1, with ``a``
   to ``z`` (or ``A`` to ``Z``) having
   values 10 to 35.  The default *base* is 10. The allowed values are 0 and 2-36.
   Base-2, -8, and -16 literals can be optionally prefixed with ``0b``/``0B``,
   ``0o``/``0O``, or ``0x``/``0X``, as with integer literals in code.  Base 0
   means to interpret exactly as a code literal, so that the actual base is 2,
   8, 10, or 16, and so that ``int('010', 0)`` is not legal, while
   ``int('010')`` is, as well as ``int('010', 8)``.

.. function:: type(x)

    Return an integer representing the type of x.
    The following are the builtin constants returned by type(): ::

        PSMALLINT, PINTEGER, PFLOAT, PBOOL, PSTRING, PBYTES, PBYTEARRAY, PSHORTS, PSHORTARRAY, PLIST, PTUPLE, PRANGE,
        PFROZENSET, PSET, PDICT, PFUNCTION, PMETHOD, PCLASS, PINSTANCE, PMODULE, PITERATOR,
        PNONE, PEXCEPTION, PNATIVE, PSYSOBJ, PDRIVER, PTHREAD

.. function:: thread(fun,*args,prio=PRIO_NORMAL,size=-1)

    Function *fun* is launched in a new thread using args as its parameters.
    *fun* must be a normal function or a methods, other callables are not supported yet.

    *prio* sets the thread priority and accepts one of ``PRIO_LOWEST``, ``PRIO_LOWER``, ``PRIO_LOW``, ``PRIO_NORMAL``, ``PRIO_HIGH``, ``PRIO_HIGHER``, ``PRIO_HIGHEST``.
    *size* is the memory in bytes , reserved for the thread inner workings. Negative values select the VM default size.

    Returns the created thread, already started. Raises :exc:`RuntimeError` if no more threads can be created.

.. function:: sleep(time,time_unit=MILLIS)

    Suspend the current thread for *time* expressed in *time_units*. All the other threads are free to continue their execution.
    If *time_unit* is MICROS, sleep does not suspend the current thread, but starts polling the cycles counter in a loop.

    For high precision sleep refer to :mod:`hwtimers

.. function:: random()
              random(a,b)

    Returns a random integer. If *a* and *b* are given, the random integer is contained in the range [a,b]. If the board has a builtin Random Number Generator, it is used.

.. function:: range(stop)
              range(start, stop[, step])

   Creates a range object.

.. function:: bytearray([source])

   Return a new array of bytes. A bytearray is a mutable
   sequence of integers in the range 0 <= x < 256.  It has most of the usual
   methods of mutable sequences, described in :ref:`typesseq-mutable`, as well
   as most methods that the :class:`bytes` type has, see :ref:`bytes-methods`.

   The optional *source* parameter can be used to initialize the array in a few
   different ways:

   * If it is a *string*, :func:`bytearray` then converts the string to
     bytes.

   * If it is an *integer*, the array will have that size and will be
     initialized with null bytes.

   Without an argument, an array of size 0 is created.

.. function:: bytes([source])

   Return a new "bytes" object, which is an immutable sequence of integers in
   the range ``0 <= x < 256``.  :class:`bytes` is an immutable version of
   :class:`bytearray` -- it has the same non-mutating methods and the same
   indexing and slicing behavior.

   Accordingly, constructor arguments are interpreted as for :func:`bytearray`.


.. function:: shortarray([source])

   Return a new array of shorts. A shortarray is a mutable
   sequence of integers in the range 0 <= x < 65536.  It has most of the usual
   methods of mutable sequences, described in :ref:`typesseq-mutable`, as well
   as most methods that the :class:`shorts` type has, see :ref:`shorts-methods`.

   The optional *source* parameter can be used to initialize the array in a few
   different ways:

   * If it is an *integer*, the array will have that size and will be
     initialized with zeros.

   * If it is a sequence, the array will be a copy of *source* with its elements converted into shorts.
     If the conversion is not possible, an exception is raised.

   Without an argument, an array of size 0 is created.

.. function:: shorts([source])

   Return a new shorts object, which is an immutable sequence of integers in
   the range ``0 <= x < 65536``.  :class:`shorts` is an immutable version of
   :class:`shortarray` -- it has the same non-mutating methods and the same
   indexing and slicing behavior.

   Accordingly, constructor arguments are interpreted as for :func:`shortarray`.


.. function:: enumerate(iterable, start=0)

   Return an enumerate object. *iterable* must be a sequence, an
   :term:`iterator`, or some other object which supports iteration.
   The :meth:`~iterator.__next__` method of the iterator returned by
   :func:`enumerate` returns a tuple containing a count (from *start* which
   defaults to 0) and the values obtained from iterating over *iterable*.

   It is normally used in ``for`` loops: ::

        ints = [10,20,30]
        for idx, val in enumerate(ints):
            print(idx, val)

        # prints out the following:
        >>> 0 10
        >>> 1 20
        >>> 2 30

   In this version of the VM, enumerate works only for primitive iterable types, not yet for instances with ``__next__`` and ``__iter__`` methods.

.. function:: reversed(seq)

   Return a reverse :term:`iterator`.  *seq* must be an object which has
   a :meth:`__reversed__` method or supports the sequence protocol (the
   :meth:`__len__` method and the :meth:`__getitem__` method with integer
   arguments starting at ``0``).

   In this version of the VM, reversed works only for primitive iterable types, not yet for instances with ``__next__`` and ``__iter__`` methods.

.. function:: ord(c)

   Given a string representing one character, return an integer
   representing that character.  For example, ``ord('a')`` returns the integer ``97``.
   This is the inverse of :func:`chr`.

   When *c* is a literal string, the compiler macro __ORD(c) can be used to reduce code size.
   For example: ::

    x = ord(":")

   is valid Zerynth code. During its execution a string must be created containing ":" and *ord* must be called on it.
   After *ord* is executed the created string is probably immediately garbage collected.
   In the embedded world, this is time and resource consuming.
   The operation ``ord(":")`` can be executed during compilation because the result is known before the execution of
   the Zerynth program. To enable this feature use the following code: ::

    x = __ORD(":")

   Now, no string is created and no function is called, because the compiler knows that you want to assign to ``x``
   the result of ``ord(":")`` (which is 58). The compiler transforms our program to a faster and equivalent version: ::

    x = 58

.. function:: chr(i)

   Return the string representing a character whose byte representation is the integer
   *i*.  For example, ``chr(97)`` returns the string ``'a'``. This is the
   inverse of :func:`ord`. :exc:`ValueError` will be raised if *i* is
   outside the valid range.


.. function:: isinstance(object, class)

   Return true if the *object* argument is an instance of the *class*
   argument, or of a (direct, indirect) subclass thereof.  If *object* is not
   an object of the given type, the function always returns false.  If *class* is not a class,
   a :exc:`TypeError` exception is raised.

   In this version of the VM, isinstance is still not compliant with the Python one.
   It is suggested to use isinstance to determine the hierarchy of instances and to use :func:`type` for primitive types.