---
layout: blog
title: Standard Library - gpio
---
## GPIO

Generic GPIO module for transparently handling physical pins and pins controlled by port expanders.

**TODO**: Api documentation

### Examples

The module can be used without configuration like this:
```python
import gpio


gpio.mode(D10, OUTPUT)  # Set mode for D10
gpio.mode(D11, OUTPUT)  # Set mode for D11
gpio.high(D10)          # Set D10 high
gpio.low(D11)           # Set D11 low
```

More advanced configurations allow the use of port expanders:
```python
import gpio
from semtech.sx1503 import sx1503    # a port expander driver for sx1503

# initialize port expander driver
pdriver = sx1503.SX1503(I2C0)        # sx1503 is connected on I2C0

pinmap = {                           # now add pins definition for the expander
    100: 7,                          # pin "100" maps to pin 7 on sx1503 
    101: 14,                         # pin "101" maps to pin 14 on sx1503
    102: 15                          # pin "102" maps to pin 15 on sx1503
}

gpio.add_expander(1,pdriver,pinmap)  # add expander to gpio module
                                     # with id = 1, using pdriver
                                     # and mapping the pins in pinmap

# from here on, every library using gpio can access the port expander
# without knowing about its existence! Like this:

mypin1 = D10
mypin2 = 100

gpio.mode(mypin1,OUTPUT)             # configure D10 as output
gpio.mode(mypin2,OUTPUT)             # configure pin "100" as output on sx1503

gpio.high(mypin1)                    # set pin D10 to high
gpio.low(mypin2)                     # set pin "100" to low
```