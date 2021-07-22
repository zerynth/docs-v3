# **EXP-SER**

The EXP-SER expansion board allows your application to communicate over RS485, RS232 and CAN interfaces. It enables communication with PC, Devices, boards or sensors communicating over serial channels.
The board features pin headers to connect terminals of CAN bus, R485 and RS232, in addition to exposing the UART/USART pins, I2C and SPI pins in the zBUS pin header.

<figure>
  <a data-fancybox="gallery" href="../img/EXP-SER-front.png">
  <img src="../img/EXP-SER-front.png"width="400"/>
  </a>
</figure>

## **Device Summary**

* **CAN:** The board uses the MCP2518FD IC, It is an External CAN FD Controller.
The board also uses NCV7357 as a CAN FD Transceiver.
Connections between the controller and the transceiver are digitally isolated by the ISO7763 IC.
* **RS232 interface:** The board uses the MAX3232 IC, 3-V to 5.5-V Multichannel RS-232 Line Driver/Receiver. The output pins of the IC are directly connected to the header P1.
* **RS485 interface:** The board uses SN65HVD1786D RS485 Transceiver. The output pins of the IC are directly connected to the header P2.

## **Resources and Documents**

-   [User manual](https://www.zerynth.com/download/20121/)

## ZM1-DB Software Library

For more information on the EXP-SER Library as software Library, features, functions and examples
[Please check this Link](../../reference/reference/bsp/zm1_db/)

## **Pin Mapping**

<figure>
  <a data-fancybox="gallery" href="../img/EXP-SER_pin.jpg">
  <img src="../img/EXP-SER_pin.jpg" />
  </a>
</figure>




### **Rotart and Standard switches**

For information on the switches and other hardware details, Please refer to the [User manual of the board](#resources-and-documents)

## **Power**

Power to the EXP-SER is supplied directly by the ZM1-DB.

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
