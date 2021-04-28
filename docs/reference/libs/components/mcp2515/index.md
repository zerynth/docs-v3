# MCP2515

_datasheet_: <http://ww1.microchip.com/downloads/en/DeviceDoc/20001801H.pdf>

This module contains the driver for Microchip MCP2515, a second generation
stand-alone CAN controller. It is pin and function compatible with the MCP2510
and also includes upgraded features like faster throughput, databyte
filtering, and support for time-triggered protocols (datasheet_).

## Class `MCP2515`
```python
MCP2515(dvr, cs, rst=None, clk=800000)
```
Creates an instance of the MCP2515 class. This class allows the control of MCP2515 devices.

* `drv` is the SPI Driver used '(SPI0, ...)'.
* `cs` is the chip select of the SPI driver.
* `rst` is the Reset pin . Default `None`.
* `clk` is the clock speed, default 800 kHz.

### method `init`
```python
init(idmode, speed, clock)
```
Initializes the MCP2515 chip.

* `idmode` set the RX buffer id mode (selectable from mcp2515.MCP_STDEXT, mcp2515.MCP_STD, mcp2515.MCP_EXT, or mcp2515.MCP_ANY.

* `speed` set the speed of the CAN communication.

* `clock` set the clock of the CAN Communication.

    Possible combination of values for Clock and Speed are:

    * Clock --> 8MHZ

        | Clock    | Speed        |
        |----------|--------------|
        | `"8MHZ"` | `"5KBPS"`    |
        | `"8MHZ"` | `"10KBPS"`   |
        | `"8MHZ"` | `"20KBPS"`   |
        | `"8MHZ"` | `"31KBPS"`   |
        | `"8MHZ"` | `"33KBPS"`   |
        | `"8MHZ"` | `"40KBPS"`   |
        | `"8MHZ"` | `"50KBPS"`   |
        | `"8MHZ"` | `"80KBPS"`   |
        | `"8MHZ"` | `"100KBPS"`  |
        | `"8MHZ"` | `"125KBPS"`  |
        | `"8MHZ"` | `"200KBPS"`  |
        | `"8MHZ"` | `"250KBPS"`  |
        | `"8MHZ"` | `"500KBPS"`  |
        | `"8MHZ"` | `"1000KBPS"` |

    * Clock --> 16MHZ

        | Clock     | Speed        |
        |-----------|--------------|
        | `"16MHZ"` | `"5KBPS"`    |
        | `"16MHZ"` | `"10KBPS"`   |
        | `"16MHZ"` | `"20KBPS"`   |
        | `"16MHZ"` | `"31KBPS"`   |
        | `"16MHZ"` | `"33KBPS"`   |
        | `"16MHZ"` | `"40KBPS"`   |
        | `"16MHZ"` | `"50KBPS"`   |
        | `"16MHZ"` | `"80KBPS"`   |
        | `"16MHZ"` | `"100KBPS"`  |
        | `"16MHZ"` | `"125KBPS"`  |
        | `"16MHZ"` | `"200KBPS"`  |
        | `"16MHZ"` | `"250KBPS"`  |
        | `"16MHZ"` | `"500KBPS"`  |
        | `"16MHZ"` | `"1000KBPS"` |

    * Clock --> 20MHZ

        | Clock     | Speed        |
        |-----------|--------------|
        | `"20MHZ"` | `"40KBPS"`   |
        | `"20MHZ"` | `"50KBPS"`   |
        | `"20MHZ"` | `"80KBPS"`   |
        | `"20MHZ"` | `"100KBPS"`  |
        | `"20MHZ"` | `"125KBPS"`  |
        | `"20MHZ"` | `"200KBPS"`  |
        | `"20MHZ"` | `"250KBPS"`  |
        | `"20MHZ"` | `"500KBPS"`  |
        | `"20MHZ"` | `"1000KBPS"` |

### method `set_mode`
```python
set_mode(mode)
```
Sets the operation mode of the MCP2515.

* `mode` operation mode ("NORMAL", "SLEEP", "LOOPBACK", "LISTENONLY", "CONFIG", "POWERUP", "ONE_SHOT").

### method `init_mask`
```
init_mask(num, data, ext)
```
Initializes Masks.

* `num` 0 to set mask 0 on RX buffer, 1 to set mask 1 on RX buffer.

* `data` Data Mask.

* `ext`  0 for standard ID, 1 for Extended ID.

### method `init_filter`
```pyhton
init_filter(num, data, ext)
```
Initializes Filters.

* `num` number of filter to be set in RX buffer (from 0 to 5).

* `data` Data Filter.

* `ext` 0 for standard ID, 1 for Extended ID.

### method `send`
```python
send(canid, data, ext=None)
```
Sends CAN messages.

* `canid` ID of the CAN message (bytearray of 4 bytes).

* `data` Data to be sent (list of 8 bytes).

* `ext` 0 for standard ID, 1 for Extended ID (default None - auto detected).

### method `recv`
```python
recv()
```
Receives CAN messages returnung CAN id value and related data message.

Returns canid, msg.


## Example
```python
from components.mcp2515 import mcp2515  
...
can = mcp2515.MCP2515(SPI0, D17, D16, clk=10000000)
can.init(mcp2515.MCP_ANY, "500KBPS", "16MHZ")
can.set_mode("NORMAL")
...     
can.send(canid, data)
```
