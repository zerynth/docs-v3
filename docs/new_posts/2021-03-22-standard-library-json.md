---
layout: blog
title: Standard Library - json
---
## JSON

This module define functions to serialize and deserialize objects to and from [JSON](http://json.org) format.
The deserialization of objects is performed using a wrapped version of the awesome and lighting fast [JSMN library](http://zserge.com/jsmn.html).

### function `loads`
```pyhton
loads(data)
```

Returns the object represented in JSON format inside the byte sequence `data`.

Raises ``JSONError`` when `data` contains bad JSON.

### function `dumps`
```python
dumps(obj, indent=0)
```

Returns a JSON representation of the serialized `obj`.

### function `dump`
```python
dump(fd, obj, indent=0)
```

Save a JSON representation of the serialized `obj` into `fd` file descriptor, indented by `indent` spaces.
