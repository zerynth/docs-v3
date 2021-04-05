---
layout: blog
title: ADC
---

## Analog to Digital Conversion

This module loads the Analog to Digital Converter (adc) driver of the embedded device.

When imported, automatically sets the system adc driver to  the default one.

### function `read`
```python
read(pin, samples=1, sps=0)
```

This function returns `samples` number of samples from `pin`. The acquisition is done with `sps` samples per second. If `sps` is `0` the acquisition will be done as fast as possible.
