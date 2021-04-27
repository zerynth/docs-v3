# C Language Interface

Zerynth support interfacing Python with C code. Python functions can be decorated with information on how to call the respective C function.
After some conversion from python arguments to C variables, all the power of C language is ready to be used.


More information about content used in this demo:

- [C Language Interface](../../reference/os/clang.md)

C source code `c_file.c` should be created inside project folder.

```c
#include "zerynth.h"

C_NATIVE( c_addition )
{
    C_NATIVE_UNWARN();

    int32_t a;
    int32_t b;

    a = PYC_ARG_INT(0);
    b = PYC_ARG_INT(1);


    MAKE_RESULT(pinteger_new( a + b ));

    return ERR_OK;
}

C_NATIVE( c_multiply )
{
    C_NATIVE_UNWARN();

    int32_t a;
    int32_t b;

    a = PYC_ARG_INT(0);
    b = PYC_ARG_INT(1);


    MAKE_RESULT(pinteger_new( a * b ));

    return ERR_OK;
}
```

Content of `main.py`:

```python

# Wrap C function for adding two numbers in python.
@c_native("c_addition", ["c_file.c"], [])
def py_addition(a, b):
        pass

# Wrap C function for multiplying two numbers in python.
@c_native("c_multiply", ["c_file.c"], [])
def py_multiply(a, b):
        pass


print("Hello C Language Interface")

A = 1
B = 1

while True:

    # Call wrapper functions and print result.
    add = py_addition(A, B)
    multiply = py_multiply(A, B)
    print("A = ", A, " B = ", B, " Added = ", add, " Multiplied = ", multiply)
    A = A + 1
    B = B + 1
    sleep(2000)
```

