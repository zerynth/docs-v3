# Serial Expansion

In this demo we will show how to use the EXP-SER for writing and reading to RS232

You need:

- a [ZM1-DB](../../hardware/ZM1-Development-Board.md)
- an [EXP-SER](../../hardware/EXP-SER.md)
- one jumper wire


Connect the ZM1-DB to the EXP-SER via te ZBus and connect the wire as in the picture:

<figure>
  <a data-fancybox="gallery" href="../img/exp-ser-00.png">
  <img src="../img/exp-ser-00.png" />
  </a>
  <figcaption>Wiring and selectors of EXP-SER</figcaption>
</figure>

`TXD` is connected to `RXD` creating a loopback. Moreover rotative switch 1 should be
positioned at position 0.


In VSCode, create a new project and paste the following code into `main.py`:


```python
from bsp import board
from expansions import ser
import serial

board.init()
# Pass the rotative switch selector position
# address = 0x11, interrupt = INTR
ser_sw_sel = (0, )

# Add the EXP-SER to the board
# All pin of the EXP-SER will be initialized correctly
exp_ser = board.next_expansion(ser, ser_sw_sel)

# Open SERIAL1 with default parameters
ser1 = serial.serial(SERIAL1)

while True:
    # Write to SERIAL1
    ser1.write("Hello Zerynth\n")
    # Write to Console
    print(">> Hello Zerynth")
    # Check available bytes on SERIAL1
    n = ser1.available()
    if n > 0:
        # Read from SERIAL1
        msg = ser1.read(n)
        # Write to Console
        print("<<",msg)
    sleep(1000)
```

The code above configures the EXP-SER by attaching a new expansion to the board passing the correct selectors.
It then opens the SERIAL1 connected to the RS232 interface on the EXP-SER.
In the loop, it writes and reads on the RS232 printing also on the default console.

The expected output is:

```bash
>> Hello Zerynth
<< Hello Zerynth

>> Hello Zerynth
<< Hello Zerynth

>> Hello Zerynth
<< Hello Zerynth

>> Hello Zerynth
<< Hello Zerynth

```



