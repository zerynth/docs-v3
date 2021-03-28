---
title: Technical Reference
description: ...
---

# Technical reference

This section contains the developer documentation for the vast ecosystem of tools and APIs provided by Zerynth.

It can be daunting to navigate all the information, but the task is made easier by the search bur on the upper right.

The technical reference spans a wide range of topics from the details of writing a Zerynth based firmware for embedded devices to the zCloud APIs. For this reason it might be useful having a journey through Zerynth by starting from the lower layers of the IoT stack and then going up.

!!! warning "V2 Documentation"
    Documentation for versions of Zerynth before v3.0.0 can be found <a href="https://docsv2.zerynth.com" target="_blank">here</a>


## Hardware

Zerynth provides IoT hardware as ready to use [development boards](TODO/link-to-hardware) with [expansions](TODO/link-to-expansions), industrial grade units like the [4ZeroBox](TODO/link-to-4zerobox) or even [IoT modules](TODO/link-to-iot-module) for developing Zerynth based IoT products from scratch.

## Firmware

Once the Zerynth hardware is plugged in, it is extremely easy to write IoT firmware for it. Starting with the [IDE](reference/vscode/index.md) or with the [command line interface](reference/cli/ztc/index.md) for more advanced users, a simple Hello World can be executed in no time.
Writing firmware is made even easier by the use of the Zerynth OS and its Python engine together with the vast choice of [libraries](TODO/link-to-lib-index) and battle tested [protocols](TODO/link-to-protocols).

## Security and Connectivity

Zerynth connectivity and security libraries are so intertwined with hardware and firmware that they are almost invisible to the non-technical eye. For the details, refer to the [secure element](TODO/link-to-secure-element) documentation and to the list of [networking](TODO/link-to-networking) libraries available.

## Device Management

Once the devices are securely connected, they need to be managed throughout their lifecycle. First of all they must be [provisioned](TODO/link-to-provisioning) so that they can be authenticated by the Zerynth Device Manager for receiving [jobs](TODO/link-to-jobs) and performing over the air update of the firmware ([FOTA](TODO/link-to-fota). Care must also be taken to gather the data sent by the device and forward them to third party [integrations](TODO/link-to-integrations). Device management can be completely automated via [API](TODO/link-to-zdm-api) or [CLI](reference/cli/zdm/index.md).

## Data Storage (coming soon)

The Zerynth platform optionally provides a service where IoT data ca be stored and queried, called zStorage. An optimized IoT database cluster is made available to the user by a simple and powerful [API](TODO/link-to-zstorage-apis) without worries about redundancy and availability.

## Data Visualization (coming soon)

Once the data are stored, a Grafana based dashboard can be easily hooked up to the IoT database for visualizing them in no time. The zDashboarding service documentation can be found [here](TODO/link-to-zdashboarding)




