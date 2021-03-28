# Examples

The following are some examples for the ZDM library.

## ZDM connect and publish


This example shows how to create a ZDM agent, start it and have it send data periodically. 

You can use this example to test ZDM Webhooks and Ubidots integrations.


```main.py```

```python
################################################################################
# ZDM Simple
################################################################################

# The Zerynth Device Manager is the entrypoint for the zCloud.
# Let's connect and send data to the ZDM with a simple example.
# Before exeuting this code, please associate the device with your
# ZDM account by selecting "ZDM target" in VSCode Control Panel.

# Let's import the zdm module
from zdm import zdm
# We also need wifi or ethernet
from networking import wifi

# Set the ssid and password of your wifi network
ssid = "your-wifi-network-ssid"
passwd = "your-wifi-password"

while True:

    try:
        # Let's connect to the wifi
        print("configuring wifi...")
        wifi.configure(
            ssid=ssid,
            password=passwd)
        print("connecting to wifi...")
        wifi.start()
        print("connected!",wifi.info())

        # the Agent class implements all the logic to talk with the ZDM
        agent = zdm.Agent()
        # just start it
        agent.start()

        while True:
            # use the agent to publish values to the ZDM
            # Just open the device page from VSCode and check that data is incoming
            agent.publish({"value":random(0,100)}, "test")
            sleep(5000)
            # The agent automatically handles connections and reconnections
            print("ZDM is online:    ",agent.online())
            # And provides info on the current firmware version
            print("Firmware version: ",agent.firmware())

        wifi.stop()
        print("disconnected from wifi")
    except WifiBadPassword:
        print("Bad Password")
    except WifiBadSSID:
        print("Bad SSID")
    except WifiException:
        print("Generic Wifi Exception")
    except Exception as e:
        raise e

    sleep(3000)

```
## ZDM Jobs


A basic example showing how to use ZDM jobs. Write your own jobs, then add them in the jobs dictionary with a custom name.

Once the device is connected to the ZDM, jobs can be sent from the ZDM web interface using the custom name.


```main.py```

```python
################################################################################
# ZDM Jobs
################################################################################

# The Zerynth Device Manager is the entrypoint for the zCloud.
# Let's connect and send data to the ZDM with a simple example.
# Before exeuting this code, please associate the device with your
# ZDM account by selecting "ZDM target" in VSCode Control Panel.

from bsp import board
# Let's import the zdm module
from zdm import zdm
# We also need wifi or ethernet
from networking import wifi
import gpio


# Set the ssid and password of your wifi network
ssid = "your-wifi-network-ssid"
passwd = "your-wifi-password"


# this is a function callable by the ZDM with a job request.
# Notice that it has two parameters: the ZDM agent that receives the request
# and a dictionary with the arguments of the job.
# Color just switches the onboard RGB led to the value set in the job request
def color(agent, args):
    print("Job request received!",args)
    c = args["color"]
    if c=="red":
        gpio.set(LED_GREEN,1)
        gpio.set(LED_BLUE,1)
        gpio.set(LED_RED,0)
    elif c=="green":
        gpio.set(LED_GREEN,0)
        gpio.set(LED_BLUE,1)
        gpio.set(LED_RED,1)
    elif c=="blue":
        gpio.set(LED_GREEN,1)
        gpio.set(LED_BLUE,0)
        gpio.set(LED_RED,1)
    else:
        gpio.set(LED_GREEN,1)
        gpio.set(LED_BLUE,1)
        gpio.set(LED_RED,1)


while True:

    try:
        # Let's connect to the wifi
        print("configuring wifi...")
        wifi.configure(
            ssid=ssid,
            password=passwd)
        print("connecting to wifi...")
        wifi.start()
        print("connected!",wifi.info())

        # the Agent class implements all the logic to talk with the ZDM
        # it also accepts a dictionary of functions to be called as jobs
        agent = zdm.Agent(jobs={"color":color})
        # just start it
        agent.start()

        while True:
            # use the agent to publish values to the ZDM
            # Just open the device page from VSCode and check that data is incoming
            v = random(0,100)
            agent.publish({"value":v}, "test")
            print("Published",v)
            sleep(5000)
            # The agent automatically handles connections and reconnections
            print("ZDM is online:    ",agent.online())
            # And provides info on the current firmware version
            print("Firmware version: ",agent.firmware())

        wifi.stop()
        print("disconnected from wifi")
    except WifiBadPassword:
        print("Bad Password")
    except WifiBadSSID:
        print("Bad SSID")
    except WifiException:
        print("Generic Wifi Exception")
    except Exception as e:
        raise e

    sleep(3000)

```

