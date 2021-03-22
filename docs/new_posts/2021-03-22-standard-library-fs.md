---
layout: blog
title: Standard Library - fs
---
### function `mount`
```python
mount(prefix, what=INTERNAL, spiclk=2000000)
```

Mounts a storage device.

`prefix`: The path to use as mountpoint

`what`: The device to mount.
Valid values:
* *INTERNAL*: for on-borad flash memory.
* *SD*: for MicroSD card. Only FAT filesystem is supported.

`spiclk`: The clock in Hz for the SPI bus where the MicroSD is attached to.


### function `unmount`
```python
unmount(prefix)
```

Unmount a storage device.

`prefix`: The mountpoint to unmount.


### function ` open`
```python
open(path, mode)
```

`path` is a string (following chosen low-level filesystem driver format).

`mode` is a string composed by one or more of the following characters:

* 'r'	open for reading (default)
* 'w'	open for writing, truncating the file first
* 'a'	open for writing, appending to the end of the file if it exists
* 'b'	binary mode
* '+'	open a disk file for updating (reading and writing)


### function ` rmdir`
```python
rmdir(path)
```
Remove a directory.

`path`: is a string referring to the directory to be removed.


### function ` rm`
```python
rm(path)
```

Remove a file.

`path` is a string referring to the file to be removed.


================
The FileIO class
================

### class `FileIO`
```python
FileIO(path, mode = 'r')
```

Main class to handle files.

`path` is a string (following chosen low-level filesystem driver format)

`mode` is a string composed by one or more of the following characters:

* 'r'	open for reading (default)
* 'w'	open for writing, truncating the file first
* 'a'	open for writing, appending to the end of the file if it exists
* 'b'	binary mode
* '+'	open a disk file for updating (reading and writing)


### method `read`
```python
read(n_bytes = -1)
```

Read up to size bytes from the object and return them. As a convenience, if size is unspecified or -1, the whole file is read.

Return type can be string or bytes depending on chosen mode.

An empty string or an empty bytes object indicate end of file.


### method `read`
```python
read(n_bytes = -1)
```

Read up to size bytes from the object and return them. As a convenience, if size is unspecified or -1, the whole file is read.

Return type can be string or bytes depending on chosen mode.

An empty string or an empty bytes object indicate end of file.


### method `write`
```python
write(to_w, sync = False)
```

Write `to_w` object (string or bytes) to the stream and return the number of characters written.

`sync` parameter allows to write changes to disk immediately, without waiting :method:`close` call.


### method `close`
```python
close()
```

Close file stream.


### method `size`
```python
size()
```

Return file size.

### method `tell`
```python
tell()
```

Return the current stream position.

### method `seek`
```python
seek(offset, whence=0)
```

Move the current position to *offset* bytes with respect to *whence*.

`whence` can be:

* 0: start of file
* 1: current position
* 2: end of file


### method `readline`
```python
readline()
```

Read until newline or EOF and return a single string.
If the stream is already at EOF, an empty string is returned.