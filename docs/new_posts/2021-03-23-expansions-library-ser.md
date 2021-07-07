---
layout: blog
title: Expansions Library - ser
---
## SER expansion
﻿
### class `EXP`
```python
EXP(position, selectors)
```
Created an object for the expansion board connected to Zerynth ZM1 board at the `position` number, counting from left to right. Valid positions are 1 to 4.
`selectors` is a tuple composed as in the following:
0. Port Expansion (PE) address.
1. Interrupt pin.
﻿
Once the `EXP` object is created, the expansion board can be used from the application by using the `ser` module.
﻿
Both values are integers from 0 to 3.
﻿
### method `summary`
```python
summary()
```
Print the IO expansion summary on the console.

## Example
```python
from expansions import ser
from bsp import board
import can
import serial

def can_transmit(bcan, ch, tx_b, sid):
    try:
        bcan.transmit(ch, tx_b, sid)
    except PeripheralError:
        print("Tx queue is full")

def th_rx_fn(e):
    ser_ser2 = e.get_serial(ser=SERIAL2, mode=serial.MODE_RS485_HALF_DUPLEX)
    while True:
        rx = ser_ser2.readline(end="\n")
        print("rx =", rx)
        sleep(500)

board.init()
sel = (1,)
ser_e = board.next_expansion(ser, sel)
sel2 = (0,)
ser_e2 = board.next_expansion(ser, sel2)

ser_can = ser_e.get_can(D10)
ser_can.conf()
ser_can.txf_conf(1, 5, 1)
ser_can.start()

tx = bytearray()
for i in range(0, 8):
    tx.append(i)

ser_ser1 = ser_e.get_serial(mode=serial.MODE_RS485_HALF_DUPLEX)
t = thread(th_rx_fn, ser_e)

while True:
    board.summary()
    can_transmit(ser_can, 1, tx, 0x300)
    ser_ser1.write("hello\n")
    sleep(1000)
