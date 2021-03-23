---
layout: blog
title: Protocols Library - mqtt
---
## MQTT

### exception `MQTTError`
Generic MQTT error.

### exception `MQTTConnectionBadVersion`
Protocol versions mismatch on connection.

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
MQTT(host, client_id, username="", password="", port=1883, clean_session=True, keepalive=60, reconnect_after=5000, network_timeout=6000,ctx=())
```

### method `connect`
```python
connect()
```

### method `is_connected`
```python
is_connected()
```

### method `disconnect`
```python
disconnect()
```

### method `pending_subscriptions`
```python
pending_subscriptions()
```

### method `publish`
```python
publish(topic, msg, qos=0, retain=False)
```

### method `receive`
```python
receive()
```

### method `on`
```python
on(sub, callback, qos=1)
```

### method `stats`
```python
stats()
```

### method `loop`
```python
loop()
```
