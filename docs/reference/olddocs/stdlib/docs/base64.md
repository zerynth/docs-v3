---
layout: blog
title: Base64
---
## Base64

This module provides functions for encoding binary data to printable
ASCII characters and decoding such encodings back to binary data.
It provides some of the encoding and decoding functions for the encodings specified in
:rfc:`3548`, which defines the Base64 algorithm.

The :rfc:`3548` encodings are suitable for encoding binary data so that it can
safely sent by email, used as parts of URLs, or included as part of an HTTP
POST request.


### function `standard_b64encode`
```python
standard_b64encode(s)
```

Encode `s` (either bytes, bytearray or string) using the standard Base64 alphabet and return the encoded object as bytes.


### function `standard_b64decode`
```pyhton
standard_b64decode(s)
```

Decode `s` (either bytes, bytearray or string) using the standard Base64 alphabet and return the decoded object as bytes.
