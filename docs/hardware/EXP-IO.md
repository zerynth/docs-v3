# EXP-IO

The EXP-IO is the Zerynth expansion board dedicated to handle Inputs (analog and digital) and outputs.

When connected do the ZM1-DB, the EXP-IO adds support for 2 opto-isolated digital inputs, 2 selectable analog input channels, 4 opto-isolated outputs.

![](img/4zerobox_v1.png)

## Resources

For more infos about electrical connections, and how to use EXP-IO with sensors and other hardware, see the  [user manual](https://www.zerynth.com/download/13894/).

For more information on the EXP-IO Library as software drivers, Its features, functions and examples
[Please check this Link](/latest/reference/libs/zerynth/4zerobox/docs/)

Other useful documents are:

-   [Datasheet](https://www.zerynth.com/download/13895/)
-   [Quick Guide](https://www.zerynth.com/download/15283/)


## Pin Mapping

![](img/4zeroboxpin.png)

Official reference for EXP-IO can be found  [here](https://www.zerynth.com/4zeroplatform/).

## Device Summary

* 4 opto-isolated outputs
* 2 opto-isolated digital inputs
* 2 selectable analog input channels

A rotative switch allows to select the I2C address of the onboard port expander.
Rotative switch configuration:

| Position | Address |
|----------|---------|
|    0     |  0x10   |
|    1     |  0x11   |
|    2     |  0x12   |
|    3     |  0x13   |

An array of on-off switches allows to select different kind of gains or kind of measures on the two analog inputs.

## Power

Power to the EXP-IO is supplied directly by the ZM1-DB.
