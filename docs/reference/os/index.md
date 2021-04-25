# Introduction

Zerynth OS (zOS) is a RTOS that runs on every Zerynth hardware and has the capability of executing firmwares written in Python and C. It makes the life of the developer easier by allowing for code reuse between projects and by providing a uniform programming interface among different platforms and architectures. 


Zerynth firmwares are developed in Python 3.5 using the Zerynth SDK. Most of the Python Standard Library functions, types and operators are supported by Zerynth OS. Some high level features have been removed either for reducing the resource footprint of the OS or because they were seldom useful in embedded scenarios. 

The following guide is consequently an adaptation of [Python 3.0 official standard library guide](https://docs.python.org/3/library/index.html) that can be used for Python syntax, types, operators and constants details and use.

The “Python standard library” contains several different kinds of components. It contains data types that would normally be considered part of the “core” of a language, such as numbers and lists. 


In general, writing a Zerynth firmware consists in importing a collection of modules. Some modules provide interfaces that are highly specific to Zerynth, like managing threads and the hardware and its peripherals; some other provides interfaces that are specific for particular sensors, shields and auxiliary boards.

This section of the documentation is organized “from top to bottom”; it first describes some basics to start writing Zerynth firmwares with examples and finally goes in details with description of Zerynth built-in functions and inner mechanisms.

* [Basics](basics.md)
* [Sequences and Maps](seqmap.md)
* [Pins and Peripherals](pinmap.md)
* [C Language Interface](clang.md)
* [zOS Guide](os.md)


