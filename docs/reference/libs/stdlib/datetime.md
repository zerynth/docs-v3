## Date and time

This module supplies classes for manipulating dates, times, and deltas.
It represents a minimalistic implementation of Python module
[datetime](https://docs.python.org/3/library/datetime.html).

`datetime` objects may be categorized as “aware” or “naive”
depending on whether or not they include timezone information.
An aware object can locate itself relative to other aware objects. An
*aware* object represents a specific moment in time that is not open to
interpretation.

A *naive* object does not contain enough information to unambiguously
locate itself relative to other `datetime` objects. Whether a naive
object represents Coordinated Universal Time (UTC), local time, or time
in some other timezone is purely up to the program, just like it is up
to the program whether a particular number represents metres, miles, or
mass. Naive objects are easy to understand and to work with, at the cost
of ignoring some aspects of reality.

For applications requiring aware objects, `datetime` objects have
an optional time zone information attribute, *tzinfo*, that can be set to
an instance of a `timezone` class. These objects capture
information about the offset from UTC time and the time zone name.

The following classes are provided:

* `~timedelta`
* `~timezone`
* `~datetime`


timedelta Objects
=================

A `timedelta` object represents a duration, the difference between two
dates or times. With respect to the Python module
`datetime <https://docs.python.org/3/library/datetime.html>`_,
this implementation is constrained as follows:

* Minimum resolution is *1 second*, instead of *1 microsecond*.
* Arithmetic is done via direct function calls (`add` vs `__add__`) due to Zerynth's limits.


Class attributes
----------------

### attribute `timedelta.MINYEAR`

The year of `timedelta.min`, i.e.
   
`timedelta.min.tuple()[1] // (365×24×60×60) == -34`


### attribute `timedelta.MAXYEAR`

The year of `timedelta.max`, i.e.
`timedelta.max.tuple()[1] // (365×24×60×60) == 34`


### attribute `timedelta.min`

The most negative `timedelta` object

`timedelta(-2**30)`


### attribute `timedelta.max`

The most positive `timedelta` object

`timedelta(2**30 - 1)`


### attribute `timedelta.resolution`

The smallest possible difference between non-equal `timedelta`
objects

`timedelta(seconds=1)`

Class methods
-------------

### class `timedelta`
```python
timedelta(hours=0, minutes=0, seconds=0, days=0, weeks=0)
```

All arguments are optional and default to ``0``. Arguments may be integers
or floats, and may be positive or negative. Only seconds are stored
internally. Arguments are converted to those units:

* A minute is converted to 60 seconds.
* An hour is converted to 3600 seconds.
* A week is converted to 7 days.

If no argument is a float, the conversion and normalization processes are
exact (no information is lost).


### method `total_seconds`
```python
total_seconds()
```

Return the total number of seconds contained in the duration.


### method `add`
```python
add(other)
```

Return the difference between two durations.


### method `mul`
```python
mul(other)
```

Return a delta multiplied by an integer or float. The result is rounded to the nearest second using round-half-to-even.


### method `truediv`
```python
truediv(other)
```

When `other` is a float or an integer, returns a delta divided by `other`.
The result is rounded to the nearest multiple of timedelta.resolution
using round-half-to-even.

When `other` is a delta, division of overall duration by interval unit `other`. 

Returns a float object.


### method `floordiv`
```python
floordiv(other)
```

The floor is computed and the remainder (if any) is thrown away. When `other` is a delta, an integer is returned.


### method `mod`
```python
mod(other)
```

The remainder is computed as a `timedelta` object.


### method `divmod`
```python
divmod(other)
```

Computes the quotient and the remainder:

`q = td1.floordiv(td2)`

and

`r = td1.mod(td2)`

`q` is an integer and `r` is a `timedelta` object.


### method `neg`
```python
neg()
```

Equivalent to `td1.mul(-1)`.


### method `eq`
```python
eq(other)
```

Equivalent to `td1.total_seconds() == td2.totalseconds()`.


### method `le`
```python
le(other)
```

Equivalent to `td1.total_seconds() <= td2.totalseconds()`.


### method `lt`
```python
lt(other)
```

Equivalent to `td1.total_seconds() < td2.totalseconds()`.


### method `ge`
```python
ge(other)
```

Equivalent to `td1.total_seconds() >= td2.totalseconds()`.


### method `gt`
```python
gt(other)
```

Equivalent to `td1.total_seconds() > td2.totalseconds()`.


### method `bool`
```python
bool()
```

Return `False` when duration is `0`.


### method `abs`
```python
abs()
```

Return a positive delta.


### method `tuple`
```python
tuple(sign_pos='')
```

Return the tuple `(sign, days, hours, minutes, seconds)`, where `sign` is
`-` if delta is negative, `sign_pos` otherwise.


Examples of usage
-----------------

An example of normalization::

```python
    import datetime.timedelta

    # Components of another_year add up to exactly 365 days
    year = timedelta(days=365)
    another_year = timedelta(weeks=40, days=84, hours=23, minutes=50, seconds=600)
    print(year.eq(another_year)) # True
    print(year.total_seconds())  # 31536000
```

Examples of timedelta arithmetic::

```python
    import datetime.timedelta

    year = timedelta(days=365)
    ten_years = year.mul(10)
    print(ten_years)                    # 3650d 00:00:00
    nine_years = ten_years.sub(year)
    print(nine_years)                   # 3285d 00:00:00
    three_years = nine_years.floordiv(3)
    print(three_years)                  # 1095d 00:00:00
```


timezone Objects
================

The `timezone` class represents a timezone defined by a fixed
offset from UTC. Define a subclass of `timezone` to capture
information about a particular time zone.

An instance of `timezone` can be passed to the constructors for
`datetime`. The latter objects view their attributes as being in
local time, and the `timezone` object supports methods revealing
offset of local time from UTC, the name of the time zone, and DST offset,
all relative to a date-time object passed to them.


Methods to customize
--------------------

A subclass of `timezone` may need to override the following methods.
Exactly which methods are needed depends on the uses made of aware
`datetime` objects. If in doubt, simply implement all of them.


### method `utcoffset`
```python
utcoffset(dt)
```

Return offset of local time from UTC, as a `timedelta` object
that is positive east of UTC. If local time is west of UTC, this should
be negative.

This represents the *total* offset from UTC; for example, if a
`timezone` object represents both time zone and DST adjustments,
`timezone.utcoffset` should return their sum. If the UTC offset
isn’t known, return `None`. Else the value returned must be a
`timedelta` object strictly between `timedelta(hours=-24)` and
`timedelta(hours=24)` (the magnitude of the offset must be less than one
day). Most implementations of `timezone.utcoffset` will probably
look like one of these two:

        return CONSTANT                 # fixed-offset class
        return CONSTANT + self.dst(dt)  # daylight-aware class

If `timezone.utcoffset` does not return `None`, `timezone.dst`
should not return None either.

The default implementation of `timezone.utcoffset` returns the sum
of time zone and DST adjustments, if available.

### method `dst`
```python
dst(dt)
```

Return the daylight saving time (DST) adjustment, as a `timedelta`
object or ``None`` if DST information isn’t known.

Return ``timedelta(0)`` if DST is not in effect. If DST is in effect, return
the offset as a `timedelta` object (see `timezone.utcoffset`
for details). Note that DST offset, if applicable, has already been added
to the UTC offset returned by `timezone.utcoffset`, so there’s no
need to consult `timezone.dst` unless you’re interested in obtaining
DST info separately.

Most implementations of `timezone.dst` will probably look like one
of these two:

```python
def dst(self, dt):
    # a fixed-offset class:  doesn't account for DST
    return timedelta(0)
```

   or:

```python
def dst(self, dt):
    # Code to set dston and dstoff to the time zone's DST
    # transition times based on the input *dt*'s year, and
    # expressed in standard local time.

    dt_ = dt.replace(tzinfo=None)
    if dt_.ge(dston) and dt_.lt(dstoff):
        return timedelta(hours=1)
    else:
        return timedelta(0)
```
   The default implementation of `timezone.dst` returns ``None``.


### method `tzname`
```python
tzname(dt)
```

   Return the time zone name corresponding to the `datetime` object
   *dt*, as a string. Nothing about string names is defined by the
   `datetime` module, and there’s no requirement that it mean anything
   in particular. For example, “GMT”, “UTC”, “-500”, “-5:00”, “EDT”,
   “US/Eastern”, “America/New York” are all valid replies. Return ``None`` if
   a string name isn’t known. Note that this is a method rather than a fixed
   string primarily because some `timezone` subclasses will wish to
   return different names depending on the specific value of `dt` passed,
   especially if the `timezone` class is accounting for daylight time.

   The default implementation of `timezone.tzname` returns the fixed
   value specified when the `timezone` instance is constructed.
   If *name* is not provided in the constructor, the name returned by
   ``tzname()`` is generated from the value of the ``offset`` as follows.
   If *offset* is ``timedelta(0)``, the name is “UTC”, otherwise it returns
   the string provided by `timezone.isoformat` method.

These methods are called by a `datetime` object, in response to their
methods of the same names. A `datetime` object passes `self` as `dt`
argument.


Class attributes
----------------

### attribute `timezone.utc`

   The UTC timezone, ``timezone(timedelta(0))``.


Class methods
-------------

### class `timezone`
```python
timezone(offset, name=None)
```

   The `offset` argument must be specified as a `timedelta`
   object representing the difference between the local time and UTC.
   It must be strictly between ``timedelta(hours=-24)`` and
   ``timedelta(hours=24)``, otherwise `ValueError` is raised.

   The *name* argument is optional. If specified it must be a string
   that will be used as the value returned by the `datetime.tzname`
   method.


### method `isoformat`
```python
isoformat(dt, *, utc=True)
```

   Return a string in the format ``UTC±HH:MM``, where ``±`` is the sign of
   *offset* from UTC, ``HH`` and ``MM`` are two digits of offset's hours and
   offset's minutes respectively. If *offset* is ``timedelta(0)``, “UTC”
   is returned.

   If `utc` is ``False``, this method always returns ``±HH:MM``.

   `dt` is needed in determining the right offset; it can be ``None``.


Examples of usage
-----------------

[Central European Time](https://en.wikipedia.org/wiki/Summer_time_in_Europe)
(CET), used in most parts of Europe and a few North African countries, is a
standard time which is 1 hour ahead of Coordinated Universal Time (UTC).
As of 2011, all member states of the European Union observe summer time;
those that during the winter use CET use Central European Summer Time (CEST)
(or: UTC+02:00, daylight saving time) in summer (from last Sunday of March
to last Sunday of October).

    import datetime

    class cet(datetime.timezone):
        def __init__(self):
            datetime.timezone.__init__(self, datetime.timedelta(hours=1))

        def dst(self, dt):
            return datetime.timedelta(hours=1) if self.isdst(dt) else datetime.timedelta(0)

        def tzname(self, dt):
            return 'CEST' if self.isdst(dt) else 'CET'

        def isdst(self, dt):
            if dt is None:
                return False
            dt_ = dt.replace(tzinfo=None)
            year = dt.tuple()[0]
            day = 31 - (5*year//4 + 4) % 7 # last Sunday of March
            dst = dt_.replace(month=3, day=day)
            if dt_.lt(dst):
                return False
            day = 31 - (5*year//4 + 1) % 7 # last Sunday of October
            dst = dt_.replace(month=10, day=day)
            if dt_.lt(dst):
                return True
            return False

    tz = cet()
    print(tz.isoformat(datetime(2011, 1, 1))) # UTC+01:00
    print(tz.tzname   (datetime(2011, 1, 1))) # CET
    print(tz.isoformat(datetime(2011, 8, 1))) # UTC+02:00
    print(tz.tzname   (datetime(2011, 8, 1))) # CEST

datetime Objects
================

A `datetime` object is a single object containing all the information
for specifying an absolute date and time point.

`datetime` assumes the current Gregorian calendar extended in both
directions, past and future. January 1 of year 1 is called day number 1,
January 2 of year 1 is called day number 2, and so on.

`datetime` assumes there are exactly 3600*24 seconds in every day and
subject to adjustment via a `timezone` object.


Constructors
------------

### class `datetime`
```python
datetime(self, year, month, day, hour=0, minute=0, second=0, tzinfo=None)
```

   The `year`, `month` and `day` arguments are required. `tzinfo` may be
   ``None``, or an instance of a `timezone` class. The remaining
   arguments must be integers in the following ranges:

   * ``MINYEAR <= year <= MAXYEAR``,
   * ``1 <= month <= 12``,
   * ``1 <= day <= number of days in the given month and year``,
   * ``0 <= hour < 24``,
   * ``0 <= minute < 60``,
   * ``0 <= second < 60``,

   If an argument outside those ranges is given, `ValueError` is raised.


### function `fromisoformat`
```python
fromisoformat(date_string)
```

   Return a `datetime` corresponding to a *date_string* in the format
   emitted by `datetime.isoformat`.

   Specifically, this function supports strings in the format::

       YYYY-MM-DD[*HH[:MM[:SS[.fff[fff]]]][+HH:MM[:SS[.ffffff]]]]

   where ``*`` can match any single character.

### function `fromordinal`
```python
fromordinal(n)
```

   Return the `datetime` corresponding to the proleptic Gregorian
   ordinal, where January 1 of year 1 has ordinal 1. `ValueError` is
   raised unless ``1 <= ordinal <= datetime.max.toordinal()``. The hour,
   minute and second of the result are all 0, and *tzinfo* is ``None``.


Class attributes
----------------

### attribute `datetime.MINYEAR`

   The smallest year number allowed in a `datetime` object.
   `datetime.MINYEAR` is ``1``.


### attribute `datetime.MAXYEAR`

   The largest year number allowed in a `datetime` object.
   `datetime.MAXYEAR` is ``9999``.


Class methods
-------------

### method `add`
```python
add(other)
```

   In the expression ``datetime2 = datetime1.add(timedelta)``, ``datetime2``
   is a duration of ``timedelta`` removed from ``datetime1``, moving forward
   in time if ``timedelta > 0``, or backward if ``timedelta < 0``. The result
   has the same `timezone` attribute as the input ``datetime1``, and
   ``datetime2 - datetime1 == timedelta`` after.

   Note that no time zone adjustments are done even if the input is an aware
   object.


### method `sub`
```python
sub(other)
```

   If *other* is an instance of `timedelta`, the expression
   ``datetime2 = datetime1.sub(timedelta)`` computes the ``datetime2`` such that
   ``datetime2 + timedelta == datetime1``. As for addition, the result has the
   same `timezone` attribute as the input ``datetime1``, and no time
   zone adjustments are done even if the input is aware.

   If *other* is an instance of `datetime`, subtraction
   ``timedelta = datetime2.sub(datetime1)`` is defined only if both operands
   are naive, or if both are aware. If one is aware and the other is naive,
   `TypeError` is raised.

   If both are naive, or both are aware and have the same `timezone`
   attribute, the `timezone` attributes are ignored, and the result
   is a `timedelta` object *t* such that ``datetime2 + t == datetime1``.
   No time zone adjustments are done in this case.

   If both are aware and have different `timezone` attributes, ``a-b``
   acts as if *a* and *b* were first converted to naive UTC datetimes first.


### method `lt`
```python
lt(other)
```

   Equivalent to ``dt1.toordinal() < dt2.toordinal()``.


### method `lt`
```python
lt(other)
```

   Equivalent to ``dt1.toordinal() <= dt2.toordinal()``.


### method `lt`
```python
lt(other)
```

   Equivalent to ``dt1.toordinal() == dt2.toordinal()``.


### method `lt`
```python
lt(other)
```

   Equivalent to ``dt1.toordinal() >= dt2.toordinal()``.


### method `lt`
```python
lt(other)
```

   Equivalent to ``dt1.toordinal() > dt2.toordinal()``.


### method `utcoffset`
```python
utcoffset()
```

   If *tzinfo* is ``None``, returns ``None``, else returns a
   `timedelta` object with magnitude less than one day.


### method `replace`
```python
replace(year=None, month=None, day=None, hour=None, minute=None, second=None, tzinfo=True)
```

   Return a `datetime` with the same attributes, except for those
   attributes given new values by whichever keyword arguments are specified.
   Note that ``tzinfo=None`` can be specified to create a naive
   `datetime` from an aware `datetime` with no conversion of
   date and time data.


### method `astimezone`
```python
astimezone(tz)
```

   Return a `datetime` object with new *tzinfo* attribute
   *tz*, adjusting the date and time data so the result is the same UTC time
   as *self*, but in *tz*’s local time. *self* must be aware.

   If you merely want to attach a `timezone` object *tz* to a
   `datetime` *dt* without adjustment of date and time data, use
   ``dt.replace(tzinfo=tz)``. If you merely want to remove the `timezone`
   object from an aware `datetime` *dt* without conversion of date and
   time data, use ``dt.replace(tzinfo=None)``.


### method `isoformat`
```python
isoformat(sep='T')
```

   Return a string representing the date and time in ISO 8601 format
   ``YYYY-MM-DDTHH:MM:SS``. If `datetime.utcoffset` does not return
   ``None``, a string is appended, giving the UTC offset:
   ``YYYY-MM-DDTHH:MM:SS+HH:MM``.


### method `toordinal`
```python
toordinal()
```

   Return the proleptic Gregorian ordinal of the date.


### method `isoweekday`
```python
isoweekday()
```

   Return the day of the week as an integer, where Monday is 1 and Sunday
   is 7. For example, ``date(2002, 12, 4).isoweekday() == 3``, a Wednesday.


### method `tuple`
```python
tuple()
```

   Return the tuple ``(year, month, day, hour, minute, second, tzinfo)``.


Examples of usage
-----------------

Examples of working with `datetime` objects::

    from datetime import timedelta, timezone, datetime, fromisoformat

    print(datetime(2005, 7, 14, 12, 30))            # 2005-07-14 12:30:00
    dt = fromisoformat('2006-11-21 16:30+01:00')
    print(dt.add(timedelta(hours=23)))              # 2006-11-22 15:30:00+01:00
    tz1 = timezone(timedelta(hours=4, minutes=30))
    print(tz1)                                      # UTC+04:30
    dt = datetime(1900, 11, 21, 3, 30, tzinfo=tz1)
    print(dt)                                       # 1900-11-21 03:30:00+04:30
    print(dt.astimezone(timezone.utc))              # 1900-11-20 23:00:00+00:00
