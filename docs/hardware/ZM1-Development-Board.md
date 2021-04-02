# ZM1-DB

The ZM1 Development board is an industrial-oriented, modular hardware development unit, Facilitates the development of scalable, secure and connected IoT applications.

The ZM1-DB mounts the ZM1 module, a 32-bit dual Core MCU based on the ESP32-WROOM-32SE. The ZM1 Core features a clock frequency of up to 240 Mhz, Embedded SPI Flash memory of 16 MB, integrates the crypto element ATECC608A for ultra-secure communication.

The ZM1 Development Board can act as a Development Board for prototyping a Product, and a core for industrial applications, thanks to the expansion modules system.
The DB features I/O connectors (the Z-bus) that allow the connection in a cascade of different add-on modules to create specific industrial applications that fit into a DIN-RAIL case.

![](img/4zerobox_v1.png)

## ZBUS

The modular expansion system uses the Z-bus, The Z-bus is an efficient, powerful standard for connecting and prototyping different sensors and devices.
The z-bus is using the CN1 pin header (20x2) exposing the following:
16 GPIO pins.
4 interrupt pins.
2 USART/UART instances with full support (TX,RX,RTS,CTS)
I2C, SPI support.
5V, 3.3 V output pins.
Enable pin for controlling the power to attached expansion boards.
Note: The development board supports up to 3 attached expansion boards.

The development board offers a modular expansion system that adds expansion boards through the connectors on the board (Z-bus).
Expansion boards vary in features and functionalities. Currently, Zerynth offers expansion boards for :

* EXP-IO: Industrial in/out board with 4x Solid State Relays, 2x 4-20mA/0-10V/NTC channels, 2x opto-isolated digital inputs
* EXP-RELAY: Relay board with 4 Power Relays.
* EXP-SER: Serial Communication board offers : CAN, RS232 and RS485
* EXP-PROTO: Prototyping board for connecting and testing different types of sensors and devices.


## Resources

For more infos about electrical connections, and how to use ZM1-DB with sensors and other hardware, see the  [user manual](https://www.zerynth.com/download/13894/).

For more information on the ZM1-DB Library as software drivers, Its features, functions and examples
[Please check this Link](/latest/reference/libs/zerynth/4zerobox/docs/)

Other useful documents are:

-   [Datasheet](https://www.zerynth.com/download/13895/)
-   [Quick Guide](https://www.zerynth.com/download/15283/)



## Pin Mapping

![](img/4zeroboxpin.png)

Official reference for Zerynth ZM1-DB can be found  [here](https://www.zerynth.com/4zeroplatform/).

## Flash Layout

The internal flash of the ESP32 module is organized in a single flash area with pages of 4096 bytes each. The flash starts at address 0x00000, but many areas are reserved for Esp32 IDF SDK and Zerynth OS. There exist two different layouts based on the presence of BLE support.

| Start address | Size  | Content                 |
|---------------|-------|-------------------------|
| 0x0000A000    | 20Kb  | Esp32 NVS area          |
| 0x0000F000    | 4Kb   | Esp32 PHY data          |
| 0x00010000    | 2Mb   | Zerynth VM              |
| 0x00210000    | 1Mb   | Zerynth Bytecode        |
| 0x00310000    | 3Mb   | Zerynth Park (FOTA)     |
| 0x00610000    | 3Mb   | Zerynth Scratch (FOTA)  |
| 0x00910000    | 64Kb  | Zerynth Otalog          |
| 0x00920000    | 7040Kb| File System             |

## Device Summary

* Espressif ESP32 - 32bit Microcontroller 240MHz clock, 16Mb of Flash, 312Kb SRAM

* Python/C enabled development on

* Modular design with expansion system

* JTAG support

* 3 RGB status LEDs

* 9 to 36V input Power Supply

* MicroSD card slot

* WiFi (Client and AP mode supported)

* Bluetooth® Low-Energy

* Ethernet

* Crypto Chip - ATECC608A Secure Hardware Encryption

* RST button and USR configurable button

* USB-C (power and programming)

## Power

Power to the ZM1-DB is supplied via the on-board USB-C connector or directly via the “24V” screw.

