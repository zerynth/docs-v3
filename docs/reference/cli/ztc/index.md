# Toolchain CLI

Zerynth provides a command line toolchain for programming the various Zerynth hardwares with the Zerynth OS.


The toolchain executable `ztc` (or `ztc3` if a version of Zerynth before v3.0.0 is also installed) is inserted in the global `PATH` by the SDK installer and it is therefore available in the terminal.


## Development Workflow

The toolchain offers simple commands and subcommands to implement the development workflow.

The development process is quite straightforward:

* the user needs be logged in. Must be done just once with the `account` command and subcommands
* a project is created. Can be done with the `project` command and subcommands
* the project is configured for a Zerynth board.
* the project is compiled, linked and executed on the board. Can be done with the `compile`, `link` and `burn` commands.


## Development Example

This example will show the main features of Zerynth devleopment via cli.

### Login

Type ```ztc account login``` and insert credentials in the browser.

### Create a project

Type ```ztc project create my-first-project```. The folder ```my-first-project``` will be created will all the necessary files.

### Discover the device

Connect the Zeryth board to the USB port and type ```ztc device discover```. Take note of the `uid` and `board` values.

In the following example the output is:

```
vid      pid  sid     uid                                       port          alias    board
-----  -----  ------  ----------------------------------------  ------------  -------  -----------
1A86    7523  no_sid  b08a15d393e42ed94f38145dfbd48a628f9ca30b  /dev/ttyUSB0           4zerobox_v9
```

so `uid` is `b08a15d393e42ed94f38145dfbd48a628f9ca30b` and board is `4zerobox_v9`.

### Configure the project

Type the command ```ztc project update my-first-project --uid uid --board board``` where `uid` and `board` are the outputs of the discovery.


### Compile and link the project

Type a first command ```ztc compile my-first-project```. The type ```ztc link my-first-project/build/firmware.z```.

### Run the project

Type the command ```ztc device burn uid my-first-project/build/firmware.z```. The executable project is loaded on the device.

### Open the project console

Type the command ```ztc device console uid``` and check the output of the project.


## Commands

All the toolchain commands are available in the form:

`ztc [OPTIONS] [COMMAND] [SUBCOMMAND]`

The options for `ztc` are:

- `-J`: outputs is produce in JSON format in the standard output
- `-v`: verbose mode, activates debug messages
- `--traceback`: in case of error, the full Python traceback is printed

Error messages and warnings are printed to the standard error.


### ztc account

The `account` command group helps managin the Zerynth account.


#### ztc account login
The login subcommand enables the user to login to Zerynth.

```bash
ztc account login
```

The command opens the default system browser at the login page and waits for the login to complete.

On the login page, the user provides a valid set of credentials or can create a new account.

Once the login is performed, the browser will display a welcome page.

!!! warning
    Multiple logins with different methods (with password or via OAuth) are allowed provided that the email linked to the OAuth service is the same as the one used in the login with password.

!!! warning
    For login with password, email address confirmation is required. An email will be sent at the provided address with instructions.

#### ztc account logout
Log out the current user from the Zerynth account.
```bash
zdm account logout
```

#### ztc account check
Check if the toolchain is logged in.

```bash
zdm account check
```

### ztc compile
The `compile` command checks the validity of a given project and transforms it in an executable binary format.

It takes the following format:

```bash
ztc compile [OPTIONS] [PROJECT]
```

where `PROJECT` is the project path; if not given, assumes `PROJECT` is the current directory. The project must have already been configured for a specific board, otherwise the command will fail.

The entry point of the project is the file `main.py`. Every additional Python module needed will be searched in the following order:

1. Project directory
2. Directories passed with the `-I` option in the given order (see below)
3. The standard library
4. The Zerynth libraries
5. All other libraries

Since Zerynth allows mixing C and Python code, the compiler also scans for C source files and compiles them too.

Options:

- `-o, --output TEXT`    Specifies the path for the output file. By default is `PROJECT/build/firmware.z`
- `-I, --include TEXT`   Adds a `path` to the list of directories scanned for Zerynth modules (multi-value option).
- `-D, --define TEXT`    Adds a C macro definition as a parameter for native C compiler (multi-value option).
- `-tmp, --tmpdir TEXT`  Set temp directory. By default is `PROJECT/cache`
- `--help`               Show this message and exit.

### ztc device

The `device` command group helps interacting with physical devices such as Zerynth boards and hardware.

Zerynth boards are always connected to the development machine via USB and are recognized using `vid:pid` 
parameter from the USB driver.

A device is recognized by the toolchain and assigned a set of attributes:

- `uid`, a unique identifier derived from the hardware properties of the USB connection. It is constant for all platforms.
- `board`, specifies what kind of device is connected to the USB. It is needed because different boards can have the same `vid:pid`


#### ztc device burn

Execute a project on a device

```bash
ztc device burn [OPTIONS] [IDENTIFIER] [ZERYNTH_ARCHIVE]
```

where `IDENTIFIER` is the `uid` of the device  and `ZERYNTH_ARCHIVE` is the path to the `firmware.z` file containing the compiled and linked project.

Options:

- `--bin file:address`     Binary `file` to be written to the device at address `address` (in hexadecimal)
- `--noreset`              Do not reset the device after burning
- `--layout TEXT`          Burn the device according to a layout file
- `--board TEXT`           Set the board type associated with the `IDENTIFIER`
- `--help`                 Show this message and exit.

Normally the command is executed without options or just with `--board`. The other options are for advanced usage in case of mass programming scenarios.

