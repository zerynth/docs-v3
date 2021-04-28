# IO Expansion

In this demo we will show how to use the EXP-IO for reading analog values generated  by a PWM signal.

You need:

- a [ZM1-DB](../../hardware/ZM1-Development-Board.md)
- an [EXP-IO](../../hardware/EXP-IO.md)
- two jumper wires


Connect the ZM1-DB to the EXP-IO via te ZBus and connect the wires as in the picture:

<figure>
  <a data-fancybox="gallery" href="../img/exp-io-00.png">
  <img src="../img/exp-io-00.png" />
  </a>
  <figcaption>Wiring and selectors of EXP-IO</figcaption>
</figure>

`TX1` is connected to `AIN1+` while `GND` is connected to `AIN-`. Moreover rotative switch 1 should be
positioned at position 1, while the second at position 0.


In VSCode, create a new project and paste the following code into `main.py`:

```python
from bsp import board
from expansions import io
import pwm
import adc

board.init()
# Pass the rotative switch selector position
# address = 0x11, interrupt = INTR
io_sw_sel = (1, 0)

# Add the EXP-IO to the board
# All pin of the EXP-IO will be initialized correctly
exp_io = board.next_expansion(io, io_sw_sel)

# Start PWM on ZBus TX1 pin
pwm.write(TX1, 8, 4)

# falling/rising wave front threashold
thres = 2350
    
while True:
    # read 120 samples in 
    values = adc.read(exp_io.AIN1, 120, 1000)
    # Analyze results finding min/max and falling/rising wave fronts
    mmin = None
    mmax = None
    status_high = values[0] > thres
    fall = 0
    rise = 0
    for element in values:
        if status_high and element < thres:
            fall +=1
            status_high = 0
        elif (not status_high) and element > thres:
            rise +=1
            status_high = 1
        if mmin is None:
            mmin = element
            mmax = element
        else:
            if element<mmin:
                mmin = element
            if element > mmax:
                mmax = element
    print(mmax-mmin, mmin, mmax, fall, rise)

```

The code above configures the EXP-IO by creating attaching a new expansion to the board passing the correct selectors.
It then starts a PWM wave of 8 milliseconds period with a 4 milliseconds duty.
In the loop it then uses the `adc` module to read from the expansion analog channel 1 (`AIN1`) 120 samples that are 
subsequently analyzed to calculate minimum and maximum values together with the number of rising and falling wave fronts.

The expected output is:

```bash

662 2050 2712 15 15
662 2050 2712 15 15
662 2050 2712 14 15
662 2050 2712 15 14
662 2050 2712 15 15
662 2050 2712 15 15
662 2050 2712 15 15

```


