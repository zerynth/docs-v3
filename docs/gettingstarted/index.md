# **Zerynth in 5 minutes**


## **What is Zerynth?**
Zerynth is a complete software-hardware platform, It simplifies the development of IoT products by offering modular industrial development boards, production-ready SoC modules and Easy-to-use Python enabled development enviornment.
Zerynth hardware integrates seamlessly with Zerynth cloud, a powerful cloud service that monitors, manages and provisions devices, issues OTAs and procedure calls and visualize data with clear dashboards for the end-user. 

'''Picture of Zerynth as a platform.


To get started, You need one of Zerynth development boards, check the boards and Buy them from our hardware page.

## **Get Started**

This 5 minutes tutorial will show you how to connect your Zerynth board, use our VScode plugin and start sending data to the cloud.

In 4 steps we'll go from zero to sending data securely to the cloud.
1. Install Zerynth
2. Create your first IoT project
3. Prepare the device for the cloud
4. Send data!


## **1. Install Zerynth**

Zerynth installer is an all-in-one application that installs the Zerynth operating system that will be used on the development board, the Zerynth compiler and the VSCode plugin that enables easy and efficient software development.
Zerynth installer supports Windows, Mac and linux.
You can download it from these links:

- [**Windows 10**](https://downloads.zerynth.com/v3/installer/zerynth-installer.exe)
- [**Linux**](https://downloads.zerynth.com/v3/installer/zerynth-installer.AppImage)
- [**Mac**](https://downloads.zerynth.com/v3/installer/zerynth-installer.dmg)

Once downloaded, simply run it and follow the instructions. The installer is run differently depending on your platform.

### Installing for Windows

Double click the `zerynth-installer.exe` you just downloaded. The first time Windows may pop  up a dialog saying that
the application is signed by Zerynth; just click continue to go on with the execution.

TODO: add screenshot of popup

### Installing for Linux

The `zerynth-installer.AppImage` file you just downloaded can be executed in some distributions with a simple double click. However,
in general you may need to give execution permissions to the file before running it. This is done from a terminal with the command `chmod 755 <path-to-zerynth-installer>`.

<figure>
  <a data-fancybox="gallery" href="img/installer-linux-01.png">
  <img src="img/installer-linux-01.png"/>
  </a>
</figure>

### Installing for Mac

The `zerynth-installer.dmg` archive you just downloaded can be double clicked and mounted on the Finder. Just drag the `zerynth-installer` app contained within to the `Applications` folder. Next, click on `Applications` and run the `zerynth-installer` app.

### Install the Zerynth SDK

The installer will install the **Zerynth SDK** in your development machine in a few steps.

<figure>
  <a data-fancybox="gallery" href="img/installer-01.png">
  <img src="img/installer-01.png" width="600"/>
  </a>
</figure>

First, accept the license and terms and press `Install`. This will install the latest version of the SDK together with Visual Studio Code (a.k.a. VSCode) and the VSCode Zerynth Extension (TODO: add link to marketplace).


<figure>
  <a data-fancybox="gallery" href="img/installer-02.png">
  <img src="img/installer-02.png"width="600"/>
  </a>
</figure>
The installer will do its magic and in a couple of minutes will ask you to login to the Zerynth platform.

<figure>
  <a data-fancybox="gallery" href="img/installer-03.png">
  <img src="img/installer-03.png"width="600"/>
  </a>
</figure>

The login is done in your web browser and if everything is ok, you can go back to the installer and start VSCode!

<figure>
  <a data-fancybox="gallery" href="img/installer-05.png">
  <img src="img/installer-05.png"width="600"/>
  </a>
</figure>

## 2. Create your first IoT project

VSCode, together with the VSCode Zerynth extension, is our default development enviroment. We spent quite a lot of effort to make it as user-friendly as possible, hope you enjoy! Let us show how easy it is.

### Clone an example

Let's create your first project by cloning an existing example.

Just press `Ctrl+Shift+P` and type `examples` in the popup that VSCode displays. 
<figure>
  <a data-fancybox="gallery" href="img/project-01.png">
  <img src="img/project-01.png"width="600"/>
  </a>
</figure>
The popup is the VSCode command palette from which most of the available operations (called tasks in the VSCode jargon) can be launched.
Simply choose `Zerynth > Search examples` and then type `ZDM_`. Select the `ZDM_Simple` example and provide a folder to clone it from its repository as shown in the figures below. When ready, click `Clone Zerynth Example` and you are good to go.
<figure>
  <a data-fancybox="gallery" href="img/project-02.png">
  <img src="img/project-02.png"width="600"/>
  </a>
</figure>



Congratulations, you created your first IoT project!


### Connect your Zerynth Hardware

The project is not ready yet, you need to add your wifi network name and password. You can do it easily by modifying the already opened file `main.py` (that by the way is the main entry point of every Zerynth firmware). The two variables are `ssid` and `passwd`, quite self explanatory.

Now that the project knows how to connect to your local network, we need to plug a Zerynth device to your USB port. It doesn't matter if the hardware you have is a [ZM1-DB](TODO/link-to-hardware), a [ZM1-EVA](TODO/link-to-hardware) or the mighty [4ZeroBox](TODO/link-to-hardware); the project will run on all of them seamlessy.

The only thing that you are required to do is to tell VSCode which kind of hardware you want to use! For this, just press the `Connected device` action in the `Zerynth Control Panel` on the left. VSCode will automatically recognize the device connected to your USB (when in doubt, VSCode will ask you to choose between different options) and configure the project accordingly. 

TODO: screenshot of configured project in zerynth control panel.

### Run the firmware

Time is ticking, just press `Run` in the `Zerynth Control Panel` and the project will be moved on your device and executed!
Ignore all the colorful messages for the moment and press `Console` in the `Zerynth Control Panel`. This will open the debug console of your device where you can inspect the device messages. If everything goes well, it will connect to your wifi network but will start printing out misterious messages about MQTT errors. Is this a bug?!? No, it's an advanced security feature! Read on.


## 3. Prepare the device for the cloud

IoT devices are not made only of hardware and firmware. They also have a unique cryptographic identity that links their physical existence with their virtual counterpart in the cloud. Yes, it's a lot, take a breath. Let's say that inside each and every Zerynth hardware there is a secret key protected by a somewhat magical secure element that says "hey, I am device xyz".

What is missing in the picture is some piece of information that says "physical device xyz belongs to you and in the cloud it's called my-device", namely the link between physical identity and cloud identity.

### The magic of zero touch provisioning

This information is generated in a step called **provisioning**. It must be done only once, it's just a click and gives you control over the device forever (or until you decide otherwise).

Just click `ZDM device` in the `Zerynth Control Panel`. You will be asked to create a cloud device, give it a name and accept the confirmation dialog and wait a little.

TODO: add screenshots of provisioning

Under the hood the magic has happened! The device is now linked to your account and nobody can claim it back.

If you now press `ZDM device eye icon` a page will be opened in your browser where you can inspect the cloud identity of your device and a lot more!

TODO: screenshot of ZDM device page

## 4. Send data!

We are almost there! Now press `Run` again and execute the project on your device. This is needed because the provisioning step erased what you loaded before. Now press `Console` and check that the device now does not complain and is sending data to the cloud!

TODO: screenshot of terminal

You can also go back to the web browser and see the data incoming!

TODO: screenshot of ZDM data console

And as a final bonus, from the web browser, press the `Reset` button. It will send a reset request to the device that will, guess what, reset itself. 

After five minutes everything is in place: you have a securely connected device that is forever under your control; it sends data to the cloud but can also receive request from it!


You can learn more at the following resources:
- TODO: tutorial 1
- TODO: tutorial 2
- TODO: etc

### Zerynth Eco-system

But IoT is not just sending data, how about industrial analog sensors, relays or communicating over RS485,RS232 or CAN?

Zerynth Development boards offer a game-changing standard for connecting and adding functionalities to your application.

Expansion boards vary in features and functionalities. Currently, Zerynth offers expansion boards for :

- EXP-IO: Industrial in/out board with 4x Solid State Relays, 2x 4-20mA/0-10V/NTC channels, 2x opto-isolated digital inputs
- EXP-RELAY: Relay board with 4 Power Relays.
- EXP-SER: Serial Communication board offers : CAN, RS232 and RS485 
- EXP-PROTO: Prototyping board for connecting and testing different types of sensors and devices.

Check our hardware page for more details.