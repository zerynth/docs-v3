## PWM

This module loads the Pulse Width Modulation (pwm) driver of the embedded device.

### function `write`
```python
write(pin, period, pulse, time_unit=MILLIS)
```

Activate PWM (Pulse Width Modulation) on pin `pin`. Up to 4 PWM can be active at the same time.
The state of *pin* is periodically switched between ``LOW`` and ``HIGH`` according to parameters:

* `period` is the duration of a pwm square wave
* `pulse` is the time the pwm square wave stays in the ``HIGH`` state
* `time_unit` is the unit of time *period* and *pulse* are expressed in. Can be `NANOS`, `MICROS` or `MILLIS`.

To disable a pwm pass `0` as`period` and `0` as `pulse`.
A PWM wave can be depicted as a train of elements made like this:

```
        HIGH  _________________          _________________
             |                 |        |                 |
             |                 |        |                 |
        _____|                 |________|                 |____ LOW

             <-----PULSE------>
             <-----PERIOD-------------->
```

The PWM driver automatically chooses the right setup to allow the highest possible resolution of the duty cycle over the desired period. The number of bits (1 to 20) of resolution for a given period `T` (in seconds) is calculated with the following formula, truncated to the integer result:
```math
N_bits = log(APB_CLOCK*T)/log(2)
```
with `APB_CLOCK = 80000000 Hz`.

The relation between period and frequency is:
```math
T = 1/FREQ
```

In the table below are reported some examples of PWM resolutions for a given period.
| Period | Frequency | N Bits | Resolution |
|--------|-----------|--------|------------|
| 25 ns  | 40 MHz    | 1      | 1/2        |
| 50 ns  | 20 MHz    | 2      | 1/4        |
| 10 ns  | 10 MHz    | 3      | 1/8        |
| 25 µs  | 40 kHz    | 10     | 1/1024     |
| 50 µs  | 20 kHz    | 11     | 1/2048     |
| 100 µs | 10 kHz    | 12     | 1/4096     |
| 1 ms   | 1 kHz     | 16     | 1/65536    |
| 10 ms  | 100 Hz    | 19     | 1/524288   |
| 100 ms | 10 Hz     | 20     | 1/1048576  |
| 500 ms | 2 Hz      | 20     | 1/1048576  |

**note**: To ensure that the PWM works correctly on a specific board, please select pins labelled as PWM on the board pin-map. The correct behavior of the PWM is not guaranteed on pins not labeled as PWM.

Here are some examples:

```python
#Remember to import the pwm module
import pwm

# A 1000 milliseconds wave that stays HIGH for 100 milliseconds and LOW for 900
pwm.write(D5,1000,100)

# A 500 microseconds wave that stays HIGH for 10 microseconds and LOW for 490
pwm.write(D5,500,10,MICROS)

# Disable pwm
pwm.write(D5,0,0)
```


