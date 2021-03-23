---
layout: blog
title: Standard Library - I2C
---
## I2C

This module loads the I2C interface.

The I2C protocol is a multimaster and multislave serial communication protocol that allows sending and receiving data between the microcontroller (MCU) and low-speed peripheral.
I2C needs only two wires, one called SCL functioning as a clock and one called SDA where the actual message bits are transferred.
I2C is a master-slave protocol, therefore a single master takes control of the bus and interacts with peripherals by sending on the bus the address of the peripheral the master wants to communicate with.
It is also possible to have more than one master on the same bus by using an arbitration policy; however, at the moment Zerynth VM supports only a single master protocol version where the microcontroller is the master.
Different versions of the I2C protocol use different clock speed:

* Low-speed: up to 100kHz with 7 bits of peripheral address
* Fast-mode: up to 400kHz, up to 10 bits of peripheral address
* High-speed: up to 3.4 MHz
* Fast-mode plus: up to 1 MHz
* Ultra Fast-mode: up to 5 MHz

Zerynth VM generally supports low-speed and fast-mode if the microcontroller implements those versions.

I2C peripherals are usually implemented as a serial memory, meaning that they expose a list of registers that can be read and/or written. Therefore, for the master to correctly interact with a peripheral, some data must be known:

* peripheral address: 7-bit or 10-bit address, hardwired in the peripheral and reported in the datasheet
* register address: the peripheral memory location to be accessed

The master can perform three actions on the bus:

* read: to access the value of a peripheral register. First, the master gets control of the bus, then the peripheral address is sent. The peripheral sends back the content of a predetermined register. The master releases the bus.
* write: to change the value of a peripheral register. First, the master gets control of the bus, the peripheral address is sent, followed by the register address and the data to be written. The master releases the bus.
* write-read: to exchange data with the peripherals in an atomic call. First, the master gets control of the bus, then the peripheral address is sent, followed by the data to be written (usually the address of a peripheral register). The bus is not released until the peripheral finishes to send its answer.


The I2C protocol provides mechanisms to detect bus errors. Zerynth VM catches bus errors and raises exceptions.

### class `I2c`
```python
I2c(addr, i2c=I2C0, clock=1000000)
```
Creates an `I2C` object to communicate with i2c device at `addr` address on the `i2c` bus number, using the `clock` frequency expressed in Hz.

### method `transmit`
```python
transmit(tx, rx, rx_size, tx_ofs=0, rx_ofs=0, timeout=0)
```

### method `write`
```python
write(tx, ofs=0, timeout=0)
```

### method `read_into`
```python
read_into(rx, size=-1, ofs=0, timeout=0)
```

### method `read`
```python
read(size=-1, timeout=0)
```

### method `write_read_into`
```python
write_read_into(tx, rx, rx_size=-1, tx_ofs=0, rx_ofs=0, timeout=0)
```

### method `write_read`
```python
write_read(tx, rx_size=-1, tx_ofs=0, timeout=0)
```

### function `scan`
```python
scan(i2c=I2C0, start_addr=1, n_scan=126, clock=400000)
```
Performs a scan on the `i2c` bus number, starting from `start_addr` address (right-aligned 7bits) for `n_scan` addresses, using `clock` frequency, expressed in Hz.

Returns a bytearray containing the addresses of discovered devices. E.g.: `[42, 120]` for a bus with two devices having addresses 42 and 120.