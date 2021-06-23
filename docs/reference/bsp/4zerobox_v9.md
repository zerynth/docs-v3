# 4ZeroBox

This `bsp` module exposes various functions to interact with the [4ZeroBox](../../hardware/4ZeroBox.md).

### function config_adc
```python
config_adc(label, ch, pga, sps)
```

Configure Gain and Samples per second of one adc channel.

* `label` is the label of the adc to use.
    Possible labels are the following:

    1. `ADC_010_420` for 0-10 Volt / 4-20 mA ADC;
    2. `ADC_RES` for resistive ADC;
    3. `ADC_CUR` for current ADC.

* `ch` is the channel of the labelled ADC to configure.

    1. 1-4 for `ADC_010_420` and `ADC_RES`;
    2. 1-3 for `ADC_CUR`.

* `pga` is the desired gain for the ADC channel.
*
    Follow the following table to select `pga`

    | `pga` | ADC Volt Range |
    |-------|----------------|
    |   0   |   ± 6.144 V    |
    |   1   |   ± 4.096 V    |
    |   2   |   ± 2.048 V    |
    |   3   |   ± 1.024 V    |
    |   4   |   ± 0.512 V    |
    |   5   |   ± 0.256 V    |
    |   6   |   ± 0.256 V    |
    |   7   |   ± 0.256 V    |

    default value is `2`.

* `sps` is the desired sample rate for the ADC channel.

    Follow the following table to select `sps`

    | `sps` | SPS  |
    |-------|------|
    |   0   | 128  |
    |   1   | 250  |
    |   2   | 490  |
    |   3   | 920  |
    |   4   | 1600 |
    |   5   | 2400 |
    |   6   | 3300 |
    |   7   | 3300 |

    default value is `4`.

### function set_adc_callback
```python
set_adc_callback(label, ch, cb=None, sens=None)
```
Setup a callback to convert ADC read values on an ADC channel. The ADC's read function will automatically call the passed callback after the bit to electric value conversion is completed.

* `label` is the label of the adc to use.
    Possible labels are the following:
    1. `ADC_010_420` for 0-10 Volt / 4-20 mA ADC;
    2. `ADC_RES` for resistive ADC;
    3. `ADC_CUR` for current ADC.

* `ch` is the channel of the labelled ADC to configure.
    1. 1-4 for `ADC_010_420` and `ADC_RES`;
    2. 1-3 for `ADC_CUR`.

* `cb` is the callback to setup to the specific channel.
    The callback should have the following signature: `cb(value, sens)` where `value` will be the electric value passed by the read and `sens` a some sort of structure with data needed by the conversion callback. The callback should return the converted value.

* `sens` is some sort of structure with data about the sensor to make the correct conversion.

### function read_010
```python
read_010(ch, raw=False)
```
Read a channel from the ADC_010_420 in Voltage mode.

* `ch` is the channel to be read. Possible values 1-4.
* `raw` if set to `True` ADC's bits are returned as result.

Returns the value converted by the channel callback. Voltage value (V) if callback is set to `None`.

### function read_420
```python
read_420(ch, raw=False)
```
Read a channel from the ADC_010_420 in Current mode.

* `ch` is the channel to be read. Possible values 1-4.
* `raw` if set to `True` ADC's bits are returned as result.

Returns the value converted by the channel callback. Current value (mA) if callback is set to `None`.

### function read_resistive
```python
read_resistive(ch, raw=False)
```
Read a channel from the ADC_RES.

* `ch` is the channel to be read. Possible values 1-4.
* `raw` if set to `True` ADC's bits are returned as result.

Returns the value converted by the channel callback. Resistance value (Ohm) if callback is set to `None`.

### function read_power
```python
read_power(ch, samples=400, raw=False)
```

Read a differnce of min and max read values from the ADC_CUR.

* `ch` is the channel to be read. Possible values 1-3.
* `samples` is the number of samples to search min Max on. Default 400.
* `raw` if set to `True` ADC's bits are returned as result.

Returns the value converted by the channel callback. Difference is bits if callback is set to `None`.

### function realy_on
```python
relay_on(rel)
```
Close the selected relay switch.

* `rel` is the relay to close. Possible choices are `REL1` and `REL2`.

### function realy_off
```python
relay_off(rel)
```
Open the selected relay switch.

* `rel` is the relay to open. Possible choices are `REL1` and `REL2`.

### function sink_on
```python
sink_on(snk)
```
Close the selected sink switch.

* `snk` is the sink to close. Possible choices are `SNK1` and `SNK2`.

### function sink_off
```python
sink_off(snk)
```
Open the selected sink switch.

* `snk` is the sink to open. Possible choices are `SNK1` and `SNK2`.

### function get_opto
```python
get_opto(iso)
```
Get the logic value on a opto-isolated digital input.

* `iso` is the digital input to get. Possile choices are `ISO1` and `ISO2`.

Returns logic value of the input.

### function get_serial_rs485
```python
get_serial_rs485(baud=9600, stopbits=serial.STOPBIT_1, parity=serial.PARITY_NONE, bitsize=serial.BITSIZE_8)
```
Get the a ready to use serial for RS485.

* `baud` is the desired baud rate for the serial. Default 9600.
* `stopbits` is the desired stop bit configuration for the serial. Default is 1 stopbit. See `serial` for possible values.
* `parity` is the desired parity check configuration for the serial. Default is none. See `serial` for possible values.
* `bitsize` is the desired bit size configuration for the serial. Default is 8. See `serial` for possible values.

Return the configured RS485 serial object.

### function get_serial_rs232
```python
get_serial_rs232(baud=19200, stopbits=serial.STOPBIT_1, parity=serial.PARITY_NONE, bitsize=serial.BITSIZE_8)
```

Get the a ready to use serial for RS232.

* `baud` is the desired baud rate for the serial. Default 19200.
* `stopbits` is the desired stop bit configuration for the serial. Default is 1 stopbit. See `serial` for possible values.
* `parity` is the desired parity check configuration for the serial. Default is none. See `serial` for possible values.
* `bitsize` is the desired bit size configuration for the serial. Default is 8. See `serial` for possible values.

Return the configured RS232 serial object.

### function shut_down
```python
shut_down()
```
Shut down all devices powered by the PWR pin.

### function power_on
```python
power_on()
```
Power on all the devices powered by the PWR pin.

### function get_battery_status
```python
get_battery_status()
```
Returns battery status. Possible returns `"chaged"`, `"charging"` and `"discharging"`

### function get_power_source
```python
get_power_source
```
Return the source of power of the device. Possible returns `"external"` and `"battery"`

### function `led`
```python
led(color)
```
Set the color of the led.

* `color` is the color to set. Possible colors are. `BLACK`, `WHITE`, `RED`, `GREEN`, `BLUE`, `YELLOW`, `CYAN` and `MAGENTA`.

### function summary
```python
summary()
```
Prints the device summary.
