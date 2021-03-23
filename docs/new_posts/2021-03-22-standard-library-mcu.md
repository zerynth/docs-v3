---
layout: blog
title: Standard Library - mcu
---
## MCU

This module enables the access to low level microcontroller functionalities like:

* unique identifiers
* soft reset


### function `reset_registers`
```python
reset_registers()
```

Returns the code related to last board reset reason.


### function `reset`
```python
reset()
```

Restarts the microcontroller.


### function `uid`
```python
uid()
```

Returns a bytes object containing the unique id of the mcu.


### function ` info`
```python
info()
```

Returns a tuple with Zerynth target and Zerynth SDK version.


### function ` reset_on_exception`
```python
reset_on_exception(default=True)
```

Sets the Zerynth board to reset on python exception.


### function ` reset_on_outofmemory`
```python
reset_on_outofmemory(default=True)
```

Sets the Zerynth board to reset on out of RAM memory.
