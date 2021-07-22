# ZM1-DB

### function next_expansion
```python
next_expansion(e, selectors=None)
```
* `e` is the next expansion type module.
    
Use the following table to choose the right expansion.

    | module  | expansion |
    |---------|-----------|
    | `io`    | EXP-IO    |
    | `relay` | EXP-RELAY |
    | `ser`   | EXP-SER   |
    | `ain`   | EXP-AIN   |

* `selectors` is a tuple with information on position of rotative switches of the expansion. Order follow swiches indexes.

### function expansions_on
```python
expansions_on()
```
Power on all the expansions conected to the ZM1-DB.

### function expansions_off
```python
expansions_off()
```
Shut down all the expansions conected to the ZM1-DB.

### function init
```python
init()
```
Reinitialize all exapansions connected to the ZM1-DB.

### function summary
```python
summary()
```
Print a summary on ZM1-DB and its connected expansions.
