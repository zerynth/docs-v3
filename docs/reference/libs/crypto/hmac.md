# HMAC

This module implements the HMAC algorithm as described in [RFC 2104](https://tools.ietf.org/html/rfc2104.html).
The module is based on the C library [cifra](https://github.com/ctz/cifra).

## class `HMAC`
```python
class HMAC(key,hashfn)
```

Return a new hmac object. `key` is a bytes or bytearray or string object containing the secret key. `hashfn` is an
instance of a hash function to use in hmac generation. It supports any class in the `crypto.hash` module.

### method `update`
```python
update(data)
```
Update the hmac object with the string `data`. Repeated calls are equivalent to a single call with the concatenation of all 
the arguments: 
```python
m.update(a) 
m.update(b)
```
is equivalent to 
```python
m.update(a+b)
```

### method `digest`
```python
digest()
```
Return the digest of the strings passed to the update method so far. The size depends on `hashfn`.

### method `hexdigest`
```python
hexdigest()
```
Like digest except the digest is returned as a string containing only hexadecimal digits.


## Examples

HMAC class is easy to use:

```python

from crypto import sha1
from crypto import hmac

while True:
    # generate a hmac with key="Python" and sha1 hash
    hh = hmac.HMAC("Python",sha1.SHA1())
    hh.update(message)
    print("HMAC:",hh.hexdigest())
    sleep(5000)

```
