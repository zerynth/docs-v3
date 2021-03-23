---
layout: blog
title: Standatd Library - Threading
---
## Threading

This module define classes used in high-level threaded programming.

Zerynth VM offers native low-level primitives for multithreaded programming that can be difficult to use. This module abstracts
such primitives to make them easy to use:

* :class:`Thread`
* :class:`Lock`
* :class:`Semaphore`
* :class:`Event`
* :class:`Condition`

## Thread Objects

The :class:`Thread` class represents an activity that is run in a separate
thread of control.  There are two ways to specify the activity: by passing a
callable object to the constructor, or by overriding the :meth:`~Thread.run`
method in a subclass.  No other methods (except for the constructor) should be
overridden in a subclass.  In other words, *only*  override the
:meth:`~Thread.__init__` and :meth:`~Thread.run` methods of this class.

Once a thread object is created, its activity must be started by calling the
thread's :meth:`~Thread.start` method.  This invokes the :meth:`~Thread.run`
method in a separate thread of control.

Once the thread's activity is started, the thread is considered 'alive'. It
stops being alive when its :meth:`~Thread.run` method terminates -- either
normally, or by raising an unhandled exception.  The :meth:`~Thread.is_alive`
method tests whether the thread is alive. The attribute :attr:`~Thread.exc` is the exception
generated by the :meth:`~Thread.run` method or *None*.

Other threads can call a thread's :meth:`~Thread.join` method.  This blocks
the calling thread until the thread whose :meth:`~Thread.join` method is
called is terminated.

A thread has a name.  The name can be passed to the constructor, and read or
changed through the :attr:`~Thread.name` attribute.

A thread has also an id. The id is determined after :meth:`~Thread.start` is called and can be accessed
through :attr:`~Thread.ident`.

## Thread class

### class `Thread`
`Thread(target=None, name=None, args=())`


This constructor should always be called with keyword arguments.  Arguments
are:

`target` is the callable object to be invoked by the :meth:`run` method.
Defaults to `None`, meaning nothing is called.

`name` is the thread name.  By default, a unique name is constructed of the
form "Thread-*N*" where *N* is the thread id.

`args` is the argument tuple for the target invocation.  Defaults to `()`.

If the subclass overrides the constructor, it must make sure to invoke the
base class constructor (`Thread.__init__()`) before doing anything else to
the thread.

### method `start`

```python
start(prio = PRIO_NORMAL, size=512)
```

Start the thread's activity.

It must be called at most once per thread object.  It arranges for the
object's :meth:`~Thread.run` method to be invoked in a separate thread
of control.

This method will raise a :exc:`RuntimeError` if called more than once
on the same thread object.

*prio* and *size* are used to set the thread priority and the stack size.

### method `join`

```python
join(timeout=-1)
```

Wait until the thread terminates. This blocks the calling thread until
the thread whose :meth:`~Thread.join` method is called terminates -- either
normally or through an unhandled exception --, or until the optional
timeout occurs.

When the *timeout* argument is present and not less than zero, it should be a
integer number specifying a timeout for the operation in milliseconds.
As :meth:`~Thread.join` always returns `None`,
you must call :meth:`~Thread.is_alive` after :meth:`~Thread.join` to
decide whether a timeout happened -- if the thread is still alive, the
:meth:`~Thread.join` call timed out.

When the *timeout* argument is not present or less than zero, the operation will
block until the thread terminates.

A thread can be :meth:`~Thread.join`\ ed many times.

### method `run`

```python
run()
```

Method representing the thread's activity.

You may override this method in a subclass.  The standard :meth:`run`
method invokes the callable object passed to the object's constructor as
the *target* argument, if any, with sequential arguments taken
from the *args* argument.

### method `is_alive`

```python
is_alive()
```

Return whether the thread is alive.

This method returns `True` just before the :meth:`~Thread.run` method
starts until just after the :meth:`~Thread.run` method terminates.

### attribute `name`

A string used for identification purposes only. It has no semantics.
Multiple threads may be given the same name.  The initial name is set by
the constructor.

### attribute `ident`

The 'thread identifier' of this thread or `None` if the thread has not
been started.  This is a non negative integer. Thread identifiers may be recycled
when a thread exits and another thread is created.  The identifier is
available even after the thread has exited.

## Lock class

### class `Lock`

```python
Lock()
```

A Lock object can be in two states: *locked* or *unlocked*. When a Lock object is created it starts *unlocked*.

A thread can try to *lock* a Lock object:

* if the Lock object is already *locked* the thread will block until the Lock object is *unlocked* by some other thread.
* if the Lock object is *unlocked*, it becomes *locked* and the thread continues execution.

A thread can also try to *unlock* a Lock object that it had previously *locked*:

* if no other threads are waiting for the Lock object to become *unlocked*, the Lock object becomes *unlocked*
* if one or more threads are waiting for the Lock object to become *unlocked*, one of them is selected and can continue from where it left. All the other waiting threads remain blocked. The Lock object remains *locked*.

