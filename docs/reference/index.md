---
title: Technical Reference
description: ...
---

# Technical reference

This section contains the developer documentation for the vast ecosystem of tools and APIs provided by Zerynth.

It can be daunting to navigate all the information, but the task is made easier by the search bar on the upper right.

The technical reference spans a wide range of topics from the details of writing a Zerynth based firmware for embedded devices to the zCloud APIs. For this reason it's useful starting a journey through Zerynth from the lower layers of the IoT stack and then going up.

!!! warning "V2 Documentation"
    Documentation for versions of Zerynth before v3.0.0 can be found <a href="https://docsv2.zerynth.com" target="_blank">here</a>


## Hardware

Zerynth provides IoT hardware as ready to use [development boards](../hardware/index.md) with [expansions](../hardware/index.md/#modular-expansion-system), industrial grade units like the [4ZeroBox](../hardware/4ZeroBox.md) for developing Zerynth based IoT products from scratch.

## Firmware

Once the Zerynth hardware is plugged in, it is extremely easy to write IoT firmware for it. Starting with the [IDE](vscode/index.md) or with the [command line interface](cli/ztc/index.md) for more advanced users, a simple Hello World can be executed in no time.
Writing firmware is made even easier by the use of the Zerynth OS and its Python engine together with the vast choice of libraries and battle tested [protocols](libs/protocols/index.md)

## Security and Connectivity

Zerynth connectivity and security libraries are so intertwined with hardware and firmware that they are almost invisible to the non-technical eye. For the details, refer to the [secure element](libs/crypto/index.md) documentation and to the list of [networking](libs/networking/index.md) libraries available.

## Device Management

Once the devices are securely connected, they need to be managed throughout their lifecycle. First of all they must be [provisioned](../gettingstarted/index.md#3-prepare-the-device-for-the-cloud) so that they can be authenticated by the Zerynth Device Manager for receiving [jobs](../zCloud/zdm_intro.md) and performing over the air update of the firmware ([FOTA](../zCloud/FOTA.md). Care must also be taken to gather the data sent by the device and forward them to third party [integrations](../zCloud/zdm_intro.md). Device management can be completely automated via [API](api/zdm/index.md) or [CLI](cli/zdm/index.md).

## Data Storage (coming soon)

The Zerynth platform optionally provides a service where IoT data ca be stored and queried, called zStorage. An optimized IoT database cluster is made available to the user by a simple and powerful [API](api/zstorage/index.md) without worries about redundancy and availability.

## Data Visualization (coming soon)

Once the data are stored, a Grafana based dashboard can be easily hooked up to the IoT database for visualizing them in no time. The zDashboarding service documentation can be found [here](../zCloud/zdashboard_intro.md)




