# **Integrate Microsoft Azure IoT with Zerynth Device Manager**

[Microsoft Azure](https://azure.microsoft.com/en-us/) is Microsoft’s public cloud computing platform which offers software as a service (SaaS), platform as a service (PaaS) and infrastructure as a service (IaaS). It comprises more than 600 cloud services and supports varied operating systems, databases, and developer tools. 

Here is a brief overview of some of the most popular Microsoft Azure services:

- Azure Application Services helps you develop, deploy, and maintain various applications on the Azure platform. The most notable application service is Azure IoT. 
- Azure Data Services stores and manages data on the cloud. 
- Azure Development Services offers multiple development tools and services to enhance the overall software development and deployment process. 
- Azure Compute Services are the hosting services responsible for hosting and running application workloads. 
- Azure Network Services refers to those services that perform networking operations within Azure and between Azure and on-premise infrastructures.

**Zerynth Cloud** is the platform that frees you from the burden of maintaining all the technology and infrastructure, while allowing you to focus on the added value of IoT data. Zerynth Cloud is a complete platform designed for IoT applications. From a single interface, you can manage IoT devices, store and visualize data, and gain insights.

## **Why Connect ZDM with Azure IoT**
Simply put, The added value of connecting ZDM to Azure IoT is that the developers get to work with an efficient, easy to use hardware and Device Management service and also get all of the benefits of the cutting edge technology offered by Microsoft Azure Cloud services.

One of the main features of Zerynth hardware is how easy it is to connect any machine to an IoT Cloud service. In a matter of minutes the developer can get industrial sensor data and send it securely to the cloud.
**Let’s look at these benefits with an example for Industrial Process Monitoring**

Depending on the kind of process, users can interface with industrial machines/components and monitor the industrial processes easily, by using the ZM1-DB or the 4ZeroBox.

**As the users hook their data from ZDM to Azure, they will get some Best-in-class features such as:** 

- Azure Stream Analytics: It is a real time analytics service. It’s easily extendable with custom code and built-in machine learning capabilities for more advanced scenarios.
- Azure Functions: It is a serverless computing service, which allows you to run small pieces of code (called "functions") without worrying about application infrastructure. 
- Azure Notification Hubs: This allows you to send notifications to a wide range of mobile platforms and can allow notification of operators and administrators on certain events or alerts which require immediate attention.

These are just a few of the services that users can use, Depending on the application, they can utilize various services on Azure.

## **How to Connect**

The Zerynth DeviceManager natively integrates with [Azure IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/). Azure IoT Hub provides a cloud-hosted solution back-end to connect virtually any device. To create an IoT hub using the Azure portal, check this [link](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-create-through-portal).
It's easy to connect the two. Just create an Azure integration with the correct credentials for your account, and the Device Manager will start creating devices on Azure and sending their data to the IoT Hub.
 
In the Azure IoT Hub, From Shared Access Policies, Select iothubowner and copy the Primary connection string.


<figure>
  <a data-fancybox="gallery" href="../img/connstring.jpg">
  <img src="../img/connstring.jpg"/>
  </a>
</figure>



In Zerynth Device Manager, make a new integration from the workspace menu.


<figure>
  <a data-fancybox="gallery" href="../img/azureint1.jpg">
  <img src="../img/azureint1.jpg"/>
  </a>
</figure>

Select Azure IoT Hub then Data stream Integration


<figure>
  <a data-fancybox="gallery" href="../img/azureint2.jpg">
  <img src="../img/azureint2.jpg"/>
  </a>
</figure>


Then the integration should be up and running.

<figure>
  <a data-fancybox="gallery" href="../img/azureint4.jpg">
  <img src="../img/azureint4.jpg"/>
  </a>
</figure>

Make sure the device is connected to Zerynth Device Manager and sending periodic data to the cloud.
Tip: You can check the device connection status from the connection status option in the devices tab in Zerynth Device Manager.
To view the incoming data from Azure, please head over to the Azure hub or use the Azure IoT Hub extension of VSCode.

<figure>
  <a data-fancybox="gallery" href="../img/azure6.png">
  <img src="../img/azure6.png"/>
  </a>
</figure>

Once your data is in Azure, you can easily insert it in whatever database you want, like CosmoDB, via an Azure Automation.
For Jobs and Fota, you can still use the Zerynth Device Manager from the web app, or even better via an API.

## **More interesting tutorials**

Have you checked our [Zernth Cloud Demos ?](../jobs_relays/) 

We hope you enjoyed this new demo. Feel free to join our [community forum](https://community.zerynth.com/) if you have any additional questions.