## ZDM Conditions


An example showing how to use ZDM conditions. It simulates a discharging battery.
Conditions can be monitored from the device page on the ZDM web interface.

```main.py```

```python
################################################################################
# ZDM Agent
################################################################################

# The Zerynth Device Manager is the entrypoint for the zCloud.
# Let's connect and send data to the ZDM with a simple example.
# Before exeuting this code, please associate the device with your
# ZDM account by selecting "ZDM target" in VSCode Control Panel.

from bsp import board
# Let's import the zdm module
from zdm import zdm
# We also need wifi or ethernet
from networking import wifi
import gpio


# Set the ssid and password of your wifi network
ssid = "your-wifi-network-ssid"
passwd = "your-wifi-password"


# this function is executed when the agent receives the list of the open conditions from a previous run.
# Being able to retrieve the open conditions is very useful in cases like power loss. Upon restart the firmware
# will known where it left from.
# In this example, we close all the open conditions from the previous run
def my_open_conditions_callback(agent, conditions):
    print("Received open conditions:", len(conditions))
    for c in conditions:
        print("CLOSING ", c)
        c.close()


while True:

    try:
        # Let's connect to the wifi
        print("configuring wifi...")
        wifi.configure(
            ssid=ssid,
            password=passwd)
        print("connecting to wifi...")
        wifi.start()
        print("connected!",wifi.info())

        # the Agent class implements all the logic to talk with the ZDM
        # it also accepts an array of label with the type of conditions handled by the firmware.
        # It also needs a function to be called when the list of already open conditions are received.
        agent = zdm.Agent(conditions=["battery"],
                on_conditions=my_open_conditions_callback)
        # just start it
        agent.start()

        while True:
            # Let's create some conditions for tracking the battery status
            infoLevel = agent.new_condition("battery")
            warningLevel = agent.new_condition("battery")
            criticalLevel = agent.new_condition("battery")
            fatalLevel = agent.new_condition("battery")

            # Let's also request the open conditions to the agent.
            # When they are received, they will be passed to my_open_conditions_callback
            agent.request_conditions()

            # store the initial battery level (100%)
            battery_lvl_curr = 100
            # store the previous  battery level
            battery_lvl_prv = 100

            # indicate if the battery is in the recharge state (True) or not (False)
            recharge = False
            done = False

            while not done:
                # The agent automatically handles connections and reconnections
                print("ZDM is online:    ",agent.online())
                # And provides info on the current firmware version
                print("Firmware version: ",agent.firmware())
                # Print the battery level
                print("Battery level:", battery_lvl_curr)
                # Check the battery level and update the conditions accordingly
                # Conditions are displayed in the ZDM device page
                # accessible from VSCode (device page)
                if battery_lvl_curr > 80:
                    if recharge and infoLevel.is_open():
                        print("[INFO] close condition")
                        infoLevel.close({"status": "INFO", "lvl": battery_lvl_curr})
                        done = True

                elif 60 < battery_lvl_curr <= 80:
                    if not recharge and not infoLevel.is_open():
                        print("[INFO] open condition")
                        infoLevel.open({"status": "INFO", "lvl": battery_lvl_curr})
                    else:
                        if warningLevel.is_open():
                            print("[WARNING] close condition")
                            warningLevel.close({"status": "WARNING", "lvl": battery_lvl_curr})

                elif 40 < battery_lvl_curr <= 60:
                    if not recharge and not warningLevel.is_open():
                        print("[WARNING] open condition")
                        warningLevel.open({"status": "WARNING", "lvl": battery_lvl_curr})
                    else:
                        if criticalLevel.is_open():
                            print("[CRITICAL] close condition")
                            criticalLevel.close({"status": "CRITICAL", "lvl": battery_lvl_curr})

                elif 20 < battery_lvl_curr <= 40:
                    if not recharge and not criticalLevel.is_open():
                        print("[CRITICAL] open condition")
                        criticalLevel.open({"status": "CRITICAL", "lvl": battery_lvl_curr})
                    else:
                        if fatalLevel.is_open():
                            print("[FATAL] close condition")
                            fatalLevel.close({"status": "FATAL", "lvl": battery_lvl_curr})

                elif 10 < battery_lvl_curr <= 20:
                    if not recharge and not fatalLevel.is_open():
                        print("[FATAL] open condition")
                        fatalLevel.open({"status": "FATAL", "lvl": battery_lvl_curr})

                elif 0 < battery_lvl_curr <= 10:
                    print("Recharging battery...")
                    recharge = True

                battery_lvl_prv = battery_lvl_curr
                if recharge:
                    battery_lvl_curr = battery_lvl_curr + 5
                else:
                    battery_lvl_curr = battery_lvl_curr - 5

                sleep(2000)

        wifi.stop()
        print("disconnected from wifi")
    except WifiBadPassword:
        print("Bad Password")
    except WifiBadSSID:
        print("Bad SSID")
    except WifiException:
        print("Generic Wifi Exception")
    except Exception as e:
        print(e)

    sleep(3000)

```