Lock object are tipically used to gain exclusive access to a resource::

```python
import streams
import threading

# open a serial port: our resource
streams.serial("ser1")
# create a lock
lock = threading.Lock()

# define a function to be launched as a thread
def threadfun(msg):
    while True:
        # if it's unlocked, lock it and continue printing. Else wait.
        lock.acquire()
        print(msg)
        # unlock and allow another thread to call the print
        lock.release()

# launch thread 1
thread(threadfun,"Hello")

# launch thread 2
thread(threadfun,"World")

```

Both threads in the example will compete to call `print(msg)`. The Lock object ensure that while one thread is printing on the serial port, the other one is blocked, waiting for the message to be printed.

### method `acquire`

```python
acquire(blocking=True, timeout=-1)
```

Acquire a lock, blocking or non-blocking.

When invoked with the `blocking` argument set to `True` (the default),
block until the lock is unlocked, then set it to locked and return `True`.

When invoked with the `blocking` argument set to `False`, do not block.
If a call with *blocking* set to `True` would block, return `False`
immediately; otherwise, set the lock to locked and return `True`.

When invoked with the integer `timeout` argument set to a positive
value, block for at most the number of milliseconds specified by `timeout`
and as long as the lock cannot be acquired.  A `timeout` argument of `-1`
specifies an unbounded wait.  It is forbidden to specify a `timeout`
when `blocking` is false.

The return value is `True` if the lock is acquired successfully,
`False` if not (for example if the *timeout* expired).

### method `release`

```python
release()
```

Release a lock.  This can be called from any thread, not only the thread
which has acquired the lock.

When the lock is locked, reset it to unlocked, and return.  If any other threads
are blocked waiting for the lock to become unlocked, allow exactly one of them
to proceed.

## Semaphore class

### class `Semaphore`

```python
Semaphore(value=1)
```

This class implements semaphore objects.  A semaphore manages a counter
representing the number of :meth:`release` calls minus the number of
:meth:`acquire` calls, plus an initial `value`.  The :meth:`acquire` method
blocks if necessary until it can return without making the counter negative.
If not given, `value` defaults to 1.

The optional argument gives the initial `value` for the internal counter; it
defaults to `1`. If the *value* given is less than 0, :exc:`ValueError` is
raised.

### method `acquire`

```python
acquire(blocking=True, timeout=-1)
```

Acquire a semaphore.

When invoked without arguments: if the internal counter is larger than
zero on entry, decrement it by one and return immediately.  If it is zero
on entry, block, waiting until some other thread has called
:meth:`.release` to make it larger than zero.  This is done
with proper interlocking so that if multiple :meth:`.acquire` calls are
blocked, :meth:`.release` will wake exactly one of them up.
The implementation may pick one at random, so the order in which
blocked threads are awakened should not be relied on.  Returns
true (or blocks indefinitely).

When invoked with `blocking` set to false, do not block.  If a call
without an argument would block, return false immediately; otherwise,
do the same thing as when called without arguments, and return true.

When invoked with a `timeout` other than -1, it will block for at
most `timeout` milliseconds.  If acquire does not complete successfully in
that interval, return false.  Return true otherwise.

### method `release`

```python
release()
```

Release a semaphore, incrementing the internal counter by one.  When it
was zero on entry and another thread is waiting for it to become larger
than zero again, wake up that thread.

## Event class

### class `Event`

```python
Event()
```

Class implementing event objects.  An event manages a flag that can be set to
true with the :meth:`~Event.set` method and reset to false with the
:meth:`clear` method.  The :meth:`wait` method blocks until the flag is true.
The flag is initially false.

### method `set`

```python
set()
```

Set the internal flag to true. All threads waiting for it to become true
are awakened. Threads that call :meth:`wait` once the flag is true will
not block at all.

### method `is_set`

```python
is_set()
```

Return true if and only if the internal flag is true.

### method `clear`

```python
clear()
```

Reset the internal flag to false. Subsequently, threads calling
:meth:`wait` will block until :meth:`.set` is called to set the internal
flag to true again.

### method `wait`

```python
wait(timeout=-1)
```

Block until the internal flag is true.  If the internal flag is true on
entry, return immediately.  Otherwise, block until another thread calls
:meth:`.set` to set the flag to true, or until the optional timeout occurs.

When the `timeout` argument is present and `>0`, it should be an
integer number specifying a timeout for the operation in milliseconds.

This method returns true if and only if the internal flag has been set to
true, either before the wait call or after the wait starts, so it will
always return `True` except if a timeout is given and the operation
times out.

## Condition Objects

A condition variable is always associated with some kind of lock; this can be
passed in or one will be created by default.  Passing one in is useful when
several condition variables must share the same lock.  The lock is part of
the condition object: you don't have to track it separately.

A condition variable  must be locked with :meth:`~Condition.acquire` before any other method
can be called, and unlocked with :meth:`~Condition.release` when done calling methods.

