---
layout: blog
title: Standard Library - SPI
---
## SPI

This module loads the Serial Peripheral Interface (spi).

The connection between a spi peripheral (sensor, actuator, etc..) and the microcontroller is made
via  four wires with different functions as in the following schema:

          MCU                                    Peripheral
     _____________                                ________
    |             |                              |        |
    |             |______________________________|        |
    |             |             SCLK             |        |
    |             |______________________________|        |
    |             |             MOSI             |        |
    |             |______________________________|        |
    |             |             MISO             |        |
    |             |______________________________|        |
    |_____________|              CS              |________|


One of the connected components is in charge of deciding the parameters of the connection and is the one starting
and stopping data transfers. Such component is aptly called *Master* whereas all the other connected components (the spi interface
is engineered to connect a master to more than one slave) are called *Slaves*.

The master decides the speed of the connection by sending a clock signal on the SCLK wire, transmits data to the slave
by encoding bits on the MOSI wire (Master Out Slave In), and receives data by reading bits on the MISO wire (Master In Slave Out).

Since many slaves can be connected to a single master, the wire CS (Chip Select, but also called SS, Slave Select) is used
to signal a particular slave that the connection is going to start and the transmitted data is addressed at it. One CS wire is needed
for ever connected slave.

The master also decides some low level details of the communication, namely the bit width and the polarity/phase.
The bit width is simply the number of bits to be sent per frame. The polarity and phase of the clock are somewhat more
difficult to understand also because the naming of the polarity and phase setting often differs between chip producers.

Refer to the following clock schema:

              _________            _________            _________
             |         |          |         |          |         |
      LOW    |         |          |         |          |         |  SCLK0
     ________|         |__________|         |__________|         |___


     ________           __________           __________           ___
             |         |          |         |          |         |
      HIGH   |         |          |         |          |         |  SCLK1
             |_________|          |_________|          |_________|

             1         2          1         2          1         2

    MISO0     <--------------------><-------------------><------------------->


    MISO1               <--------------------><-------------------><------------------->

The master needs to set the SCLK polarity, namely the idle status of the SCLK line. If polarity is low,
it means the SCLK signal starts LOW (SCLK0 in the schema), whereas if polarity is high the SCLK signal starts
HIGH (SCLK1 in the schema). Often the polarity of a peripheral is reported as CPOL in the data sheets, with CPOL=0 low polarity
and CPOL=1 high polarity.
Once the polarity is decided, signals in the MISO and MOSI lines can be transmitted in two different ways: with bits
starting at the first transition of SCLK (such as MISO0) or at the second transition of SCLK (such as MISO1). This setting is called phase,
and it is often reported as CPHA in the datasheet, with CPHA=0 meaning first transition and CPHA=1 meaning second transiton.

Finally, MISO and MOSI lines are synchronous, i.e. data is transmitted in a full duplex manner: the slave can send data
to the master while it is receiving data from the master. Therefore, spi operations can be divided in:

* `write`: the master sends data over MOSI and ignores what the slave sends over MISO
* `read`: the master reads data from MISO and writes nothing on MOSI
* `skip`: the master activates SCLK but neither reads or writes
* `exchange`: the master sends data over MOSI and at the same time receives data from MISO

### Constants
The module defines the following constants:
```
SPI_MODE_LOW_FIRST   = 0
SPI_MODE_LOW_SECOND  = 1
SPI_MODE_HIGH_FIRST  = 2
SPI_MODE_HIGH_SECOND = 3
```
used for the SPI bus modes.

`SPI_MODE_LOW_FIRST`: Low polarity (idle low), phase zero (bits captured on the first clock edge)

`SPI_MODE_LOW_SECOND`: Low polarity (idle low), phase one (bits captured on the second clock edge)

`SPI_MODE_HIGH_FIRST`: High polarity (idle high), phase zero (bits captured on the first clock edge)

`SPI_MODE_HIGH_SECOND`: High polarity (idle high), phase one (bits captured on the second clock edge)


### class `Spi`
```python
Spi(nss, spi=SPI0, clock=20000000, mode=SPI_MODE_LOW_FIRST)
```
Creates a `Spi` object to communicate with devices on the SPI bus.

`nss` is the SPI device select pin, can be either the gpio number, or the gpio symbolic name defined into `board` from `bsp`.

`spi` is the SPI bus number to be used.

`clock` is the bus clock expressed in Hz.

`mode` is the bus communication mode.

### method `select`
```python
select()
```
Selects the configured SPI device in order to write and or read data from it.

### method `unselect`
```python
unselect()
```
Deselect the SPI device.

### method `exchange_into`
```python
exchange_into(tx, rx, n_bytes=-1)
```
Performs a write followed by read operations on the SPI bus with selected device.

`tx` is the buffer containing the data to write on the bus, as bytearray.

`rx` is the buffer will be filled with read data from the selected SPI device, as bytearray.

`n_bytes` is the max number of bytes to read from the device. If `-1` the `rx` bytearray length is used. It must be less than or equal to the length of `rx` bytearray, otherwise an `ErrorValue` exception is thrown.


### method `exchange`
```python
exchange(tx, n_bytes=-1)
```

### method `write`
```python
write(tx, n_bytes=-1)
```

### method `read`
```python
read(n_bytes)
```

### method `done`
```python
done()
```
