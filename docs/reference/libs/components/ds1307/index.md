# DS1307

_datasheet_: <https://datasheets.maximintegrated.com/en/ds/DS1307.pdf>

This module implements the Zerynth driver for the Maxim DS1307 RTC. This module require the import and use of `time` module to be able to work correctly.

### class `DS1307`
```python
DS1307(addr=0x68, drvname=I2C0, clock=400000)
```
Creates an instance of the DS1307 class with given arguments.

* `addr`: Slave address. Default 0x68;

* `drvname`: I2C Bus used. Default I2C0;

* `clk`: Clock speed. Default 400kHz.

### method `localtime`
```python
localtime()
```
Returns a tuple with the RTC in a `TimeInfo` class of `time` module.  Refer to `time` module for further information.
This function will also sync the system `time` module with the `ds1307` acquired time.

### method `settime`
```python
settime(ti)
```
Configures the time of the DS1307. This function will also sync the system `time` module with the `ds1307` time.

* `ti` time info class from `time` module. Refer to `time` module for further information.

### Example:
```python
from bsp import board
from components.ds1307 import ds1307

...

rtc = ds1307.DS1307()

rtc.set_time(14, 30, 0, 10, 7, 21, 5)
while True:
    print(rtc.get_time())
    sleep(1000)
```

