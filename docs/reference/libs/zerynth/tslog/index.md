# Getting started

Designing a firmware that is robust and reliable in the typical harsh working condition of an IoT device is not an easy task. Data loss must be reduced to a minimum in the face of possible power loss or absence of connectivity.

The Zerynth time series log (TSLog) is a log system for time series that helps decoupling data acquisition and sending.

The use case scenario involves multiple sensors generating data points that, instead of being sent to the network immediately, are stored into the log.
A separate thread can access the log in read-only mode and extract the data points for sending them to the network when the connection is available.

TSLog is robust and resistant to the challenges of IoT: network unavailability, system resets, power loss, etc..
Those features are achieved by the following architecture.

TSLog works by storing fixed length records into containers called `buckets` in non volatile memory. Each record has a monotonically increasing sequence number and when a bucket is full, a new bucket is created for storing the incoming records. Periodically, the buckets are `committed`, i.e. a snapshot is taken of the current status of the log and saved to non volatile memory. If the snapshot succeeds, all the records up to the current sequence number are safely stored and ready to be retrieved.

TSLog provides `readers`, special objects that can read records from buckets. Each reader has its own `cursor`, namely the sequence number of the last record successfully read. Readers can commit their status too, i.e. saving permanently the last value of their cursor.

With this kind of properties, TSLog is a very good solution in case of power loss or absence of connectivity: when the system comes up again, all the readers will restart from the last committed cursor.


When creating a log, the following parameters can be tweaked:

-   a folder for storing log files
-   a record size: the number of bytes a data record is made of
-   a bucket size: the number of records to store in a single log file
-   a commit delta: the number of stored records after which the a snapshot of the log is automatically taken
-   the number of readers: the number of readers that will be used



The log is automatically cleaned from old data when a new bucket is created: all the buckets that have already been consumed by all the readers are deleted.

The above parameters must be chosen correctly in order to avoid the filesystem to fill up.

TSLog is also robust to data corruption which is prevented by choosing a corruption resistant filesystem. The internal filesystem of the various
Zerynth modules is always corruption resistant (i.e. data is either saved correctly or not saved at all).


Usage of TSLog is very simple:

```python
######################################
# TSLog
#####################################
import time
from tslog import tslog

# open the log and provide a record format
# in this case a 64 bits integer followed by two floats
tlog = tslog.TSLog("/zerynth/test", formats=["Qff"])


#Let's define a reader thread thats keeps reading from the log
def reader_loop():
    print("Starting reader...")
    cnt = 0
    while True:
        sleep(250)
        values = treader.next()
        if values is None:
            print("NO DATA YET")
        else:
            print("=>",values)
            # commit every 10 records read
            cnt = cnt+1
            if cnt % 10 == 0:
                treader.commit()



sleep(1000)

# lets get a reader from the tslog
treader = tlog.reader(0)
# and start the thread
thread(reader_loop)

print("Starting writer...")

a=0.0
b=0.0
while True:
    a = a+1
    b = b-1
    ts = time.now()
    # now write data to the log according to the format "Qff"
    seqn = tlog.store(ts,a,b)
    print("<=",(ts,a,b))
    sleep(100)
    if seqn%100==0:
        print("Writer waits for reader to catch up...")
        tlog.commit()
        while True:
            # get some stats
            stats = tlog.stats()
            print("last seqn: ",stats[0])
            print("bucket:    ", stats[1])
            print("reader lag:",stats[2])
            # the reader lag indicates how behind the readers are with respect to the write
            if stats[2]<10:
                # reader is less than 10 records behind, let's wake up and write more data
                print("Reader is catching up, writer restarts...")
                break
            sleep(5000)

```




## The Log

### class TSLog
```python 
class TSLog(
        folder, 
        formats = [], 
        record_size=128, 
        bucket_size=1024, 
        commit_delta=16, 
        nreaders=1, 
        recreate=False)
```

Create a `TSLog` instance. The `TSLog` class accepts various parameters:

-   `folder` is a folder in a mounted filesystem to store buckets and snapshots. It is suggested to use a folder in the internal flash by prefixing the folder with "/zerynth/"
-   `formats` is the  list of possible formats of data that will be saved in the record. If given, it is converted to a record size in bytes via the `struct` library. Check the [struct docs](../../stdlib//struct.md) for available formats
-   `record_size` is the fixed size of the log record. It is suggested to avoid using this parameter directly in favor of `format`
-   `bucket_size` is the number of records that can fit into a bucket
-   `commit_delta` is the number of records after which a snapshot of the log is taken. Adjust based on the frequency of acquisition of the firmware. 
-   `nreaders` is the number of readers that can be created by this instance. Maximum number is 4.
-   `recreate`, if *True* the log is created empty or truncated if already existing

### method `store`

```python 
store(*args)
```

Store the list of arguments to the log according to `formats`. The method always store the arguments according to `formats[0]`.
If the provided formats are zero or more than one, the method raises an exception.
Return the sequence number of the stored record.

### method `store_with_tag`

```python 
store_with_tag(tag, *args)
```

Store the arguments marking the record as belonging to `tag`. `tag` is a non negative integer that selects the 
format to be used according to `formats`.
Return the sequence number of the stored record.

For example, if the log has been initialized with two formats, `Qff` and `Qiii`, the method can be used as `store_with_tag(0,100,1.0,2.0)` for storing data according to `Qff` or as `store_with_tag(1,100,1,2,3)` for storing data according to `Qiii`.

If formats provided are less than two, the method raises an exception.

### method `store_record`

```python 
store_record(data)
```

Store the raw record up to record_size. 
Return the sequence number of the stored record.


### method `commit`

```python 
commit()
```

Creates a snapshot of the log, saving all the buckets permanently to the latest sequence number.
Return the sequence number of the last record.

### method `stats`

```python 
stats()
```

Return a tuple with information on the log:

0. contains the latest sequence number
1. contains the index of the latest bucket
2. contains the readers lag

The readers lag is the difference between the latest sequence number and the minimum of the reader's cursors. It is an indication of how far behind the readers are lagging with respect to the writer.

### method `reader`

```python 
reader(n)
```

Create an instance of a `TSReader`. The method requires a parameter `n` that is an integer identifying the reader (0 to 3).

### method `close`

```python 
close()
```

Close the log.

## The Reader

### class TSReader

```python
TSReader(tslog, n, format="")
```

Create an instance of `TSReader`. This class is never created manually, it is always the result of a call to `TSLog.reader(n)`.

### method `next`

```python
next()
```

Return the next record converted to a tuple according to the log `formats`.
If only one format has been specified, the tuple contans the arguments stored. If the `formats` are more than one, the return value is a tuple with two items: the first is the `tag` as defined in `store_with_tag`, the second is the tuple of stored arguments.
Can return *None* if there is no more available data, i.e. the writer has not committed new data yet.


### method `next_record`

```python
next_record()
```

Return the next record as a bytearray.
Can return *None* if there is no more available data, i.e. the writer has not committed new data yet.

### method `commit`

```python
commit()
```
Save the sequence number of the last read record as the current `cursor`.

### method `close`

```python
close()
```
Close the reader


