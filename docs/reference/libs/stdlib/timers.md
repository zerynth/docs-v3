## Software Timers

This module contain the `timer` to handle time and timed events


### function `now`
```python
now()
```

Return the number of milliseconds since the start of the program.


### class `timer`
```python
timer()
```

Creates a new timer.


### method `one_shot`
```python
one_shot(delay, fun, arg=None)
```

Activates the timer in one shot mode. Function `fun(arg)` is executed only once after `delay` milliseconds.


### method `interval`
```python
interval(period, fun, arg=None)
```

Activates the timer in interval mode. Function `fun(arg)` is executed every `period` milliseconds.


### method `clear`
```python
clear()
```

Disable the timer.


### method `destroy`
```python
destroy()
```

Disable the timer and kills it.


### method `start`
```python
start()
```

Start the timer. A started timer begins counting the number of passing milliseconds. Such number can be read by calling
`timer.get()`.


### method `reset`
```python
reset()
```

Reset the timer. A reset timer restarts counting the number of passing milliseconds from zero.

Returns the number of milliseconds passed since the start or the last reset.


### method `get`
```python
get()
```

Return the number of milliseconds passed since the start or the last reset.
