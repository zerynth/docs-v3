# ADC

This is a demo about simple analog to digital conversion. Reading from ADC pins are shown in different modalities:

- single reading of a raw value (integer, 12 bits)
- single reading of a raw value converted to voltage
- multiple readings of raw values

    More information about modules used in this demo:

- [ADC](../reference/libs/stdlib/adc.md)

```python
# Import necessary modules.
import adc

# Reference voltage and ADC resolution values.
VOLTAGE_REFERENCE = 3.3
ADC_RESOLUTION = 4095

# Print initial message.
print("Hello ADC!")

while True:

    # Single ADC sample read from A0 pin.
    val = adc.read(A0)
    print("Single sample: ", val)

    # Convert ADC read to voltage.
    voltage = val * VOLTAGE_REFERENCE / ADC_RESOLUTION.
    print("Voltage: ", val, " V")

    # Acquire 4 samples with default sampling period.
    samples = adc.read(A0, 4)
    print("Samples: ", samples)

    sleep(300)
```

