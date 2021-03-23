## WiFi

This module implements a generic wifi interface.
To function correctly it needs a wifi driver to be loaded, so that the module can use the driver to access the underlying hardware.

The link between the wifi module and the wifi driver is established without the programmer intervention by the driver itself.

This module defines the following constants:

* `WIFI_OPEN`            = 0; Open Wifi network
* `WIFI_WEP`             = 1; Wifi Network secured with WEP
* `WIFI_WPA`             = 2; Wifi Network secured with WPA
* `WIFI_WPA2`            = 3; Wifi Network secured with WPA2
* `WIFI_WPA_WPA2`        = 4; Wifi Network secured with WPA or WPA2
* `WIFI_WPA2_ENTERPRISE` = 5; Wifi Network secured with WPA2 enterprise
* `WIFI_WPA3`            = 6; Wifi Network secured with WPA3
* `WIFI_WPA2_WPA3`       = 7; Wifi Network secured with WPA2 or WPA3

## Exception

### exception `WifiException`
Generic exception

### exception `WifiBadPassword`
The configured password is not correct.

### exception `WifiBadSSID`
The configured SSID is not available between visible WiFi networks.

## Functions

### function `configure`
```python
configure(ssid="", password="", security=WPA_WPA2, dhcp=True, ip="", mask="", gateway="", dns="8.8.8.8")
```
Configures the wifi interface with given arguments.
* `ssid` is the WiFi name to associate to.
* `password` the the shared secret for the `ssid` network.
* `security` is the encryption type to be used.

If `dhcp` is *True* (the default) other following arguments are ignored.
When `dhcp` is *False*, the other arguments are:
* `ip`: is the IP address.
* `mask`: the net mask expressed as A.B.C.D dotted address.
* `gateway`: the gateway to be used as default router.
* `dns`: the Domain Name Server to be used for name resolution. Default is "8.8.8.8", the Google DNS. 

### function `start`
```python
start()
```
The function starts the interface by initiating the WiFi association process and stating the DHCP configuration and other IP setups (routing, DNS, etc.).
The DHCP or static IP parameters are used depending upon the arguments passed to the `configure()` function.

### function `stop`
```python
stop()
```
The interface is stopped, all connections dropped, and all socket closed related to wifi interface.

### function `resolve`
```python
resolve(host)
```
Resolves the symbolic name for the given `host` to its IP address by using the configured DNS server and returning a string with the result.

### function `info`
```python
info()
```
Returns a tuple with the IP parameters associated with the interface. The tuple is composed by the following elements:
0. `Bool`: DHCP enabled (*True*) or disabled (*False*)
1. `String`: IP address
2. `String`: netmask
3. `String`: gateway
4. `String`: DNS
5. `String`: MAC address
