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

### method `set_adc_config`
```python
set_adc_config(pin, pga=1, sps=0)
```
Set sps configuration to use for an ADC pin. Pga currently not implemented.

* `pin` is the pin to configure.
* `pga` is the gain. Not implemented yet.
* `sps` is the sample for seconds for the ADC pin. Default value use max speed.

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
read_voltage(pin, raw=False, electric=False)
```
Read a and convert voltage value from a ADC pin. Voltage in V is passed to the callback.
* `pin` is the ADC pin to read from.

* `raw` if set to `True` ADC's bits are returned as result.

* `electric` if set to `True` the electric value in mV is returned.

Returns the value converted by the pin callback. Voltage value (V) if the callback is set to `None`.

### method `read_resistive`
```python
read_resistive(pin, raw=False, electric=False)
```
Read an convert resistance value from a ADC pin. Resistance in Ohm is passed to the callback.
* `pin` is the ADC pin to read from.

* `raw` if set to `True` ADC's bits are returned as result.

* `electric` if set to `True` the electric value in Ohm is returned.

Returns the value converted by the pin callback. Resistance value (Ohm) if the callback is set to `None`.

### method `read_current`
```python
read_current(pin, raw=False, electric=False)
```
Read an convert current value from a ADC pin. Current in mA is passed to the callback.
* `pin` is the ADC pin to read from.

* `raw` if set to `True` ADC's bits are returned as result.

* `electric` if set to `True` the electric value in mA is returned.

Returns the value converted by the pin callback. Current value (mA) if the callback is set to `None`.

### method `read_power`
```python
read_power(pin, samples=400, raw=False, electric=False):
```
Read and convert power value from ADC pin. To do so, the ADC will get min and max values read on `samples`.
Difference between max and min in bits is passed to the callback.

* `pin` is the ADC pin to read from.

* `raw` if set to `True` ADC's bits are returned as result.

* `samples` is the number of samples to get to find min and max values. Default value is 400.

* `electric` if set to `True` the electric value in mA is returned.

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

### method `is_out_on`
```python
is_out_on(out)
```
Get the status of the specified OUT.

* `out` is the OUT to check.

Return 1 if the OUT is on. 0 otherwise.

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
