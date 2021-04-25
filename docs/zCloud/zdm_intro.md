# Introduction to zDeviceManager


As developers and IoT product designers, we can't neglect the effort needed to deploy, manage and protect our devices for the entire duration of their life cycles.

For this often daunting task, Zerynth developed the zDeviceManager. It is a device management service that speeds up the development of scalable, secure and reliable IoT solutions.

In particular, it takes care of the following:

- **Provisioning**: associate device certificates securely stored in a top-notch crypto element with your zDeviceManager account in just a click. No more cumbersome and insecure credentials generation that hinders security and slows down mass deployments.
- **Connectivity**: transfer data to the zDeviceManager with state of the art two-way authenticated and encrypted TLS connections.
- **Life Cycle Management**: perform complex orchestration tasks by sending jobs and over-the-air updates to your fleets; from an easy to use GUI or programmatically via CLI or REST APIs.
- **Data Availability**: avoid losing precious data by temporarily queueing them on the zDeviceManager when your data sinks are down.
- **Integrations**:  forward data via convenient webhooks or API to your final IoT application or even better to the [zStorage](zstorage_intro.md) and [zDashboard](zdashboard_intro.md) services

zDeviceManager can be adapted to all kinds of deployments, being available as a SaaS hosted by Zerynth or as an on-premises containerized application.

<figure>
  <a data-fancybox="gallery" href="../img/ZDM-diagram-light.jpg">
  <img src="../img/ZDM-diagram-light.jpg" />
  </a>
</figure>


zDeviceManager is based on the following key concepts:

- A **Device** is the cloud representation of the physical IoT device. A zDeviceManager device is associated to a physical device during provisioning. An action performed over a zDeviceManager device (i.e. sending an update or a new configuration) is always reflected and communicated to the physical device.
- A **Workspace** is an entity that groups together all the devices belonging to a single project. zDeviceManager accounts can have multiple independent workspaces, one for each project.
- A **Fleet** is a group of devices belonging to a Workspace. You can use fleets to group devices with similar features and applications. Fleets allow sending bulk device commands, OTA updates and jobs.
- An **Integration** is an interface between the zDeviceManager and other internal or external services like the [zStorage](zstorage_intro.md) or your IoT application backend. Integrations are used to forward data and events out of the zDeviceManager.

Devices send data, events and receive requests from the zDeviceManager. In particular:

- A **Tag** is a data label used for querying data. Each device can publish its data under multiple Tags and the zDeviceManager will take care of dispatching them to integrations accordingly.
- A **Condition** is an event on steroids. Conditions can be opened, updated and closed by devices to notify specific status change (e.i. Battery status). Conditions can be monitored in real-time using the zDeviceManager web interface or via API. 
- A **Job** is a command sent to a device. Jobs map to firmware functions like reset, diagnostics, control, update firmware, etc...


zDeviceManager can be easily accessed via at [https://zdm.zerynth.com](https://zdm.zerynth.com) or, for more advanced usages, via [command Line](../reference/cli/zdm/index.md) or [APIs](../reference/api/zdm/index.md).


## Developing IoT Applications with the zDeviceManager

Developing an IoT application with the zDeviceManager requires a place for storing data. This requirement can have very different implementations depending on the format of data, its frequency, volume and query type:

- a SQL/NoSQL database
- a Kafka cluster
- a time series database like InfluxDB or OpenTSDB
- a third party distributed database (AWS DynamoDB or Azure Cosmo DB)

Whatever the database, you will need to take care of receiving data from the zDeviceManager and inserting into the database.
Let's see how this step can be implemented.


### The Azure way

The zDeviceManager natively integrates with Azure IoT Hub. It's easy to connect the two: just create an Azure integration wih the correct credentials for your account and the zDeviceManager will start creating devices on Azure and sending their data to the IoT Hub. 

Once your data is in Azure, you can easily insert in in whatever database, like CosmoDB via an Azure Automation.

For Jobs and Fota, you can still use the zDeviceManager from the web app, or even better via API.

### The On Premise way

If you don't want to be locked in by a third party cloud or you already have a containerized application, the easiest way to integrate with the zDeviceManager is exposing an endpoint for data ingestion.

Just create a webhook integration from the zDeviceManager web app and point it to the http address of your endpoint. The integration will keep sending data to your endpoint where a service running on your servers will receive them and be responsible for database insertion.

It seems a lot of work but we have you covered: from [here](https://github.com/zerynth/demo-template) you can checkout a demo repository with all the components already in place!

### The SaaS way

Managing a database can be difficult but we have you covered. By integrating the zDeviceManager with out zStorage you don't need to worry about keeping the database online: we manage it for you and we also give you database independent API to access your data from any service.






