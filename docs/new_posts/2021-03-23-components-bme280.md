---
layout: blog
title: Components - bme280
---
## BME280 Component

_datasheet_: <https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BME280_DS001-11.pdf>

This module contains the Zerynth driver for Bosch BME280 digital environmental sensor. The unit combine high linearity and accuracy sensors for pressure,
humidity and temperature and is designed for low current consumption, long term sability and high EMC robustness. The BME280 features I2C and SPI digital
interfaces, the present library enables I2C only.

### class BME280
```python
BME280(drvname, addr=0x76, clk=400000)
```
Creates an intance of the BME280 class with given arguments
* `drvname`: I2C Bus used '( I2C0, ... )'.
* `addr`: Slave address, default 0x76.
* `clk`: Clock speed, default 400kHz.

### method setup
```python
setup(mode = 3, os_t = 1, os_h = 1, os_p = 1, t_sb = 6, filter = 1)
```
This method sets the operating mode and the sampling parameters of the module.

* `mode`: Control the operating mode. Sleep mode is entered by default after power on reset. In sleep mode, no measurement are performed and all registers are accessible. In normal mode the sensor cycles between an active measurement period and an inactive standby period. In forced mode a single measurement is perfomed in accordance to the selected measurement and filter options, after which the sensor enter in sleep mode.

======== =====================
        mode        Operating mode
       ======== =====================
        0         Sleep Mode
        1 or 2    Forced Mode
        3         Normal Mode
       ======== =====================
        
   **note**
See pages 12-13 of the _datasheet_ for more details on operating mode and allowed sensor mode transitions.
        
  
* `os_t`: Oversampling setting for temperature sensor, see *os_p* for details on allowed values.
        
* `os_h`: Oversampling setting for humidity sensor, see *os_p* for details on allowed values.
        
* `os_p`: Oversampling setting for pressure sensor.
        
        ======  ===========================
        os_p     Oversampling setting
        ======  ===========================
         0       Skipped (output set to 0)
         1       oversampling 1x
         2       oversampling 2x
         3       oversampling 4x
         4       oversampling 8x
         5       oversampling 16x
        ======  ===========================
        
* `t_sb`: Control the inactive duration t_standby in normal mode.
        
        ====== =====================
        t_sb    t_standby [ms]
        ====== =====================
         0      0.5
         1      62.5
         2      125
         3      250
         4      500
         5      1000
         6      10
         7      20
        ====== =====================
        
* `filter`: Control the time constant of the internal IIR filter. It reduces the bandwidth of the temperature and pressure output signals and increases the resolution of the pressure and temperature output data to 20 bit.
        
        ====== =====================
        filter  Filter coefficient
        ====== =====================
         0      Filter off
         1      2
         2      4
         3      8
         4      16
        ====== =====================

### method get_temp
```python
get_temp()
```
Return the current temperature value in Celsius degree.

### method get_hum
```python
get_hum()
```
Return the current humidity value in %rH.

### method get_press
```python
get_press()
```
Return the current pressure value in Pascal.

### method get_values
```python
get_values()
```
Return a 3-element tuple containing current temperature, humidity and pressure values.

### method soft_reset
```python
soft_reset()
```
Reset the device using the complete power-on-reset procedure.

### method get_status
```python
get_status()
```
Return a two element long tuple representing the status of the sensor. The first element is equal to ``1`` whenever a conversion is running; it is equal to ``0`` when the results have been transferred to the data register. The second and last element of the returned tuple is equal to ``1`` when the non-volatile memory data (calibration parameters) are being copied to image registers; it is equal to ``0`` when the copying is done. The data are copied at power-on-reset and before every conversion.

### method get_chip_id
```python
get_chip_id()
```
Return the device chip id as a single byte integer.

### Example:
Sensor's calibration data are automatically read on object creation and setup method is called with default parameters. Temperature, humidity and pressure values can be easily obtained from the sensor:
```python
from components.bme280 import bme280

...

bme = bme280.BME280(I2C0)
temp, hum, pres = bme.get_values()
```
       