## ZDM FOTA

Connect your device to ZDM and start updating the firmware seamlessly. This example shows how to connect to the Zerynth Device Manager and perform a customized FOTA.

In this example, a FOTA callback function is defined, which is called during the FOTA update steps. The FOTA callback allows you to accept or refuse a FOTA from your devices using the return value. If the callback returns *False* the FOTA update step is accepted, if the callback return something else 
the step is refused

```main.py```

```python
################################################################################
# ZDM FOTA
################################################################################

# Let's import the zdm module
from zdm import zdm
# We also need wifi or ethernet
from networking import wifi

# Set the ssid and password of your wifi network
ssid = "your-wifi-network-ssid"
passwd = "your-wifi-password"

# this function will be called during fota steps
def fota(agent, action, arg):
    if action == "check_version":
        # do not check version, everything is ok
        # just return False to accept a step
        return False
    elif action == "accept":
        # the agent is asking if the current firmware can be accepted
        # or must be refused.
        # Let's try randomly :)
        if random(0,100)%2==0:
            # do not accept fota
            return "random failure"
        else:
            # accept fota
            return False
    # accept any unhandled action
    return False

while True:

    try:
        print("configuring wifi...")
        wifi.configure(
            ssid=ssid,
            password=passwd)
        print("connecting...")
        wifi.start()
        print("connected...")
        print("info...")
        print(wifi.info())
        # set the on_fota callback
        agent = zdm.Agent(on_fota=fota)
        agent.start()

        while True:
            # use the agent to publish values to the ZDM
            # Just open the device page from VSCode and check that data is incoming
            agent.publish({"value":random(0,100)}, "test")
            sleep(5000)
            # The agent automatically handles connections and reconnections
            print("ZDM is online:    ",agent.online())
            # And provides info on the current firmware version
            print("Firmware version: ",agent.firmware())

        wifi.stop()
        print("disconnected...")
    except WifiBadPassword:
        print("Bad Password")
    except WifiBadSSID:
        print("Bad SSID")
    except WifiException:
        print("Generic Wifi Exception")
    except Exception as e:
        raise e

    sleep(3000)
```
