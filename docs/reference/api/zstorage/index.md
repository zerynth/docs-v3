# zStorage APIs

## Introduction
The **zStorage REST APIs** offer the possibility to get time series data from the zStorage cloud service.

The base url of the zStorage api is:
```
https://api.storage.zerynth.com/v3
```


!!! note
  - Set the **Content-Type** header to **application/json**.
  - Set the **X-API-KEY** header to a valid API Key. For information about how to get an API key, see [Authentication](../zdm/index.md#authentication).


## TimeSeries API

### Get Data

Get the time series raw data of a workspace.

`GET /timeseries/{workspace_id}/data`

#### Parameters

- **workspace_id** - Workspace ID
- **start** - Start date of the timestamp device in RFC 3339 format (included)
- **end** - End date of the timestamp device in RFC 3339 format (excluded)
- **from** - Page index (default: `0`)
- **size** - Size of each page (default: `100`)
- **sort** - Sort the result [ `timestamp_device`, `-timestamp_device` ] (default: Decreasing timestamp device  `-timestamp_device` )


!!! note
    - The `size` parameter cannot be larger than `175000` and cannot be negative.
    - The `sort` parameter with the `-` prefix indicate decreasing order.
    - The `from` parameter cannot be negative.
    - The built time range is `start <= timestamp_device < end` .


#### Response

- **result** (array) - Array of objects
    - **timestamp_device** (date) - Timestamp device in RFC 3339 format
    - **timestamp_in** (date) - Timestamp ingestion is RFC 3339 format
    - **fleet_id** (string) - The fleet ID 
    - **device_id** (string) - The device ID
    - **tag** (date) - Tag associated with the data
    - **payload** (json) - Raw JSON payload sent by the device


#### Examples
 
##### Get data
`GET https://api.storage.zerynth.com/v3/timeseries/wks-123456789/data`

`200 OK`

```json
{
  "result": [
    {
      "timestamp_device": "2021-07-08T14:21:15.915Z",
      "timestamp_in": "2021-07-08T14:21:20.915Z",
      "fleet_id": "flt-123456789",
      "device_id": "dev-123456789",
      "tag": "my-tag",
      "payload": {
        "hum": 51,
        "temp": 26
      }
    },
    {
      "timestamp_device": "2021-07-08T14:21:10.908Z",
      "timestamp_in": "2021-07-08T14:21:10.908Z",
      "fleet_id": "flt-123456789",
      "device_id": "dev-123456789",
      "tag": "my-tag",
      "payload": {
        "hum": 55,
        "temp": 27
      }
    }
  ]
}
```
  
##### Filter by time range.
    
`GET https://api.storage.zerynth.com/v3/timeseries/wks-123456789/data?start=2021-07-08T14:21:10.908Z&end=2021-07-08T14:21:15.915Z`

`200 OK`

```json
{
  "result": [
    {
      "timestamp_device": "2021-07-08T14:21:10.908Z",
      "timestamp_in": "2021-07-08T14:21:10.908Z",
      "fleet_id": "flt-123456789",
      "device_id": "dev-123456789",
      "tag": "my-tag",
      "payload": {
        "hum": 55,
        "temp": 27
      }
    }
  ]
}
```


##### Paginate result

`GET https://api.storage.zerynth.com/v3/timeseries/wks-123456789/data?from=1&size=1`

`200 OK`

```json
{
  "result": [
    {
      "timestamp_device": "2021-07-08T14:21:15.915Z",
      "timestamp_in": "2021-07-08T14:21:15.915Z",
      "fleet_id": "flt-123456789",
      "device_id": "dev-123456789",
      "tag": "my-tag",
      "payload": {
        "hum": 55,
        "temp": 27
      }
    }
  ]
}
```