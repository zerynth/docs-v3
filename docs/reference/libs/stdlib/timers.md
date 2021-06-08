## Software Timers

This module contain the `timers` to handle time and timed events

### class `Timer`
```python
Timer()
```

Creates a new timer.


### method `one_shot`
```python
one_shot(delay, fn, arg=None)
```

Activates the timer in one shot mode. Function `fn(arg)` is executed only once after `delay` milliseconds.


### method `interval`
```python
interval(period, fn, arg=None)
```

Activates the timer in interval mode. Function `fn(arg)` is executed every `period` milliseconds.


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
`Timer.get()`.


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
