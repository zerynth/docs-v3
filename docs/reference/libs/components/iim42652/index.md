# IIM42652

[ds]: <http://3cfeqx1hf82y3xcoull08ihx-wpengine.netdna-ssl.com/wp-content/uploads/2021/01/DS-000440-IIM-42652-v1.0.pdf>
_datasheet_: <http://3cfeqx1hf82y3xcoull08ihx-wpengine.netdna-ssl.com/wp-content/uploads/2021/01/DS-000440-IIM-42652-v1.0.pdf>

This module contains the I2C driver for IIM-42652 6-axis SmartIndustrial™ MotionTracking device that supports an extended operating temperature range. The IIM-42652 combines a 3-axis gyroscope (up to ±2000 degrees/sec), and a 3-axis accelerometer (up to ±16g) and features a 2K-byte FIFO that can lower the traffic on the serial bus interface and reduce power consumption by allowing the system processor to burst read sensor data and then go into a low-power mode.

### class IIM42652
```python
IIM42652(drv=I2C0, addr=0x69, clk=1000000)
```
Create an instance of a new IIM-42652 device controlled by I2C.

* `drv` is the I2C drive to use. Default is `I2C0`;
* `addr` is the I2C address of the device. Default is `0x69`;
* `clk` is the I2C clock speed to use. Default is `1000000`.

### method soft_reset
```python
soft_reset()
```
Send a soft reset command to the IIM-42652. This will set all the device registers to the default values.

### method set_drive
```python
set_drive(i2c_sr)
```
Set the desired slew rate for the IIM-42652's I2C. For additional information, see register `DRIVE_CONFIG` on [IIM-42652 datasheet][ds].

* `i2c_sr` is the desired I2C slew rate.

### method setup
```python
setup()
```
Automatically configure the device to work in I2C mode.

### method get_temp
```python
get_temp()
```
Returns the temperature value \[°C\] read form the temperature sensor onboard IIM-42652.

### method get_accel_x
```python
get_accel_x()
```
Returns the last read acceleration value on x axis.

### method get_accel_y
```python
get_accel_y()
```
Returns the last read acceleration value on y axis.

### method get_accel_z
```python
get_accel_z()
```
Returns the last read acceleration value on z axis.

### method get_gyro_x
```python
get_gyro_x()
```
Returns the last read gyroscope value on x axis.

### method get_gyro_y
```python
get_gyro_x()
```
Returns the last read gyroscope value on y axis.

### method get_gyro_z
```python
get_gyro_x()
```
Returns the last read gyroscope value on z axis.

### method set_pwr_cfg
```python
set_pwr_cfg(acc, gyro, idle=0, tmp=0)
```
Set the power configuration of the device. This is required to power up gyroscope and accelerometer. For additional information, see register `PWR_MGMT0` on [IIM-42652 datasheet][ds].

* `acc` is the accelerometer power configuration. Reset value is `0b00`.

    | `acc` | Mode      |
    |-------|-----------|
    | 0b00  | Off       |
    | 0b01  | Off       |
    | 0b10  | Low Power |
    | 0b11  | Low Noise |

* `gyro` is the gyroscope power configuration. Reset value is `0b00`.

    | `gyro` | Mode      |
    |--------|-----------|
    | 0b00   | Off       |
    | 0b01   | Off       |
    | 0b10   | Low Power |
    | 0b11   | Low Noise |

* `idle` set to `1` to keep the RC Oscillator always on. Default value is `0`, reset value is `0`.

* `tmp_dis` set to `1` to disable the temperature sensor. Default value is `0`, reset value is `0`.

### method set_accel_cfg
```python
set_accel_cfg(odr, fs)
```
Set the accelerometer configuration for Output Data Rate and Full Scale. For additional information, see register `ACCEL_CONFIG0` on [IIM-42652 datasheet][ds].

* `odr` is the Output Data Rate. Reset value is `0b0110` (32 kHz).

* `fs` is the Full Scale. Reset value is `0b000` (±16 g).

### method set_gyro_cfg
```python
set_gyro_cfg(odr, fs)
```
Set the gyroscope configuration for Output Data Rate and Full Scale. For additional information, see register `GYRO_CONFIG0` on [IIM-42652 datasheet][ds].

* `odr` is the Output Data Rate. Reset value is `0b0110` (32 kHz).

* `fs` is the Full Scale. Reset value is `0b000` (±2000 degrees/sec).

### method set_fifo_cfg
```python
set_fifo_cfg(accel_en, gyro_en, tmp_en=False, tmst_en=False, hires_en=False, wm_gt_th=False, res_rd=False)
```
Set the fifo configuration to select data saved on the fifo. For additional information, see register `FIFO_CONFIG1` on [IIM-42652 datasheet][ds].

* `accel_en` if set to `True` allows accelerations data of the 3-axis to go to the fifo.

* `gyro_en` if set to `True` allows gyro data of the 3-axis to go to the fifo.

* `tmp_en` if set to `True` allows temperature data to go to the fifo. Default `False`.

* `tmst_en` if set to `True` allows time stamp data to go to the fifo. Default `False`.

* `hires_en` if set to `True` enable the high resolutions data on the fifo. Default `False`.

* `wm_gt_th` if set to `True` enables fifo watermark on every ODR if data on fifo are over watermark. Default `False`.

* `res_rd` if set to `True` allows partial read from the fifo. Reading again will resume from the last byte read. Default `False`

