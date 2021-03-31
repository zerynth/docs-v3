# zDeviceManager CLI

The zDeviceManager CLI (ZDM CLI) is a command line interface that permits interacting with the [zDeviceManager](https://zdm.zerynth.com)

This section is a guide for the most used of the ZDM CLI commands.


!!! Important
	This guide assumes you are using the Zerynth SDK `>= 3.0.0`.

## Usage 
In order to use the `zdm` executable, follows these steps:

1. Download and install Zerynth SDK [here](https://www.zerynth.com/zsdk/).
2. Open a terminal and type the command `zdm` executable


!!! Note
	Use the `zdm3` executable, if a version of Zerynth before v3.0.0 is also installed.

To list of available commands, either launch `zdm` with no parameters or execute `zdm --help`:

```
$ zdm 
Usage: zdm [OPTIONS] COMMAND [ARGS]...

  ZDM Command Line Interface

Options:
  -v                            Verbose.
  --colors / --no-colors        To enable/disable colors.
  --traceback / --no-traceback  To enable/disable exception traceback printing
                                on criticals.

  --pretty                      To display pretty json output.
  -J                            To display the output in json format.
  --help                        Show this message and exit.

Commands:
  device     Manage the devices
  fleet      Manage the fleets
  fota       Manage the FOTA update
  job        Manage the jobs
  login      Log in to the ZDM
  logout     Log out from the ZDM
  variable   Manage the variables
  workspace  Manage the workspaces

```

## zdm device
The `device` command helps to manage the Cloud devices. 

### zdm device create
Create a new device.

```bash
zdm device create [OPTIONS]  WORKSPACE_ID FLEET_ID NAME 
```
where `WORKSPACE_ID` is the id of the workspace, `FLEET_ID` is the id of the fleet and `NAME` is 
the name of the newly created device.

Options:

- `--help`  Show this message and exit.


### zdm device get
Get a single device.

```bash
zdm device get [OPTIONS] WORKSPACE_ID DEVICE_ID
```

Options:

* `--help`  Show this message and exit.

Where `WORKSPACE_ID` is the id of the workspace and `DEVICE_ID` is the id of the device.

### zdm device ls
List all the devices in a workspace.

```bash
zdm device ls [OPTIONS] WORKSPACE_ID
```

Where  `WORKSPACE_ID` is the id of the workspace.

Options:

* `--help`  Show this message and exit.

### zdm device update
Update the device name or the fleet of  a device.

```bash
zdm device update  [OPTIONS] WORKSPACE_ID DEVICE_ID
```
Where `WORKSPACE_ID` is the id of the workspace and `DEVICE_ID` is the id of the device to be updated.

Options:

*  `--fleet-id FLEET_ID` New fleet id
*  `--name     TEXT`     New device name
* `--help`  Show this message and exit.

## zdm fleet
The `fleet` commands helps to manage the fleets in a workspace.

When you log in for the first time, a _default_ workspace containing a _default_ fleet is created.

### zdm fleet create
Create a new fleet. 

```bash
zdm fleet create [OPTIONS]  WORKSPACE_ID NAME
```
Where `WORKSPACE_ID` is the id of the workspace and `NAME` is the name of the fleet.

Options:

* `--description TEXT`  A short description
* `--help`  Show this message and exit.


### zdm fleet get

Get a single fleet by `FLEET_ID`  in a workspace with  `WORKSPACE_ID`.

```bash
zdm fleet get [OPTIONS] WORKSPACE_ID FLEET_ID
```

Options:

* `--help`  Show this message and exit.



### zdm fleet ls
List all your fleets in a workspace with `WORKSPACE_ID`.

```bash
zdm fleet ls [OPTIONS] WORKSPACE_ID
```

Options:

* `--help`  Show this message and exit.



## zdm fota
The `fota` commands allows you to perform FOTA (over-the-air firmware updates) on your devices.

Once you’ve uploaded your firmware to the ZDM (see the `zdm workspace firmware` commands), you can schedule the FOTA operation. 
The device will download the firmware from the ZDM and uplink it.

If the FOTA operation is completed, you can see if the device has accepted or refused it using the `zdm fota check` command.

### zdm fota schedule

Schedule a fota to a single device.

```bash
zdm fota schedule [OPTIONS]  DEVICE_ID FIRMWARE_ID FIRMWARE_VERSION
```
Where the `DEVICE_ID` is the id of the device, the `FIRMWARE_ID` is the id of the firmware and `FIRMWARE_VERSION` is a version of the firmware.

Options:

* `--help`  Show this message and exit.



### zdm fota check
Check the status of a FOTA sent  to a device.

```bash
zdm fota [OPTIONS] check DEVICE_ID
```
Where the `DEVICE_ID` is the id of the device.

Options:

* `--help`  Show this message and exit.



## zdm job
The `job` commands permits to schedule a job to a device and check its status.
A job is a function defined in your firmware that you can call remotely through the ZDM.


### zdm job schedule
Schedule e job 

```bash
zdm job schedule NAME DEVICE_ID [OPTIONS]
```
Where `NAME` is the name of the job and  `DEVICE_ID` is the id of the device.

options:
*   `--arg <KEY, VALUE>...`: a key value passed as job's argument. Ex. --arg=pump on
* `--help`  Show this message and exit.


### zdm job check

Check the status of a job to a device.

```bash
zdm job check [OPTIONS] NAME DEVICE_ID
```

Where `NAME` is the name of the job and  `DEVICE_ID` is the id of the device.

Options:

* `--help`  Show this message and exit.


### zdm job ls
List all the jobs of a single device.  

```bash
zdm job check [OPTIONS] DEVICE_ID
```

Where  `DEVICE_ID` is the id of the device.

options:

*  `--status [pending|done]`  Filter jobs by its status `pending` or `done`. By default, all jobs are returned.
* `--help`  Show this message and exit.

## zdm login

The `login` command login the user to the ZDM.

```bash
zdm login
```

The command opens the default system browser to the login/registration page and waits for user input.

On the login/registration page, the user can log in providing a valid email and the corresponding password.
It is also possible to login using Google or Facebook OAuth services.
If the user does not have a Zerynth account it is possible to register providing a valid email, a nick name and a password.

Once a correct login/registration is performed, the browser will display a welcome page.

!!! warning
	Multiple logins with different methods (manual or social) are allowed provided that the email linked to the social OAuth service is the same as the one used in the manual login.

!!! warning
	For manual registrations, email address confirmation is needed. An email will be sent to the provided address with instructions.


## zdm logout
The `logout` command logs out the current user from the ZDM.

```py
zdm logout
```

It will be necessary to login again.

## zdm variable
The `variable` command helps to manage the variables shared among a device and the ZDM.

The variable has a name, a status with the latest value set by the device, and (if any) a pending value set by the ZDM.

### zdm variable get
Get the value of a variable of a device.

```bash
zdm variable get [OPTIONS] DEVICE_ID NAME
```
Where `NAME` of a `DEVICE_ID`.

Options:

- `--help`                     Show this message and exit.



### zdm variable set
Set the value of a  variable of a device. 


```bash
zdm variable create [OPTIONS] DEVICE_ID NAME VALUE
```
Where `DEVICE_ID` is the id of the device, the `NAME` is the variable name and the `VALUE` is the value to associate to the variable.

Options:

- `--val <TEXT TEXT|INT>...`  Values of the variable. Ex. --val pump off
- `--help`                     Show this message and exit.



### zdm variable ls
List all the variables of a device.

```bash
zdm job variable [OPTIONS] ls DEVICE_ID
```
Where `DEVICE_ID` is the id of the device.

Options:

- `--help`                     Show this message and exit.

## zdm workspace
The `workspace` command manage the workspaces.
.
You can imagine the workspace as the main folder of your project.

### zdm workspace create
Create a new workspace.

```bash
zdm workspace create [OPTIONS] NAME
```
Where  `NAME` is the name of the workspace.

Options:

*  `--description TEXT` Short description of the workspace
* `--help`               Show this message and exit.


### zdm workspace get
Get a single workspace by `WORKSPACE_ID`.

```bash
zdm workspace get  [OPTIONS] WORKSPACE_ID
```

Options:

- `--help`                     Show this message and exit.

### zdm workspace ls
List all the workspace.

```bash
zdm workspace  [OPTIONS] ls
```

Options:

- `--help`                     Show this message and exit.

#### zdm workspace firmware create
Create a new firmware into a workspace.

```bash
zdm workspace firmware [OPTIONS] WORKSPACE_ID create NAME 
```
Where `NAME` is the name of the firmware and `WORKSPACE_ID` id the id of the workspace.

Options
- `--description TEXT`  Small description of the firmware.
- `--help`                     Show this message and exit.


#### zdm workspace firmware get
Get a single firmware.

```bash
zdm workspace firmware [OPTIONS] WORKSPACE_ID get FIRMWARE_ID
```
Where `WORKSPACE_ID` id the id of the workspace and `FIRMWARE_ID` is the id of the firmware. 

Options

- `--help`                     Show this message and exit.


#### zdm workspace firmware ls
List all the firmwares of a workspace.

```bash
zdm workspace firmware   [OPTIONS] WORKSPACE_ID ls
```

Where `WORKSPACE_ID` is the id of the workspace.

Options

- `--help`                     Show this message and exit.



#### zdm workspace firmware upload
Upload a new 

```bash
zdm workspace firmware [OPTIONS] WORKSPACE_ID upload FIRMWARE_ID FIRMWARE_VERSION ARCHIVE_PATH
```

Where `WORKSPACE_ID` is the id of the workspace.
The `FIRMWARE_ID`: the firmware id to upload the new version.
The `FIRMWARE_VERSION` the version of the firmware.
The `ARCHIVE_PATH` is the path of the archive to be uploaded.

Options

- `--help`                     Show this message and exit.
