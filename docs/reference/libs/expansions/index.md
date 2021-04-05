# Introduction

Zerynth [hardware offer](../../../hardware/index.md) spans from development boards, to acquisition units and SoC modules.

Whatever the hardware, the way of programming it with the SDk is always the same: a **board support package** (`bsp`) is imported in the firmware and it automatically configures the OS and the peripherals with the defaults of that specific hardware.

## The `bsp` modules

The `bsp` always contains at least one module called `board`. The `board` module always contains the following functions:

* `init()`, initializes the hardware bringing it to a known initial state. Should be always called at the beginning of the firmware
* `summary()`, prints some information about the hardware and its configuration
* `next_expansion(e, selectors=None)`, configure the hardware by adding an Expansion (see below)
* `expansions_on()`, power on the expansions
* `expansions_off()`, power off the expansions

## Z-Bus and the Expansions

Zerynth development boards all support the Z-Bus standard for adding expansions. The expansions can then be managed by the firmware in a straightforward way.

Expansions are added one after the other from left to right and are numbered from 1 to 4.

By calling the `next_expansion` function multiple times, the programmer can configure the type and position of each expansion. The first call sets up position 1, the second position 2 and so on. 
For each expansion the programmer must also pass the list of selectors of that expansion. Selectors are the rotative elements or switches that can be present on an expansion and that are needed to configure some hardware parameters (i.e. I2C addresses or pin functions).

There are some hardware constraints that must be respected with expansions, for example they all must have the various selectors in different positions to avoid a clash of addresses in the I2C bus they use for functioning. 

An example is worth a thousand words:

```python
# Let's configure a firmware for a board with two expansions on the Z-Bus
from bsp import board
# EXP-IO and EXP-RELAY are used
from expansions import io, relay

# Let's init the board
board.init()
# Now let's add the first expansion, the EXP-IO
# the selector are 1 and 0 meaning that the first rotative is in position 1, while the second in position 0
board.next_expansion(io, (1, 0))
# Now let's add the first expansion, the EXP-RELAY
# There is only one selector in the RELAY and it must be set to a value different that the first selector of the IO
# Let's set it to two
board.next_expansion(relay, (2, )) # notice the comma, it is needed for a one argument tuple!

# Print the configuration
board.summary()

```

The expansions add usable names to the firmware. For example the EXP-IO adds all the labels found in the schematics for the various digital and analog gpois (`OUT1`, `OUT2`, `OUT3`, `OUT4`, `AIN1`, `AIN2`, `DIN1`, `DIN2`), while EXP-RELAY adds `OUT1` to `OUT6`. Once the board and expansions are configured the additional names and expansion functions can be used like this:

```python
import gpio 

# Toggle OUT1 of the EXP-IO in position 1 
gpio.toggle(board[IO1].OUT1)
# Toggle OUT1 of the EXP-RELAY in position 2
gpio.toggle(board[RELAY2].OUT4)


```

The above syntax is very simple. Just access the `board` module as if it was a dictionary using as key the name of the expansion and it's position. Alternatively, the configured expansion can be returned by `next_expansion` and used directly, like this:

```python

# get the configure exp_io
exp_io = board.next_expansion(io, (1, 0))
# use it regardless of the position
gpio.toggle(exp_io.OUT1)

```

