# IIR Filter

This module implements Infinite Impulse Response (IIR) filters of generic order.
Filtered data follows the following formula:
```math
y[n] = b[0] * x[n] + b[1] * x[n-1] + ... + b[size_b - 1] * x[n - size_b + 1]
    - a[0] * y[n-1] - a[1] * y[n-2] - ... - a[size_a - 1] * y[n - size_a]
```
with:

* `x[]` the input array with `n` entries;
* `b[]` the Feedforward filter coefficients array with `size_b` entries;
* `y[]` the output array with `n` entries;
* `a[]` the Feedback filter coefficients array with `size_a` entries.

### class IIR_FILTER
```python
IIR_FILTER(b, a)
```
Creates an IIR Filter object with the array `b` and `a` as coefficients.

* `b` is the Feedforward filter coefficients list;
* `a` is the Backward filter coefficients list;

### method filter_array
```python
filter_array(input, reset=False)
```
Filters a given `input` list and returns the resulting output.

* `input` is the input data list to filter;
* `reset` if set to `True`, old values stored in the filter are cleared before filtering the new data. Default value is `False`.

Return a list with the filtered output.

### method reset
```python
reset()
```
Clear current stored output values from the filter.

### method destroy
```python
destroy()
```
Free the memory allocated for the filter.
