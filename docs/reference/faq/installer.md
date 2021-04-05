# Installer 

## What are the platform supported by Zerynth SDK?

Zerynth SDK can be installed on 64 bits systems. Specifically:

- Windows 10 on x86_64
- Linux on x86_64
- Mac OS X on x86_64 and ARM starting from Big Sur

## What are the requirements for the installation?

Zerynth SDK requires at least 2 Gb of free space on disk. No particular libraries or drivers are required.
For Linux, wether the installer binary can run on a distribution depends on whether the distribution includes the libraries that it is linked to on the building platform. Ubuntu 18.04 is guaranteed to work, but following platforms are also verified to be able to run the installer.

 * Ubuntu 14.04 and newer
 * Fedora 24 and newer
 * Debian 8 and newer

## Where is the SDK installed?

The SDK is installed under different directories depending on the platform:

* Windows: `C:\Users\<your-user>\zerynth3`
* Mac: `~/.zerynth3`
* Linux `~/.zerynth3`

## Can I run the SDK tools from the command line?

Sure. The installer automatically sets the `PATH` environment variable to point to the relevant Zerynth executables.
If for some reason the path is not set correctly (i.e. you do not use Bash or Zsh as your default shell), you can set it manually to

* Windows: `C:\Users\<your-user>\zerynth\dist\sys\cli`
* Linux and Max: `~/.zerynth3/dist/sys/cli`

The available commands are:

* `ztc` and `ztc3`
* `zdm` and `zdm3`
* `zpm`

## Is the installer compatible with versions of Zerynth lower than 3?

Yes with caveats. Zerynth version 2 uses the `ztc` and `zdm` command line tools. It may be needed to adjust the `PATH` to select one version or the other. In alternative, Zerynth 3 users can run `ztc3` and `zdm3`.

## The installer fails, what can I do?

The most common reasons for failure are bad internet connections and low disk space. The installer retries downloading all the required components multiple times before giving up.

If the failure is persistent, please ask for support in our [community forum](https://community.zerynth.com).

