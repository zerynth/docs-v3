---
layout: blog
title: Standard Library - serial
---
The serial class
================

### class `serial`
```python
serial(drivername=SERIAL0, baud=115200, stopbits=STOPBIT_1, parity=PARITY_NONE, bitsize=BITSIZE_8, set_default=True, rxsize=0, txsize=0)
```

This class implements a stream that can be used to connect to a serial port.
It inherits all of its methods from :class:`stream`.

Initialize the serial port driver identified by `drivername` and starts it up with a baud rate of `baud`.
Also, if `set_default` is True, sets itself as the default stream used by :func:`__builtins__.print`.
This means that the serial stream will be the system default one.
Additional parameters can be passed such as:
* `parity`: :samp:`PARITY_NONE` , :samp:`PARITY_EVEN` , :samp:`PARITY_ODD`
* `stopbits`: :samp:`STOPBIT_1` , :samp:`STOPBIT_1_HALF`, :samp:`STOPBIT_2`
* `bitsize`: :samp:`BITSIZE_5` , :samp:`BITSIZE_6` , :samp:`BITSIZE_7` , :samp:`BITSIZE_8`
* `rxsize` and `txsize`: the size in bytes of the receive and transmit buffers (0 selects the board default)

Not all of the additional parameters are always supported by the underlying device.

This is the code needed to print something on the default serial port:

```python
# import the streams module
import streams

# create a serial stream linked to SERIAL0 port
streams.serial()

# SERIAL0 is automatically selected as the default system stream,
# therefore print will output everything to it
print("Hello World!")
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

Close the stream linked to the underlying serial port.


### method `write`
```python
write(buffer)
```

Writes the content of buffer to the stream.

`buffer` must be a byte sequence (bytes, bytearray or string).

Returns the number of bytes actually written to the stream (can be less than the elements in `buffer`)


### method `read`
```python
read(size=1)
```

Reads at most `size` bytes from the stream and returns a bytearray with the actual bytes read.

`read` blocks if no bytes are available in the stream.

If `read` returns an empty bytearray the underlying stream can be considered disconnected.


### method `readline`
```python
readline(max_len=256, end="\r\n", with_end=True)
```

Reads a line from the stream, ending with `end` marker string, of `max_len` bytes length, and returns a bytearray with the actual bytes read.

If `with_end` is True, the returning line contains the `end` marker as well.