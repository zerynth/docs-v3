# ZM1-DB

ZM1-DB is the IoT development board based on the ZM1 IoT module. It is compatible with the zBus standard and can be used together with the expansion boards. With expansion boards the ZM1-DB can acquire multiple functionalities like industrial grade inputs and communication protocols.


![](img/4zerobox_v1.png)

## Features Summary
* DIN-rail mountable (9 slots)
* 8 to 36V Power Supply
* 4 selectable analog input channels:

  > * 4-20mA single-ended
  > * 4-20mA differential
  > * 0-10V standard
* 3 current transformers (non-invasive)
* 4 resistive sensor channels (NTC, RTD, contact, proximity, etc.)
* 2 opto-isolated digital inputs
* 2 sink digital output (60A @ 30V)
* MicroSD card slot
* 1 Digital I/O + 2 Digital Input (3.3V)
* 2 NO/NC Relay (10A @ 250V AC)
* CAN peripheral
* Connectivity:

  > * WiFi IEEE 802.11 b/g/n/e/i (Client and AP mode supported)
  > * Bluetooth® Low-Energy
  > * Ethernet
* Secure Element - IoT identity and cryptography acceleration
* RS-485 and RS232 peripherals
* 2 onboard mikroBUS sockets
* Li-Po battery support
* Li-Po battery onboard charging unit
* RGB status led
* ZM1 - 32bit Microcontroller 240MHz clock, 16MB of Flash, 312KB SRAM

Power to the 4ZeroBox is supplied via the on-board USB Micro B connector or directly via the “24V” screw. The power source is selected automatically. Zerynth 4ZeroBox has also a JST Li-Po battery connector (3.7V).

## Resources

For more infos about electrical connections, and how to use 4ZeroBox with sensors and other hardware, see the  [user manual](https://www.zerynth.com/download/13894/).

For more information on the 4ZeroBox Library as software drivers, Its features, functions and examples
[Please check this Link](/latest/reference/libs/zerynth/4zerobox/docs/)

Other useful documents are:

* [Datasheet](https://www.zerynth.com/download/13895/)
* [Quick Guide](https://www.zerynth.com/download/15283/)

## Schematics

Put pin mapping here

![](img/4zeroboxpin.png)

Official reference for Zerynth 4ZeroBox can be found  [here](https://www.zerynth.com/4zeroplatform/).


## Storage

ZM1-DB contains a 16MB of internal flash. This storage is partially used by the zOS, the bootloader and the associated firmware. A segment of the internal flash of 7MB is reserved for the zOS filesystem. It is automatically mounted and formatted (if needed) when the board starts, becoming available for storing files.

## How to use

ZM1-DB is very easy to use with the Zerynth SDK. For a detailed guide check:
- [Link to Getting Started]
- [Link to tutorials]


The ZM1-DB comes with a serial-to-usb chip on board that allows programming and opening the UART of the ZM1 without installing drivers. 

!!! Note
	**Linux**: for accessing the ZM1-DB serial port the user needs read/write access to device files. Adding the user to the group, that owns this file, gives the required read/write access:

* **Ubuntu**  distribution –> dialout group
* **Arch Linux**  distribution –> uucp group


