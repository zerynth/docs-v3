# Filesystem 

Each Zerynth hardware features an internal flash of at least 16 MB, part of which is reserved for an internal filesystem.
The filesystem module is also capable of handling SD cards formatted with FAT.

The internal filesystem is based on LittleFS, that guarantees wear leveling, bad block detection, and resistance to corruption from power loss or crashes. 

The internal filesystem is automatically mounted to `/zerynth` root at startup.

The internal filesystem can also be automatically formatted and loaded with files or folders when running a project. It can be done by simply adding a `resources` folder into the Zerynth project. All the contents of the folder are packed and transferred into the internal filesystem together with the firmware.


!!! note
    In general the `fs` module do not write immediately to the underlying support. Write operations are guaranteed to be finalized either when the file is close or when an explicit synchronization is manually requested.

## FS Functions

The `fs` module provides many functions for mounting and managing a filesystem. It also provide classes for streamlining operation on files.

### function `mount`
```python
mount(prefix, what=INTERNAL, spiclk=2000000)
```

Mounts a storage device.

* `prefix`: The path to use as mountpoint

* `what`: The device to mount.
Valid values:
* *INTERNAL*: for on-borad flash memory.
* *SD*: for MicroSD card. Only FAT filesystem is supported.

* `spiclk`: The clock in Hz for the SPI bus where the MicroSD is attached to.

Can raise:

* `FSNoSuchMountpointError` 
* `FSCantMountError`
* `FSNoMoreMountpointsError`

All of the above have `IOError` as parent.


### function `unmount`
```python
unmount(prefix)
```

Unmount a storage device.

* `prefix`: The mountpoint to unmount.


### function `open`
```python
open(path, mode)
```

Opens or create a file at `path`.

* `path` is a string (following chosen low-level filesystem driver format).

* `mode` is a string composed by one or more of the following characters:

* 'r'	open for reading (default)
* 'w'	open for writing, truncating the file first
* 'a'	open for writing, appending to the end of the file if it exists
* 'b'	binary mode
* '+'	open a disk file for updating (reading and writing)


Return an instance of `FileIO` or raises `IOError`.

### function `rmdir`
```python
rmdir(path)
```
Remove a directory.

* `path`: is a string referring to the directory to be removed.


### function ` rm`
```python
rm(path)
```

Remove a file.

* `path` is a string referring to the file to be removed.


## The FileIO class

### class `FileIO`
```python
FileIO(path, mode = 'r')
```

Main class to handle files.

* `path` is a string (following chosen low-level filesystem driver format)

* `mode` is a string composed by one or more of the following characters:

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


### method `read_into`
```python
read_into(buf, ofs=0, sz=0)
```

Read bytes from file into `buf` starting from offset `ofs` and reading `sz` bytes.

Return type can be string or bytes depending on chosen mode.

An empty string or an empty bytes object indicate end of file.

Raise `IOError` if `ofs` or `sz` generates overflow.


### method `write`
```python
write(to_w, sync = False)
```

Write `to_w` object (string or bytes) to the stream and return the number of characters written.

* `sync` parameter allows to write changes to disk immediately, without waiting for `close` call.


### method `close`
```python
close()
```

Close file


### method `size`
```python
size()
```

Return file size in bytes

### method `tell`
```python
tell()
```

Return the current stream position.

### method `seek`
```python
seek(offset, whence=SEEK_SET)
```

Move the current position to *offset* bytes with respect to *whence*.

`whence` can be:

* `SEEK_SET`: start of file
* `SEEK_CUR`: current position
* `SEEK_END`: end of file


### method `readline`
```python
readline(max_len=256, end="\r\n", with_end=True):
```

Read until newline or EOF and return a single string. The maximum length of the line is defined by `max_len`.
The characters to be used as end of line are in `end`. The line end character is returned by default together with the line
but this behavior can be controlled by the `with_end` parameter.
If the stream is already at EOF, an empty string is returned.


## Examples

The internal filesystem is always mounted at boot and ready to be used. Put a  `test.txt` file inside the `resources` folder of a project
and test the following.

```python
import fs

while True:

    # read an existing file in read mode
    f = fs.open("/zerynth/test.txt", "r")
    # read it all and print it
    print(f.read()) 
    # close the file
    f.close()

    # create a new file and read it back
    f = fs.open("/zerynth/test02.txt","w")
    f.write("first row: test 01\n")
    f.write("second row: test 02\n")
    f.close()

    f = fs.open("/zerynth/test02.txt", "r")
    print(f.read())
    f.close()

    sleep(5000)


```

Filesystem can also be used on SD cards by simply mounting them.


```python

import fs

while True:
    # mount the sd card under /sd on a 10 MHz SPI bus
    fs.mount("/sd", fs.SD, 10000000)

    # read an existing file
    try:
        f = fs.open("/sd/test.txt", "r")
        print(f.read())
        f.close()
    except Exception as e:
        print("Can't read /sd/test.txt")

    # create a new file and read it back
    f = fs.open("/sd/test02.txt","w")
    f.write("first row: test 01\n")
    f.write("second row: test 02\n")
    f.close()

    f = fs.open("/sd/test02.txt","r")
    print(f.read())
    f.close()

    # Unmount the sd card
    fs.unmount("/sd")

    sleep(5000)
```
