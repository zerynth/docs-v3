---
layout: blog
title: Time Series Log
---
# Getting started

Designing a firmware that is robust and reliable in the typical harsh working condition of an IoT device is not an easy task. Data loss must be reduced to a minimum in the face of possible power loss or absence of connectivity.

The Zerynth time series log (TSLog) is a log system for time series that helps decoupling data acquisition and sending.

The use case scenario involves multiple sensors generating data points that, instead of being sent to the network immediately, are stored into the log.
A separate thread can access the log in read-only mode and extract the data points for sending them to the network when the connection is available.

TSLog is robust and resistant to the challenges of IoT: network unavailability, system resets, power loss, etc..
Those features are achieved by creating periodic snapshots (called commits) of the current log status.
Commits are of two types:
    - data commits: are executed periodically by the log itself and they transfer the accumulated data points to the underlying filesystem
    - reader commits: are executed by the readers and they save the current "cursor" (i.e. the latest data point sequence number) of the reader


In case of power loss, when the system comes up again, all the readers will recover from the point they last committed.
The log will also contain all data up to the last data commit.

When creating a log, the following parameters are needed:
    - a folder where to store log files
    - a record size: the number of bytes a data record is made of
    - a bucket size: the number of records to store in a single log file
    - a commit delta: the number of stored records after which a data commit is performed
    - the number of readers: the number of cursors saved in the reader commit

The log is automatically cleaned from old data when a new bucket is created: all the buckets that have already
been read by all the readers are deleted.

The above parameters must be choosen correctly in order to avoid the filesystem to fill up.

NOTE: data corruption is prevented by choosing a corruption resistant filesystem. The internal filesystem of the various
Zerynth modules is always corruption resistant (i.e. data is either saved correctly or not saved at all).




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

## Connection
Under the hood a MQTT client is started and a secure connection is established using the device certificates contained in the secure element of every Zerynth hardware. 

In order for the connection to be established correctly it is necessary that the physical device has been associated with a ZDM device. This procedure links the physical device identity contained in the secure element to its cloud identity represented by the ZDM device unique identifier. The procedure must be performed just once and can be done both from the [command line](TODO/link-to-device-association) and [VSCode extension](TODO/link-to-vscode-association).
 
After the connection is established, the `Agent` will update the real time clock to the current time and will try to keep it synchronized. The `Agent` will also take care of the reliability of the connection by automatically retrying to connect in case of network failure.

Upon successful connection, the `Agent` also sends some information on the physical device, like the firmware version and the device type.

## Jobs

Once connected the `Agent` can handle remote requests for *jobs*. A job is a task that is performed by a function in the firmware. It is possible to configure the `Agent` to call a specific function by assigning it to the job name. For example:

```
def job1(agent, arguments):
    return "OK"

def job2(agent, arguments):
    raise IOError

agent = zdm.Agent(jobs={"myjob":job1, "another_job":job2})

```
The above snippet configures the `Agent` to call function `job1` when the `myjob` job is triggered, and `job2` for `another_job`. Notice that the functions have the same signature: the first argument is the instance of the agent, the second is a dictionary containing the arguments of the job.

Jobs are executed by the `Agent` thread and their result is sent to the cloud for reference. If a job fails with an exception, the error is also sent to the cloud for reference.

## Data

The `Agent` is capable of sending raw data points such as sensor readings to the cloud where they are temporarily stored and fed into the various available integrations (i.e. sent to Azure or to the zStorage for further elaboration). Data is sent in JSON format as a dictionary called `payload` thus allowing for the maximum flexibility. The `payload` is also associated to a `tag`, a label that can be used to better organize IoT data and to easily retrieve it from the cloud.

Sending data is very easy:

```python

agent = zdm.Agent()
agent.start()

agent.publish(payload={"temperature": 25.3, "humidity": 35.2}, tag="room")
```


## Conditions

