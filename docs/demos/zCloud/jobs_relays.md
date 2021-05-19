# Controlling Relays with Jobs in zCloud

Water pipes are traditionally controlled by legacy pumps that require on-site maintenance. They cannot be monitored remotely and don’t provide any feedback with respect to on-going operations.
If these pumps fail, catastrophic events could happen and, perhaps, what’s worse is that for the technicians, there is no way to know when, why or how this failure occurred. To determine the cause for failure then, the technicians have to travel on-site to fix the failure.

In contrast to an IoT enabled Water pump, you get periodic diagnostics of the operations and can issue remote procedure calls that can be preconfigured to fix a critical situation. Or you have the ability to shutdown the system before a failure occurs. And another option is that you can update the firmware to fix bugs.


## ZDM Jobs

ZDM Jobs are probably the easiest way to handle actuators by using the zCloud and ZSDK. ZDM Jobs are functions that are triggered on the zCloud and executed on the respective devices. From the operator’s point of view, you can control devices at scale, while issuing jobs and executing functions in a schedulable manner for a large  fleet of devices.

On the ZCloud side, the interface is pretty simple and adjustable. On the device side, the library is simple and easy to use. You can find more information about ZDM Jobs on this [page](https://docs.zerynth.com/latest/reference/libs/zerynth/zdm/#jobs) and details about the API on this [page](https://docs.zerynth.com/latest/reference/libs/zerynth/zdm/#jobs).

## Hardware

This tutorial is based on the [Control Industrial Lamp with EXP-RELAY](../../zm1-db/exp-relay-lamp/), Please refer to it if you have questions on the hardware.

## Code

In this demo we will create a simple application which will just set the relay state based on jobs gathered from ZDM. Don't forget to prepare your device, for the ZDM, as a preliminary step - you can follow the instructions on this [page](https://docsv3.zerynth.com/latest/gettingstarted/#3-prepare-the-device-for-the-cloud) to do this.


<figure>
  <a data-fancybox="gallery" href="../img/jobs_sche.jpg">
  <img src="../img/jobs_sche.jpg"width="500"/>
  </a>
</figure>


First, we will create the handler function which will be called when a particular job operation on the ZDM is triggered. Inside that handler, based on the job argument, we will turn a relay on or off. After that, all we need to do is initialize all the necessary stuff and assign the handler. 

```python
from bsp import board
from zdm import zdm
from expansions import relay
from networking import wifi

SSID="MY NETWORK SSID",
PASS="MY NETWORK PASS"

# Relay handler.
def relay_handler(agent, args):
    print("Job request received!", args)
    if args == "on":
        exp_relay.relay_on(exp_relay.OUT1)
    elif args == "off":
        exp_relay.relay_off(exp_relay.OUT1)
    else:
        print("Unknown state")

# Initialize the board and relay expansion by providing the position of the rotary switch.
# In this demo the arrow on the rotary switch points to the 1.
board.init()
board.summary()
exp_relay = board.next_expansion(relay, (1,))

# Configure and connect to the Wi-Fi network.
try:
    wifi.configure(SSID, PASS)
    wifi.start()
except Exception as e:
    raise e
print("Connected to Wi-FI")

# Configure and start ZDM Agent.
agent = zdm.Agent(jobs={"relay":relay_handler})
agent.start()
print("Connected to ZDM")

while True:
    sleep(5000)


```
        

Trigger the job function from the ZDM GUI interface

<figure>
  <a data-fancybox="gallery" href="../img/relay_jobs1.jpg">
  <img src="../img/relay_jobs1.jpg"width="500"/>
  </a>
</figure>

and the function should be triggered:
<figure>
  <a data-fancybox="gallery" href="../img/jobs2.jpg">
  <img src="../img/jobs2.jpg"width="500"/>
  </a>
</figure>

As you can see, thanks to the Zerynth SDK, the conversion is done -behind the scenes- for us. In the background under the resource folder, there is a  json file that carries the definition of our temperature sensor and the adc conversion data so that we can convert the ADC measurements to the temperature measurements.
You can find more information [here](https://docs.zerynth.com/latest/reference/libs/zerynth/zsensors/#function-get_sensors_dict).


## More interesting tutorials
Have you checked our [Control Industrial Lamp with EXP-RELAY Demo](../../zm1-db/exp-relay-lamp) and [Temperature and Humidity monitoring with EXP-PROTO Demo?](../../zm1-db/ex-proto-bme280)

We hope you enjoyed this new demo. Feel free to join our [community forum](https://community.zerynth.com/) if you have any additional questions.