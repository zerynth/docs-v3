# Sensor

The `sensor` module allows the automatic configuration of `Sensor` objects from a simple JSON configuration. Sensor objects abstract away the complexity of reading industrial sensors connected to ADC channels of various types: current, voltage, resistive.

The configuration of the sensors is provided as a `sensors.json` file placed under the `resources` folder of a project.

The `sensors.json` is structured as follows:
```
{
    "sensor_name_1": {
        "set": {
            "type": "type of adc",
            "exp": null,
            "input_number": 2,
            "PGA": 2,
            "SPS": 7
        },
        "conversion": {
            "type": "type_of_conversion_1",
            "args": {
                ...
                required data for the conversion
                ...
            }
        }
    },
    "sensor_name_2": {
	    "set": {
	        "type": "type of adc",
	        "exp": null,
	        "input_number": 1,
	        "PGA": 2,
	        "SPS": 1000
    	},
    	"conversion": {
	        "type": "type_of_conversion_1",
	        "args": {
	    	    ...
                required data for the conversion
                ...
	        }
	    }
    }
}
```

where:

* `sensor name` is the custom name for the sensor. This will be used as a label in Python to refer to the sensor object.

* `set` is a set of configuration values for the ADC.

    - `type` is the type of conversion for raw ADC value.

        |    `type`    |         measure         |
        |--------------|-------------------------|
        | "voltage"    | Voltage 0-10 V          |
        | "current"    | Current 4-20 mA         |
        | "resistive"  | Resistance kOhm         |
        | "current_ac" | Peak to peak on AC (mA) |

    - `exp` is the expansion holding the ADC.

        |  `exp`  |        meaning        |
        |---------|-----------------------|
        | null    | Not on an expansion   |
        | "IO#"   | exp-io on # position  |
        | "AIN#"  | exp-ain on # position |

    - `input_number` is the pin or channel used.

    - `PGA` is the gain used by the ADC.

    - `SPS` is the number of samples per second to use.

* `conversion` is the set of data used to convert ADC electric value to sensor final value.

    - `type` is the type of conversion. Different conversion will call different callbacks. If `type` is not a standard one, it is possible to use custom callbacks with custom parameters.

        |     `type`     |           conversion           |
        |----------------|--------------------------------|
        | "linear"       | linear                         |
        | "lookup_table" | linear over a ref table values |
        | "power"        | Current clamp to power         |
        | "custom_names" | Custom conversion              |

    - `args` are the arguments required for the conversion. They depends on the types:

        * `linear` has the following arguments:
            - `"x_min"` minimum input value of the sensor.
            - `"x_max"` maximum input value of the sensor.
            - `"y_min"` minumum output value of the sensor.
            - `"y_max"` maximum output value of the sensor.
            - `"offset"` offset of the linear conversion.
            - `"under_x"` return value if x is under of range.
            - `"over_x"` return value if x is over of range.

            **NOTE:** `x_min` and `x_max` were added starting from v3.0.3 in order to
                    support different devices. Projects developed for previous SDK
                    versions need to be updated by adding `x_min` and `x_max` to
                    `resources/sensors.json` file in the project.

        * `lookup_table"` has the following arguments:

            - `"v_min"` minimum value of the sensor.
            - `"ref_table"` conversion value table.
            - `"delta"` step of the table.
            - `"out_of_range"` return value if value is out of range.
            - `"offset"` additional offset to apply to the converted value.

            **NOTE:** `offset` was added starting from v3.0.4 in order to
                    support different devices. Projects developed for previous SDK
                    versions need to be updated by adding `offset` to
                    `resources/sensors.json` file in the project.

        * `power` has the following arguments:

            - `"ratio"` is the nuber of loops of the cable clamped.
            - `"n_coil"` is the number of coil of the clamp.
            - `"voltage"` is the voltage of the AC current.
            - `"vref"` is the ref voltage of the ADC.
            - `"offset"` is the offset of the AC current.

`conversion` can have custom `type` and `args`. In this case the user must create a custom callback and link that to the `type` with a dictionary called `cb_dict`.
To do so, the user should create a module with the callback and the dictionary.
The callbacks must have the following signature `name(value, sens)` where value will be the passed electric value and sens the `args` dictionary of the json file, and return the converted value.

```python
def user_defined_callback(value, sens):
    return (value * sens["multiplier"])

cb_dict = {"user_defined_type", user_defined_callback}
```


## Class `Sensor`
```python
Sensor()
```
Creates an object to simply handle a sensor connected to an ADC channel.
All the sensor connected can be created using a JSON configuration file with info about the sensor. Once the sensor is created, its value can be read with its `read` method.

### method `read`
```python
read()
```
Read the current value of the sensor.
Returns the  read value from the sensor. The returned value is already converted to the physical measure.

### method `get_value`
```python
get_value()
```
Get the last read value of the sensor.

## function `get_sensors_dict`
```python
get_sensor_dict(file="sensors.json", cb_module=None)
```
Get a dictionary of `Sensor` objects reading their configuration form the json. All objects on the dictionary are already configured and ready to use. Returned dictionary keys are the one used on the json.

* `file` is the path of the file containing the JSON dictionary. Starting path is allways `"/zerynth/"`. Default `"/zerynth/sensors.json"`.

* `cb_module` is the module file containing custom callbacks if they are used.

Returns a dictionary of `Sensor` objects with json's used keys.
