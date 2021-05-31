## V3.0.3
### Removed
- [BSP]: 4ZeroBox - Default x_min/x_max for ADC.

### Added
- [VSCODE]: 'Erase device' function, erases completely the flash memory of the device.
- [VSCODE]: New Zerynth control panel with advanced commands.
- [TOOLCHAIN]: fast burn feature.
- [TOOLCHAIN]: 'ztc device erase' new command to erase the connected board flash.
- [TOOLCHAIN]: Burn firmware faster if components are already on flash.
- [BSP]: Support to burn firmware faster.
- [LIBS]: hash and ecc crypto functions library.
- [LIBS]: TDK iim42652 accelerometer support library.
- [LIBS]: Random data generated with crypto element.

### Changed
- [VSCODE]: build process auto bumps version number.
- [TOOLCHAIN]: Device discover auto exits on ppid change while looping.
- [OS]: build process auto bumps version number.

### Fixed
- [VSCODE]: Better error messages presented to the user.
- [VSCODE]: Discover devices more readily.
- [TOOLCHAIN]: Device discover loop prints delta info on discovery.
- [TOOLCHAIN]: Better error messages presented to the user.
- [LIBS]: zmqtt raises an exception on publishing while in disconnected status.
- [LIBS]: CAN drivers check the dlc size of the message.
- [LIBS]: Serial modbus timer destroy.
- [LIBS]: Returned certificate length.
- [LIBS]: Bug in bignum module.
- [LIBS]: bin_to_hex failing for strings too big in crypto lib.
- [LIBS]: Bug in data load in crypto library.
- [OS]: wifi auto reconnects when SSID disappears/disconnect after an established connection.
- [OS]: Set default uart source clock to UART_SCLK_APB.


## V3.0.2
### Added
- [VSCODE]: Extension setting to enable debug messages on errors.
- [INSTALLER]: Custom Version support

### Bug Fixes and Improvements
- [VSCODE]: Various Bug fixes
- [TOOLCHAIN]: mklfs tool put back without compaction feature.
- [EXAMPLES]: Bug Fixes in ADC peripheral.

## V3.0.1
### Bug Fixes and Improvements
- [OS]: User experience improvements in various peripherals.
- [TOOLCHAIN]: USB Drivers
- [VSCODE]: Various Bug fixes
- [ZPM]: Various Bug fixes


## v3.0.0


v3.0.0 is the first release of Zerynth SDK v3.x
