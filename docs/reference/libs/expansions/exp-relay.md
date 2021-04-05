# EXP-RELAY

### class `EXP`
```python
EXP(position, selectors)
```

Created an object for the expansion board connected to Zerynth ZM1 board at the `position` number, counting from left to right. Valid positions are 1 to 4.
`selectors` is a tuple composed as in the following:

0. Port Expansion (PE) address.
1. Interrupt pin.

Once the `EXP` object is created, the expansion board can be used from the application by using the `relay` module.

Both values are integers from 0 to 3.

### method `summary`
```python
summary()
```
Print the IO expansion summary on the console.

## Example
```python
from bsp import board
from expansions import relay
import gpio

board.init()
sel = (1,)
rel_e = board.next_expansion(relay,sel)

gpio.low(rel_e.OUT1)
gpio.low(rel_e.OUT2)
gpio.low(rel_e.OUT3)
gpio.low(rel_e.OUT4)
gpio.low(rel_e.OUT5)
gpio.low(rel_e.OUT6)
```
