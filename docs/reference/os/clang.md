# C Language Interface

Zerynth OS allows mixing Python and C code in the same project. The Python language is compiled to bytecode and executed by the zOS independently of the target hardware; C language is compiled to object code dependent on the target hardware instruction set. 

This kind of “hybrid” programming is extremely useful in those scenarios where the programmer needs to write or has already written performant low level code for time critical tasks, but wants to retain Python flexibility and readability for non time critical sections.

Zerynth OS allows calling C functions from Python, but not (yet) Python functions from C. To call a C function from Python follow this procedure:


1. Define an “empty” Python function decorated with `@c_native` (let’s call it `pyfn`)
2. As arguments of `@c_native` pass the name of the C function to be called (let’s call it `cfn`), the source files where `cfn` implementation resides and a list of C macros to be defined during compilation
3. Create the C source file containing `cfn` and declare `cfn` using the C macro `C_NATIVE()`

At compile time, `@c_native` parameters will be used to locate the C source code files and compile them with the appropriate macros defined. When `pyfn` is called, the OS translates the Python call to a C call.

## C function call example

A minimal example of C function calling from Python follows.

In Python:

```py
# main.py

@c_native("my_c_function",["my_c_source.c"],[])
def my_py_function(a,b):
        """
        a simple function that returns the sum of a and b, with a and b integers
        """"
        # just pass, the body of my_py_fun is ignored by the compiler
        pass
```

In C:

```c
    // my_c_source.c

    //include zerynth header
    #include "zerynth.h"


    C_NATIVE(my_c_function) {
       C_NATIVE_UNWARN();
       int32_t a,b;
       a = PYC_ARG_INT(0); //convert Python argument a to C integer
       b = PYC_ARG_INT(1); //convert Python argument b to C integer
       MAKE_RESULT(PSMALLINT_NEW(a+b));  //set the Python result to the sum of a+b
       return ERR_OK; //return ok, no exception raised
    }
```

In `main.py` the empty function `my_py_function` is defined, decorated with `@c_native`. The `@c_native` decorator informs the compiler that the body of `my_py_fun` will be a
C function called `my_c_function` implemented in the file `my_c_source.c` in the same directory where `main.py` is residing.

In `my_c_source.c` the function `my_c_function` is implemented. The macro `C_NATIVE(my_c_function)` expands to:

```py
err_t my_c_function(int32_t nargs, PObject *self, PObject **args, PObject **res)
```

where:


* `nargs` is the number of arguments passed to `my_py_function`
* `self` is the self parameter in case `my_py_function` is a method
* `args` is an array of PObject\*, the generic structure used by the VM to represent Python objects
* `res` is a pointer to a PObject containing the result of the function call
* the returned value is of type `err_t`

The zOS passes Python arguments to the C function without touching them; it is responsibility of the C function to convert them as needed. To help the conversion a set of macros id provided.

The return value of function `my_py_function` must be set into `res` and must be of type `PObject*`. The actual return value of `my_c_function` is an error code indicating success (ERR_OK) or an exception that is subsequently raised by the zOS.

For more details on the low level zOS functions and macros available for hybrid programming, refer to [zOS Guide](os.md).

## Macros

Some utility macros are added by the header dile `zerynth.h`.


* `C_NATIVE(fn)`: used to define the implementation of a C function callable from Python. It equals to:
* `C_NATIVE_UNWARN`: silences C warnings about unused `C_NATIVE` arguments in the body of a C function callable from Python
* `ZDEBUG(...)`: if the user defines `ZERYNTH_DEBUG` in `config.yml` equal to `debug`, this macro behaves like a printf, writing to the standard error of the zOS adding some information on the current function and line. Otherwise it does nothing.
* `ZERROR(...)`: if the user defines `ZERYNTH_DEBUG` in `config.yml` equal to `error`, this macro behaves like a printf, writing to the standard error of the zOS adding some information on the current function and line. Otherwise it does nothing.
* `ZWARN(...)`: if the user defines `ZERYNTH_DEBUG` in `config.yml` equal to `warning`, this macro behaves like a printf, writing to the standard error of the zOS adding some information on the current function and line. Otherwise it does nothing.
* `ZINFO(...)`: if the user defines `ZERYNTH_DEBUG` in `config.yml` equal to `info`, this macro behaves like a printf, writing to the standard error of the zOS adding some information on the current function and line. Otherwise it does nothing.
* `PYC_ARG_INT(n)`: converts the `nth` python argument to a `int32_t` without checking the type.
* `PYC_ARG_FLOAT(n)`: converts the `nth` python argument to a `double` without checking the type.
* `PYC_ARG_BUF(n)`: converts the `nth` python argument to a `uint8_t*` without checking the type. Can be used to get the buffer of a `bytes`, `bytearray`, `short`, `shortarray` and `string`.
* `PYC_ARG_BUFLEN(n)`: return the length of the `nth` python argument to a `int32_t` without checking the type. The argument must be a sequence.
* `PYC_ARG_BOOL(n)`: converts the `nth` python argument to a `int32_t` from a boolean without checking the type.
* `PYC_ARG_IS_NONE(n)`: converts the `nth` python argument to a non-zero `int32_t` if it is `None`.
* `PYC_CHECK_NUM_ARGS(n)`: raise `TypeError` if the arguments passed from Python are not `n`.
* `PYC_CHECK_ARG_INTEGER(n)`: raise `TypeError` if the `nth` arguments passed from Python is not of integer type.
* `PYC_CHECK_ARG_FLOAT(n)`: raise `TypeError` if the `nth` arguments passed from Python is not of float type.
* `PYC_CHECK_ARG_BOOL(n)`: raise `TypeError` if the `nth` arguments passed from Python is not of bool type.
* `PYC_CHECK_ARG_BUFFER(n)`: raise `TypeError` if the `nth` arguments passed from Python is not usable with `PYC_ARG_BUF`.
* `MAKE_RESULT(obj)`: set the Python result of the function to `obj`. `obj` must be of `PObject*` type.

## Zerynth “C” Limitations

C functions callable from Python have some limitations:

* C standard library function are not available. Only the following subset can be used:
   * `memcpy`, `memset`, `memmove`, `memcmp`, `memchr`
   * `malloc`, `free` (implemented as macros calling the garbage collector allocator)
   * `strlen`

Refer to [zOS Guide](os.md) for the available API.

