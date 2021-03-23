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

### method init
```python
init(mode=None)
```
Initialize the BNO055 setting the mode value.

* `mode`: Mode value selectable from Mode table (see `set_mode`), if None then "ndof" is used.

### method set_mode
```python
set_mode(mode)
```
Sets the Mode value of the BNO055.
* `mode`: Mode value.

 **note**:The BNO055 provides a variety of output signals, which can be chosen by selecting the appropriate operation mode. The table below lists the different modes and the available sensor signals.

       ========== ============ ========= ========== ========== ===========
                Mode           Available Library Functions     
       ----------------------- -------------------------------------------
       Value      Name         get_acc() get_magn() get_gyro() get_euler()
       ========== ============ ========= ========== ========== ===========
       acc        ACCONLY      Yes       No         No         No  
       magn       MAGONLY      No        Yes        No         No  
       gyro       GYROONLY     No        No         Yes        No 
       accmag     ACCMAG       Yes       Yes        No         No 
       accgyro    ACCGYRO      Yes       No         Yes        No 
       maggyro    MAGGYRO      No        Yes        Yes        No 
       amg        AMG          No        Yes        Yes        No 
       imu        IMU          Yes       No         Yes        Yes
       comp       COMPASS      Yes       Yes        No         Yes
       m4g        M4G          Yes       Yes        Yes        Yes
       ndof_off   NDOF_FMC_OFF No        Yes        Yes        Yes
       ndof       NDOF         Yes       Yes        Yes        Yes
       ========== ============ ========= ========== ========== ===========











### Example:
```python


from components.bno055 import bno055

...

bno = bno055.BNO055(I2C0)
bno.init()
abs_orientation = bno.get_euler()
```
