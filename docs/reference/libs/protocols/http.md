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
get(url, headers={})
```
Sends a GET request to the `url` with the optional `header` dictionary.

Returns a `Response` object with the server reply.

### method `post`
```python
post(url, headers={}, body="")
```
Sends a POST request to the `url` with the optional `header` dictionary and the `body` string containing the POST data.

Returns a `Response` object with the server reply.


### method `put`
```python
put(url, headers={}, body="")
```
Sends a PUT request to the `url` with the optional `header` dictionary and the `body` string containing the PUT data.

Returns a `Response` object with the server reply.

### method `patch`
```python
patch(url, headers={}, body="")
```
Sends a PATCH request to the `url` with the optional `header` dictionary and the `body` string containing the PATCH data.
﻿
Returns a `Response` object with the server reply.

### method `delete`
```python
delete(url, headers={}, body="")
```
Sends a DELETE request to the `url` with the optional `header` dictionary and the `body` string containing the DELETE data.
﻿
Returns a `Response` object with the server reply.

### method `head`
```python
head(url, headers={})
```
Sends a HEAD request to the `url` with the optional `header` dictionary.

Returns a `Response` object with the server reply.

### method `download`
```python
download(url, fd, headers={})
```
Sends a DOWNLOAD request to the `url` with the optional `header` dictionary and save the returning stream to `fd` file descriptor. If `-1` is passed as `fd` the stream data is returned into the `Response` object.

Returns a `Response` object with the server reply.

### method `destroy`
```python
destroy()
```
Closes the http/https connection, de-initialize the configured connection and all resources freed.

### class `Response`
```python
Response(status, data, headers)
```
This class is used to contain HTTP methods responses. The class attributes are:

* `status` is the HTTP return status from the server, as *integer*.
* `data` stream data when available, as *bytearray*
* `headers` is the set of HTTP headers associated to the request, as *dictionary*.
