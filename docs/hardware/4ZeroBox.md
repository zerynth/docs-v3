# 4ZeroBox

The 4ZeroBox is a modular hardware electronic unit that simplifies the development of Industrial IoT applications allowing rapid integration with sensors, actuators, and Cloud services.

4ZeroBox mounts a powerful ESP32 Microcontroller by Espressif Systems (240MHz, 16Mb Flash, 512KB SRAM) and provides many onboard features like: a DIN-rail mountable case with industrial grade sensor channels, support for Wi-fi, Bluetooth, Ethernet, LoRa, CAN, RS485, RS232, SD Card, JTAG, I2C, SPI; last but not least, there are 2 on-board MikroBUS sockets to extend the 4ZeroBox with hundreds of MikroElektronika click boards (see “MikroBus Slots” section).

![](img/4zerobox_v1.png)

## Resources

For more infos about electrical connections, and how to use 4ZeroBox with sensors and other hardware, see the  [user manual](https://www.zerynth.com/download/13894/).

For more information on the 4ZeroBox Library as software drivers, Its features, functions and examples
[Please check this Link](/latest/reference/libs/zerynth/4zerobox/docs/)

Other useful documents are:

-   [Datasheet](https://www.zerynth.com/download/13895/)
-   [Quick Guide](https://www.zerynth.com/download/15283/)

	


## Pin Mapping

![](img/4zeroboxpin.png)

Official reference for Zerynth 4ZeroBox can be found  [here](https://www.zerynth.com/4zeroplatform/).

## Flash Layout

The internal flash of the ESP32 module is organized in a single flash area with pages of 4096 bytes each. The flash starts at address 0x00000, but many areas are reserved for Esp32 IDF SDK and Zerynth OS. There exist two different layouts based on the presence of BLE support.

In particular, for non-BLE VMs:

# Espressif ESP32 Partition Table
# Name,   Type, SubType, Offset,  Size
nvs,       data,   nvs,       0xa000,   0x5000
phy_init,  data,   phy,       0xf000,   0x1000
os,         app,  factory,    0x10000,  2M
bc,         254,     0,       0x210000, 1M
park,       254,     0,       0x310000, 3M
scratch,    254,     0,       0x610000, 3M
otalog,     254,     0,       0x910000, 64k
fs,        data, spiffs,      0x920000, 7208960

| Start address | Size  | Content                 |
|---------------|-------|-------------------------|
| 0x0000A000    | 20Kb  | Esp32 NVS area          |
| 0x0000F000    | 4Kb   | Esp32 PHY data          |
| 0x00010000    | 2Mb   | Zerynth VM              |
| 0x00210000    | 1Mb   | Zerynth Bytecode        |
| 0x00310000    | 3Mb   | Zerynth Park (FOTA)     |
| 0x00610000    | 3Mb   | Zerynth Scratch (FOTA)  |
| 0x00910000    | 64Kb  | Zerynth Otalog          |
| 0x00920000    | 7040Kb| File System             |

## Device Summary

-   DIN-rail mountable (9 slots)
    
-   8 to 36V Power Supply
    
-   4 selectable analog input channels:
    
    > -   4-20mA single-ended
    > -   4-20mA differential
    > -   0-10V standard
    
-   3 current transformers (non-invasive)
    
-   4 resistive sensor channels (NTC, RTD, contact, proximity, etc.)
    
-   2 opto-isolated digital inputs
    
-   2 sink digital output (60A @ 30V)
    
-   MicroSD card slot
    
-   1 Digital I/O + 2 Digital Input (3.3V)
    
-   2 NO/NC Relay (10A @ 250V AC)
    
-   CAN peripheral
    
-   Connectivity:
    
    > -   WiFi IEEE 802.11 b/g/n/e/i (Client and AP mode supported)
    > -   Bluetooth® Low-Energy
    > -   Ethernet
    
-   Crypto Chip - Secure Hardware Encryption
    
-   RS-485 and RS232 peripherals
    
-   2 onboard mikroBUS sockets
    
-   Li-Po battery support
    
-   Li-Po battery onboard charging unit
    
-   RGB status led
    
-   Espressif ESP32 - 32bit Microcontroller 240MHz clock, 4Mb of Flash, 312Kb SRAM
    

## Power

Power to the 4ZeroBox is supplied via the on-board USB Micro B connector or directly via the “24V” screw. The power source is selected automatically. Zerynth 4ZeroBox has also a JST Li-Po battery connector (3.7V).

## Connect, Register, Virtualize and Program

The 4ZeroBox comes with a serial-to-usb chip on board that allows programming and opening the UART of the ESP32 module. The CH340 USB to UART chip is also connected to the boot pins of the module, allowing for a seamless virtualization of the device.

!!! Note
	**For Linux Platform**: to allow the access to serial ports the user needs read/write access to the serial device file. Adding the user to the group, that owns this file, gives the required read/write access:
-   **Ubuntu**  distribution –> dialout group
-   **Arch Linux**  distribution –> uucp group

Once connected on a USB port, if drivers have been correctly installed, the 4ZeroBox device is recognized by Zerynth Studio. The next steps are:

-   **Select**  the 4ZeroBox on the  **Device Management Toolbar**  (disambiguate if necessary);
-   **Register**  the device by clicking the “Z” button from the Zerynth Studio;
-   **Create**  a Virtual Machine for the device by clicking the “Z” button for the second time;
-   **Virtualize**  the device by clicking the “Z” button for the third time.

!!!Note
	No user intervention on the device is required for registration and virtualization process

After virtualization, the 4ZeroBox is ready to be programmed and the Zerynth scripts  **uploaded**. Just  **Select**  the virtualized device from the “Device Management Toolbar” and  **click**  the dedicated “upload” button of Zerynth Studio.

!!!Note
	No user intervention on the device is required for the uplink process.
<!--
## Board Support Package

For the BSP pack of the 4ZeroBox, The following modules are supported:
-   Ethernet
-   Wifi
-   GSM

Brief Example on how to use it : 
```py
from bsp.drivers import wifi

...

wifi.init()
print("Connecting to wifi...")
interface = wifi.interface()
interface.link("***Wifi-ssid***", interface.WIFI_WPA2, "***Wifi-password****")

```
-->
## Firmware Over the Air update (FOTA)

The Firmware Over the Air feature allows to update the device firmware at runtime. Zerynth FOTA in the 4ZeroBox device is available for bytecode and VM.

Flash Layout is shown in table below:

| Start address | Size  | Content                   |
|---------------|-------|---------------------------|
| 0x00010000    | 1Mb   | Zerynth VM (slot 0)       |
| 0x00110000    | 1Mb   | Zerynth VM (slot 1)       |
| 0x00210000    | 512Kb | Zerynth Bytecode (slot 0) |
| 0x00290000    | 512Kb | Zerynth Bytecode (slot 1) |

For BLE VMs:

| Start address | Size   | Content                   |
|---------------|--------|---------------------------|
| 0x00010000    | 1216Kb | Zerynth VM (slot 0)       |
| 0x00140000    | 1216Kb | Zerynth VM (slot 1)       |
| 0x00270000    | 320Kb  | Zerynth Bytecode (slot 0) |
| 0x002C0000    | 320Kb  | Zerynth Bytecode (slot 1) |

For Esp32 based devices, the FOTA process is implemented mostly by using the provided system calls in the IDF framework. The selection of the next VM to be run is therefore a duty of the Espressif bootloader; the bootloader however, does not provide a failsafe mechanism to revert to the previous VM in case the currently selected one fails to start. At the moment this lack of a safety feature can not be circumvented, unless by changing the bootloader. As soon as Espressif relases a new IDF with such feature, we will release updated VMs.

## Secure Firmware

Secure Firmware feature allows to detect and recover from malfunctions and, when supported, to protect the running firmware (e.g. disabling the external access to flash or assigning protected RAM memory to critical parts of the system).

This feature is strongly platform dependent; more information at  [Secure Firmware - ESP32 section](/latest/reference/core/stdlib/docs/sfw/#watchdogs-for-esp32-devices).

## Zerynth Secure Socket

To be able to use Zerynth Secure Socket on esp32 boards  `NATIVE_MBEDTLS:  true`  must be used instead of  `ZERYNTH_SSL:  true`  in the  `project.yml`  file.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5MzIwMjAxOCwtMzA3MTU1ODQwLDIwMT
E0OTI2NV19
-->
