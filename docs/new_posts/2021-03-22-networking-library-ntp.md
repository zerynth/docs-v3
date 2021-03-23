---
layout: blog
title: Networking Library - ntp
---
## Network Time Protocol

### function `get_time()`
```
get_time(unix_timestamp=False, server="0.pool.ntp.org")
```
Retrieve the time from the `server` and returns a timestamp. If `unix_timestamp` is *True* the timestamp refers to the unix epoch.

### function `sync_time`
```
sync_time(server="0.pool.ntp.org")
```
Syncs the system time retrieving it from the `server`.
