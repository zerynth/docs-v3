# What's new in Zerynth v3.x

Zerynth SDK v3.x is not back compatible with v2.x and a lot of details are changed. For the users of v2.x here is a list of the main changes to help navigate the SDK.

## zOS

The Zerynth Virtual Machine has been improved and converted to a full fledged RTOS, the zOS. In v3.x there is no more VM and no need to create and personalized it with the required features. Under the hood, the toolchain automatically select the version of the zOS the best fits the features required by the project.

## Standard Library

The standard library has been greatly improved and simplified. What follows is a list of feature that were present in v2.x and changed in v3.x

### Builtins

The builtins have been reduced in number by removing all the GPIO controlling functions and moving them to their own module. 

#### GPIOs
The `digitalWrite`, `digitalRead` and `OnPinRise` builtins have been moved to `gpio.set`, `gpio.get` and `gpio.on_rise`. Moreover, while v2.x required the explicit usage of port expander libraries, in v3.x the gpios are controlled with the same set of functions regardless if they are managed by the microcontroller or by a port expander. This is also true for interrupts if the port expander allows for interrupt detection.

#### Pin Names
In v3.x the only available pin names are the one described in the hardware pinmap. There are no more `PWMx` or `Dx.PWM` notations. We added simpler naming based on the actual hardware schematics: the general rule of thumb is that a pin is named as it is written in the PCB.

#### Exceptions
In v3.x exceptions finally have a human readable traceback that is printed directly on the standard error. Moreover, exceptions can now be raised with custom error messages, provided that they are literal strings. For example ```#!py3 raise IOError("Can't open file")``` is now a valid syntax.

#### Logging
In v3.x we introduced the `zdebug`, `zwarning`, `zerror` and `zinfo` functions that conditionally output to standard output when a certain debug level is enabled. Just edit the `config.yml` file in the project and select the debug level.

### File System
A new and improved file system is available. The `fs` module is now the only module required to use SD cards or the internal flash as a file system. The file abstraction has been simplified with the `fs.open` function and the `fs.FileIO` class. 


### Serial Ports
In v3.x the `streams` module is gone! All the various `print` work by default on `SERIAL0` and any other serial port can be accessed with the `serial` module. 

### Time
In v3.x we now have a `time` module instead of a `rtc` module. It is the interface with the Real Time Clock of the hardware and also support timezone conversions.


### Math

The `math` module now lives in `math.math` together with `math.bignum`. 

## Network Interfaces

In v3.x, instead of importing modules for networking peripherals and then configuring them via specific drivers, we exposed a general interface concept. Whatever the network (wifi, ethernet or cellular), one simply import the corresponding network interface from the `networking` namespace.

Disconnections, reconnections and temporary connectivity loss are automatically managed by the network interface.

The old `socket` module is now available as `networking.socket`


## Protocols

All the v2.x modules for connectivity protocols have been abstracted and moved under the `protocols` namespace. The `requests` module is now `protocols.http`, the old `lwmqtt` is now `protocols.mqtt`. For `ntp` and `modbus` we now have `protocols.ntp` and `protocols.modbus`.


## BSP

In v3.x there are no more `board.xxx` modules. It suffices to import from the bsp namespace as ```#!py3 from bsp import board```.