IoT data can refer not only to a single point in time but also to a time range. For this kind of data the ZDM provides the `Conditions`. A `Condition` represent a time range starting at `t_start` and ending at `t_end` thus having a duration. One example of `Condition` is the battery level: it enters the `battery_low` status at a certain time and exits it when it recharges. 

A `Condition` is *open* when it has a starting time but not yet an ending time. When the `Agent` connects it asks for the open `Conditions` and passes them to the firmware for handling. 

A `Condition` can also have payloads of data associated to the starting and ending times.

A `Condition` is identified by a name and by a unique identifier automatically generated by the `Agent`.

Similarly to jobs, the `Agent` can be configured with the names of the conditions it can handle and with a function that is called whenever there are opened conditions at startup (left by previous executions of the firmware such as after a power loss).

Again, the configuration is very simple:

```python

def on_open_conditions(agent, conditions):
    for condition in conditions:
        condition.close()

agent = zdm.Agent(conditions=["batter_low"], on_conditions=on_open_conditions)
agent.start()
```

Notice that similarly to jobs, the `on_conditions` parameter accepts functions that gets two arguments: the `Agent` instance and a list of `Condition` instances.


## Firmware updates

The `Agent` is capable of accepting a FOTA update request and changing the current firmware with a new one. The FOTA process can be customized by adding checks at different steps. The customization point are:
- version check: the firmware can check the new version and decide if the FOTA should proceed or not. For example, a policy that prevents switching to a version older than the current can be easily implemented with this check.
- new firmware acceptance: the new firmware must be accepted as valid to be run at the next reboot. This is a very critical step since accepting a bad firmware could make the device incapable of performing further updated. By default a new firmware is accepted when it is capable of reconnecting to the ZDM, receiving a job request and confirming it. In some use cases these checks can be not enough and some custom logic may be need. For example a diagnostic function can be run to check that the new firmware is still capable of reading all the sensors and controlling the actuators

Configuring the `Agent` for customized FOTA is easy:

```python
def fota_checks(agent, step, arg):
    if step=="check_version":
        # don't care about version, any version is ok
        return False
    elif step=="accept":
        # do not accept any firmware
        return "sorry, firmware not accepted"


agent = zdm.Agent(on_fota=fota_checks)

```
In the snippet above, a function is provided to the `on_fota` parameter. This function will be called multiple times at different steps in the FOTA process. When `fota_checks` returns *None* or something *False* the step is considered valid, whereas when a non truthy value is returned the step is canceled and the return valued is sent to the cloud as the reason for the FOTA failure.


## ZDM Agent

### class Agent
```python 
class Agent(cfg=None, jobs=None, conditions=[], on_conditions=None, set_clock_every=300, on_fota=None, host="zmqtt.zdm.zerynth.com")
```

Create an `Agent` instance. The `Agent` class accepts various parameters:
* `cfg` is an instance of the `Config` class detailing the transport connection parameters. It is set to *None* by default using standard parameters.
* `jobs` is a dictionary that defines the ZDM jobs the agent can handle. The keys of the dictionary are strings representing the name of the jobs and the values are functions that are called each time a job is triggered. When set to *None* the only jobs that can be triggered are `reset` and `fota`.
* `conditions` is a list of strings defining the condition's names used by the device.
* `on_conditions` is a callback function called when there are open conditions left from previous executions of the firmware.
* `set_clock_every` is the number of seconds after which re-synchronizing the real time clock. If set to zero or negative, clock synchronization is disabled and is up to the firmware to find alternative ways of setting the current time (i.e. by ntp protocol)
* `on_fota` is a function accepting one ore more arguments that will be called at different steps of the FOTA process to validate or refuse the step.
* `host` is the hostname of the ZDM broker, do not change.

### method `start`

```python 
start(wait_working=10)
```

Start the `Agent`. Since the connection time can be considerable depending on the network status, the method returns either upon successful connection or after a certain amount of time whatever comes first. The amount of time to wait for a working agent can be set in seconds with the `wait_working` parameter.

 