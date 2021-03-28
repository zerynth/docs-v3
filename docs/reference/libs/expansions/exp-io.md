## IO expansion

### class `EXP`
```python
EXP(position, selectors)
```
Created an object for the expansion board connected to Zerynth ZM1 board at the `position` number, counting from left to right. Valid positions are 1 to 4.
`selectors` is a tuple composed as in the following:
0. Port Expansion (PE) address.
1. Interrupt pin.

Once the `EXP` object is created, the expansion board can be used from the application by using the `gpio` module.

Both values are integers from 0 to 3.

### method `summary`
```python
summary()
```
Print the IO expansion summary on the console.

## Example

```python
from expansions import io
from bsp import board
import gpio
import adc 

board.init()
sel = (1, 0,) 
io_e = board.next_expansion(io, sel)

gpio.mode(PE1, OUTPUT)
gpio.high(PE1)

gpio.high(io_e.OUT1)
gpio.low(io_e.OUT2)
gpio.high(io_e.OUT3)
gpio.low(io_e.OUT4)
```
