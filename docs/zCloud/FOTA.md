# Over the Air Updates

In the life cycle of an IoT device, a remote firmware update (FOTA) is a necessity and must be performed quickly and securely.


During a FOTA, the IoT device needs to:

- download a new firmware
- verify its integrity and authenticity
- test the new firmware
- make it permanent if everything is ok; switch back to the previous working firmware in case of errors

To make the process even more complicated, anything can happen during the firmware update, like power loss and interruption of connectivity.

## How FOTA works

The FOTA process starts with a Zerynth project containing the new firmware. After the project is thoroughly tested, the binary firmware can be uploaded to the zDeviceManger directly from VSCode or by using the cli. 

The zDeviceManager keeps track of all the different versions of a firmware. From the firmware page it is possible to schedule a FOTA, namely sending to a device (or to a fleet) the command to update itself.

<figure>
    <a data-fancybox="gallery" href="../img/fota-firmware-selection.png">
        <img src="../img/fota-firmware-selection.png" />
    </a>
    <figcaption>Firmware selection</figcaption>
</figure>

Once the device receive the request, it start downloading the new firmare from the zDeviceManager.

The new firmware is saved in the internal filesystem of the device and from there it is checked for integrity: if by chance some bytes of the new firmware have been downloaded incorrectly, the FOTA immediately fails without risking to run a corrupted firmware.

When the integrity check is passed, the device resets and gives control to the Zerynth bootloader.

The bootloader is a small program that runs when the device powers up and that is in charge of handling FOTA updates. As the bootloader discovers a new firmware, it starts replacing the old one with the new one while preserving a backup copy in case the old firmware needs to be restored.

This process is extremely delicate: what happens if the power goes down while the bootloader is in the middle of replacing one firmware with the other? Luckily, the Zerynth bootloader is battle tested and engineered for robustness. In case of power loss, it will restart swapping the two firmwares exactly from the point it left without losing a single bit.

Once the swap ends, the bootloader launches the new firmware. Before declaring the FOTA a success, the new firmware must be able to connect to the zDeviceManager and confirm that the FOTA was successful. From now on, the bootloader will always start the new firmware, until the next FOTA request.


## FOTA in 5 minutes

Performing an over the air update with Zerynth is really easy!

For executing a FOTA you need the Zerynth SDK and Zerynth hardware connected to the zDeviceManager.
Just follow the [Zerynth getting started](../gettingstarted/index.md) tutorial and you will be ready in no time.

Once you have a provisioned and connected IoT device, all that is required for a FOTA is to:

- prepare the new firmware
- upload it to the zDeviceManager with a proper version
- trigger a FOTA

All of the above can be done with a single click in VSCode. Just click `FOTA` in the `Zerynth Control Panel`; VSCode will ask for confirmation and will start performing all the steps.

<figure>
    <a data-fancybox="gallery" href="../img/fota-confirmation.png">
        <img src="../img/fota-confirmation.png"/>
    </a>
    <figcaption>FOTA confirmation popup</figcaption>
</figure>

<figure>
    <a data-fancybox="gallery" href="../img/fota-upload.png">
        <img src="../img/fota-upload.png"/>
    </a>
    <figcaption>Firmware upload</figcaption>
</figure>



With the debug console open one can follow the ongoing FOTA process. 
The output of the device will change from this:

<figure>
    <a data-fancybox="gallery" href="../img/fota-step-0.png">
        <img src="../img/fota-step-0.png" />
    </a>
    <figcaption>Firmware before FOTA</figcaption>
</figure>


to this when the device first receives the trigger.

<figure>
    <a data-fancybox="gallery" href="../img/fota-step-1.png">
        <img src="../img/fota-step-1.png" />
    </a>
    <figcaption>Firmware before giving control to bootloader</figcaption>
</figure>

When the firmware download and integrity check is done, the device will reset itself leaving the stage to the Zerynth bootloader.
It will swap the firmwares and prepare the device for the next reboot. It is design with robustness in mind, feel free to manually reset the device multiple times and the FOTA will go on no matter what. 

<figure>
    <a data-fancybox="gallery" href="../img/fota-bootloader.png">
        <img src="../img/fota-bootloader.png" />
    </a>
    <figcaption>Bootloader swapping firmwares</figcaption>
</figure>


As soon as the swap is perfomerd, the new firmware will reboot in testing mode;
When a connection to the zDeviceManager is reestablished, the firmware becomes permanent.

<figure>
    <a data-fancybox="gallery" href="../img/fota-permanent.png">
        <img src="../img/fota-permanent.png" />
    </a>
    <figcaption>New firmware version accepted</figcaption>
</figure>

You can simulate the various failures by doing the following:

- reset the device while the new firmware is downloaded, and check that the FOTA fails in the device page
- reset the device when the new firmware is in testing mode. The bootloader will restore the previous firmware

## FOTA from the web app

Once a firmware is uploaded into a zDeviceManager workspace, it can be sent to devices directly from the web app. From the `Firmwares` tab, 
you can select the firmware you want to send. Each firmware can have multiple versions and for each of them can be triggered with the FOTA button.

<figure>
    <a data-fancybox="gallery" href="../img/fota-device.png">
        <img src="../img/fota-device.png" />
    </a>
    <figcaption>Trigger FOTA on a device</figcaption>
</figure>


It is possible to send a FOTA update to multiple devices at once by selecting a fleet.

<figure>
    <a data-fancybox="gallery" href="../img/fota-fleet.png">
        <img src="../img/fota-fleet.png" />
    </a>
    <figcaption>Trigger FOTA on an entire fleet</figcaption>
</figure>



















