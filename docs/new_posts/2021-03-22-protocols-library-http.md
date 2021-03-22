---
layout: blog
title: Protocols Library - http
---
## HTTP

### class `HTTP`
```python
HTTP(timeout=5000, ctx=())
```
Create an HTTP object by initializing http/https connection parameters according to the `ctx` sequence. The `timeout`, in milliseconds, is used for connections timeout.

The `ctx` sequence is composed as in the following:
0. `cacert`: a bytearray for the Certification Authority certificate.
1. `clicert`: a bytearray for the client certificate.
2. `clikey`: a bytearray for the client private key.
3. `verify`: a `Bool` that specifies whether the client has to be verified be the server or not.
4. `global`: a `Bool` that specifies whether the global context has to be used or not.
5. `sec`: a `Bool` that specifies whether to use hardware secure element or not.


### method `get`
```python
get(self, url, headers={})
```

### method `post`
```python
post(self, url, headers={}, body="")
```

### method `put`
```python
put(self, url, headers={}, body="")
```

### method `patch`
```python
patch(self, url, headers={}, body="")
```

### method `delete`
```python
delete(self, url, headers={}, body="")
```

### method `head`
```python
head(self, url, headers={})
```

### method `download`
```python
download(self, url, fd, headers={})
```

### method `destroy`
```python
destroy(self)
```


### class `Response`
```python
Response(status, data, headers)
```
