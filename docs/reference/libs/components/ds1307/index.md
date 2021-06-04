# BME280

_datasheet_: <https://datasheets.maximintegrated.com/en/ds/DS1307.pdf>

This module implements the Zerynth driver for the Maxim DS1307 RTC.

### class DS1307
```python
DS1307(addr=0x68, drvname=I2C0, clock=400000)
```
Creates an instance of the DS1307 class with given arguments.

* `addr`: Slave address. Default 0x68;

* `drvname`: I2C Bus used. Default I2C0;

* `clk`: Clock speed. Default 400kHz.

### method get_time
```python
get_time()
```
Returns a tuple with the RTC time.

The tuple format is the following: `(hours, minutes, seconds, day, month, year, day_of_week)`.

### method set_time
```python
set_time(hours, minutes, seconds, dat, month, year, day_of_week)
```
Configures the time of the DS1307.

* `hours` are the hours of the day to set expressed in `24` hours format;

* `minutes` are the minutes to set;

* `seconds` are the seconds to set;

* `day` is the day of the month to set;

* `month` is the month of the year to set;

* `year` is the year to set. Must greater or equal than `2000`;

* `day_of_week` is the day of the weak to set. Must be in range from `1` to `7`.

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

