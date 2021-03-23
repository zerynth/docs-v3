---
layout: blog
title: Components - bno055
---
## BNO055 Component

_datasheet_: <https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST_BNO055_DS000_14.pdf>

This module contains the driver for BOSCH BNO055 9-axis Absolute Orientation Sensor. The BNO055 is a System in Package (SiP), integrating a triaxial 14-bit accelerometer, a triaxial 16-bit gyroscope with a range of ±2000 degrees per second, a triaxial geomagnetic sensor.

### class BNO055
```python
BNO055(i2cdrv, addr=0x28, clk=400000)
```
Creates an intance of a new BNO055.

* `i2cdrv`: I2C Bus used '( I2C0, ... )'.
* `addr`: Slave address, default 0x28.
* `clk`: Clock speed, default 400kHz.

### Example:
```python


from components.bno055 import bno055

...

bno = bno055.BNO055(I2C0)
bno.init()
abs_orientation = bno.get_euler()
```
