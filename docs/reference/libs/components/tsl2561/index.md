# TSL2561

This module contains the driver for AMS TSL2561 Luminosity sensor integrating both infrared and full-spectrum photodiodes.
The TSL2561 is capable of direct I2C communication and is able to conduct specific light ranges from 0.1 - 40k+ Lux easily. Additionally, it contains two integrating analog-to-digital converters (ADC) that convert currents from the two photodiodes, simultaneously.

[datasheet](https://ams.com/documents/20143/36005/TSL2561_DS000110_3-00.pdf/18a41097-2035-4333-c70e-bfa544c0a98b)

### class `TSL2561`
```python
TSL2561(addr=0x49, i2cdrv=I2C0, clk=400000)
```
Creates an intance of a new TSL2561.
* `addr` is the slave address. Default `0x49`;
    This sensor has a dedicaded "Address" pin that allows to select 1 of 3 available address as shown in the table below.

| ADDR SEL Terminal Level | I2C Address | Zerynth Define                           | 
|-------------------------|-------------|------------------------------------------|
|   GND                   | 0x29        | `tsl2561.TSL_I2C_ADDRESS["LOW"]`     |
|   Float                 | 0x39        | `tsl2561.TSL_I2C_ADDRESS["NORMAL"]` |
|   Vdd                   | 0x49        | `tsl2561.TSL_I2C_ADDRESS["HIGH"]`   |

* `i2cdrv` is the I2C Bus used. Default is `I2C0`;

* `clk` is the i2c clock speed. Default 400kHz

### method `init`
```python
init(gain=1, timing=0, pack=1)
```
Initialize the TSL2561 setting the gain, timing and kind of package.

* `gain` set the gain of the sensor (values allowed: 0 for gain=1x and 1 for gain=16x). Default `1`;

* `timing` set the integration time value (from 0 to 2 - 0 for 13 ms, 1 for 101 ms, 2 for 402 ms). Default `0`;

* `pack` set the kind of package for the correct lux calculation (values allowed: 0 for CS package and 1 for T,FN,CL package). Default `1`.

### method `get_raw_fullspectrum`
```python
get_raw_fullspectrum()
```
Retrieves the current raw value read on channel0 (full-spectrum photodiode).
Returns `raw_fs`

### method `get_raw_infrared`
```python
get_raw_infrared()
```
Retrieves the current raw value read on channel1 (infrared photodiode).
Returns `raw_ir`

### method `get_raw_visible`
```python
get_raw_visible()
```
Retrieves the difference between the current raw value read on channel0 and raw value on channel1 (visible spectrum).
Returns `raw_vis = (raw_fs - raw_ir)`

### method `get_lux`
```python
get_lux()
```
Converts the raw sensor values to the standard SI lux equivalent (according to the sensor settings - gain, timing and kind of package).
Returns lux value or 0 if the sensor is saturated and the values are unreliable.

## Example

from components.tsl2561 import tsl2561
...
tsl = tsl2561.TSL2561(addr=tsl2561.TSL_I2C_ADDRESS["LOW"])
tsl.init()
lux = tsl.get_lux()