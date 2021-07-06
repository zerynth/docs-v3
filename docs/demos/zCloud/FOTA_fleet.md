# Fleet Actions: Firmware over the air updates

IoT simply means connecting a lot of devices to the internet and letting them interact together with a central server. You will probably have a lot of devices all doing the same function - e.g. ambient temperature sensors which report measured temperature from different rooms inside your apartment. 

As your devices grow in numbers, you will start to organize them into fleets, according to functionality, importance, connection method... Then, one day, you’ll run into the problem of updating the firmware of these fleets. It’s easy to update a single device, but handling many devices is something different altogether. Fleets, each of them having different firmware, is very complicated.
This is the problem that zerynth Cloud solves with fleet operations.


## Simple FOTA demo

In this demo we will create a simple application which just logs the current version string to the RS485 using the SER-EXP expansion board. We will assume that you already did provisioning and your device is registered on the ZDM.


```python
from bsp import board
from expansions import ser
import serial
from networking import wifi
from zdm import zdm
 
def handle_fota(agent, step, arg):
   return 0
 
 
board.init()
 
exp_ser = board.next_expansion(ser, (0,))
 
ser_rs485 = exp_ser.get_serial(baud=9600, mode=serial..MODE_RS485_HALF_DUPLEX)
ser_rs485.write("Serial Initialized\r\n")
 
try:
   wifi.configure(ssid="My-Network-SSID", password="My-Network-PASSWORD")
   wifi.start()
except Exception as e:
   raise e
 
agent = zdm.Agent(on_fota=handle_fota)
agent.start()
 
while True:
   firmware_version = agent.firmware()
   ser_rs485.write(firmware_version + "\r\n")
   sleep(3000) 



```
        
As you can see the application is very simple - it logs the version inside an infinite loop.

After you Compile and run the applicationon the ZM1-DB you will see the default “Factory” version logged each 3 seconds. 


<figure>
  <a data-fancybox="gallery" href="../img/fota_fleet1.png">
  <img src="../img/fota_fleet1.png"width="900"/>
  </a>
</figure>

Now we can upload the same application to the ZDM by just clicking the FOTA button inside the “Zerynth Control Panel”. After this firmware is uploaded to the zCloud it will be automatically marked as the new version and you can check that from the web interface. Navigate to your workspace then click on “Firmwares”  and you will see all the versions you have uploaded.

<figure>
  <a data-fancybox="gallery" href="../img/fota_fleet2.png">
  <img src="../img/fota_fleet2.png"width="900"/>
  </a>
</figure>

Now just click the FOTA button on the right side to start the firmware update process. Then, inside the window which appears, you can select whether this update should affect all devices in the fleet or just a single device. The rest of the operation will be handled automatically, and after the update process is completed you will see that the serial terminal application version string is changed to the one you clicked.


<figure>
  <a data-fancybox="gallery" href="../img/fota_fleet3.png">
  <img src="../img/fota_fleet3.png"width="900"/>
  </a>
</figure>

## More interesting tutorials
Have you checked our [Control Industrial Lamp with EXP-RELAY Demo](../../zm1-db/exp-relay-lamp) and [Temperature and Humidity monitoring with EXP-PROTO Demo?](../../zm1-db/ex-proto-bme280)

We hope you enjoyed this new demo. Feel free to join our [community forum](https://community.zerynth.com/) if you have any additional questions.