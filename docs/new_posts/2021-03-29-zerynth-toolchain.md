---
layout: blog
title: Zerynth Toolchain CLI
---

# ztc account 
Manage the Zerynth Account.
## ztc account login
The login command enables the user to login to Zerynth.

```bash
ztc account login
```

The command opens the default system browser to the login/registration page and waits for user input.

On the login/registration page, the user can log in providing a valid email and the corresponding password. It is also possible to login using Google or Facebook OAuth services. If the user does not have a Zerynth account it is possible to register providing a valid email, a nick name, and a password.

Once a correct login/registration is performed, the browser will display a welcome page.

!!! warning Multiple logins with different methods (manual or social) are allowed provided that the email linked to the social OAuth service is the same as the one used in the manual login.

!!! warning For manual registrations, email address confirmation is needed. An email will be sent at the provided address with instructions.

## ztc account logout
Log out the current user from the ZDM.
```bash
zdm account logout
```

It will be necessary to login again.
## ztc account check 
Check if the login was successful.

```bash
zdm account check
```

# ztc compile
Compiles the source files found at `PROJECT` (the project path) and produces an executable bytecode file.

The entry point of the program is the file `main.py`. Every additional Python module needed wil be searched in the following order:

1. Project directory
2. Directories passed with the `-I` option in the given order (see below)
3. The Zerynth standard library
4. The installed libraries

Since Zerynth programs allow mixed C/Python code, the compiler also scans for C source files and compiles them with the appropriate C compiler.
C object files are packed and included in the output bytecode.


```bash
ztc.py compile [OPTIONS] [PROJECT]
```

Options:
- `-o, --output TEXT`    Specifies the path for the output file.
- `-I, --include TEXT`   Adds a `path` to the list of directories scanned for Zerynth modules (multi-value option).
- `-D, --define TEXT`    Adds a C macro definition as a parameter for native C compiler (multi-value option).
- `-tmp, --tmpdir TEXT`  Set temp directory.
- `--help`               Show this message and exit.

# ztc device
In the ZTC a device is a peripheral that can execute Zerynth bytecode. 
In order to do so, a device must be prepared and customized with certain attributes.

The main attributes of a device are:

- `alias`, a unique name given by the user to the device in order to identify it in ZTC commands
- `uid`, a unique id provided by the operative system identifying the device at hardware level
- `target`, specifies what kind of virtual machine can be run by the device
- `name`, a human-readable name describing the device. Automatically set by the ZTC
- `chipid`, the unique identifier of the microcontroller present on the device
- `remote_id`, the unique identifier of the device in the pool of user registered device
- `classname`, a Python class name identifying the class containing commands to configure the device

When a new device is connected, some steps must be taken in order to make it able to run Zerynth code:

- The device must be discovered, namely its hardware parameters must be collected (uid).
- Once discovered an alias must be assigned. Depending on the type of device target and classname can be assigned in the same step.
- The zerynth OS must be loaded into the device microcontroller.
Sometimes the device automatic recognition is not enough to gather all the device parameters or to allow the usage of JTAG/SWD probes. In such cases, additional commands have been introduced in order to manually specify the additional parameters. A separate database of devices with advanced configurations is maintained.

## ztc device burn 
Burn a device with  `IDENTIFIER` with the archive found in the `ZERYNTH_ARCHIVE` path.
```bash 
ztc device burn [OPTIONS] [IDENTIFIER] [ZERYNTH_ARCHIVE]
```

Options:
- `--bin TEXT`     Binary to be written in the device.
- `--noreset`     
- `--layout TEXT`
- `--board TEXT`  
- `--help`         Show this message and exit.

## ztc device console
Open a device serial console for the device with `IDENTIFIER`.
```bash 
ztc device burn [OPTIONS] [IDENTIFIER] 
```

Options:
- `--baud INTEGER`
- `--specs TEXT`
- `--hwflow`
- `--interactive`
- `--help `         Show this message and exit.


## ztc device discover 
Device discovery is performed by interrogating the operative system database for USB connected peripherals. Each peripheral returned by the system has at least the following “raw” attributes:
- `vid`. the USB vendor id
- `pid`, the USB product id
- `sid`, the unique identifier assigned by the operative system, used to discriminate between multiple connected devices with the same vid:pid
- `port`, the virtual serial port used to communicate with the device, if present
- `disk`, the mount point of the device, if present
- `uid`, a unique identifier assigned by the ZTC
- `desc`, the device description provided by the operative system (can differ between different platforms)

Peripheral data can be obtained by running:

```aidl
ztc device discover [OPTIONS]
```

Options:
- `--loop TEXT`
- `--inspect`
- `--raw`
- `--help`       Show this message and exit.

!!! note
  In Linux peripheral data is obtained by calling into libudev functions. In Windows, the WMI interface is used. In Mac calls to ioreg are used.

## ztc device provision
Manage the device provisioning.

### ztc device provision command
Send a command `CMD` to the device with `IDENTIFIER`, and wait for the response from the provision firmware.

```bash
ztc device provision command [OPTIONS] IDENTIFIER CMD
```

Options:
- `--help`  Show this message and exit

## ztc device provision phys-id
Retrieve provisioning physical id from the device with `IDENTIFIER`.

```bash
ztc device provision phys-id [OPTIONS] IDENTIFIER
```

Options:
- `--help`  Show this message and exit
## ztc device provision prepare
Upload the provisioning firmware into the device with `IDENTIFIER`.

```bash
ztc device provision prepare [OPTIONS] IDENTIFIER
```

Options:
- `--help`  Show this message and exit

## ztc device reset
Reset a device with `IDENTIFIER`.

```bash
ztc device  device reset [OPTIONS] [IDENTIFIER]
```

Options:
- `--board TEXT`
- `--help`        Show this message and exit.

## ztc device supported
List of supported devices.

```bash
ztc device  supported [OPTIONS]
```

Options:
- `--help`        Show this message and exit.

# ztc info
Show general information.

```bash
ztc info
```

Options:
- `--Examples`    List the examples.
- `--help`        Show this message and exit.

# ztc link
Link a zerynth archive stored in the `ZERYNTH_ARCHIVE` path.

```bash
ztc link [OPTIONS] [ZERYNTH_ARCHIVE]
```

Options:
- `--help`        Show this message and exit.

# ztc project
Manage Zerynth projects.

## ztc project create 
Create e new project in the `PATH`.
```bash
ztc project  create [OPTIONS] PATH
```

Options:
- `--from PATH`   Path of a project used to copy from.
- `--help`        Show this message and exit.

## ztc project update
Update the project in the `PATH`.
```bash
ztc  project update [OPTIONS] PATH
```

Options:
- `--board TEXT`
- `--uid TEXT`
- `--help`        Show this message and exit.

