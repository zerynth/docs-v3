---
layout: blog
title: Network Interface
---
## Network Interface

The `net` module is never used directly but it is imported by more specific moduleslike [eth](eth.md) and [wifi](wifi.md)
  
### exception `CantRegisterInterfaceError`
The interface cannot be registered.

### exception `ConnectionError`
Generic connection error.

### exception `ConnectionTimeoutError`
The connection attempt has timed out.

### exception `ResolveError`
Host cannot be resolved to its IP address.

### exception `NetworkGenericError`
Generic network error occurred.

### exception `TLSHandshakeFailed`
The TLS handshake failed.

### exception `TLSGenericError`
Generic TLS error

## Functions

### function `resolve`
```python
resolve(host, ifc)
```
Resolves the symbolic name for the given `host` to its IP address by using the configured DNS server on the interface with `ifc` descriptor and returns a string with the result.

### function `info`
```python
info(ifc)
```
Returns a tuple with the IP parameters associated to the interface with `ifc` descriptor. The tuple is composed by the following elements:
0. `Bool`: DHCP enabled (*True*) or disabled (*False*)
1. `String`: IP address
2. `String`: netmask
3. `String`: gateway
4. `String`: DNS
5. `String`: MAC address

### function `disconnect`
```python
disconnect(ifc)
```
The interface with `ifc` descriptor is stopped, all connections dropped, and all socket closed related to such interface.

### function `down`
```python
down(ifc)
```
The interface with `ifc` descriptor is shut down by releasing all resources and low level drivers associated with it.
