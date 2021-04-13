# EXP-IO

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

### method `set_adc_callback`
```python
set_adc_callback(label, pin, cb=None, sens=None)
```
Setup a callback to convert ADC read values on an ADC pin. The ADC's read function will automatically call the passed callback after the bit to electric value conversion is completed.

* `label` is the label of the adc configuration to use.
    Possible labels are the following:
    1. `'vol'` for voltage reading ADC;
    2. `'res'` for resistive reading ADC;
    3. `'cur'` for current reading ADC;
    4. `'pow'` for power reading ADC.

* `pin` is the pin usef by the ADC to configure. Possible choices are `AIN1` and `AIN2`

* `cb` is the callback to setup to the specific channel.
    The callback should have the following signature: `cb(value, sens)` where `value` will be the electric value passed by the read and `sens` a some sort of structure with data needed by the conversion callback. The callback should return the converted value.

* `sens` is some sort of structure with data about the sensor to make the correct conversion.

### method `read_voltage`
```python
read_voltage(pin)
```
Read a and convert voltage value from a ADC pin. Voltage in V is passed to the callback.
* `pin` is the ADC pin to read from.

Returns the value converted by the pin callback. Voltage value (V) if the callback is set to `None`.

### method `read_resistive`
```python
read_resistive(pin)
```
Read an convert resistance value from a ADC pin. Resistance in Ohm is passed to the callback.
* `pin` is the ADC pin to read from.

Returns the value converted by the pin callback. Resistance value (Ohm) if the callback is set to `None`.

### method `read_current`
```python
read_current(pin)
```
Read an convert current value from a ADC pin. Current in mA is passed to the callback.
* `pin` is the ADC pin to read from.

Returns the value converted by the pin callback. Current value (mA) if the callback is set to `None`.

### method `read_power`
```python
read_power(pin, samples=400, sps=0):
```
Read and convert power value from ADC pin. To do so, the ADC will get min and max values read on `samples`.
Difference between max and min in bits is passed to the callback.

* `pin` is the ADC pin to read from.

* `samples` is the number of samples to get to find min and max values. Default value is 400.

* `sps` is the acquisition rata (samples per seconds). If 0, max acquisition rate speed is used. Default value is 0.

Returns the value converted by the pin callback. Differnce (max - min) in bits if callback is set to `None`

### method `out_on`
```python
out_on(out)
```
Close the contact on the specified OUT.

* `out` is the OUT to close.

### method `out_off`
```python
out_off(out)
```
Open the contact on the specified OUT.

* `out` is the OUT to open.

### method `din_get`
```python
din_get(din)
```
Get the logic value of a digital input (DIN).

* `din` is the DIN to get.

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
sel = (1, 0) 
io_e = board.next_expansion(io, sel)

gpio.mode(PE1, OUTPUT)
gpio.high(PE1)

gpio.high(io_e.OUT1)
gpio.low(io_e.OUT2)
gpio.high(io_e.OUT3)
gpio.low(io_e.OUT4)
```
