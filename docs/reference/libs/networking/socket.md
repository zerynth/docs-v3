---
layout: blog
title: Socket
---
## The socket class

### class `socket`
```python
socket(family=AF_INET, type=SOCK_STREAM, proto=IPPROTO_TCP, fileno=None)
```

This class represents a BSD socket.

Raise `__builtins__.IOError` exceptions if socket creation goes wrong.

Sockets can be used like this:

```python
# import the socket module
import socket
# import a module to access a net driver (wifi, eth,...)
from wireless import wifi
# import the actual net driver
from driver.wifi.your_preferred_net_driver import your_preferred_net_driver

# init the driver
your_preferred_net_driver.init()

# link the wifi to an AP
wifi.link("Your Wifi SSID",WIFI_WPA2,"Your Wifi Password")

# create a tcp socket
sock = socket.socket(type=SOCK_STREAM)

# connect the socket to net address 192.168.1.10 on port 5555
sock.connect(("192.168.1.10",5555))

# send something on the socket!
sock.sendall("Hello World!")
```


### method `fileno`
```python
fileno()
```

Return an integer identifying the underlying socket number.


### method `connect`
```python
connect(address)
```

Tries to connect the underlying socket (tcp or udp) to `address`.
A tcp socket must be connected to be used successfully. Udp sockets are connectionless and everytime a datagram
is sent, the receiver address must be specified (`.sendto`). However if an udp socket is connected to an address,
it can be used with methods like `.recv` and `.send` without specifying a receiver address.
When an udp socket is connected to `address`, datagram packets coming from addresses different from `address` are ignored.


### method `close`
```python
close()
```

Closes the underlying socket. No more input/output operations are possible.


### method `recv`
```python
recv(bufsize, flags=0)
```

Reads at most `bufsize` bytes from the underlying socket. It blocks until `bufsize` bytes are received or an error occurs.

Returns a bytearray containing the received bytes.


### method `recv_into`
```python
recv_into(buffer, bufsize=-1, flags=0)
```

Reads at most `bufsize` bytes from the underlying socket into `buffer`. It blocks until `bufsize` bytes are received or an error occurs.

Returns the number of received bytes.


### method `recvfrom`
```python
recvfrom(bufsize, flags=0)
```

Reads at most `bufsize` bytes from the underlying udp socket. It blocks until a datagram is received.

Returns a tuple (`data`, `address`) where `data` is a bytearray containing the received bytes and `address` is the net address of the sender.


### method `send`
```python
send(buffer, flags=0)
```

Send data to the socket. The socket must be connected to a remote socket.

Returns the number of bytes sent. Applications are responsible for checking that all data has been sent; if only some of the data was transmitted, the application needs to attempt delivery of the remaining data.


### method `sendall`
```python
sendall(buffer, flags=0)
```

Send all data to the socket. The socket must be connected to a remote socket.

Unlike send(), this method continues to send data from bytes until either all data has been sent or an error occurs.
*None* is returned on success. On error, an exception is raised, and there is no way to determine how much data, if any, was successfully sent.


### method `sendto`
```python
sendto(buffer, address, flags=0)
```

Send data to the socket. The socket should not be connected to a remote socket, since the destination socket is specified by address.
Return the number of bytes sent


### method `settimeout`
```python
settimeout(timeout)
```

Set a timeout on blocking socket operations. The `timeout` argument can be a nonnegative integer number expressing milliseconds, or `None`.
If a non-zero value is given, subsequent socket operations will raise a timeout exception if the timeout period value has elapsed before the operation has completed.
If zero is given, the socket is put in non-blocking mode.
If None is given, the socket is put in blocking mode.



## Examples

Sockets are easy to use and require an active network interface.

```python
from bsp import board

from networking import eth
from networking import socket

board.init()
board.summary()

try:
    # Configure ethernet to use dhcp
    eth.configure(dhcp=True)
    # Start the interface
    eth.start()
    # Print the ip, gateway, mask, dns and mac address
    print(eth.info())
    # Try resolving some hostname via dns
    ip=eth.resolve("now.zerynth.com")
    print("resolved",ip)
    if ip != None:
        print("creating socket...")
        # open up a socket to the http server
        s = socket.socket()
        print("connecting socket...")
        # connect to port 80
        s.connect((ip,80))
        # send some HTTP strings
        s.send("GET / HTTP/1.1\n")
        s.send("Host: now.zerynth.com\n\n")
        # receive the response
        b = s.recv(256)
        # print it
        print(b)
        # and remember to close the socket
        print("close socket...")
        s.close()
    print("disconnecting...")
    # sleep a little bit
    sleep(5000)
    # disable ethernet
    eth.stop()
except ConnectionError:
    print("Ethernet Connection Exception")
except ConnectionTimeoutError:
    print("Ethernet Connection Timeout Exception")
except ResolveError:
    print("Resolv error Exception")
except NetworkGenericError:
    print("Generic Ethernet Exception")
except Exception as e:
    raise e


while True:
    sleep(1000)

```
