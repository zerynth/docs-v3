# VSCode extension

## The VSCode extension is not installed! What can I do?

The VSCode extension can be installed both from the [VSCode marketplace](https://marketplace.visualstudio.com/items?itemName=zerynth.zerynth3) or the SDK installer. As a requirement, it needs Visual Studio Code version 1.51 or higher.
If you already have Visual Studio Code installed, there is a chance you have an old version. If you don't have Visual Studio Code installed, the SDK installer will download and configure it for you.

## The VSCode extension does not show any Zerynth device

Zerynth SDK discovers devices attached to USB by asking the operating system for the list of serial ports.
All the platforms support such query without the installation of specific USB drivers. For some edge cases, it may be necessary to install
[Silicon Labs USB drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers). 

In some linux platforms, in order to query the list of serial ports, particular permissions can be required.
It usually suffices to add some rules to udev by adding the following contenti into `/etc/udev/rules.d/99-zerynth.rules`:

```bash

# rules for ZM1-DB
SUBSYSTEMS=="usb", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="ea60", GROUP="users", MODE="0666"
SUBSYSTEMS=="usb", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="003d", GROUP="users", MODE="0666"

# rules for 4ZeroBox
SUBSYSTEMS=="usb", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="7523", GROUP="users", MODE="0666"


```

and then issuing the command `sudo udevadm control -R` in order to reload the rules. Unplugging and plugging the device back should solve.

Some other linux distributions require the user to belong to a specific group. Check your linux distro information for the correct values.

## The VSCode extension goes black or flickers!

It may be needed to [disable GPU acceleration](https://code.visualstudio.com/updates/v1_40#_disable-gpu-acceleration)

