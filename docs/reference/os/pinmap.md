# Pins and Peripherals

Zerynth allows multi-hardware programming. To do this in a reliable and maintainable way it has been necessary to define a pin naming strategy that allows programming native multi-board scripts.

Zerynth follows the widely accepted Arduino pin naming schema where **Digital pin** are named with `Dx` where x is the number of the physical pin available on the board (not of the MCU pin!). Similarly, **Analog pins** are named with `Ax`.


In Zerynth names are always UPPERCASE. The following PIN names are included in the Zerynth built-ins:


* Pin names:


    * `D0` to `D256` representing the names of digital pins.
    * `LED0` to `LED7` representing the names of the on-board installed LEDs.
    * `USER_BUTTON` representing the name of the on-board installed button.
    * all the names that appear on the Z-Bus schematics: `PE1`,`PE2`,...,`INTE1`,etc...


* Peripherals name:


    * `SERIAL0`,...,`SERIALn` representing the different serial ports.
    * `I2C0`,...,`I2Cn` representing the different I2C buses.
    * `SPI0`,...,`SPIn` representing the different SPI buses.



