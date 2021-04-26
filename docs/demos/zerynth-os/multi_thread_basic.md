# Multi Thread Basic

The basic demonstration of Zerynth multi-threading. Two threads are running in parallel, each thread toggle the LED and at same time print the message about which thread toggle the LED and polarity of the GPIO pin.

More information about modules used in this demo:

- [Threading](../reference/libs/stdlib/threading.md)
- [GPIO](../reference/libs/stdlib/gpio.md)
- [Serial](../reference/libs/stdlib/serial.md)

```python
import gpio

# Print initial message.
print("Hello Multi-Threading!")

def thread_1():
    while True:

        # Toggle appropriate first pin from infinite loop.
        print("Thread 1 - Drive Pin HIGH")
        gpio.set(LED_BLUE, HIGH)
        sleep(1000)
        print("Thread 1 - Drive Pin LOW")
        gpio.set(LED_BLUE, LOW)
        sleep(1000)

def thread_2():
    while True:

        # Toggle appropriate second pin from infinite loop.
        print("Thread 2 - Drive Pin HIGH")
        gpio.set(LED_RED, HIGH)
        sleep(300)
        print("Thread 2 - Drive Pin LOW")
        gpio.set(LED_RED, LOW)
        sleep(300)

# Start both threads.
thread(thread_1)
thread(thread_2)
```
