# Temperature and Humidity monitoring with EXP-PROTO

Prototyping is a crucial step in the development cycle of every tech product. The market is full of different components with varying costs, features and performance. Important decisions have to be made during the prototyping process depending on the scope, budget, development time, and suggested retail price.

Fixing bugs or even making changes in the hardware design during later phases of the project can be very expensive. Hence, the EXP-PROTO expansion board enables fast and stable prototyping of components, ICs, devices and microcontrollers saving the developer time and money. All connections are connected to the Z-BUS so you can add additional expansion boards that have industrial Relays, sensor channels, or communicate over industrial communication protocols.

In this demo, We'll connect the BME280 sensor with the Z-bus through EXP-Proto.
# EXP-PROTO Expansion board and BME280
The [EXP-PROTO expansion board](https://www.zerynth.com/products/hardware/exp-proto/) is a prototyping board that enables you to connect and interface external sensors, actuators or devices.

  
  
  
  <figure>
  <a data-fancybox="gallery" href="../img/EXP-PROTO-front.png">
  <img src="../img/EXP-PROTO-front.png"width="200"/>
  </a>
</figure>
  
  
  
  

[Bosch BME280](https://www.bosch-sensortec.com/products/environmental-sensors/humidity-sensors-bme280/) sensor - measures relative humidity, barometric pressure, and ambient te
In this demo, we will create a simple application which will read the measurements from the BME280 and print it to the console.

The BME280 is already supported in ZSDK. All we need is to initialize the sensor by making a new instance of the BME280 class and then call Read functions to Read measurements, then finally print it to the console.mperature.

## Wiring Diagram

<figure>
  <a data-fancybox="gallery" href="../img/exp-proto-bme280-schematic.png">
  <img src="../img/exp-proto-bme280-schematic.png"width="200"/>
  </a>
</figure>

<figure>
  <a data-fancybox="gallery" href="../img/exp_proto_connected.jpg">
  <img src="../img/exp_proto_connected.jpg"width="200"/>
  </a>
</figure>

## Code

In this demo, we will create a simple application which will read the measurements from the BME280 and print it to the console.

The BME280 is already supported in ZSDK. All we need is to initialize the sensor by making a new instance of the BME280 class and then call Read functions to Read measurements, then finally print it to the console.
from bsp import board
from components.bme280 import bme280

# Initialize board and BME280 soldered on EXP-PROTO expansion.

board.init()
sensor = bme280.BME280(I2C0)

    while True:
    # Read sensor measurements and print it to the console every 3 seconds.

      temperature = sensor.get_temp()
      pressure = sensor.get_press()
      humidity = sensor.get_hum()
      print("T:", temperature, "C | P:", pressure, "mbar | H:", humidity, "%")
      sleep(3000)


And here is the result:

<figure>
  <a data-fancybox="gallery" href="../img/result_proto_bme280.jpg">
  <img src="../img/result_proto_bme280.jpg"width="500"/>
  </a>
</figure>

Hardware prototyping is an indispensable step toward creating new products, and the EXP-PROTO boards are the most reliable and affordable way to prototype your next IoT application. Because of ZSDK, creating a functional prototype is just a few lines of code and a cup of coffee away..

## More interesting tutorials
Have you checked our Multithreaded firmware demo and our Watchdog demo? [Click here to check them](https://docs.zerynth.com/latest/demos/zerynth-os/multi_thread_basic/)

We hope you enjoyed this new demo. Feel free to join our [community forum](https://community.zerynth.com/) if you have any additional questions.

