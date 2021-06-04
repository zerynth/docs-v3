# **Getting started with Visual Studio Code**

The official development environment for Zerynth is [Visual Studio Code](https://code.visualstudio.com/) powered by the Zerynth VSCode extension.

The extension is a plugin that adds Zerynth functionality to VSCode.

First, you need to install the [Zerynth SDK](index.md#1-install-zerynth), it takes just a couple of minutes.
If you have VSCode already installed, the Zerynth VSCode extension will be added. Otherwise, we will also install VSCode for you.

## **1. Run Visual Studio Code**

If you were already using Visual Studio Code, you can just start it as usual.
If you never used it before, there is a detailed introduction [here](https://code.visualstudio.com/docs).

You can start VSCode:

- in Windows, from the Start Menu or by typing `zcode` from Powershell
- in Mac and Linux, from `bash` or `zsh` terminals by typing `zcode`


The extension adds some panels and tabs.
In particular, in the Explorer tab (`Ctrl+Shift+E`) three more panels are present for managing projects, searching examples and integrating with the [zDeviceManager](../zCloud/zdm_intro.md). Moreover the extension also modifies some standard panels adding shortcuts to common actions.

Let's quickly go through them.

### **Explorer Tab**

When no projects are opened, VSCode shows a `No Folder Opened` panel with some shortcuts to create a new Zerynth project from scratch or from existing examples.

<figure>
  <a data-fancybox="gallery" href="../img/vscode-01-startup.png">
  <img src="../img/vscode-01-startup.png" />
  </a>
  <figcaption>VSCode opening page</figcaption>
</figure>

### **Zerynth Control Panel**

The Zerynth control panel is the main entry point for the SDK functionalities and its content is available as soon as a Zerynth project is opened. You can perform all common actions on a device in this panel: from configuring the current project for a specific Zerynth hardware to sending an over the air update to devices.

<figure>
  <a data-fancybox="gallery" href="../img/control_panel_no_device.jpg">
  <img src="../img/control_panel_no_device.jpg" />
  </a>
  <figcaption>Zerynth Control Panel</figcaption>
</figure>

### **Zerynth Examples**

From this panel the vast collection of examples can be browsed by category or searched by content. Cloning an example is the quickest way to create a working new project.

<figure>
  <a data-fancybox="gallery" href="../img/zerynth-examples-panel.png">
  <img src="../img/zerynth-examples-panel.png" />
  </a>
  <figcaption>Zerynth Examples Panel</figcaption>
</figure>


### **Zerynth Device Manager**

From this panel you can interact with the zDeviceManager (ZDM) by browsing through the fleets of devices connected to the [zCloud](../zCloud/index.md)

### **Zerynth Tab**

In the Zerynth tab reachable from the Zerynth logo on the VSCode sidebar, you can access a new view with the list of opened serial consoles, the list of supported devices and a ZDM panel.


## **2. Create and run a project**

Let's create a new Zerynth project by pressing `Ctrl+Shift+P`, typing `new` and selecting `Zerynth > New Project`. You need to specify a folder where to create the project and the Explorer tab populates itself with a minimal Zerynth project with:

<figure>
  <a data-fancybox="gallery" href="../img/zerynth-explorer-panel.png">
  <img src="../img/zerynth-explorer-panel.png" />
  </a>
  <figcaption>Zerynth Examples Panel</figcaption>
</figure>

- `main.py`, the entrypoint for the firmware
- `config.yml`, the advanced project configuration
- `resources`, a folder with an image of the internal filesystem
- `.zerynth`, a folder with automatic configuration, don't modify it!

Now plug your [Zerynth hardware](../hardware/index.md) into a USB port and click `Physical device` in the `Zerynth Control Panel` or press `Ctrl+Shift+P` and type `Zerynth > Set Device type`.

The hardware is automatically recognized and the project is configured for it.

As usual you can either click `Run` or press `Ctrl+Shift+P` and type `Zerynth > Run` to build the project and transfer it on the hardware to be executed.

Notice that the various terminal tabs on VSCode are displaying the output of each operation.

<figure>
  <a data-fancybox="gallery" href="../img/vscode-02-task.png">
  <img src="../img/vscode-02-task.png" />
  </a>
  <figcaption>Run output on a terminal</figcaption>
</figure>


## **3. Debug and monitor**

Now that the project is running, click `Console` and a terminal tab will open showing all the output printed by the device.
This is the standard way to debug and monitor the output of a program. 

However sometime a program may fail with an error that in Python is called an `Exception`. When this happens, in the tab `Problems` one can easily click on the problem itself and being redirected to the source code line that caused the error.

## **4. Access the documentation**

In the `Zerynth Control Panel` there are many shortcuts to the documentation, a core part of an IoT development journey.
By clicking `Device documentation` the documentation page for the device is opened in the browser. 
If you need the names of pins or the position of a communication bus, just click `Device pinmap` and you will be taken to the device schematics page.


## **5. Explore the zDeviceManager**

The extension is also integrated with the zCloud, in particular with the zDeviceManager. The `Zerynth Control Panel` allows interacting with the cloud counterpart of the physical device. To start accessing the cloud, just press `Provisioning` and accept the warning about the current program being deleted. The provisioning process creates a cloud device and associates it with your physical device in your Zerynth account. 

After a successful provisioning your physical device can connect to the zDeviceManager and send data.
Moreover you can jump directly to the cloud device web page by clicking on `Cloud device`. You can also perform an over the air update of the firmware by clicking `FOTA`! The [over the air update](../zCloud/FOTA.md) is one of the essentials features of the zDeviceManager that allows managing all your devices remotely with just a click.

<figure>
  <a data-fancybox="gallery" href="../img/vscode-03-zdm.png">
  <img src="../img/vscode-03-zdm.png" />
  </a>
  <figcaption>Zerynth ZDM panel</figcaption>
</figure>


