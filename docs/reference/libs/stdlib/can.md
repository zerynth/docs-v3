# CAN

This module loads the Controller Area Network (CAN) driver of the mcp2518.

A Controller Area Network (CAN bus) is a robust vehicle bus standard designed to allow microcontrollers and devices to communicate with each other’s applications without a host computer.
It is a message-based protocol, designed originally for multiplex electrical wiring within automobiles to save on copper, but can also be used in many other contexts.
For each device the data in a frame is transmitted sequentially but in such a way that if more than one device transmits at the same time the highest priority device is able to continue while the others back off.
Frames are received by all devices, including by the transmitting device.

Only CAN2.0 is supported right now.

### function `init`
```python
init(nss, spi=SPI0, spi_clk=15000000)
```
Initialize the mcp2518 CAN controlled by the SPI peripheral. This function must be called to be able to use other CAN's APIs.

* `nss` is the chip select pin use to communicate with the CAN device.

* `spi` is the SPI peripheral connected to the mcp2518. Default `SPI0`

* `spi_clk` is the clock speed of the SPI.

### function `conf`
```python
conf(cdiv=3, iso_crc_en=False, tef_en=False, txq_en=False, btime=10, sysclk=0)
```
Configure main parameter of the CAN communication. This includes clock speed, crcs and if Transmit Event Fifo and Transmit Queue channels are active.
Must be called before `start` is called.

* `cdiv` is the clock division of the CAN internal clock. Clock division parameter follows the table below.
    
    | `cdiv` | Clock division |
    |--------|----------------|
    | 0      | 1              |
    | 1      | 2              |
    | 2      | 4              |
    | 3      | 10             |
    
    Default value is 3.

* `iso_crc_en` enables the iso crc check on messages. Default is `False`.

* `tef_en` enables Transmit Event Fifo and its APIs. This allows to keep track the completed transmit events. Default is `False`.

* `txq_en` enables the Transmit Queue. This will always be on channel 0. Diffrently from the Transmit Fifos, the Queue will transmit messages following ID priority (lower ID -> higher priority). Default is `False`.

* `btime` is the data rate of the CAN. `btime` parameter follows the table below.

    | `btime` | Data rate (kbps) |
    |---------|------------------|
    | 0       | 500              |
    | 10      | 250              |
    | 15      | 1000             |
    | 17      | 125              |

    Default value is 10.

* `sysclk` is the CAN internal clock speed. `sysclk` follows the table below.

    | `sysclk` | Clock speed (MHz) |
    |----------|-------------------|
    | 0        | 40                |
    | 1        | 20                |
    | 2        | 10                |

    Default value is 0.

### function `tef_conf`
```python
tef_conf(queue_size)
```
Configure the Transmit Event Fifo.
Must be called before `start` is called.

* `queue_size` is the size of the Transmit Event Fifo. The TEF will keep track of the last `queue_size` completed transmissions.

### function `txq_conf`
```python
txq_conf(queue_size, prio, tx_attempts=0)
```
Configure the Transmit Queue. This will be always configured to channel 0, which is reserved for it. Diffrently from the Transmit Fifos, the Queue will transmit messages following ID priority (lower ID -> higher priority).

* `queue_size` is the size of the Transmit Queue.

* `prio` is the TXQ channel priority. Lower value -> higher priority.

* `tx_attempts` is the number of retransmission attempts if transmissions are not successful. This follows the table below.

    | `tx_attempts` | Retransmissions |
    |---------------|-----------------|
    | 0             | Disabled        |
    | 1             | 3               |
    | 2             | Unlimited       |

    Default value is 0.

### function `txf_conf`
```python
txf_conf(ch, queue_size, prio, rtr_en=False, tx_attempts=0)
```
Configure a Transmit Fifo Channel. More than one channel can be configured as TXF.
Must be called before `start` is called.

* `ch` is the channel to configure as TXF. Possible channels go from 1 to 32.

* `queue_size` is the size of the Transmit Fifo.

* `prio` is the TXF channel priority. Lower value -> higher priority.

* `rtr_en` enables the remote request frames. Default is `False`.

* `tx_attempts` is the number of retransmission attempts if transmissions are not successful. This follows the table below.

    | `tx_attempts` | Retransmissions |
    |---------------|-----------------|
    | 0             | Disabled        |
    | 1             | 3               |
    | 2             | Unlimited       |

    Default value is 0.

### function `rxf_conf`
```python
rx_conf(ch, queue_size)
```
Configure a Receive Fifo Channel. More than one channel can be configured as RXF.
Must be called before `start` is called.

* `ch` is the channel to configure as RXF. Possible channels go from 1 to 32.

* `queue_size` is the size of the Receive Fifo.

### function `start`
```python
start()
```
Starts the configured CAN channels. If configured channels require to much RAM of the CAN, PERIPHERAL_ERROR exception is raised. Try to reduce queue sizes is this case to reduce RAM requirements.

### function `transmit`
```python
transmit(ch, tx, sid, rtr=False, seq=0)
```
Send a message on a target TXF channel. Tx messages are automatically transmitted by the Fifo.

* `ch` is the target TXF channel.

* `tx` is the message to transmit. Max size 8 bytes.

* `sid` is the message standard 11b ID.

* `rtr` defines if the message is a RTR. Default is `False`.

* `seq` is the sequence number of the message. Default is 0.

If the ch queue is full, PERIPHERAL_ERROR exception is raised.

### function `stop_transmit`
```python
stop_transmit(ch)
```
Stop transmissions on a target channel.

* `ch` Target channel.

### function `add_filter`
```python
add_filter(filter, ch, sid, msid)
```
Add a filter on received messages ID on a specified channel.
Each RXF channel requires an active filter.

* `filter` is the number of the filter. Up to 32 filters.

* `ch` is the RXF channel to link the filter to.

* `sid` is the filtered standard ID.

* `msid` is the mask of ignored bits or the filter.

### function `rm_filter`
```python
rm_filter(filter)
```
Removes a target filter. This

* `filter` filter number to remove.

### function `receive`
```python
receive(ch)
```
Receive a message from a RXF channel if the channel is not empty.

* `ch` is the channel to receive from.

Returns sid, msg

### function `stop_receive`
```python
stop_receive(ch)
```
Stop receiving from a RXF channel.

* `ch` is the channel to stop receiving from.

### function `tef_get`
```python
tef_get()
```
Get the next messege from the Transmit Event Fifo.

### function `en_rx_intr`
```python
en_rx_intr(ch)
```
Enables the alert pin for a specific channel RX channel.
If the target channel will receive a message, the alert pin will be lowered.

* `ch` is the channel to activate the alert on.

### function `dis_rx_intr`
```python
dis_rx_intr(ch)
```
Disable the alert pin for a specific RX channel. 

* `ch` is the channel to deactivate.

## Example

```python
import can

nss_can_pin = D10
tx_ch = 1

can.init(nss_can_pin)
can.conf()
can.txf_conf(tx_ch, 5, 1)

can.start()
tx_buff = bytearray("Test msg")
can.transmit(tx_ch, tx_buff, 0x300)
```
