---
layout: blog
title: MQTT
---
## MQTT

### exception `MQTTError`
Generic MQTT error.

### exception `MQTTConnectionBadVersion`
Protocol versions mismatch between client and server.

### exception `MQTTConnectionBadIdentifier`
The client identifier is not correct.

### exception `MQTTConnectionServerUnavailable`
The MQTT server is not reachable or does not respond.

### exception `MQTTConnectionBadCredentials`
Wrong username and/or password specified for MQTT connection.

### exception `MQTTConnectionNotAuthorized`
The username specified for MQTT connection is not authorized to establish the connection, even it credentials are correct.

### class `MQTT`
```python
MQTT(host, client_id, username="", password="", port=1883, clean_session=True, keepalive=60, reconnect_after=5000, network_timeout=6000, ctx=())
```
The class is used to create MQTT clients. The parameters are:

* `host` is the server hostname or IP address to connect to and to subscribe for messages.
* `client_id` is "our" client identification.
* `username` is the username used for authentication.
* `password` is the passoword user for the authentication.
* `port` is the server TCP/UDP port to connect to. Default: *1883*.
* `clean_session` if *True* the MQTT is cleaned. Default: *True*.
* `keepalive` is the time period in seconds to send a keep-alive to the server.
* `reconnect_after` is the auto reconnect time in milliseconds.
* `network_timeout` is the timeout in milliseconds for the connections. Currently unused.
* `ctx` is the SSL context. See the description in [HTTP protocol page](!HTTP!)

### method `connect`
```python
connect()
```
Establish MQTT connection using configured parameters during object creation.

### method `is_connected`
```python
is_connected()
```
Return *True* if the connection with the MQTT server has been established; *False* otherwise.

### method `disconnect`
```python
disconnect()
```
Disconnects from the server.

### method `pending_subscriptions`
```python
pending_subscriptions()
```
Return the number of pending topic subscriptions.

### method `publish`
```python
publish(topic, msg, qos=0, retain=False)
```
Publishes the `msg` message related to `topic` subscribers, with `qos` quality of service level. The `retain` flag specifies whether the message has to be kept after a subscriber receives it or not.

### method `receive`
```python
receive()
```
Receive a message, if any, from subscribed topic.

### method `on`
```python
on(sub, callback, qos=1)
```
Registers the `callback` function for the `sub` topic, with `qos` quality of service level.

### method `stats`
```python
stats()
```
Returns a tuple containing statistics counters, composed as in the following:

0. first connection since system startup, in milliseconds.
1. last connection since system startup, in milliseconds.
2. last disconnection since system startup, in milliseconds.
3. number of disconnections.
4. number of received data.
5. number of received messages.
6. number of sent data.
7. number of sent messages.

### method `loop`
```python
loop()
```
Loops waiting for messages receiving and calls the relevant registered callback.
