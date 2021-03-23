# Zerynth Device Manager Library

The Zerynth Device Manager (ZDM) library is the core module for connecting and managing IoT devices with the Zerynth Device Manager. It takes care of the entire lifecycle of an IoT device:
- Connection: configure the required protocols (MQTTS)
- Authentication: prove the authenticity of the device by exploiting the on board secure element containing certificates and secret keys
- Data collection: send data to the ZDM and let the cloud manage it
- Updates: perform over the air updates of the firmware (FOTA) by sending a new firmware to the device
- Control: execute jobs on the device triggered by a remote API



Contents:

* [Getting started](/latest/reference/libs/zerynth/zdm/docs/zdm/)
* [The Agent class](/latest/reference/libs/zerynth/zdm/docs/zdm/#the-device-class)
* [Examples](/latest/reference/libs/zerynth/zdm/docs/examples/)

  * [Simple ZDM](/latest/reference/libs/zerynth/zdm/docs/examples/#simple-zdm)
  * [ZDM Jobs](/latest/reference/libs/zerynth/zdm/docs/examples/#zdm-jobs)
  * [Advanced FOTA update](/latest/reference/libs/zerynth/zdm/docs/examples/#fota-updates)
  * [ZDM Conditions](/latest/reference/libs/zerynth/zdm/docs/examples/#ZDM_Conditions)
  * [ZDM Advanced](/latest/reference/libs/zerynth/zdm/docs/examples/#zdm_advanced)
  * [ZDM Timestamp](/latest/reference/libs/zerynth/zdm/docs/examples/#zdm_timestamp)
  * [ZDM Credentials](/latest/reference/libs/zerynth/zdm/docs/examples/#zdm_credentials)