#### ztc device console

Open the serial console for the device

```bash
ztc device burn [OPTIONS] [IDENTIFIER]
```
where `IDENTIFIER` is the `uid` of the device.

Options:

- `--baud INTEGER`  baud rate of the serial port (default 115200)
- `--specs TEXT`    serial port parameters in the format bits/parity/stops. default `8n1`
- `--hwflow`        enable hardware flow control. Disabled by default
- `--help `         Show this message and exit.


#### ztc device discover

Perform device discovery and automatic recognition of Zerynth boards and hardware.

```bash
ztc device discover [OPTIONS]
```

Device discovery is performed by interrogating the operative system database for USB connected peripherals. Each peripheral returned by the system has at least the following attributes:

- `vid`, the USB vendor id
- `pid`, the USB product id
- `sid`, the unique serial identifier assigned by the operative system, used to discriminate between multiple connected devices with the same vid:pid (can be missing)
- `uid`, the device unique identifier
- `port`, the serial port used to communicate with the device
- `board`, the board type of the device


Options:

- `--raw`        Return raw information on USB devices
- `--help`       Show this message and exit.

!!! note
  In Linux device information is obtained by calling into libudev functions. In Windows, the WMI interface is used. In Mac calls the list of serial ports is obtained first and then associated to USB details.


An example of device discovery. Notice the automatic recognition of the 4ZeroBox.
```bash
ztc device discover

vid      pid  sid     uid                                       port          alias    board
-----  -----  ------  ----------------------------------------  ------------  -------  -----------
1A86    7523  no_sid  b08a15d393e42ed94f38145dfbd48a628f9ca30b  /dev/ttyUSB0           4zerobox_v9
```

An example of raw device discovery. No boards are autodetected.
```bash
ztc device discover --raw

vid    pid    sid                     uid                                       port          alias    board
-----  -----  ----------------------  ----------------------------------------  ------------  -------  -------
1D6B   0002   0000:00:14.0            ee4bbb60ffe99711bc714d965150733d88766c8f
8087   0026   no_sid                  4285dfbd8e19d3f05ad09b7b681db659173c1ad7
1A86   7523   no_sid                  b08a15d393e42ed94f38145dfbd48a628f9ca30b  /dev/ttyUSB0
13D3   5405   0000                    8b26c113cd8b30bd237f2838c71d1185dcea66c9
06CB   00BD   57E172E87336            468b2fbbd4ab8f3cf763fc1cc59f57164e9001ed
1D6B   0003   0000:00:14.0            36969db6ad2d0bd89451e8932ac8f8ff1ccda4cd
0018   06CB   0018:000006CB:0000CD8C  30f018db95598a41e0fb245bdcb4c2652b306ec7
1D6B   0002   0000:2D:00.0            24c1b5c8c474d4b35176b767d81f19c0fac41ed4
1D6B   0003   0000:2D:00.0            67d065ddde6ac6ab52697176a0b8da33f5802eaa
```

#### ztc device provision
The `provision` subcommand group helps with provisioning operations such as saving secrets in the secure element or 
retrieving the device certificates.

##### ztc device provision command
Send a command  to a device running the provisioning firmware.

```bash
ztc device provision command IDENTIFIER [COMMAND] [ARGS]
```

where `COMMAND` is one of:

- `uid`: retrieve the secure element unique identifier
- `dcn`: retrieve the common name of the device certificate
- `bundle [nonce]`: perform a signature of the message `dcn:nonce`

Options:

- `--help`  Show this message and exit


##### ztc device provision phys-id
Retrieve a unique identifier of the physical device.

```bash
ztc device provision phys-id [OPTIONS] IDENTIFIER
```

where `IDENTIFIER` is the `uid` of the device.

It is used to get a unique physical identfier of a device since the `uid` is dependent on the USB attributes and in some cases
can be not unique.


Options:

- `--help`  Show this message and exit


##### ztc device provision prepare
Upload the provisioning firmware into the device.

```bash
ztc device provision prepare [OPTIONS] IDENTIFIER
```

where `IDENTIFIER` is the `uid` of the device.

Options:

- `--help`  Show this message and exit

#### ztc device reset

Reset a device with `IDENTIFIER`.

```bash
ztc device  device reset [OPTIONS] [IDENTIFIER]
```

Options:

- `--board TEXT`  set the board type of the device
- `--help`        Show this message and exit.

#### ztc device supported

List of supported devices.

```bash
ztc device  supported [OPTIONS]
```

Options:

- `--help`        Show this message and exit.

### ztc info

Show general information.

```bash
ztc info
```

Options:
- `--examples`    List the installed examples
- `--help`        Show this message and exit.

### ztc link

Transform a compiled project into an executable ready to be burned.

```bash
ztc link [OPTIONS] [ZERYNTH_ARCHIVE]
```

where `ZERYNTH_ARCHIVE` is the location of `firmware.z`

Options:

- `--help`        Show this message and exit.

### ztc project

The `project` command group helps creating and configuring projects.

#### ztc project create

Create e new project

```bash
ztc project  create [OPTIONS] PATH
```
where `PATH` is the folder where to store the project files.


Options:

- `--from PATH`   Path of a project used to copy from.
- `--help`        Show this message and exit.

#### ztc project update

Configure the project.

```bash
ztc  project update [OPTIONS] PATH
```

where `PATH` is the project folder.

Options:
- `--board TEXT`  the board type
- `--uid TEXT`    the device `uid`
- `--help`        Show this message and exit.


