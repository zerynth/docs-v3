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

### method get_calibration_status
```python
get_calibration_status()
```

Retrieves the current calibration status of the BNO055 main components:

* System
* Accelerometer
* Gyroscope
* Magnetometer



     **note** Read: 3 indicates fully calibrated; 0 indicates not calibrated.

Returns `[sys_cal_sts, acc_cal_sts, gyro_cal_sts, magn_cal_sts]`

### method get_calibration
```python
get_calibration(raw=False)
```

Retrieves the calibration values of the BMO055 main components (list of 11 elements).
* `raw`: if set to True, returns a list of 22 raw bytes.




Returns `[list of calibration values]`

**note**: List of params:


 1) Accelerometer Offset for X, Y, Z axes (values in m/s²) - list elements 0,1,2;
 2) Magnetometer Offset for X, Y, Z axes (values in uT) - list elements 3,4,5;
 3) Gyroscope Offset for X, Y, Z axes (values in Dps) - list elements 6,7,8;
 4) Accelerometer Radius - list element 9;
 5) Magnetometer Radius - list element 10.


### method set_calibration
```python
set_calibration(data, raw=False)
```
Sets the calibration values of the BNO055 main components.
* `data`: List of values (11 elements) representing the sensors offsets and radius. Data list must follow this order:

      1) Accelerometer Offset for X, Y, Z axes (values in m/s²) - list elements 0,1,2;
      2) Magnetometer Offset for X, Y, Z axes (values in uT) - list elements 3,4,5;
      3) Gyroscope Offset for X, Y, Z axes (values in Dps) - list elements 6,7,8;
      4) Accelerometer Radius - list element 9;
      5) Magnetometer Radius - list element 10. 

* `raw`: If set to True, following rules are required:

      1) data list must have 22 elements;
      2) each element must be a byte (value 0 to 255);
      3) data list must be a sequence of [lsb1, msb1, lsb2, msb2, ..., ...];
      4) data list order is the same described above (elem0 and elem1 of data list
         are respectively lsb and msb of accelerometer offset in x axis). 


### method get_acc
```python
get_acc()
```
Retrieves the current absolute acceleration as a list of X, Y, Z values in m/s²

Returns `[acc_x, acc_y, acc_z]`

### method get_gyro
```python
get_gyro()
```
Retrieves the current gyroscope data reading as a list of X, Y, Z values in degrees per second 

Returns `[gyro_x, gyro_y, gyro_z]`

### method get_magn
```python
get_magn()
```
Retrieves the current magnetometer reading as a list of X, Y, Z values in micro-Teslas.
Returns `[value_magn_x, value_magn_y, value_magn_z]`

### method get_euler
```python
get_euler()
```
Retrieves the current orientation as a list of heading, roll, and pitch euler angles in degrees.

Returns `[abs_or_h, abs_or_r, abs_or_p]`

### method get_lin_acc
```python
get_lin_acc()
```
Retrieves the current linear acceleration (acceleration from movement,
not from gravity) as a list of X, Y, Z values in m/s²

Returns `[lin_acc_x, lin_acc_y, lin_acc_z]`

### method get_grav
```python
get_grav()
```
Retrieves the current gravity acceleration as a list of X, Y, Z values in m/s²

Returns `[grav_x, grav_y, grav_z]`

### method get_quaternion
```python
get_quaternion()
```
Retrieves the current orientation as a list of X, Y, Z, W quaternion values.

Returns `[w, x, y, z]`

### method get_temp
```python
get_temp()
```
Retrieves the current temperature in Celtius.

Returns `temp`









### Example:
```python


from components.bno055 import bno055

...

bno = bno055.BNO055(I2C0)
bno.init()
abs_orientation = bno.get_euler()
```
