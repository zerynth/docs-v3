---
layout: blog
title: Components - bmp180
---
## BMP180 Component

_datasheet_: <https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BMP180-DS000-121.pdf>

This module contains the driver for BOSCH BMP180 Digital Barometric Pressure Sensor. The ultra-low power, low voltage electronics of the BMP180 is optimized for use in mobile devices and the I2C interface allows for easy
system integration with a microcontroller. The BMP180 is based on piezo-resistive technology for EMC robustness, high accuracy and linearity as
well as long term stability.

### class BMP180
```python
BMP180(i2cdrv, addr=0x77, clk=400000)
```
Creates an intance of a new BMP180 class with given argument.

* `i2cdrv`: I2C Bus used '( I2C0, ... )'
* `addr`: Slave address, default 0x77
* `clk`: Clock speed, default 100kHz

### method init
```python
init(oss=0)
```

Initialize the BMP180 calibrating the sensor and setting the oss value.

        :param oss: OverSampling Setting value (from 0 to 4), default 0





### Example:
```python


from bosch.bmp180 import bmp180


...


bmp = bmp180.BMP180(I2C0)
bmp.init()
temp, pres = bmp.get_temp_pres()
```