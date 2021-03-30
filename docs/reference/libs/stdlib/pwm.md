---
layout: blog
title: PWM
---
## PWM

This module loads the Pulse Width Modulation (pwm) driver of the embedded device.

When imported, automatically sets the system pwm driver to the default one.


### function `write`
```python
write(pin, period, pulse, time_unit=MILLIS)
```

Activate PWM (Pulse Width Modulation) on pin `pin` (must be one of the PWMx pins, expressed as Dx.PWM). The state of *pin* is periodically switched between ``LOW`` and ``HIGH`` according to parameters:

* `period` is the duration of a pwm square wave
* `pulse` is the time the pwm square wave stays in the ``HIGH`` state
* `time_unit` is the unit of time *period* and *pulse* are expressed in


A PWM wave can be depicted as a train of elements made like this:

```
        HIGH  _________________          _________________
             |                 |        |                 |
             |                 |        |                 |
        _____|                 |________|                 |____ LOW

             <-----PULSE------>
             <-----PERIOD-------------->
```

Here are some examples:

```python
#Remember to import the pwm module
import pwm

# A 1000 milliseconds wave that stays HIGH for 100 milliseconds and LOW for 900
pwm.write(D5.PWM,1000,100)

# A 500 microseconds wave that stays HIGH for 10 microseconds and LOW for 490
pwm.write(D5.PWM,500,10,MICROS)

# Disable pwm
pwm.write(D5.PWM,0,0)
```


