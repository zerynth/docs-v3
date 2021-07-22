# **ZM1-DB**

The ZM1 Development board is an industrial-oriented, modular hardware development unit, Facilitates the development of scalable, secure and connected IoT applications.

The ZM1-DB mounts the ZM1 module, a 32-bit dual Core MCU. The ZM1 Core features a clock frequency of up to 240 Mhz, Embedded SPI Flash memory of 16 MB, integrates the crypto element ATECC608A for ultra-secure communication.

The ZM1 Development Board can act as a Development Board for prototyping a Product, and a core for industrial applications, thanks to the expansion modules system.
The DB features I/O connectors (the Z-bus) that allow the connection in a cascade of different add-on modules to create specific industrial applications that fit into a DIN-RAIL case.

<figure>
  <a data-fancybox="gallery" href="../img/ZM1-DB-front.png">
  <img src="../img/ZM1-DB-front.png"width="400"/>
  </a>
</figure>

## **Device Summary**

* ZM1 Core: 32-bit Microcontroller runs on up to 240MHz, 16Mb of Flash, 312Kb SRAM

* Python/C enabled development on zOS

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


## **Resources and Documents**

-   [User manual](https://www.zerynth.com/download/20117/)
-   [Warning and Instructions for safe use](https://www.zerynth.com/download/20294/)

## **Getting Started**

For step-by-step guide on connecting, running your first example, Please refer to [the Getting started guide for the ZM1-DB](../../gettingstarted/ZM1-DB/)

## **ZM1-DB Software Library**

For more information on the ZM1-DB Library as software Library, Its features, functions and examples demos
[Please check this Link](../../reference/bsp/zm1_db/)



## **Pin Mapping**

<figure>
  <a data-fancybox="gallery" href="../img/zm1-db-pinmap.jpg">
  <img src="../img/zm1-db-pinmap.jpg" />
  </a>
</figure>

## **Power**

The development board can be powered through the USB type-C connection, 9-36V Power Supply connector P1.
DC power supply has priority over the USB power supply, but the power circuit automatically detects and uses the available power source.
## **Ethernet**

The ZM1-DB supports Ethernet connection, The board uses the RJ45 Connector and LAN8710 as a physical layer transceiver.
For the Ethernet software driver and Examples,[Please refer to the Ethernet](../../reference/libs/networking/eth/#ethernet)

## **SD Card**

The board features an on-board SD Card interface,For more information [please refer to the Filesystem module](../../reference/libs/stdlib/fs/)

<!---
## Flash Layout

The internal flash of the ZM1 module is organized in a single flash area with pages of 4096 bytes each. The flash starts at address 0x00000, but many areas are reserved for Esp32 IDF SDK and Zerynth OS. There exist two different layouts based on the presence of BLE support.

| Start address | Size  | Content                 |
|---------------|-------|-------------------------|
| 0x0000A000    | 20Kb  | Esp32 NVS area          |
| 0x0000F000    | 4Kb   | Esp32 PHY data          |
| 0x00010000    | 2Mb   | Zerynth OS              |
| 0x00210000    | 1Mb   | Zerynth Bytecode        |
| 0x00310000    | 3Mb   | Zerynth OTA             |
| 0x00920000    | 7040Kb| File System             |

-->

## **ZM1**

The ZM1-DB mounts the ZM1 module. The Zerynth Module ZM1 is a dedicated customized version of the ESP32-WROOM-32SE Module.
The Module is certified RoHS, CE/RED, e FCC (EU e US).

The ZM1 Module mounts onboard the ESP32-D0WD microcontroller, and is designed to be
scalable and adaptive. The CPU clock frequency is adjustable from 80 MHz to 240 MHz, With an
embedded 16 MB of SPI Flash memory and integrates a rich set of peripherals, ranging from Hall
sensors, Capacitive touch sensor, SD interface, Ethernet, High speed SPI, UART, I2S e I2C.

Inside the ZM1, the crypto element ATECC608A from Microchip has been integrated to handle
secure connections in an easy manner, exchanging certificates and keys, encrypting messages
over TLS protocol and using secure authentication procedures.

For more information on ZM1 module, [Please refer to the user manual of ZM1](https://www.zerynth.com/download/20127/)


## **Z-Bus**

The modular expansion system uses the Z-Bus. The Z-Bus is an efficient, powerful standard for connecting and prototyping different sensors and devices.
The Z-Bus is using the CN1 pin header (20x2) exposing the following:

* 16 GPIO pins.
* 4 interrupt pins.
* 2 USART/UART instances with full support (TX,RX,RTS,CTS)
* I2C, SPI support.
* 5V, 3.3 V output pins.
* Enable pin for controlling the power to attached expansion boards.

!!! note 
    The development boards support up to 3 attached expansion boards.

The Z-Bus allows the connection in a cascade of different add-on modules to create specific industrial applications that fit into a DIN-RAIL case.

The development board offers a modular expansion system that adds expansion boards through the connectors on the board (Z-bus).
Expansion boards vary in features and functionalities. Currently, Zerynth offers expansion boards for :
<figure>
  <a data-fancybox="gallery" href="../img/Boards.jpg">
  <img src="../img/Boards.jpg"width="900"/>
  </a>
</figure>

Expansion boards vary in features and functionality. Currently, Zerynth offers expansion boards for :

-   [EXP-AIN](EXP-AIN.md): Expansion board with 8 Industrial analog input channels
-   [EXP-CONNECT](EXP-CON.md): GSM-NB-IoT and GPS enabled expansion module.
-   [EXP-IO](EXP-IO.md): Industrial input/output board with 4 solid-state relays, 2 analog channels (4-20mA/0-10V/NTC/current clamp) channels, 2 opto-isolated digital inputs
-   [EXP-RELAY](EXP-RELAY.md): Relay board with 6 Electromechanical power relays rated 6A 250VAC.
-   [EXP-SER](EXP-SER.md): Serial Communication board with : CAN, RS232 and RS485  interfaces.
-   [EXP-PROTO](EXP-PROTO.md): Prototyping board for connecting and testing different types of sensors and devices.
