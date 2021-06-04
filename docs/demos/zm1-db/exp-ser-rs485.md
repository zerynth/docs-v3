# Interface RS485 with EXP-SER Expansion Board

Serial communication is an increasingly important aspect of embedded systems.
There are a large number of different standards and protocols for serial communication. These range from the very simple to the extremely complicated.

One of the oldest serial interfaces is, generically called, RS-232. Today, it is widely used in embedded computer development systems, scientific instruments, and all sorts of industrial control equipment. The RS-232 connector is best for short-distance low-speed requirements. It is simple and low cost, and plenty of components like line drivers and receivers, UARTs, and other connectors are available to build the interface.

RS485 defines not only a single device-to-device interface, but also a communications bus that can be used to form simple networks of multiple devices. Its configuration and specifications also extend the range and data rate beyond RS-232 interface capabilities. The RS-485 is for higher speeds over longer ranges or if duplex networking capability is required.

The Controller Area Network protocol (CAN or CAN Bus) is a two-wire (twisted-pair), bidirectional serial bus communication method that allows electronic subsystems to be linked together and interact in a network. CAN is a serial bus system used to communicate between several embedded 8-bit and 16-bit microcontrollers. It was originally designed for use in the automotive industry, but is used today in many other systems (e.g. home appliances and industrial machines).

## EXP-SER Expansion board
 
<figure>
  <a data-fancybox="gallery" href="../img/EXP-SER-front.png">
  <img src="../img/EXP-SER-front.png"width="200"/>
  </a>
</figure>

The [EXP-SER expansion board](https://www.zerynth.com/products/hardware/exp-ser/) allows your application to communicate over RS485, RS232, and CAN interfaces, giving communication channels to PCs, devices, boards, or sensors communicating over serial channels.

For more information about the hardware, [please refer to the User Manual.](https://www.zerynth.com/download/20121/)

## Code

In this demo we are going to use the EXP-SER expansion board to communicate with a PC using the RS485 converter. The USB to UART convertor cables have an RS485 level UART converter and offer a quick and simple path connecting to an RS485 interface to USB. 
We will create a simple application that exchanges messages between a PC and ZM1-DB + EXP-SER board. The PC and EXP-SER are wired using the cable which we have already mentioned. 

When the user enters the message via some serial terminal application (e.g. PuTTY), the PC will send that message character by character to the ZM1-DB. ZM1-DB will store the message into the buffer until a special character '\r' is received (Enter typed). Then the ZM1-DB will concatenate the predefined string with the received message and send the content back to the PC. Finally, the message which the PC has received will be displayed inside the serial terminal application.

```python
from bsp import board
from expansions import ser
import serial

board.init()
exp_ser = board.next_expansion(ser, (0,))
ser_rs485 = exp_ser.get_serial(baud=9600, mode=serial.MODE_RS485_HALF_DUPLEX)
ser_rs485.write("Hello Zerynth\r\n")

while True:
    ser_rs485.write("Please type your message!\r\n")
    data = ser_rs485.readline(max_len=32, end="\r", with_end=False)
    ser_rs485.write("You typed: " + data + "\r\n")
```

## More interesting tutorials
Have you checked our Multithreaded firmware demo and our Watchdog demo? [Click here to check them](https://docs.zerynth.com/latest/demos/zerynth-os/multi_thread_basic/)

We hope you enjoyed this new demo. Feel free to join our [community forum](https://community.zerynth.com/) if you have any additional questions.
