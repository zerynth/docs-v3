---
layout: blog
title: Standard Library - adc
---

## Analog to Digital Conversion

This module loads the Analog to Digital Converter (adc) driver of the embedded device.

When imported, automatically sets the system adc driver to  the default one.

### functions `read`
```python
read(pin, samples=1)
```

This function returns `samples` number of samples from `pin`.
