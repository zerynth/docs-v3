# **EXP-CONNECT**

The EXP-CONNECT expansion board Adds GPS and GSM/NB-IoT capabilities to your
application. It enables you to monitor and locate your assets, ensuring visibility of their
position and allowing you to receive real time notifications on critical events.

Zerynth expansion boards work seamlessly with all of the Zerynth Development boards.
Combined, they can act as a Development Boards for prototyping a Product, and a core
for industrial applications.

<figure>
  <a data-fancybox="gallery" href="../img/EXP-IO-front.png">
  <img src="../img/EXP-CONNECT-front.png"width="400"/>
  </a>
</figure>

## **Device Summary**

General Characteristics

-   Quectel BG95-M3 modem 2G e NB-IoT: LPWA module which supports LTE Cat M1/Cat NB2/EGPRS and integrated GNSS.
-   MicroSIM Slot
-   GPS and GSM/NB-IoT Antennas: 2 SMA connectors


!!! warning
    The EXP-CONNECT works only if the ZM1-DB is powered with 24VDC from the external screws.

## **Resources and Documents**

-   [User manual](https://www.zerynth.com/download/25543/)

## **Software Library**

For more information on the EXP-IO Library as software Library, features, functions and examples
[Please check this Link](../../reference/libs/expansions/exp-con/)

## **Pin Mapping**

<figure>
  <a data-fancybox="gallery" href="../img/exp-connect-pinmap.jpg">
  <img src="../img/exp-connect-pinmap.jpg" />
  </a>
</figure>


## **Rotart and Standard switches**

For information on the switches and other hardware details, Please refer to the [User manual of the board](#resources-and-documents)

## **Power**

Power to the EXP-CONNECT is supplied directly by the ZM1-DB.

!!! warning
    The EXP-CONNECT works only if the ZM1-DB is powered with 24VDC from the external screws.

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
