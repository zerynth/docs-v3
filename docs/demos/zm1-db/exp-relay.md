# Relay Expansion

In this demo we will show how to use the EXP-RELAY for turning on and off a led.

You need:

- a [ZM1-DB](../../hardware/ZM1-Development-Board.md)
- an [EXP-RELAY](../../hardware/EXP-RELAY.md)
- three jumper wires
- a LED

Connect the ZM1-DB to the EXP-RELAY via te ZBus and connect the wires as in the picture:

<figure>
  <a data-fancybox="gallery" href="../img/exp-relay-00.png">
  <img src="../img/exp-relay-00.png" />
  </a>
  <figcaption>Wiring and selectors of EXP-RELAY</figcaption>
</figure>

For controlling the LED with the relay, it is necessary to interrupt the circuit using the common (`COM1`) and normally open (`NO1`) contacts:

- connect a wire (blue) from the `NO1` contact of the relay to `GND` pin of the ZBus
- connect a wire (white) from contact `COM1` of the relay to the cathode of the LED
- connect a wire (red) from the anode of the LED to the 3.3V contact of the ZBus

In VSCode, create a new project and paste the following code into `main.py`:


```python
from bsp import board
from expansions import relay

# Initialize board
board.init()
# Pass te rotative switch selector position
# address = 0x11
relay_sw_sel = (1,)
# Add the EXP-RELAY to the board
# All pin of the EXP-RELAY will be initialized correctly
exp = board.next_expansion(relay, relay_sw_sel)

REL1 = exp.OUT1

# Use gpio api to turn the led on and off
while True:
    print("Toggling relay 1")
    # Switch relay state
    if exp.is_relay_on(REL1):
        exp.relay_off(REL1)
    else:
        exp.relay_on(REL1)
    # Sleep 3 seconds
    sleep(3000)

```

The code above configures the EXP-RELAY by attaching a new expansion to the board passing the correct selectors.
It then starts a loop  that every 3 seconds toggle the relay from `NO1` to `NC1`.

The expected output is:

```bash

Toggling relay 1
Toggling relay 1
Toggling relay 1

```

