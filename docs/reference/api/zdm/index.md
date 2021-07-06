# zDeviceManager APIs

## Introduction
The **zDeviceManager REST APIs** offer access to devices, job and FOTA services, as well as workspaces and fleets.
This API can be called from any application that can send an HTTPS request and receive an HTTPS response.

!!! note 
    - Set the **Content-Type** header to **application/json**.
    - Set the **X-API-KEY** header to a valid API Key. For information about how to get an API key, see [Authentication](#authentication).

## Authentication
zDeviceManager grants access to endpoints by verifying an API key.

The API key is a unique identifier that authenticates your requests and it is bound to a single workspace. 

### Create an API key

To create an API key:

1. Login to [zDeviceManager](https://zdm.zerynth.com).
2. Choose a workspace.
3. Go to the **Settings** page.
4. Click on **New API key**. Choose a name for the API key and click **OK**
5. The newly created API key is now showed.

### Using the API key

You must include a valid API key with every request. In the following example, replace `YOUR_API_KEY` with your API key.

```bash
curl --request GET \
  --url https://api.zdm.zerynth.com/v3/workspaces/ \
  --header 'X-API-KEY: YOUR_API_KEY'
```

## Workspaces

### List workspaces

List all workspaces for the current account.

`GET /workspaces`

#### Response

- **workspaces** (object[]) - Array of workspaces. Refer to [Get workspace](#get-workspace) for more information about the workspace object.

#### Example

`GET https://api.zdm.zerynth.com/v3/workspaces`

`200 OK`

```json
{
  "workspaces": [
    {
      "id": "wks-123456789",
      "name": "workspace name",
      "account_id": "acc-123456789",
      "description": "Workspace description",
      "created_at": "2021-03-26T09:46:00.565155Z"
    }
  ]
}
```

### Get workspace

Get information about the specified workspace.

`GET /workspaces/{workspace_id}`

#### Parameters

- **workspace_id** - Workspace ID

#### Response

- **workspace** (object) - Workspace object
    - **id** (string) - Workspace ID
    - **name** (string) - Workspace name
    - **account_id** (string) - The ID of the current account
    - **description** (string) - Workspace description
    - **created_at** (date) - Workspace creation date in RFC 3339 format

#### Example

`GET https://api.zdm.zerynth.com/v3/workspaces/wks-123456789`

`200 OK`

```json
{
  "workspace": {
    "id": "wks-123456789",
    "name": "workspace name",
    "account_id": "acc-123456789",
    "description": "Workspace description",
    "created_at": "2021-03-26T09:46:00.565155Z"
  }
}
```

### Create workspace

Create a new workspace.

`POST /workspaces`

#### Body

- **name** (string) - Workspace name
- **description** (string) - A short description about the workspace

#### Response

- **workspace** (object) - Workspace object
    - **id** (string) - Workspace ID
    - **name** (string) - Workspace name
    - **account_id** (string) - The ID of the current account
    - **description** (string) - Workspace description
    - **created_at** (date) - Workspace creation date in RFC 3339 format

#### Example

`POST https://api.zdm.zerynth.com/v3/workspaces`

```json
{
  "name": "workspace name",
  "description": "Workspace description"
}
```

`200 OK`

```json
{
  "workspace": {
    "id": "wks-123456789",
    "name": "workspace name",
    "account_id": "acc-123456789",
    "description": "Workspace description",
    "created_at": "2021-03-26T09:46:00.565155Z"
  }
}
```

## Fleets

### List fleets

List all fleets in the specified workspace.

`GET /workspaces/{workspace_id}/fleets`

#### Response

- **fleets** (object[]) - Array of fleets

#### Example

`GET https://api.zdm.zerynth.com/v3/workspaces/wks-123456789/fleets`

`200 OK`

```json
{
  "fleets": [
    {
      "id": "flt-123456789",
      "name": "fleet name",
      "description": "fleet description",
      "account_id": "acc-123456789",
      "workspace_id": "wks-123456789",
      "created_at": "2021-03-26T09:46:00.565155Z"
    }
  ]
}
```

### Get fleet

Get information about the specified fleet

`GET /workspaces/{workspace_id}/fleets/{fleet_id}`

#### Parameters

- **workspace_id** - Workspace ID
- **fleet_id** - Fleet ID

#### Response

- **fleet** (object) - Fleet object
    - **id** (string) - Fleet ID
    - **name** (string) - Fleet name
    - **description** (string) - Fleet description
    - **account_id** (string) - The ID of the current account
    - **workspace_id** (string) - The ID of the workspace that contains the fleet
    - **created_at** (date) - Fleet creation date in RFC 3339 format

#### Example

`GET https://api.zdm.zerynth.com/v3/workspaces/wks-123456789/fleets/flt-123456789`

`200 OK`

```json
{
  "fleet": {
    "id": "flt-123456789",
    "name": "fleet name",
    "description": "fleet description",
    "account_id": "acc-123456789",
    "workspace_id": "wks-123456789",
    "created_at": "2021-03-26T09:46:00.565155Z"
  }
}
```

### Create fleet

Create a new fleet in the specified workspace.

`POST /workspaces/{workspace_id}/fleets`

#### Parameters

- **workspace_id** - Workspace ID

#### Body

- **name** (string) - Fleet name
- **description** (string) - A short description about the fleet

#### Response

- **fleet** (object) - Fleet object
    - **id** (string) - Fleet ID
    - **name** (string) - Fleet name
    - **description** (string) - Fleet description
    - **account_id** (string) - The ID of the current account
    - **workspace_id** (string) - The ID of the workspace that contains the fleet
    - **created_at** (date) - Fleet creation date in RFC 3339 format

#### Example

`POST https://api.zdm.zerynth.com/v3/workspaces/wks-123456789/fleets`

```json
{
  "name": "fleet name",
  "description": "fleet description"
}
```

`200 OK`

```json
{
  "fleet": {
    "id": "flt-123456789",
    "name": "fleet name",
    "description": "fleet description",
    "account_id": "acc-123456789",
    "workspace_id": "wks-123456789",
    "created_at": "2021-03-26T09:46:00.565155Z"
  }
}
```

## Devices

### List devices

List all devices in the specified workspace.

`GET /workspaces/{workspace_id}/devices`

#### Parameters

- **workspace_id** - Workspace ID

#### Response

- **devices** (object[]) - Array of devices

#### Example

`GET https://api.zdm.zerynth.com/v3/workspaces/wks-123456789/devices`

`200 OK`

```json
{
  "devices": [
    {
      "id": "dev-123456789",
      "name": "device name",
      "account_id": "acc-123456789",
      "fleet_id": "flt-123456789",
      "fleet_name": "fleet name",
      "workspace_id": "wks-123456789",
      "workspace_name": "workspace name",
      "created_at": "2020-09-04T16:17:08.114454Z",
      "phys_id": "devkit",
      "identities": null
    }
  ]
}
```

### Get device

Get information about the specified device.

`GET /workspaces/{workspace_id}/devices/{device_id}`

#### Parameters

- **workspace_id** - Workspace ID
- **device_id** - Device ID

#### Response

- **device** (object) - Device object
    - **id** (string) - Device ID
    - **name** (string) - Device name
    - **account_id** (string) - The ID of the current account
    - **fleet_id** (string) - Fleet ID
    - **fleet_name** (string) - Fleet name
    - **workspace_id** (string) - Workspace ID
    - **workspace_name** (string) - Workspace name
    - **created_at** (date) - Device creation date in RFC 3339 format
    - **phys_id** (string) - Physical device ID
    - **identities** (object[]) - The identities associated to the device

#### Example

`GET https://api.zdm.zerynth.com/v3/workspaces/wks-123456789/devices/dev-123456789`

`200 OK`

```json
{
  "device": {
    "id": "dev-123456789",
    "name": "device name",
    "account_id": "acc-123456789",
    "fleet_id": "flt-123456789",
    "fleet_name": "fleet name",
    "workspace_id": "wks-123456789",
    "workspace_name": "workspace name",
    "created_at": "2020-09-04T16:17:08.114454Z",
    "phys_id": "devkit",
    "identities": null
  }
}
```

### Create device

Create a new device in the specified workspace.

`POST /workspaces/{workspace_id}/devices`

#### Parameters

- **workspace_id** - Workspace ID

#### Body

- **name** (string) - Device name
- **fleet_id** (string) - Fleet ID of the device. If not provided, the device is added in the default fleet

#### Response

- **device** (object) - Device object
    - **id** (string) - Device ID
    - **name** (string) - Device name
    - **account_id** (string) - The ID of the current account
    - **fleet_id** (string) - Fleet ID
    - **fleet_name** (string) - Fleet name
    - **workspace_id** (string) - Workspace ID
    - **workspace_name** (string) - Workspace name
    - **created_at** (date) - Device creation date in RFC 3339 format
    - **phys_id** (string) - Physical device ID
    - **identities** (object[]) - The identities associated to the device

#### Example

`POST https://api.zdm.zerynth.com/v3/workspaces/wks-123456789/devices`

```json
{
  "name": "device name",
  "fleet_id": "flt-123456789"
}
```

`200 OK`

```json
{
  "device": {
    "id": "dev-123456789",
    "name": "device name",
    "account_id": "acc-123456789",
    "fleet_id": "flt-123456789",
    "fleet_name": "fleet name",
    "workspace_id": "wks-123456789",
    "workspace_name": "workspace name",
    "created_at": "2020-09-04T16:17:08.114454Z",
    "phys_id": "devkit",
    "identities": null
  }
}
```

### Update device info

Update a device name and fleet.

`PUT /workspaces/{workspace_id}/devices/{device_id}`

#### Parameters

- **workspace_id** - Workspace ID
- **device_id** - Device ID

#### Body

- **name** (string) - Device name
- **fleet_id** (string) - Fleet ID of the device

#### Response

- **device** (object) - Device object
    - **id** (string) - Device ID
    - **name** (string) - Device name
    - **account_id** (string) - The ID of the current account
    - **fleet_id** (string) - Fleet ID
    - **fleet_name** (string) - Fleet name
    - **workspace_id** (string) - Workspace ID
    - **workspace_name** (string) - Workspace name
    - **created_at** (date) - Device creation date in RFC 3339 format
    - **phys_id** (string) - Physical device ID
    - **identities** (object[]) - The identities associated to the device

#### Example

`PUT https://api.zdm.zerynth.com/v3/workspaces/wks-123456789/devices/dev-123456789`

```json
{
  "name": "new device name",
  "fleet_id": "flt-987654321"
}
```

`200 OK`

```json
{
  "device": {
    "id": "dev-123456789",
    "name": "new device name",
    "account_id": "acc-123456789",
    "fleet_id": "flt-987654321",
    "fleet_name": "new fleet name",
    "workspace_id": "wks-123456789",
    "workspace_name": "workspace name",
    "created_at": "2020-09-04T16:17:08.114454Z",
    "phys_id": "devkit",
    "identities": null
  }
}
```

## Jobs

### List jobs status

Get the status of all jobs of a device.

`GET /devices/{device_id}/jobs?status={status}`

#### Parameters

- **device_id** - Device ID
- **status** (optional) - The status of a job. Possible values are: **pending**, **done**. If the value is not provided it returns
  all jobs whose status is either pending or done

#### Response

- **jobs** (object[]) - Array of jobs

#### Example

`GET https://api.zdm.zerynth.com/v3/devices/dev-123456789/jobs`

`200 OK`

```json
{
  "jobs": [
    {
      "name": "jobOne",
      "status": "pending",
      "scheduled_at": "2021-03-18T16:27:30.122Z",
      "value": {
        "pump": "off"
      }
    },
    {
      "name": "jobTwo",
      "status": "done",
      "scheduled_at": "2021-03-18T16:29:11.277Z",
      "value": {
        "pump": "on"
      }
    }
  ]
}
```

### Get job status

Get the status of a job of a device.

`GET /devices/{device_id}/jobs/{job_name}`

#### Parameters

- **device_id** - Device ID
- **job_name** - The name of the job

#### Response

- **job** (object) - Job object
    - **name** (string) - The name of the job
    - **status** (string) - The status of the job
    - **scheduled_at** (date) - The date of the job scheduling in RFC 3339 format
    - **value** (object) - An object that contains the arguments of the job

#### Example

`GET https://api.zdm.zerynth.com/v3/devices/dev-123456789/jobs/jobOne`

`200 OK`

```json
{
  "job": {
    "name": "jobOne",
    "status": "pending",
    "scheduled_at": "2021-03-18T16:27:30.122Z",
    "value": {
      "pump": "off"
    }
  }
}
```

### Schedule job
Create a new job for a device.

`POST /devices/{device_id}/jobs/{job_name}`

#### Parameters

- **device_id** - Device ID
- **job_name** - The name of the job

#### Body
- **value** (object) - Custom object associated to the job

#### Example
`POST https://api.zdm.zerynth.com/v3/devices/dev-123456789/jobs/jobOne`

```json
{
  "value": {
    "pump": "off"
  }
}
```

`200 OK`

```json
{
  "job": {
    "name": "jobOne",
    "status": "pending",
    "scheduled_at": "2021-03-18T16:27:30.122Z",
    "value": {
      "pump": "off"
    }
  }
}
```

### Schedule multiple jobs
Create a new job for multiple fleets.

`POST /workspace/{workspace_id}/jobs/{job_name}?fleet={fleet_id}`

#### Parameters

- **workspace_id** - Workspace ID
- **job_name** - The name of the job
- **fleet** (optional, multiple) - The fleet on which the FOTA has to be scheduled. If omitted the FOTA will be scheduled on all fleets. If you want to schedule the FOTA on multiple fleets, compose the query as follows: `?fleet={fleet_id1}&fleet={fleet_id2}&fleet=...`

#### Body
- **value** (object) - Custom object associated to the job

#### Example
`POST https://api.zdm.zerynth.com/v3/devices/dev-123456789/jobs/jobOne?fleet=flt-123456789&fleet=flt-987654321`

```json
{
  "value": {
    "pump": "off"
  }
}
```

`200 OK`

```json
{
  "job": {
    "name": "jobOne",
    "status": "pending",
    "scheduled_at": "2021-03-18T16:27:30.122Z",
    "value": {
      "pump": "off"
    },
    "devices": ["dev-123456789", "dev-123456788", "dev-123456787"]
  }
}
```

## FOTA
### Get FOTA status
Get the status of a FOTA.

`GET /devices/{device_id}/fota`

#### Parameters
- **device_id** - Device ID

#### Response
- **fota** (object) - FOTA status object
    - **scheduled_at** (date) - The date of the FOTA scheduling in RFC 3339 format
    - **status** (string) - The status of the FOTA
    - **value** (object) - An object that contains the **fw_id** and the **fw_version**

#### Example
`GET https://api.zdm.zerynth.com/v3/devices/dev-123456789/fota`

`200 OK`

```json
{
  "fota": {
    "scheduled_at": "2021-03-18T16:27:30.122Z",
    "status": "pending",
    "value": {
      "firmware_id": "fmw-123456789",
      "firmware_version": "1.0"
    }
  }
}
```

### Schedule FOTA
Schedule a new FOTA for a device.

`POST /devices/{device_id}/fota/{firmware_id}/versions/{firmware_version}`

#### Parameters
- **device_id** - Device ID
- **firmware_id** - Firmware ID
- **firmware_version** - Firmware version

#### Response
- **fota** (object) - FOTA status object
    - **scheduled_at** (date) - The date of the FOTA scheduling in RFC 3339 format
    - **status** (string) - The status of the FOTA
    - **value** (object) - An object that contains the **fw_id** and the **fw_version**

#### Example
`POST https://api.zdm.zerynth.com/v3/devices/dev-123456789/fota/fmw-123456789/versions/1.0`

`200 OK`

```json
{
  "fota": {
    "scheduled_at": "2021-03-18T16:27:30.122Z",
    "status": "pending",
    "value": {
      "firmware_id": "fmw-123456789",
      "firmware_version": "1.0"
    }
  }
}
```

### Schedule multiple FOTA
Schedule a new FOTA for multiple fleets.

`POST /workspaces/{workspace_id}/fota/{firmware_id}/versions/{firmware_version}?fleet={fleet_id}`

#### Parameters
- **workspace_id** - Workspace ID
- **firmware_id** - Firmware ID
- **firmware_version** - Firmware version
- **fleet** (optional, multiple) - The fleet on which the FOTA has to be scheduled. If omitted the FOTA will be scheduled on all fleets. If you want to schedule the FOTA on multiple fleets, compose the query as follows: `?fleet={fleet_id1}&fleet={fleet_id2}&fleet=...`

#### Response
- **fota** (object) - FOTA status object
  - **scheduled_at** (date) - The date of the FOTA scheduling in RFC 3339 format
  - **status** (string) - The status of the FOTA
  - **value** (object) - An object that contains the **fw_id** and the **fw_version**
  - **devices** (string[]) - An array that contains all devices on which the FOTA has been scheduled

#### Example
`POST https://api.zdm.zerynth.com/v3/workspaces/wks-123456789/fota/fmw-123456789/versions/1.0?fleet=flt-123456789&fleet=flt-987654321`

`200 OK`

```json
{
  "fota": {
    "scheduled_at": "2021-03-18T16:27:30.122Z",
    "status": "pending",
    "value": {
      "firmware_id": "fmw-123456789",
      "firmware_version": "1.0"
    },
    "devices": ["dev-123456789", "dev-123456788", "dev-123456787"]
  }
}
```

## Integrations
zDeviceManager allows you to forward data received from devices to third-party services.

!!! note "Note - Message Delivery Reliability"
    All zDeviceManager integrations follow an **at-least-once** rule for data forwarding: the zDeviceManager guarantees that all data that has been received from devices is forwarded to the external service, but some messages may be sent multiple times. It is up to the external service to handle deduplication. 

### Webhook data format


```json
{
  "batch_id": "data-123456789",
  "result": [
    {
      "id": "0",
      "workspace_id": "wks-123456789",
      "fleet_id": "flt-123456789",
      "device_id": "dev-123456789",
      "device_name": "my_new_device",
      "timestamp_device": "2021-03-18T16:27:30.122Z",
      "timestamp_in": "2021-03-18T16:27:30.125Z",
      "tag": "weather",
      "payload": {
        "temp": 24,
        "hum": 65
      }
    },
    {
      "id": "1",
      "workspace_id": "wks-123456789",
      "fleet_id": "flt-123456789",
      "device_id": "dev-123456789",
      "device_name": "my_new_device",
      "timestamp_device": "2021-03-18T16:27:30.122Z",
      "timestamp_in": "2021-03-18T16:27:30.125Z",
      "tag": "weather",
      "payload": {
        "temp": 27,
        "hum": 69
      }
    }
  ]
}
```

!!! warning
    The field **'device_name'** is deprecated and may be removed in a future release
