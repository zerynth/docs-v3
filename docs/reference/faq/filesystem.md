# Filesystem

## How can I load files and folder in the internal filesystem of a Zerynth hardware?

Inside a project, create a `resources` folder and put files and folders to be loaded inside.
They will be transferred into the internal filesystem and mounted under `/zerynth`.

## Why is it taking so long for the Zerynth hardware to startup the first time?

The internal filesystem needs to be formatted and it may take some time. To speed up the process,
create an empty `resources` folder in the project and an empty filesystem will be created in no time.

## Is the internal filesystem corruptable?

We designed it to be as resistant to corruption as possible. It resists power loss and damaged flash.

## How can I preserve the content of the internal filesystem between different runs of te project?

The internal filesystem is reformatted and reloaded only when a project is run and it contains a `resources` folder.
If you want to preserve the content of the internal filesystem but loading a new firmware, just rename the `resources` folder to something else.

## Is the internal filesystem encrypted?

No it is not. 
