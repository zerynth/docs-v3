---
layout: blog
title: Standard Library - cbor
---
## CBOR

This module define functions to serialize and deserialize objects to and from [CBOR](http://cbor.io>) format.
The serialization and deserialization of objects is performed using a wrapped version of the awesome and lighting fast [libcbor](http://libcbor.org/)


### function `loads`
```python
loads(data)
```

Returns a Python object represented by the byte sequence `data`.
For CBOR specific structures such as `tags` and `undefined` values, 
the function returns instances of the :class:`Tag` and :class:`Undefined` classes.

Raises `ValueError` when `data` contains bad or unsupported CBOR.


### function `dumps`
```python
dumps(obj)
```
Returns a bytes object containing the CBOR representation of *obj*.
If a Python object is not serializable to CBOR, it is serialized to :class:`Undefined`.
The function always produces definite major types (bytestrings, string, arrays and maps).
To generate CBOR specific structures such as *tags* and *undefined* values, pass as argument instances
of the :class:`Tag` and :class:`Undefined` classes.

Raises `RuntimeError` when `obj` can't be serialized.


=========
Tag class
=========

### class `Tag`
```python
Tag(tag, value)
```
Create a Tag instance. Tag instances have two attributes, :samp:`tag` and :samp:`value` that can be manually changed if needed.
:samp:`tag` must be an integer while :samp:`value` can be any CBOR serializable python object.
An instance of this class is returned during deserialization if a tag is found.


===============
Undefined class
===============

### class `Undefined`
```python
Undefined()
```
Create an Undefined instance. Since Python has no undefined values, this class is used to both serialize and deserialize this kind of data.
