---
layout: blog
title: Standard Library - time
---
## Time

### function set
```python
set(timestamp)
```
Sets the system time to `timestamp` seconds since unix epoch.

### function `time`
```python
time()
```
Returns a float where the integer part is the seconds and the fractional part are microseconds since unix epoch.

### function `now`
```python
now()
```
Returns an integer with seconds since unix epoch.

### function `is_sync`
```python
is_sync()
```
Return *True* if the system time has been synchronized since system (re)start. *False* otherwise.

### function `last_sync`
```python
last_sync()
```
Returns the seconds elapsed since last sync.

### function `time_ns`
```python
time_ns()
```
Returns a float where the integer part is the seconds and the fractional part are nanoseconds since unix epoch.

### function `millis`
```python
millis()
```
Returns the milliseconds elapsed since system (re)start.

### function `settime`
```python
settime(ti)
```
Sets the system date and time to `ti` TimeInfo object.

### function `localtime`
```python
localtime()
```
Returns a TimeInfo object with current system date and time.

### class `TimeInfo`
```python
TimeInfo()
```
Class used to store a broken-down time value (as in `struct tm`) as defined by POSIX.1-2001.

### method `to_tuple`
```python
to_tuple()
```
Returns a tuple with the broken-down time elements.

### method `from_tuple`
```python
from_tuple(t)
```
Sets the object time to the `t` broken-down time tuple.

### Broken-down time
A broken-down time is a tuple with the following elements:

0. year                                                    
1. month                                                     
2. month day                                                    
3. hour                                                    
4. minutes                                                     
5. seconds                                                     
6. week day                                                    
7. year day                                                    
8. whether it is daylight saving time: *True*, or not: *False*                                                  
9. whether the Greenwich Mean Time if off: *True*, or not: *False*                                                  
10. seconds since epoch                                                
11. microseconds since epoch 
