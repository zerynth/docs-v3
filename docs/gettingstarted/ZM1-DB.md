# **Getting Started with ZM1-Development Board**

So you have a shiny new ZM1 Development Board (ZM1-DB) and would like to start playing with it?
First, you need to install the [Zerynth SDK](zerynth.com/products/zsdk), it takes just a couple of minutes.
When the SDK is installed, you can run Visual Studio Code that comes already configured with our Zerynth extension.


## **1. Create a project**

Before connecting the ZM1-DB a project must be created. 
Zerynth SDK provides a lot of examples that can be easily cloned and used as a starting point for a new project.

Just press `Ctrl+Shift+P` and type `examples` in the popup that VSCode displays.

<figure>
  <a data-fancybox="gallery" href="../img/clone-hello-zerynth.png">
  <img src="../img/clone-hello-zerynth.png" />
  </a>
</figure>

The popup is the VSCode command palette from which most of the available operations can be launched.
Simply choose `Zerynth > Search examples` and then type `Hello`. Select the `Hello_Zerynth` example and provide a folder to clone it from its repository as shown in the figures below. When ready, click `Clone Zerynth Example` and you are good to go.

<figure>
  <a data-fancybox="gallery" href="../img/example-hello-zerynth.png">
  <img src="../img/example-hello-zerynth.png" />
  </a>
  <figcaption>The Hello Zerynth example</figcaption>
</figure>

## **2. Connect and configure the ZM1-DB**

Connect the ZM1-DB with a USB-C cable to the development machine. The VSCode extension provides a panel labeled *Zerynth Control Panel* that contains information about the current project.

Press *Physical Device* and the Zerynth SDK will automatically recognize the ZM1-DB and configure the project accordingly.

<figure>
  <a data-fancybox="gallery" href="../img/zerynth-control-panel-no-device.png">
  <img src="../img/zerynth-control-panel-no-device.png" />
  </a>
  <figcaption>Control Panel before selecting the physical device</figcaption>
</figure>

<figure>
  <a data-fancybox="gallery" href="../img/zerynth-control-panel-with-device.png">
  <img src="../img/zerynth-control-panel-with-device.png" />
  </a>
  <figcaption>Control Panel after selecting the physical device</figcaption>
</figure>


## **3. Run the example**

Check the project for errors by pressing *Build*. If everything is ok, you can press *Run*. The Zerynth SDK compiles the source files, creates a binary firmware and moves it into the ZM1-DB.

Just press *Console* and the serial output of ZM1-DB will appear in the VSCode terminal.

<figure>
  <a data-fancybox="gallery" href="../img/example-hello-zerynth-console.png">
  <img src="../img/example-hello-zerynth-console.png" />
  </a>
  <figcaption>Hello Zerynth console</figcaption>
</figure>

## **4. Explore the ZM1-DB**

For more information on the ZM1-DB hardware features, components and user manual, Please refer to the [ZM1-DB Hardware page](../hardware/ZM1-Development-Board.md)

Zerynth can do much more than a simple Hello World, for additional examples refer to:

- [Tutorials](../tutorials/index.md)
