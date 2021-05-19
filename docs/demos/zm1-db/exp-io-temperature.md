# Industrial Data Aquisition with EXP-IO Board

Input and output operations are the basis for each interaction between two sensors or devices. The same applies between microcontrollers and analog sensors. 

There are two main types of analog sensors : active and passive. Active sensors are a little bit more complex and require an external power supply in order to perform the measurement. Passive sensors are usually in the form of some simple passive component such as  a resistor, a capacitor or an inductor.


In this demo, we will read the ADC value measured from an Industrial temperature sensor and print it to the console.
Temperature sensors are resistive types. They change their resistance value based on the measured data.
The Zerynth SDK supports industrial sensors with the EXP-IO expansion board. All we have to do is to import the IO module from the expansion library, do a proper initialization of the IO expansion board, and then read the measurements.

## EXP-IO Expansion board

<figure>
  <a data-fancybox="gallery" href="../img/EXP-IO-front.png">
  <img src="../img/EXP-IO-front.png" width="300"/>
  </a>
</figure>
EXP-IO enables Industrial input and output operations of data and control of other components. The board features industrial sensor channels, relays and opto-isolated inputs.
For more information about the hardware, please refer to the [User Manual](https://www.zerynth.com/download/20119/).


Wiring is simple. Connect the two terminals of the sensors to AIN1- and AIN1+ and make sure you connect the ground to the AIN1- pin.

<figure>
  <a data-fancybox="gallery" href="../img/exp_io_temp.jpg">
  <img src="../img/exp_io_temp.jpg"width="500"/>
  </a>
</figure>

## Code

Let's create a new project by cloning an existing example.
Just press Ctrl+Shift+P and type examples in the popup that VSCode displays.

<figure>
  <a data-fancybox="gallery" href="../img/exp_io_temp_code1.jpg">
  <img src="../img/exp_io_temp_code1.jpg"width="900"/>
  </a>
</figure>


The popup is the VSCode command palette from which most of the available operations (called tasks in VSCode jargon) can be launched. 
Simply choose Zerynth > Search examples and then type IO_ADC_Channel. Select the IO_ADC_Channel example and select a destination and provide a named folder. Click Clone Zerynth Example and you are good to go. The following code should be cloned from the example.


<figure>
  <a data-fancybox="gallery" href="../img/exp_io_temp_code2.jpg">
  <img src="../img/exp_io_temp_code2.jpg"width="900"/>
  </a>
</figure>

```python
from bsp import board
from expansions import io
from zsensors import sensor

# Initialize board and relay expansion by providing the position of two rotary switches.
# In this demo the arrow on the ADDR rotary switch points to 1, while INT points to 0.
board.init()
exp_io = board.next_expansion(io, (1, 0))
sensor_dictionary = sensor.get_sensors_dict()

while True:

    # Read ADC and print a value every 3 seconds.
    temperature = sensor_dictionary["temperature"].read()
    print("T: ", temperature)
    sleep(3000)

```
        

And here is the result:

<figure>
  <a data-fancybox="gallery" href="../img/exp_io_temp_code3.png">
  <img src="../img/exp_io_temp_code3.png"width="900"/>
  </a>
</figure>


As you can see, thanks to the Zerynth SDK, the conversion is done -behind the scenes- for us. In the background under the resource folder, there is a  json file that carries the definition of our temperature sensor and the adc conversion data so that we can convert the ADC measurements to the temperature measurements.

You can find more information [here](https://docs.zerynth.com/latest/reference/libs/zerynth/zsensors/#function-get_sensors_dict).


## More interesting tutorials
Have you checked our [Control Industrial Lamp with EXP-RELAY Demo](exp-relay-lamp.md) and [Temperature and Humidity monitoring with EXP-PROTO Demo?](ex-proto-bme280.md)

We hope you enjoyed this new demo. Feel free to join our [community forum](https://community.zerynth.com/) if you have any additional questions.