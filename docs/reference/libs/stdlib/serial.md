# Serial Ports

### class `serial`

```python
serial(drvname=SERIAL0, baud=115200, stopbits=STOPBIT_1, parity=PARITY_NONE, bitsize=BITSIZE_8, rxsize=0, txsize=0, mode=MODE_UART, flow_ctrl=HW_FLOWCTRL_DISABLE):
```

This class implements a stream that can be used to connect to a serial port.

Initialize the serial port driver identified by `drivername` and starts it up with a baud rate of `baud`.
Additional parameters can be passed such as:

* `parity`: `PARITY_NONE`, `PARITY_EVEN`, `PARITY_ODD`
* `stopbits`: `STOPBIT_1`, `STOPBIT_1_HALF`, `STOPBIT_2`
* `bitsize`: `BITSIZE_5`, `BITSIZE_6`, `BITSIZE_7`, `BITSIZE_8`
* `rxsize` and `txsize`: the size in bytes of the receive and transmit buffers (0 selects the OS default)
* `mode`: `MODE_UART`, `MODE_RS485_HALF_DUPLEX`
* `flow_ctrl`: `HW_FLOWCTRL_DISABLE`, `HW_FLOWCTRL_RTS`, `HW_FLOWCTRL_CTS`, `HW_FLOWCTRL_CTS_RTS`


This is the code needed to print something on the default serial port:

```python
import serial

# create a serial stream linked to SERIAL0 port
ser = serial.serial()

# print will output everything to it if passed as stream
print("Hello World!",stream=ser)
```


### method `available`
```python
available()
```

Returns the number of characters that can be read without blocking.


### method `close`
```python
close()
```

Close the serial port.


### method `write`
```python
write(buffer)
```

Writes the content of buffer to the serial.

`buffer` must be a byte sequence (bytes, bytearray or string).

Returns the number of bytes actually written to the stream (can be less than the elements in `buffer`)


### method `read`
```python
read(size=1)
```

Reads at most `size` bytes from the serial and returns a bytearray with the actual bytes read.

`read` blocks if no bytes are available in the stream.

If `read` returns an empty bytearray the underlying stream can be considered disconnected.


### method `readline`
```python
readline(max_len=256, end="\r\n", with_end=True)
```

Reads a line from the serial, ending with `end` marker string, of `max_len` bytes length, and returns a bytearray with the actual bytes read.

If `with_end` is True, the returning line contains the `end` marker as well.
