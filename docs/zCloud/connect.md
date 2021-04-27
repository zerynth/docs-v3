# Connect to zCloud

In this step by step guide we will show you how to build a demo IoT dashboard with the zCloud.

All you need is a [Zerynth hardware](../hardware/index.md) connected to the zDeviceManager sending some data; we will guide you through the process of inspecting the incoming data and forwarding it to a dashboard.


## Prepare your device

The first step is preparing your device with firmware and credentials in order to connect it to the [zDeviceManager](zdm_intro.md).

You need to install the Zerynth SDK, load a small firmware on the device and associate it with your Zerynth account. We got you covered with a [5 minutes introduction](../gettingstarted/index.md); once you complete it you can get back here to continue.

Yo now have an IoT device that is sending some random data. Let's modify the firmware a bit to generate some power and temperature data.

Data in the zDeviceManager is labelled with `tags`, and each message sent by a device is marked with a `tag`:

```python
agent.publish({"value":random(0,100)}, "test")

```

In the above snippet, the `tag` is `test` while the message, a.k.a. the `payload`, is a dictionary with a key named `value` and a random number as the actual value.

Let's change the above snippet to send some different data:


```python
# Power consumption data
agent.publish({ "pow1": random(0,100) }, "power")

# Temperature and humidity data
agent.publish({ "temp": random(0,100), "hum": random(0,100) }, "env")

```

Run the example again and now the device is sending two tags, one for power consumption measured by a current sensor and one for environmental data of temperature and humidity. The device is still sending random data, but you can substitute the `random` function with real readings from supported sensors such as [BME280](../reference/libs/components/bme280/index.md).

Even better, if you have our [Industrial Kit](TODO: link to industrial kit) you can generate real data with the included current sensor and the ntc temperature probe. Just clone the "Industrial Kit" example instead of "ZDM Simple" in VSCode, run it and you are good to go.


So the device is now sending correctly tagged data, let's move to the next step following the data up the IoT stack.


## Inspect and Control

Let's open the device page in the zDeviceManager. It can be done directly from VSCode by clicking `Cloud Device` in the `Zerynth Control Panel` or by opening the web app at [zdm.zerynth.com](https://zdm.zerynth.com) and:

- opening the default workspace
- clicking `my-iot-device`


That brings up the device page where incoming data can be inspected from the console:

<figure>
  <a data-fancybox="gallery" href="../img/connect-01.png">
  <img src="../img/connect-01.png" />
  </a>
  <figcaption>Device Console</figcaption>
</figure>


From the same page, you can also send `jobs` to the device. Just press the `Reset` button for forcing your device to reset itself.
More complex jobs can be sent from the `Jobs` button provided the firmware supports them.

<figure>
  <a data-fancybox="gallery" href="../img/connect-02.png">
  <img src="../img/connect-02.png" />
  </a>
  <figcaption>Device Page</figcaption>
</figure>

## Add Integrations

In the zDeviceManager, the incoming data from the devices of your workspace is stored just temporarily. To really use the IoT data it must be persisted to a time series storage like the [zStorage](zstorage_intro.md) or your own database. Whatever the storage, the data must be first sent out of the zDeviceManager to its final destination.

This is accomplished thanks to `Integrations`. In the workspace screen, in the Integrations tab, it is possible to configure many different forwarding point.

In this guide we will use our public testing dashboard at [hello.zerynth.com](http://hello.zerynth.com) to receive, store and visualize data.

Let's create a new integration by clicking the `New integration` button. The first choice is the type of integration and for the sake of this guide choose `Webhook`. 

Webhook integrations are the most generic ones since they send data in batches from the workspace to an http endpoint; there, a service decodes the content of the batch and insert it into the storage.

In this guide we are using a custom service written in go that decodes the data and insert it into a Postgres database. 

The next information requested by the integration dialog is the type of data: zDeviceManager supports both data and conditions streams. Select `data stream` and give it a name like `my-iot-integration`. The most important piece of information required by the integration is the url of the endpoint that will be receiving data. Type `http://hello.zerynth.com/zdm/data` and click `Submit`.

<figure>
  <a data-fancybox="gallery" href="../img/connect-03.png">
  <img src="../img/connect-03.png" />
  </a>
  <figcaption>Integration Tab</figcaption>
</figure>

<figure>
  <a data-fancybox="gallery" href="../img/connect-04.png">
  <img src="../img/connect-04.png" />
  </a>
  <figcaption>Integration Selection</figcaption>
</figure>

<figure>
  <a data-fancybox="gallery" href="../img/connect-05.png">
  <img src="../img/connect-05.png" />
  </a>
  <figcaption>Data Stream Integration</figcaption>
</figure>

<figure>
  <a data-fancybox="gallery" href="../img/connect-06.png">
  <img src="../img/connect-06.png" />
  </a>
  <figcaption>Integration List</figcaption>
</figure>


Data is now flowing from the IoT device to the endpoint on `hello.zerynth.com` and the zDeviceManager will take care of resending any missed batch to avoid any data loss.



## Play with data

The data ingested at `hello.zerynth.com` is stored in a local database that can be queried by any dashboarding solution. We have installed a [Grafana](https://grafana.com/) instance that serves a public dashboard for you to play with. Grafana is one of the best dashboarding tool out there and you can use it without worrying about its maintenance directly from our custom [zDashboard](zdashboard_intro.md) solution.

Dashboards can be easily created by adding panels, and each panel is the result of a query into the incoming data.

To play with the your device data you need to input the id of your workspace (you can find in the web app). By pressing enter in the dashboard workspace field, all the panels will update to display your workspace data.

From the controls in the upper right corner you can change the time range of the panels and even enable auto refresh.

<figure>
  <a data-fancybox="gallery" href="../img/connect-07.png">
  <img src="../img/connect-07.png" />
  </a>
  <figcaption>Test Dashboard</figcaption>
</figure>



## Host your own dashboard

Our little demo dashboard at `hello.zerynth.com` is just a simple example of what can be done with IoT data. However, with zDeviceManager integrations you can easily forward data to your own endpoints. To jump start the deployment of a zDeviceManager compatible endpoint you can refer to our github template [repository](https://github.com/zerynth/demo-template).

It is a simple Docker Compose based repository that creates a setup much similar to the one used in this guide:

- an Nginx instance proxying http requests
- a golang based ingestion service that receives data from the zDeviceManager
- a time series database instance (TimescaleDB)
- a Grafana instance


