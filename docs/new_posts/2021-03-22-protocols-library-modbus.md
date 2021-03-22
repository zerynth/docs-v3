---
layout: blog
title: Protocols Library - Modbus
---
## MODBUS Library

To talk with a slave device an object of type ModbusTCP or ModbusSerial must be initialized, depending on what kind of communication is needed.

If serial communication is used, a device object that implements write, read and close methods is needed. The device object can be created with `serial` class.

When a connection with a slave device has been established, coils and registers can be accessed with the methods in each class.

## ModbusTCP class

### class `ModbusTCP`
```python
ModbusTCP(identifier)
```

Create an instance of the ModbusTCP class which allow modbus communication with slave device using TCP.

`identifier`: The slave device identifier, used in the header of every packet.


### method `read_coils`
```python
read_coils(address, n)
```

`address`: The starting address
`n`: the number of coils to read from address


Read the status of `n` coils, starting from `address`.

Returns:
a python list containing the values of the coils.


### method `read_input`
```python
read_input(address, n)
```

`address`: The starting address
`n`: the number of input register to read, starting from `address`

Returns:
a python list containing the values of the input registers


### method `read_holding`
```python
read_holding(address, n)
```

`address`: The starting address
`n`: the number of holding register to read, starting from `address`

Returns:
a python list containing the values of the holding registers


### method `read_discrete`
```python
read_discrete(address, n)
```

`address`: The starting address
`n`: the number of discrete register to read, starting from `address`

Returns:
a python list containing the values of the discrete registers


### method `write_coil`
```python
write_coil(address, n)
```

`address`: the address of the coil
`value`: the new value

Returns:
1 if the write has been successfull. Otherwhise an exception will be thrown


### method `write_register`
```python
write_register(address, n)
```

`address`: the address of the register
`value`: the new value

Returns:
1 if the write has been successfull. Otherwhise an exception will be thrown


### method `write_multiple_registers`
```python
write_multiple_registers(address, n, values)
```

`address`: the address of the first holding register
`n`: the number of registers
`value`: a python list containing the new values

Returns:
the number of holding registers written


### method `connect`
```python
connect(address, [port = 502])
```

`address`: the ip address of the slave device
`port`: port on which the slave device is listening to


### method `close`
```python
close()
```

Closes the connection with the slave device


## ModbusSerial class

### class `ModbusSerial`
```python
ModbusSerial(identifier, serial_device)
```
Create an instance of the ModbusSerial class which allow modbus communication with slave device using RTU.

`identifier` The slave device identifier

`serial_device` an object representing the device. It must implement read, write and close methods to communicate with the serial port. See the `serial` class.

`receive_timeout` timeout on the receiving function;

`receive_wait` time to wait before reading from serial


### method `read_coils`
```python
read_coils(address, n)
```

`address` The starting address
`n` the number of coils to read from address


Read the status of `n` coils, starting from `address`.

Returns:
a python list containing the values of the coils.


### method `read_input`
```python
read_input(address, n)
```

`address` The starting address
`n` the number of input register to read, starting from `address`

Returns:
a python list containing the values of the input registers


### method `read_holding`
```python
read_holding(address, n)
```

`address` The starting address
`n` the number of holding register to read, starting from `address`

Returns:
a python list containing the values of the holding registers


### method `read_discrete`
```python
read_discrete(address, n)
```

`address` The starting address
`n` the number of discrete register to read, starting from `address`

Returns:
a python list containing the values of the discrete registers


### method `write_coil`
```python
write_coil(address, n)
```

`address` the address of the coil
`value` the new value

Returns:
1 if the write has been successful. Otherwise an exception will be thrown


### method `write_register`
```python
write_register(address, n)
```

`address` the address of the register
`value` the new value

Returns:
1 if the write has been successful. Otherwise an exception will be thrown


### method `write_multiple_coils`
```python
write_multiple_coils(address, n, values)
```

`address` the address of the first coil
`n` the number of coils
`value` a python list containing the new values

Returns:
the number of coils written


### method `write_multiple_registers`
```python
write_multiple_registers(address, n, values)
```

`address` the address of the first holding register
`n` the number of registers
`value` a python list containing the new values

Returns:
the number of holding registers written


### method `close`
```python
close()
```

Close the serial port by calling the `close()` function implemented by the device associated class.
