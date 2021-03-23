# Getting started

The ZDM library is central to the IoT development with Zerynth and still it is very simple to use. The simplest usage requires just 3 lines of code:

```python
from zdm import zdm

agent = zdm.Agent()
agent.start()

```
The above snippet shows the steps required to enable a ZDM connection:
- import the ZDM module
- create an instance of the Agent class
- start the agent

Under the hood a MQTT client is started and a secure connection is established using the device certificates contained in the secure element of every Zerynth hardware. 

In order for the connection to be established correctly it is necessary that the device has been associated with an existing ZDM workspace. This procedure must be performed just once and can be done both from the [command line](TODO/link-to-device-association) and [VSCode extension](TODO/link-to-vscode-association).
 
After the connection is established, the `Agent` will updated the real time clock to the current time and will try to keep it synchronized. The `Agent` will also take care of the reliability of the connection by automatically retrying to connect in case of network failure.

Finally, the `Agent` is capable of accepting a FOTA update and changing the current firmware with a new one.

##### class Config

```#!py3 class Config(keepalive=60,cycle_timeout=500,command_timeout=60000,clean_session=True,qos_publish=0,qos_subscribe=1)```

Creates a Config instance that set parameters for the connection to the MQTT broker.
In particular, the following parameters are available:

* ```keepalive``` the MQTT keep alive timeout, in seconds
* ```cycle_timeout``` how long to block on the socket waiting for broker input, in milliseconds
* ```command_timeout```, how long to wait for a connect/disconnect command to finish, in milliseconds
* ```clean_session```, use MQTT clean session flag
* ```qos_publish```, the quality of service when publishing to the MQTT broker
* ```qos_subscribe```, the quality of service when subscribing to the MQTT broker


### class Agent

```python 
class Agent(cfg=None, jobs=None, conditions=[], on_conditions=None, set_clock_every=300, on_fota=None, host="zmqtt.zdm.zerynth.com")```

Create an `Agent` instance. The `Agent` class accepts various parameters:
* `cfg` is an instance of the `Config` class detailing the connection
* ```jobs_dict``` is the dictionary that defines the device's available jobs
* ```condition_tags``` is a list of strings defining the conditions tags used by the device (default []).
* ```on_timestamp```, is a callback function called when timestamp is received after requesting current time to the ZDM (default None).
* ```on_open_conditions```, is a callback function that is called when the list of open conditions is received (default None).
* ```fota_callback```, is a function accepting one ore more arguments that will be called at different steps of the FOTA process.
* ```time_function```, is a synchronous function that returns the time. Default is retrieving the time through a ntp server.

###### Device.connect()

```#!py3 connect()```

Connect to the ZDM with the parameters and credentials specified in the constructor.

Upon successful connection, subscribe to the required ZDM topics for jobs.

Upon successful subscription, request current device status from the ZDM.

Return the result code of MQTT connection (0 for ok).
 
###### Device.connected()

```#!py3 connected()```

Returns ```True``` if the device is connected to the ZDM, ```False``` otherwise.

###### Device.new_condition

```#!py3 new_condition(condition_tag)```

Create and return a new condition.

* ```condition_tag``` the tag of the new condition. For the condition to be created correctly, the condition tag must be presend in the ```condition_tags``` parameter of the class constructor.

###### Device.request_timestamp

```#!py3 request_timestamp()```

Request the timestamp to the ZDM. When the timestamp is received, the callback ```on_timestamp``` is called.

###### Device.request_open_conditions

```#!py3 request_open_conditions()```

Request all the open conditions of the device not yet closed. 

When the open conditions are received, the callback on_open_conditions is called.

##### class Condition

```#!py3 class Condition(client, tag)```

Creates a Condition on a tag.

* ```client``` is the object ZDMClient object used to open and close the condition.
* ```tag``` is the tag associated with the condition.

###### Condition.open

```#!py3 open(payload, finish)```

Open a condition.

* ```payload``` is a dictionary containing custom data to associated with the open operation.
* ```start``` is a time (RFC3339) used to set the opening time. If None is automatically set with the current time.

###### Condition.close

```#!py3 close(payload, finish)```

Close a condition.

* ```payload``` is a dictionary containing custom data to associated with the close operation.
* ```finish``` is a time (RFC3339) used to set the closing time. If None is automatically set with the current time.

###### Condition.reset

```#!py3 reset()```

Reset the condition by generating a new id.

###### Condition.is_open

```#!py3 is_open()```

Return True if the condition is open. False otherwise.

###### Condition.get_payload_open

```#!py3 get_payload_open()```

Return the payload of the condition when it was opened.

###### Condition.get_payload_close

```#!py3 get_payload_close()```

Return the payload of the condition when it was closed.

###### Condition.get_id

```#!py3 get_id()```

Return the condition unique identifier.

###### Condition.get_finish

```#!py3 get_finish()```

Return the closing time.

###### Condition.get_start

```#!py3 get_start()```

Return the opening time.


