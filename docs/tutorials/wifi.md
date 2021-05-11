# Ethernet and Wifi
Industrial IoT applications need stable and reliable connection with the cloud. Zerynth hardware provides various efficient ways to connect your device to the cloud. In this demo we will look at how the ZM1-Development Board (ZM1-DB)  uses Ethernet and Wi-Fi for communication.
In this tutorial, we will be using:
1.  [Zerynth SDK](https://www.zerynth.com/zsdk/)  - this includes VSCode with the  [VSCode Zerynth extension](https://marketplace.visualstudio.com/items?itemName=zerynth.zerynth3), which is our default development environment.
    
2.  [Zerynth Device Manager](http://zerynth.com/products/software/zdm/) (ZDM) - it helps you register, organize, monitor, and remotely manage IoT devices at scale.
    
3.  [ZM-1 Development Board](https://docs.zerynth.com/latest/hardware/ZM1-Development-Board/) (ZM-1 DB) - an industrial-oriented development board which is easily extendable with Z-BUS and expansion modules.

Connect the ZM-1 DB and PC with a USB cable
<figure>
  <a data-fancybox="gallery" href="../img/zm1-db.jpg">
  <img src="../img/zm1-db.jpg"width="300"/>
  </a>
</figure>

  

Then, follow this simple [instruction](https://docs.zerynth.com/latest/gettingstarted/) of how to install the Zerynth SDK. When the SDK is installed, you can run Visual Studio Code that is already configured with our Zerynth extension.
## WIFI 

Zerynth SDK has been developed for easy use. Developing IoT applications does not have to be complicated.
The [WiFi module](https://docsv3.zerynth.com/latest/reference/libs/networking/wifi/) allows stable and secure communication via simple function calls which are presented in our [API technical reference.](https://docs.zerynth.com/latest/reference/libs/networking/wifi/)  
Moreover, Zerynth SDK provides hardware abstraction, The code runs as-is on all Zerynth supported hardware. Here is a sample of the code:

    from networking import wifi
    wifi.configure(ssid="My-Network", password="My-Password")
    
    wifi.start()

## Ethernet
The Ethernet is widely used in the industrial infrastructure, The [Ethernet library](https://docs.zerynth.com/latest/reference/libs/networking/eth/) is made to be efficient and easy to use. Here is a brief example:

    from networking import eth
    eth.configure(dhcp=True)
    eth.start()
    print(eth.info())
This comparison shows that code is almost identical, Switching from a WiFi connection to Ethernet, or the reverse may never be easier, and is achievable with changing one or two lines of code.
## Connect to ZDM over Wifi
Now, let's set up ZM1-DB to ZDM and send some random data every 5 seconds. For such purposes, you can create a new project or even copy this code over the existing lines of code.

    from bsp import board
    from zdm import zdm
    from networking import wifi
    
    # Set the SSID and password of your wifi network.
    ssid = "MY_NETWORK_NAME"
    passwd = "MY_NETWORK_PASSWORD"
    
    # Configure and connect to the WiFi.
    try:
        print("Configuring WiFi")
        wifi.configure(ssid=ssid, password=passwd)
        print("Connecting to WiFi")
        wifi.start()
        print("Connected!", wifi.info())
    except Exception as e:
        raise e
    
    # Connecting to the ZDM.
    agent = zdm.Agent()
    agent.start()
    
    while True:
        # Generate and publish a random number each 5 seconds.
        data = random(0,100)
        print("Publishing!", data)
        agent.publish({"value":data}, "test")
        sleep(5000)
## Run the firmware
press **Run** on the Zerynth Control Panel The project will be moved to your device and executed!
## Provision the device
You only need to provision your device once for the lifetime of the device, if you haven't already done this step, [Follow this guide.](https://docs.zerynth.com/latest/gettingstarted/#the-magic-of-zero-touch-provisioning)

<figure>
  <a data-fancybox="gallery" href="../img/zdm-wifi.jpg">
  <img src="../img/zdm-wifi.jpg"width="600"/>
  </a>
</figure>


## Connect to ZDM over Ethernet
For connecting to Ethernet, the code will be nearly the same. Just use the Ethernet Library, and everything is taken care of seamlessly.

    from bsp import board
    from zdm import zdm
    from networking import eth
    
    # Configure and connect to the Ethernet.
    try:
        print("Configuring Ethernet")
        eth.configure(dhcp=True)
        print("Connecting to Gateway")
        eth.start()
        print("Connected!", eth.info())
    except Exception as e:
        raise e
    
    # Connecting to the ZDM.
    agent = zdm.Agent()
    agent.start()
    
    while True:
        # Generate and publish a random number each 5 seconds.
        data = random(0,100)
        print("Publishing!", data)
        agent.publish({"value":data}, "test")
        sleep(5000)
## More interesting tutorials
Have you checked our Multithreaded firmware demo and our Watchdog demo? [Click here to check them](https://docs.zerynth.com/latest/demos/zerynth-os/multi_thread_basic/)

We hope you enjoyed this new demo. Feel free to join our [community forum](https://community.zerynth.com/) if you have any additional questions.