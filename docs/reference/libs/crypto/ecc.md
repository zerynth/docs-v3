# Elliptic Curves

This module offer cryptographic primitives based on Elliptic Curves. 
In particular it provides key generation and validation, signing, and verifying, for the following curves:

* secp160r1 
* secp192r1 (NISTP192)
* secp224r1 (NISTP224)
* secp256r1 (NISTP256)
* secp256k1 (used by Bitcoin)

For an awesome introduction to ECC check [here](https://www.johannes-bauer.com/compsci/ecc/).
For an online ECC calculator check [here](http://extranet.cryptomathic.com/ecc/index).

The module is based on [MicroECC](https://github.com/kmackay/micro-ecc) patched with functions for enabling public key recovery (mainly for blockchain applications).


## Constants

The module defines the following constants defining curves:

* `SECP160R1`
* `SECP192R1`
* `SECP224R1`
* `SECP256R1`
* `SECP256K1`


## Functions

### function `make_keys`
```python
make_keys(curve)
```

Return a tuple of two elements. The first element is a byte object
containing the uncompressed representation of the generated public key. 
The second element is a byte object containing the representation of the
generated public key.  `curve` is a constant specifying the curve to use.

### function `check_public_key`
```python
check_public_key(curve,pbkey)
```

Return `True` if `pbkey` (in uncompressed format) is a valid public
key for `curve`.


### function `derive_public_key`
```python
derive_public_key(curve,pvkey)
```

Return a byte object containing the uncompressed representation of the
public key matching `pvkey` for curve `curve`.

Raise `ValueError` if derivation is not possible.


### function `compress_key`
```python
compress_key(curve,key)
```

Return a compressed representation of `key`.



### function `decompress_key`
```python
decompress_key(curve,key)
```

Return a uncompressed representation of `key`.


### function `verify`
```python
verify(curve,message,signature, pbkey)
```

Return `True` if `signature` is a valid signature for message
`message` given `curve` and a public key `pbkey`.


### function `sign`
```python
sign(curve,message,pvkey,deterministic = False, recoverable = False)
```

Return the signature of `message` with `pvkey` for curve `curve`. 

The message to sign is not the entire message but a hash of it. The
`deterministic` parameter, if given, creates a deterministic signature
according to [RFC6979](https://tools.ietf.org/html/rfc6979). 

If given, the `deterministic` parameter must be an
instance of a hash class from module `crypto.hash`. Deterministic signatures are not dependent on a good
random number generator for their security and can therefore be used in hardware without such capabilities. 

If `recoverable` is given and `True`, the returned object is a tuple such that the first element is the recovery id and the second element is the signature. The recovery id is a parameter that can be used to derive the public key from a just a valid signature. For more info refer to [this paper](http://www.secg.org/sec1-v2.pdf).

### function `bin_to_hex`
```python
bin_to_hex(key)
```

Convert a binary object to it's string hexadecimal representation

### function `hex_to_bin`
```python
hex_to_bin(key)
```

Convert an hexadecimal string to the binary representation


## Examples

Working with elliptic curves in Zerynth is easy. Here is an example for starting up with the most used functions:

```python


# import elliptic curves
from crypto import ecc
# import sha1 hash
from crypto import sha1

message = "Zerynth"

# import a Public Key for SECP256R1
pb = ecc.hex_to_bin("7A181C7D3AD54EC3817CBAF86EA4E003AD492D8569102392A6EFE0C27E471A65553918EA1BAC86A68C78A30E9FE725EA499E14BEA96C3FE85E2267B74385E56B")
# import a Private Key for SECP256R1
pv = ecc.hex_to_bin("6D5BE10E67D479FF99421A8DE030E2B4C5323EE477DA4C17420936CAC49C261E")

while True:
    # calculate hash of message
    ss = sha1.SHA1()
    ss.update(message)
    digest = ss.digest()

    # Calculate non deterministic signature of digest
    # for SECP256R1 and pv
    signature = ecc.sign(ecc.SECP256R1,digest,pv)
    
    # Calculate the deterministic signature of digest using SHA1
    deterministic_signature = ecc.sign(ecc.SECP256R1,digest,pv,deterministic=sha1.SHA1())

    print("PVKEY:",ecc.bin_to_hex(pv))
    print("PBKEY:",ecc.bin_to_hex(pb))
    # this changes each loop because of random number generator
    print("SIGNED:",ecc.bin_to_hex(signature))
    # this is always the same
    print("SIGNED (det)",ecc.bin_to_hex(deterministic_signature))

    print("VERIFY SIGNATURE:", ecc.verify(ecc.SECP256R1,digest,signature,pb))
    print("VERIFY SIGNATURE (det):", ecc.verify(ecc.SECP256R1,digest,deterministic_signature,pb))
    # tampered digests are detected
    print("VERIFY TAMPERED:", ecc.verify(ecc.SECP256R1,b'\x00'+digest+b'\x00',signature,pb))
    print("-"*20)
    sleep(2000)

```
