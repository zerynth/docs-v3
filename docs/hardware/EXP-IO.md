# EXP-IO

The EXP-IO expansion board is a mixed input/output module that features:
* Relay: The board features 4 Solid state relays Normally open connection rated at 36Vdc, This enables developers to control actuators easily using Software libraries with Zerynth SDK.

* Opto-isolated digital inputs: 2 channels of opto-isolated digital inputs are available on the board.

* 2 Analog Channels channels: Connect your sensor easily and read the data from the sensors over the 2 industrial-compatible channels on the board. The channels support voltage-based ( ±10V), current-based (±20mA) or resistive sensors (calibrated for 11 Kohm for best precision).

Zerynth expansion boards work seamlessly with all of Zerynth Development boards, combined they can act as a Development Board for prototyping a Product, and a core for industrial applications.

The Z-bus allows the connection in a cascade of different add-on modules to create specific industrial applications that fit into a DIN-RAIL case.

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

* 4x Solid State Relays NO.
    Uses the TLP172A, Rated at 36Vdc.
* 2x opto-isolated digital inputs
    Uses ISO1212DBQR IC rated for 36Vdc.
* 2x Analog Channels channels: Can be configured as
    4-20 mA Current channel
    0-10V Voltage channel
    Resistive Sensor Channel (calibrated for 11 Kohm for best precision).
    Current Clamp channel.



### Rotary Switch SW1
Chooses the address of the ADC Chip, Enable multiple boards to be connected simultaneously.

| Position | Address |
|----------|---------|
|    0     |  0x10   |
|    1     |  0x11   |
|    2     |  0x12   |
|    3     |  0x13   |

### Rotary Switch SW2
Controls on which hardware channel you want to link the interrupt.

| Position | Pin on Z-Bus |
|----------|--------------|
|    0     |     INTR     |
|    1     |     INTB     |
|    2     |     INTE1    |
|    3     |     INTE2    |

### S1 Switch
Controls the configuration of the ADC channel.

| PIN | AIN  |      OFF     |       ON        |
|-----|------|--------------|-----------------|
|  1  | AIN1 | Gain  = 1    | Gain = 5        |
|  2  | AIN1 | Read Voltage | Read Current    |
|  3  | AIN1 |      -       | Read Resistance |
|  4  | AIN2 | Gain  = 1    | Gain = 5        |
|  5  | AIN2 | Read Voltage | Read Current    |
|  6  | AIN2 |      -       | Read Resistance |

For Voltage measurement - 0 10V standard industrial voltage sensor:

| Switch Pin | State |
|------------|-------|
|    S1.1    |  OFF  |
|    S1.2    |  OFF  |
|    S1.3    |  OFF  |

For Current measurement - 4-20 mA standard industrial sensor:

| Switch Pin | State |
|------------|-------|
|    S1.1    |  ON   |
|    S1.2    |  ON   |
|    S1.3    |  OFF  |

For  Resistive passive industrial sensor:

| Switch Pin | State |
|------------|-------|
|    S1.1    |  ON   |
|    S1.2    |  OFF  |
|    S1.3    |  ON   |


## Power

Power to the EXP-IO is supplied directly by the ZM1-DB.