### method fifo_cnt
```python
fifo_cnt()
```
Get the current number of bytes stored on the fifo.

### method set_fifo_mode
```python
set_fifo_mode(mode)
```
Set the mode used by the fifo. For additional information, see register `FIFO_CONFIG` on [IIM-42652 datasheet][ds].

* `mode` is the mode of the fifo. Reset value is `0b00`.

    | `mode` | Mode           |
    |--------|----------------|
    | 0b00   | Bypass         |
    | 0b01   | Stream-to-FIFO |
    | 0b10   | STOP-on-FULL   |
    | 0b11   | STOP-on-FULL   |

### method handle_fifo
```python
handle_fifo(buf)
```
Return a tuple with a packet of measures elaborated from the full fifo buffer. The first byte passed should be the header of the packet. The first value of the returned tuple is the number of bytes used to create the packet.

* `buf` is the buffer to get the first packet from.

Return a tuple with the following fromat.
`( n_bytes, header, measure_1, measure_2, ..., measure_n)`

* `n_bytes` number of bytes that contained the packet.

* `header` is the header of the packet.

* `measure_#` are the measures, depending on the fifo configuration.

### method set_fsync_cfg
```python
set_fsync_cfg(pol, ui_clear_flag, ui)
```
Set the fsync configuration. For additional information, see register `FSYNC_CONFIG` on [IIM-42652 datasheet][ds].

* `pol` is the polarity of the fsync pulse.

* `ui_clear_flag` if set to `1` fysnc flag is cleared when ui sensor register is updated.

* `ui` select the fysnc flag tag.

### method get_fifo
```python
get_fifo(n)
```
Get `n` bytes from the fifo.

* `n` is the number of bytes to get from the fifo.

Returns a `bytearray` with `n` bytes.

### set_signal_path
```python
set_signal_path(fifo_flush, tmst_strobe, abort_n_reset, dmp_mem_rst=False, dmp_init_en=False)
```
Set the signal path reset. For additional information, see register `SIGNAL_PATH_RESET` on [IIM-42652 datasheet][ds].

* `fifo_flush` if set to `True` the fifo is flushed.

* `tmst_strobe` if set to `True` time stamp counter is latched into time stamp register.

* `abort_n_reset` if set to `True` signal path is reset an ODR restarted.

* `dmp_mem_rst` if set to `True` the DMP memory is reset. Default `False`.

* `dmp_init_en` if set to `True` the DMP memory is enabled. Default `False`.

### method set_fifo_decimation
```python
set_fifo_decimation(dec)
```
Set the decimation of data stored on the fifo. If decimation is `5` only one data over 5 will be stored on the fifo.

* `dec` is the decimation to set. Range 0-127.

### method set_fifo_wm
```python
set_fifo_wm(wm)
```
Set the fifo watermark. If fifo counter is higher than the watermark an interrupt can be generated.

* `wm` is the watermark value to set.

### method set_int_cfg
```python
set_int_cfg(int_pin, mode, drive, polarity)
```
Set the interrupt pin configuration. For additional information, see register `INT_CONFIG` on [IIM-42652 datasheet][ds].

* `int_pin`is the pin of IIM42652 to configure.

* `mode` is the mode of the interrupt. `0` for pulsed, `1` for latched.

* `drive` is the drive configuration. `0` open drain, `1` push pull.

* `polarity` is the polarity of the pin. `0` active low, `1` active high.

### method set_int_sources
```python
set_int_sources(int_pin, fifo_full, fifo_ths, ui_acg_rdy=False, ui_drdy=False, reset_done=False, pll_rdy=False, ui_fsync=False)
```
Set sources that can trigger an interrupt on a pin. For additional information, see register `INT_SOURCE0` on [IIM-42652 datasheet][ds].

* `int_pin` is the pin of IIM42652 to configure.

* `fifo_full` if set to `True` interrupt is triggered when fifo is full.

* `fifo_ths` if set to `True` interrupt is triggered when fifo watermark is reached. Default `False`.

* `ui_acg_rdy` if set to `True` interrupt is triggered if UI AGC is ready. Default `False`.

* `ui_drdy` if set to `True` interrupt is triggered if UI data are ready. Default `False`.

* `reset_done` if set to `True` interrupt is triggered if reset is completed. Default `False`.

* `pll_rdy` if set to `True` interrupt is triggered if PLL is ready. Default `False`.

* `ui_fsync` if set to `True` interrupt is triggered if UI fsync is triggered. Default `False`.

### method get_int_status
```python
get_int_status()
```
Returns the interrupt register status. The register tells what triggered the interrupt. For additional information, see register `INT_STATUS` on [IIM-42652 datasheet][ds].

### method set_int_clear_cfg
```pyhton
set_int_clear_cfg(fifo_full, fifo_ths, ui_drdy)
```
Set the method to clear interrupt.

| val  | clear method       |
|------|--------------------|
| 0b00 | Status bit read    |
| 0b01 | Status bit read    |
| 0b10 | Sensor reg read    |
| 0b11 | Both above methods |

For additional information, see register `INT_CONFIG0` on [IIM-42652 datasheet][ds].

* `fifo_full` is the clear method of fifo full interrupt.

* `fifo_ths` is the clear method of fifo watermark threshold interrupt. 

* `ui_drdy` is the clear method of ui data ready interrupt. 