# Hello Zerynth

The simplest demo which uses serial port and GPIO to toggle the LED. After the initialization it prints "Hello Zerynth" message using the serial port, then inside the infinite loop, it toggles the GPIO pins and in the same time prints the polarity of the pins. For more information about pinout for your development board navigate to Device Pinmap using Zerynth Studio.

More information about modules used in this demo:

- [GPIO](../../libs/stdlib/gpio.md)

```python
from bsp import board
import gpio


# Print initial message.
print("Hello Zerynth!")

# Infinite loop.
while True:

    print("Drive Pins HIGH")
    gpio.set(LED_BLUE,1)
    sleep(1000)

    print("Drive Pins LOW")
    gpio.set(LED_BLUE,0)
    sleep(1000)
```
