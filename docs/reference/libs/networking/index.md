# Introduction

Zerynth SDK provides various networking interfaces: Wifi, Ethernet and GSM.

Interfaces are accessed from a common interface. The normal usage is:

* **import** a network interface specific module (i.e. `eth`)
* **configure** the network interface (i.e. call `eth.configure()` with specific parameters)
* **start** the network interface in order to establish a link (i.e. call `eth.start()`)
* use [protocols](../protocols/index.md) or directly [sockets](sockets.md)
* **stop** the network interface in order to get the link down (i.e. call `eth.stop()`)


Multiple interfaces ca be used together, however the last configured interface is the one used by default
by protocols. Moreover, there is no automatic routing between interfaces based on IP addresses.
