---
layout: blog
title: zDeviceManger CLI
---


The zDeviceManager Command Line Interface (ZDM CLI) permits interacting with the ZDM via a command line.
This section is a guide for the most used of the ZDM CLI commands.

## Installation

The ZDM CLI is installed together with the Zerynth SDK.

!!! Important
	This guide assumes you are using the Zerynth3 SDK. Download it [here](https://www.zerynth.com/zsdk/) or update to the latest version!


In order to use the ZDM CLI

1. Download and install Zerynth SDK [here](https://www.zerynth.com/zsdk/).
2. Open a terminal and type the command `zdm`

!!! Note
    If the `zdm` command is not found, try to set the os path with the following command.

    * On **Linux**: open the terminal and launch the following command:
        ```bash
        ~/.zerynth3/dist/sys/cli/zpm setpath
        ```
    * On **Windows**: open the command prompt as _administrator_ and launch the following command:
        ```bash
        %userprofile%\zerynth3\dist\sys\cli\zpm setpaths
        ```
    * On **Mac**: open the terminal and launch the following command:
      ```bash
      ~/.zerynth3/dist/sys/cli/zpm setpath
      ```
	Make sure to close and reopen the terminal.

##  ZDM CLI Usage
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

# zdm device 

Manges the ZDM devices.

```python 
zdm device [OPTIONS] COMMAND [ARGS]...

```

## zdm device create
Create a new device into a `WORKSPACE_ID` and in a `FLEET_ID` with a `NAME`.

```bash
zdm device create  WORKSPACE_ID FLEET_ID NAME 
```


## zdm device get
Get a single device by `DEVICE_ID' in a `WORKSPCAE_ID`.

```bash
zdm device get WORKSPACE_ID DEVICE_ID
```

## zdm device ls
List all the devices of a `"WORKSPACE_ID`.

```bash
zdm device ls [OPTIONS] WORKSPACE_ID
```

## zdm device update
Update the device  `DEVICE_ID` in the `WORKSPACE_ID`. Ite permits to modify the name and the fleet of the device.

```bash
zdm device update  [OPTIONS] WORKSPACE_ID DEVICE_ID
```

Options:

*  `--fleet-id FLEET_ID` new fleet id
*  `--name     TEXT`     new device name

# zdm fleet
In the ZDM a fleet group a set of devices ina workspace. 
When you log in for the first time, a _default_ workspace containing a _default_ fleet will be created. 

## zdm fleet create
Create a new fleet `NAME` in a workspace `WORKSPACE_ID`.

```bash
zdm fleet create  WORKSPACE_ID NAME
```

Options:
- `--description TEXT`  A short description


## zdm fleet get

Get a single fleet by `FLEET_ID`  in a workspace  `WORKSPACE_ID`.

```bash
zdm fleet get WORKSPACE_ID FLEET_ID
```

where ```UID``` is the fleet uid

## zdm fleet ls
List all your fleets in a workspace `WORKSPACE_ID`.

```bash
zdm fleet ls WORKSPACE_ID
```


# zdm fota
The ZDM allows you to perform FOTA (over the air firmware updates) on your devices.


## zdm fota schedule

Once you’ve uploaded your firmware (see the `zdm workspace firmware` commands) , you can send the FOTA command to a device that will download it from the ZDM and uplink it.

If the FOTA operation is finished, you can see if the device has accepted or refused it using the ```zdm fota check ``` command.

Schedule a fota to a `DEVICE` with a `FIRMWARE_ID` using the `FIRMWARE_VERSION`.

```bash
zdm fota schedule DEVICE FIRMWARE_ID FIRMWARE_VERSION
```

## zdm fota check

To check the status of a FOTA you started, to know if the `DEVICE_ID` finished the task or if an error occurred, type the following command:

```bash
zdm fota check DEVICE_ID
```

# zdm job 
In the ZDM a job is a function defined in your firmware that you can call remotely through the ZDM. 



## zdm job schedule
Schedule e job `NAME` to a single `DEVICE_ID`
To call remotely a function defined in your firmware, use the command:

```bash
zdm job schedule NAME DEVICE_ID [OPTIONS]
```

options:
   -   `--arg <KEY, VALUE>...`: a key value passed as job's argument.

Example: 
Schedule the `jobAdder` to a device `dev-aaaaa` with two arguments: `num1=5` and `num2=6`.

```bash
zdm job schedule jobAdder dev-aaaaa --arg=num1 5 --arg=num2 6
```

## zdm job check

Check the status of a scheduled job `NAME` to a `DEVICE_ID`.

```bash
zdm job check NAME DEVICE_ID
```


## zdm job ls
List all the jobs of a single `DEVICE_ID`

```bash
zdm job check [OPTIONS] DEVICE_ID
```

options:
-  `--status [pending|done]`: filter jobs `pending` or `done`. Default all jobs are returned.

# zdm login

The ```login``` command enables the user to login to the ZDM.

```py
zdm login
```

The command opens the default system browser to the login/registration page and waits for user input.

In the login/registration page, the user can log in providing a valid email and the corresponding password.
It is also possible to login using Google or Facebook OAuth services. 
If the user do not have a Zerynth account it is possible to register providing a valid email, a nick name and a password.

Once a correct login/registration is performed, the browser will display a web welcome page.

!!! warning
	Multiple logins with different methods (manual or social) are allowed provided that the email linked to the social OAuth service is the same as the one used in the manual login.

!!! warning
	For manual registrations, email address confirmation is needed. An email will be sent at the provided address with instructions.


# zdm logout

Log out the current user from the ZDM.

```py
zdm logout
```

It will be necessary to login again.

# zdm variable 
Manage the variable from devices and ZDM.

## zdm variable get
Get the values of a variable `NAME` of a `DEVICE_ID`.
It returns the values set by the cloud and the device.


```bash
zdm variable get [OPTIONS] DEVICE_ID NAME
```
Options:
  - `--help`                     Show this message and exit.



## zdm variable set
Set the value of a  variable of a `DEVICE_ID`.
The `NAME` is the variable name.

```bash
zdm variable create [OPTIONS] DEVICE_ID NAME VALUE
```
Options:
  - `--val <TEXT TEXT|INT>...`  Values of the variable. Ex. --val pump off
  - `--help`                     Show this message and exit.



## zdm variable ls
List all the variable of a `DEVICE_ID`.

```bash
zdm job variable ls DEVICE_ID
```

# zdm workspace 
A workspace is the entity that groups devices. 
You can imagine the workspace as the main folder of your project.

## zdm workspace create
Create a new workspace with a `NAME`.

```bash
zdm workspace create [OPTIONS] NAME
```

Options:

*  `--description TEXT`: Short description of the workspace


## zdm workspace get 
Get a single workspace by `WORKSPACE_ID`.

```bash
zdm workspace get WORKSPACE_ID
```


## zdm workspace ls
List all the workspace.

```bash
zdm workspace ls
```



## zdm workspace firmware create
Create a new firmware with a `NAME` into a `WORKSPACE_ID`. 

```bash
zdm workspace firmware [OPTIONS] WORKSPACE_ID create NAME [ARGS]...
```

arguments:

- `--description TEXT`  Small description of the firmware.


## zdm workspace firmware get
Get a single `FIRMWARE_ID` of a  `WORKSPACE_ID`.

```bash
zdm workspace firmware [OPTIONS] WORKSPACE_ID get FIRMWARE_ID
```

## zdm workspace firmware ls
List all the firmwares of a `WORKSPACE_ID`.

```bash
zdm workspace firmware [OPTIONS] WORKSPACE_ID ls
```


## zdm workspace firmware upload
Upload a new version to a firmware.

```bash
zdm workspace firmware [OPTIONS] WORKSPACE_ID upload FIRMWARE_ID VERSION ARCHIVE_PATH
```

arguments:
- `FIRMWARE_ID`: the firmware id to upload the new version
- `VERSION`; the version of the newly uploaded files.
- `ARCHIVE_PATH`: path of the archive to be uploaded.










