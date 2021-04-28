# Industrial IoT Kit

This tutorial will guide you in building your first IoT demo with the Zerynth Industrial IoT Kit. The Industrial IoT Kit is composed of one 4ZeroBox together with:

- a NTC thermistor sensor
- a current clamp
- a Reed switch

<figure>
  <a data-fancybox="gallery" href="../img/industrial-iot-kit.jpg">
  <img src="../img/industrial-iot-kit.jpg" />
  </a>
  <figcaption>Industrial IoT kit</figcaption>
</figure>

For this tutorial, you need to install the [Zerynth SDK](../../gettingstarted/index.md).

The goal of the tutorial is setting up the 4ZeroBox for measuring environmental temperature and power consumption. The data will be sent to the zDeviceManager and displayed in a demo dashboard.


## Sensors Setup

The first step is the hardware setup, namely connecting sensors to the 4ZeroBox as in the picture below.

<figure>
  <a data-fancybox="gallery" href="../img/kit-01.png">
  <img src="../img/kit-01.png" />
  </a>
  <figcaption>Sensors connected to 4ZeroBox</figcaption>
</figure>

The current clamp sensor must be cut and stripped separating the two cables. For this guide it is necessary to connect one cable to `C1` and the other one to the common ground `COM`.

The NTC thermistor must be cut and stripped separating the two cables. For this guide it is necessary to connect a cable to `S1` and the other one to the ground `GND`. 


## Writing the firmware

Once the hardware setup is ready, it's time to start programming the firmware. 

We will need to:

- connect to the local network
- read sensors with correct timings
- send data to the zDeviceManager

### Clone the example

The source code for the tutorial is available as an example in the Zerynth SDK. From VSCode, just search the `Zerynth Examples` panel for `Industrial IoT Kit` and clone it.

<figure>
  <a data-fancybox="gallery" href="../img/kit-02.png">
  <img src="../img/kit-02.png" />
  </a>
  <figcaption>Industrial Kit Example</figcaption>
</figure>

The source code is organized in multiple files. The `main.py` file is the first one to be executed and takes care of initializing the hardware and the various modules.

The first lines import all the required modules and initializes the hardware. In particular, the `board` module from the `bsp` takes care of automatically setting the 4ZeroBox configuration parameters, like modalities of the gpios or speed of the various buses.

The firmware needs to be customized with your wifi credentials at lines 18-19 and it then tries to connect to the local wifi with code contained in the `network.py` module. 

The `network.py` module contains a function that retries establishing the connection if something fails, while signaling the various states with different led colors.

The `main.py` goes on with creating a zDeviceManager agent and starting it. This creates a secure MQTT connection with the zDeviceManager for sending data and receiving commands.

Finally, it starts the `reading.py` module `read_loop` function in a separate thread. The `read_loop` initializes the sensors and reads them once every ten seconds; it also sends the power and temperature reading to the zDeviceManager.

### Industrial sensors made easy

The firmware is simple to read and understand, but the really interesting part is the automatic configuration of the industrial sensors. The list, type and characteristics of the sensors are not hardcoded in the Python code but the can be found in the `resources/sensors.json` file.

Thanks to the [sensors](../../reference/libs/zerynth/zsensors/index.md) module, you just need to define the sensors attributes and the firmware will take care of creating, configuring, initializing and reading sensors.

For example, let's consider the NTC thermistore. The `sensors.json` specifies that:

```json
    "temperature": {
        "set": {
            "type": "resistive",
            "input_number": 1,
            "PGA": 2,
            "SPS": 3000
        },
        "conversion": {
            "type": "lookup_table",
            "args": {
                "v_min": -50,
                "ref_table": [329.5,247.7,188.5,144.1,111.3,86.43,67.77,53.41, ...],
                "delta": 5,
                "offset": 0
            }
        }
    }
```

The above means that the temperature sensor is of the `resistive` type, connected to the resistive channel number 1 (`input_number`), with an analog gain of 2. Moreover it is also specified how to convert the analog measure into the actual physical unit. In this case, the conversion is done via a lookup table that specifies the correspondence of resistance to temperatures for that particular NTC probe.

