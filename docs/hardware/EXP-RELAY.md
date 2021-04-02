# EXP-RELAY

The EXP-RELAY expansion board is an output module that features 6 General Purpose Relays rated at 6A 250VAC. The board enables the developers to control motors, fuel pump, industrial applications where control of high voltages and currents is intended, controlling large power loads.

Zerynth expansion boards work seamlessly with all of Zerynth Development boards, combined they can act as a Development Board for prototyping a Product, and a core for industrial applications.

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

The Z-bus allows the connection in a cascade of different add-on modules to create specific industrial applications that fit into a DIN-RAIL case.

![](img/4zerobox_v1.png)

## Resources

For more infos about electrical connections, and how to use EXP-RELAY with sensors and other hardware, see the  [user manual](https://www.zerynth.com/download/13894/).

For more information on the EXP-RELAY Library as software drivers, Its features, functions and examples
[Please check this Link](/latest/reference/libs/zerynth/4zerobox/docs/)

Other useful documents are:

-   [Datasheet](https://www.zerynth.com/download/13895/)
-   [Quick Guide](https://www.zerynth.com/download/15283/)


## Pin Mapping

![](img/4zeroboxpin.png)

Official reference for EXP-RELAY can be found  [here](https://www.zerynth.com/4zeroplatform/).

## Device Summary

* 6x General Purpose Relays rated at 6A 250VAC

### Rotary Switch SW1
Chooses the address of the ADC Chip, Enable multiple boards to be connected simultaneously.

| Position | Address |
|----------|---------|
|    0     |  0x10   |
|    1     |  0x11   |
|    2     |  0x12   |
|    3     |  0x13   |

## Power

Power to the EXP-RELAY is supplied directly by the ZM1-DB.
