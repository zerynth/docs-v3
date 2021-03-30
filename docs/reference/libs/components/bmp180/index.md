# BMP180

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

* `oss`: OverSampling Setting value (from 0 to 4), default 0.


### methon set_over_sampling_setting
```python
set_over_sampling_setting(oss)
```


Sets the OverSampling Setting value of the BMP180.

* `oss`: OverSampling Setting value (from 0 to 4 allowed)

 **note** The OverSampling Setting parameter selects different operating modes according to give the possibility for findind the optimum compromise between power consumption, speed, and resolution; in the table below allowed values are reported with related operating modes.

       ========= ===================== ============ =============== ======================
       OSS param     Operating Mode    N of samples Conversion time Avg Current 1 sample/s
       ========= ===================== ============ =============== ======================
           0        Ultra Low Power         1           4.5 ms                3 uA
           1           Standard             2           7.5 ms                5 uA
           2        High Resolution         4          13.5 ms                7 uA
           3     Ultra High Resolution      8          25.5 ms               12 uA
       ========= ===================== ============ =============== ======================


### method get_raw_temp
```python
get_raw_temp()
```
Retrieves the current temperature data from the sensor as raw value.

Returns `raw_t`

### method get_raw_pres
```python
get_raw_pres()
```
Retrieves the current pressure data from the sensor as raw value; according to the OverSampling Setting value this measure can be faster but less accurate or more precise but slower. (see :method:`set_over_sampling_setting()`)

Returns `raw_p`

### method get_temp
```python
get_temp()
```
Retrieves the current temperature data from the sensor as calibrate value in °C.

Returns `temp`

### method get_pres
```python
get_pres()
```
Retrieves the current pressure data from the sensor as calibrate value in Pa; according to the OverSampling Setting value this measure can be faster but less accurate or more precise but slower. (see :func:`set_over_sampling_setting()`)

Returns `pres`

### method get_temp_pres
```python
get_temp_pres()
```
Retrieves the current temperature (in °C) and pressure (in Pa) data from the sensor as calibrate values in one call.

Returns `temp`, `pres`

### method get_altitude
```python
get_altitude()
```
Calculates, from measured pressure, the current altitude data as value in meters.

Returns `altitude`

### method get_sea_level_pres
```python
get_sea_level_pres()
```
Calculates, from measured pressure, the pressure (in Pa) at sea level when given a known altitude in meters.

Returns `p0` (pressure at sea level)




### Example:
```python


from components.bmp180 import bmp180


...


bmp = bmp180.BMP180(I2C0)
bmp.init()
temp, pres = bmp.get_temp_pres()
```
