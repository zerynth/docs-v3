# Hash functions

Zerynth SDK offers various modules implementing secure hash functions.
Each module implements a common interface:

- an instance of the hash class is created
- data is fed to the instace with the `update()` method accepting either strings or bytes
- at any point a digest can be requested in hexadecimal or binary format


## MD5

### class `MD5`
```python
class MD5()
```

This class allows the generation of MD5 hashes. It is thread safe.

### method `update`
```python
update(data)
```

Update the md5 object with the string/bytes `data`. Repeated calls are equivalent to a single call with the concatenation of all
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

Return the digest of the strings passed to the update method so far. This is a 16-byte bytes object.

### method `hexdigest`
```python
hexdigest()
```

Return the digest of the strings passed to the update method so far. This is a 32-byte string with the hexadecimal representation of the binary digest.

## SHA1

This module implements the interface to NIST’s secure hash algorithm, known as SHA-1. SHA-1 is an improved version of
the original SHA hash algorithm.

The module is based on the C library [cifra](https://github.com/ctz/cifra).

### class `SHA1`
```python
class SHA1()
```

This class allows the generation of SHA1 hashes. It is thread safe.

### method `update`
```python
update(data)
```

Update the sha1 object with the string/bytes `data`. Repeated calls are equivalent to a single call with the concatenation of all
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

Return the digest of the strings passed to the update method so far. This is a 20-byte bytes object.

### method `hexdigest`
```python
hexdigest()
```

Return the digest of the strings passed to the update method so far. This is a 40-byte string with the hexadecimal representation of the binary digest.

## SHA2

This module implements the interface to NIST’s secure hash algorithm, known as SHA-2.
The class supports 4 variants of SHA2, selectable in the constructor with one of the following constants:

* `SHA224`
* `SHA256`
* `SHA284`
* `SHA512`

The module is based on the C library [cifra](https://github.com/ctz/cifra).

### class `SHA2`
```python
class SHA2(hashtype=SHA256)
```
 This class allows the generation of SHA2 hashes. It is thread safe. By default, it calculates the `SHA256` variant of SHA2. 
 This behaviour can be changed by passing a different value for `hashtype`.

### method `update`
```python
update(data)
```

Update the sha2 object with the string/bytes `data`. Repeated calls are equivalent to a single call with the concatenation of all
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

Return the digest of the strings passed to the update method so far. This is a byte object with length depending on the SHA2 variant.

### method `hexdigest`
```python
hexdigest()
```

Return the digest of the strings passed to the update method so far. 


## SHA3

This module implements the interface to NIST’s secure hash algorithm, known as SHA-3. 
The class supports 4 variants of SHA3, selectable in the constructor with one of the following constants:

* `SHA224`
* `SHA256`
* `SHA284`
* `SHA512`
    
The module is based on the C library [cifra](https://github.com/ctz/cifra).

### class `SHA3`
```python
class SHA3(hashtype=SHA256)
```
 This class allows the generation of SHA3 hashes. It is thread safe. By default, it calculates the `SHA256` variant of SHA3. 
 This behaviour can be changed by passing a different value for `hashtype`.

### method `update`
```python
update(data)
```

Update the sha3 object with the string/bytes `data`. Repeated calls are equivalent to a single call with the concatenation of all
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

Return the digest of the strings passed to the update method so far. This is a byte object with length depending on the SHA3 variant.

### method `hexdigest`
```python
hexdigest()
```

Return the digest of the strings passed to the update method so far. 


## Keccak

This module implements the interface to [Keccak](https://keccak.team/index.html) secure hash functions. 
There is a lot of confusion about the relation between Keccak hash functions and SHA3 hash functions.

The NIST organized a contest to develop the next standard secure hash function to use in place of SHA2. The Keccak team won the competition
with its reference implementation known as Keccak secure hash. However the NIST changed the Keccak implementation before making it a standard known as SHA3 in 2015. 

The standard SHA3, described in [FIPS202](http://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf) is therefore different from the original Keccak (by the value of the padding bytes). Even if SHA3 is now the standard, Keccak hash is still important because, since the contest lasted from 2008 to 2015, in that time many software projects recognized the enhanced security of Keccak and included the original implementation before the standard was published. 

One of such project is the blockchain [Ethereum](https://en.wikipedia.org/wiki/Ethereum). Sadly, both Keccak and official SHA3 are often simply called SHA3, arising much confusion. One simple way to test an implementation of a SHA3 algorithm is to 
generate the hash of the empty string:

* `c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470` is the original Keccak-256
* `a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a` is the NIST SHA3-256
    
The class supports 4 variants of Keccak, selectable in the constructor with one of the following constants:

* `KECCAK224`
* `KECCAK256`
* `KECCAK284`
* `KECCAK512`
    
The module is based on a patched version of the C library [cifra](https://github.com/ctz/cifra).

### class `Keccak`
```python
class Keccak(hashtype=KECCAK256)
```
 This class allows the generation of Keccak hashes. It is thread safe. By default, it calculates the `KECCAK256` variant. 
 This behaviour can be changed by passing a different value for `hashtype`.

### method `update`
```python
update(data)
```

Update the sha3 object with the string/bytes `data`. Repeated calls are equivalent to a single call with the concatenation of all
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

Return the digest of the strings passed to the update method so far. This is a byte object with length depending on the Keccak variant.

### method `hexdigest`
```python
hexdigest()
```

Return the digest of the strings passed to the update method so far. 


## Examples

Using hash function is straightforward:

```python

# import all hashes
from crypto import md5
from crypto import sha1
from crypto import sha2
from crypto import sha3
from crypto import keccak

message = "Zerynth"


while True:
    ss = md5.MD5()
    ss.update(message)
    print("MD5: ",ss.hexdigest())

    ss = sha1.SHA1()
    ss.update(message)
    print("SHA1:",ss.hexdigest())
    
    ss = sha2.SHA2(sha2.SHA512)
    ss.update(message)
    print("SHA2:",ss.hexdigest())
    
    ss = sha3.SHA3()
    ss.update(message)
    print("SHA3:",ss.hexdigest())

    ss = keccak.Keccak()
    ss.update(message)
    print("KECCAK:",ss.hexdigest())


    sleep(5000)
```
