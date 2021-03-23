---
layout: blog
title: Queue
---
## Queue

The queue module implements multi-producer, multi-consumer queues. It is especially useful in threaded programming when information must be exchanged safely between multiple threads. The Queue class in this module implements all the required locking semantics.


### Queue class


### class `Queue`
```python
Queue(maxsize=0)
```

Constructor for a FIFO queue.  *maxsize* is an integer that sets the upperbound
limit on the number of items that can be placed in the queue.  Insertion will
block once this size has been reached, until queue items are consumed.  If
*maxsize* is less than or equal to zero, the queue size is infinite.


### method `qsize`
```python
qsize()
```

Return the approximate size of the queue.  Note, qsize() > 0 doesn't
guarantee that a subsequent get() will not block, nor will qsize() < maxsize
guarantee that put() will not block.


### method `full`
```python
full()
```

Return ``True`` if the queue is full, ``False`` otherwise.  If full()
returns ``True`` it doesn't guarantee that a subsequent call to get()
will not block.  Similarly, if full() returns ``False`` it doesn't
guarantee that a subsequent call to put() will not block.


### method `empty`
```python
empty()
```

Return ``True`` if the queue is empty, ``False`` otherwise.  If empty()
returns ``True`` it doesn't guarantee that a subsequent call to put()
will not block.  Similarly, if `empty()` returns ``False`` it doesn't
guarantee that a subsequent call to `get()` will not block.


### method `put`
```python
put(obj, block=True, timeout=-1)
```

Insert `obj` into the queue. If the queue is full, and `block` is True, block until a free slot becomes available. If `block` is False, raise QueueFull.
If `timeout` is greater than zero, waits for the specified amount of milliseconds before raising QueueFull exception.


### method `get`
```python
get(timeout=-1)
```

`timeout`: set this argument different from -1 to make the `Queue.get()` unblocking (default `timeout=-1` means get blocking)

Remove and return an object out of the queue. If the queue is empty, block until an item is available or timeout occurred.


### method `peek`
```python
peek()
```

Return the object at the head of the queue without removing it. If the queue is empty, wait until an item is available.


### method `clear`
```python
clear()
```

Clear the queue by removing all elements.