The :meth:`~Condition.wait` method releases the lock, and then blocks until
another thread awakens it by calling :meth:`~Condition.notify` or
:meth:`~Condition.notify_all`.  Once awakened, :meth:`~Condition.wait`
re-acquires the lock and returns.  It is also possible to specify a timeout.

The :meth:`~Condition.notify` method wakes up one of the threads waiting for
the condition variable, if any are waiting.  The :meth:`~Condition.notify_all`
method wakes up all threads waiting for the condition variable.

Note: the :meth:`~Condition.notify` and :meth:`~Condition.notify_all` methods
don't release the lock; this means that the thread or threads awakened will
not return from their :meth:`~Condition.wait` call immediately, but only when
the thread that called :meth:`~Condition.notify` or :meth:`~Condition.notify_all`
finally relinquishes ownership of the lock.

The typical programming style using condition variables uses the lock to
synchronize access to some shared state; threads that are interested in a
particular change of state call :meth:`~Condition.wait` repeatedly until they
see the desired state, while threads that modify the state call
:meth:`~Condition.notify` or :meth:`~Condition.notify_all` when they change
the state in such a way that it could possibly be a desired state for one
of the waiters.  For example, the following code is a generic
producer-consumer situation with unlimited buffer capacity

```python
# Consume one item
cv.acquire()
while not an_item_is_available():
    cv.wait()
    get_an_available_item()
cv.release()

# Produce one item
cv.acquire()
make_an_item_available()
cv.notify()
cv.release()
```

The `while` loop checking for the application's condition is necessary
because :meth:`~Condition.wait` can return after an arbitrary long time,
and the condition which prompted the :meth:`~Condition.notify` call may
no longer hold true.  This is inherent to multi-threaded programming.  The
:meth:`~Condition.wait_for` method can be used to automate the condition
checking, and eases the computation of timeouts::

```python
# Consume an item
cv.acquire()
cv.wait_for(an_item_is_available)
get_an_available_item()
cv.release()
```

To choose between :meth:`~Condition.notify` and :meth:`~Condition.notify_all`,
consider whether one state change can be interesting for only one or several
waiting threads.  E.g. in a typical producer-consumer situation, adding one
item to the buffer only needs to wake up one consumer thread.

The order of awakened threads may correspond to the order of wait in a fifo style,
but this is not guaranteed for every VM.

## Condition class

### class `Condition`

```python
Condition(lock=None)
```

This class implements condition variable objects.  A condition variable
allows one or more threads to wait until they are notified by another thread.

If the `lock` argument is given and not *None*, it must be a :class:`Lock` object,
and it is used as the underlying lock.  Otherwise,
a new :class:`Lock` object is created and used as the underlying lock.

### method `acquire`

```python
acquire(blocking=True, timeout=-1)
```

Acquire the underlying lock. This method calls the corresponding method on
the underlying lock; the return value is whatever that method returns.

### method `release`

```python
release()
```

Release the underlying lock. This method calls the corresponding method on
the underlying lock; there is no return value.

### method `wait`

```python
wait(timeout=-1)
```

Wait until notified or until a timeout occurs. If the calling thread has
not acquired the lock when this method is called, a :exc:`RuntimeError` is
raised.

This method releases the underlying lock, and then blocks until it is
awakened by a :meth:`notify` or :meth:`notify_all` call for the same
condition variable in another thread, or until the optional timeout
occurs.  Once awakened or timed out, it re-acquires the lock and returns.

When the `timeout` argument is present and not less than zero, it should be a
integer number specifying a timeout for the operation in milliseconds.

The return value is `True` unless a given `timeout` expired, in which
case it is `False`.

### method `wait_for`

```python
wait_for(predicate, timeout=-1)
```

Wait until a condition evaluates to True.  `predicate` should be a
callable which result will be interpreted as a boolean value.
A `timeout` may be provided giving the maximum time to wait.

This utility method may call :meth:`wait` repeatedly until the predicate
is satisfied, or until a timeout occurs. The return value is
the last return value of the predicate and will evaluate to
`False` if the method timed out.

Ignoring the timeout feature, calling this method is roughly equivalent to
writing:

```python
while not predicate():
    cv.wait()
```

Therefore, the same rules apply as with :meth:`wait`: The lock must be
held when called and is re-acquired on return.  The predicate is evaluated
with the lock held.

### method `notify`

```python
notify(n=1)
```

By default, wake up one thread waiting on this condition, if any.  If the
calling thread has not acquired the lock when this method is called, a
:exc:`RuntimeError` is raised.

This method wakes up at most `n` of the threads waiting for the condition
variable; it is a no-op if no threads are waiting.

The current implementation wakes up exactly `n` threads, if at least `n`
threads are waiting.

Note: an awakened thread does not actually return from its :meth:`wait`
call until it can reacquire the lock.  Since :meth:`notify` does not
release the lock, its caller should.

### method `notify_all`

```python
notify_all()
```

Wake up all threads waiting on this condition.  This method acts like
:meth:`notify`, but wakes up all waiting threads instead of one. If the
calling thread has not acquired the lock when this method is called, a
:exc:`RuntimeError` is raised.