Given the configuration, the `sensors` module automatically provides the correct reading.


### Provision the device

Before running the firmware, it is necessary to assocaite the 4ZeroBox to your zCloud account. This must be done once and requires just two clicks!

First, click `Physical device` in the `Zerynth Control Panel` to configure the firmware for the 4ZeroBox. Then, click `Provisioning`. It will ask for a cloud device name, set it to `industrial-kit`. Accept the confirmation dialog and wait for the process to finish.

At the end, the `Zerynth Control Panel` will look like this:

<figure>
  <a data-fancybox="gallery" href="../img/kit-08.png">
  <img src="../img/kit-08.png" />
  </a>
  <figcaption>Industrial Kit Provisioning</figcaption>
</figure>

indicating that the physical device is now associated with a cloud device and has a unique identity.


### Run the firmware

You are now ready to run the firmware! Press `Run` and all the modules and sensors configuration will be copied into the 4ZeroBox to be executed.
By pressing `Console` you can check the output of the firmware and the values being read and sent to the zDeviceManager.



## Configuring the zDeviceManager

The next step is configuring the zDeviceManager to send the incoming data to a dashboard for visualization.

In the zDeviceManager, the incoming data from the 4ZeroBox is stored just temporarily. To really use the IoT data it must be persisted to a time series storage like the [zStorage](zstorage_intro.md) or your own database. Whatever the storage, the data must be first sent out of the zDeviceManager to its final destination.

This is accomplished thanks to `Integrations`. In the workspace screen at [zdm.zerynth.com](https://zdm.zerynth.com), in the Integrations tab, it is possible to configure many different forwarding point.

In this tutorial we will use our public testing dashboard at [hello.zerynth.com](http://hello.zerynth.com) to receive, store and visualize data.

Let's create a new integration by clicking the `New integration` button. The first choice is the type of integration and for the sake of this guide choose `Webhook`. 

Webhook integrations are the most generic ones since they send data in batches from the workspace to an http endpoint; there, a service decodes the content of the batch and insert it into the storage.

The next information requested by the integration dialog is the type of data: zDeviceManager supports both data and conditions streams. Select `data stream` and give it a name like `industrial-kit`. The most important piece of information required by the integration is the url of the endpoint that will be receiving data. Type `http://hello.zerynth.com/zdm/data` and click `Submit`.

<figure>
  <a data-fancybox="gallery" href="../img/kit-03.png">
  <img src="../img/kit-03.png" />
  </a>
  <figcaption>Integration Tab</figcaption>
</figure>

<figure>
  <a data-fancybox="gallery" href="../img/kit-04.png">
  <img src="../img/kit-04.png" />
  </a>
  <figcaption>Integration Selection</figcaption>
</figure>

<figure>
  <a data-fancybox="gallery" href="../img/kit-05.png">
  <img src="../img/kit-05.png" />
  </a>
  <figcaption>Data Stream Integration</figcaption>
</figure>

<figure>
  <a data-fancybox="gallery" href="../img/kit-06.png">
  <img src="../img/kit-06.png" />
  </a>
  <figcaption>Integration List</figcaption>
</figure>


Data is now flowing from the IoT device to the endpoint on `hello.zerynth.com` and the zDeviceManager will take care of resending any missed batch to avoid any data loss.

## Dashboarding

The data ingested at `hello.zerynth.com` is stored in a local database that can be queried by any dashboarding solution. We have installed a [Grafana](https://grafana.com/) instance that serves a public dashboard for you to play with. Grafana is one of the best dashboarding tool out there and you can use it without worrying about its maintenance directly from our custom [zDashboard](zdashboard_intro.md) solution.

Dashboards can be easily created by adding panels, and each panel is the result of a query into the incoming data.

To play with the your device data you need to input the id of your workspace (you can find in the web app). By pressing enter in the dashboard workspace field, all the panels will update to display your workspace data.

From the controls in the upper right corner you can change the time range of the panels and even enable auto refresh.

<figure>
  <a data-fancybox="gallery" href="../img/kit-07.png">
  <img src="../img/kit-07.png" />
  </a>
  <figcaption>Test Dashboard</figcaption>
</figure>


