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

### method `relay_on`
```python
relay_on(rel)
```
Switch the specified relay COM to the NO (Normally Open).

* `rel` is the RELAY to open.

### method `relay_off`
```python
relay_off(rel)
```
Switch the specified relay COM to the NC (Normally Closed).

* `rel` is the RELAY to close.

### method `is_relay_on`
```python
is_relay_on(out)
```
Get the status of the specified RELAY.

* `out` is the RELAY to check.

Return 1 if the RELAY is on. 0 otherwise.

### method `summary`
```python
summary()
```
Print the IO expansion summary on the console.

## Example
```python
from bsp import board
from expansions import relay

board.init()
sel = (1,)
rel_e = board.next_expansion(relay,sel)

rel_e.relay_off(rel_e.OUT1)
rel_e.relay_off(rel_e.OUT2)
rel_e.relay_off(rel_e.OUT3)
rel_e.relay_on(rel_e.OUT4)
rel_e.relay_on(rel_e.OUT5)
rel_e.relay_on(rel_e.OUT6)
```
