# EXP-RELAY

The EXP-RELAY is the Zerynth expansion board dedicated to handle high voltage/current the digital outputs.

When connected do the ZM1-DB, the EXP-RELAY adds support for 6 NO/NC Relay (10A @ 250V AC).

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

* 6 NO/NC Relay (10A @ 250V AC)

A rotative switch allows to select the I2C address of the onboard port expander.
Rotative switch configuration:

| Position | Address |
|----------|---------|
|    0     |  0x10   |
|    1     |  0x11   |
|    2     |  0x12   |
|    3     |  0x13   |

## Power

Power to the EXP-RELAY is supplied directly by the ZM1-DB.
