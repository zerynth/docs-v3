# Control Industrial Lamp with EXP-RELAY

Relays are used as switches for electrical circuits across many industrial applications. Aside from the classification and type of relay, they have a simple purpose - to turn on, or to turn off an electrical circuit by toggling the relay input.  

Relays are extremely useful because they allow micro-controllers that work on low voltages (in range 1.8V to 5V) to control electrical circuits that work on high voltage or where current through the circuit is high. In industrial applications, relays are used wherever control of the circuit using a simple switch is necessary. As examples - home appliances, automobiles, communication devices, etc.
## EXP-RELAY Expansion board
 
<figure>
  <a data-fancybox="gallery" href="../img/EXP-RELAY-front.png">
  <img src="../img/EXP-RELAY-front.png"width="200"/>
  </a>
</figure>
The [EXP-RELAY expansion board](https://www.zerynth.com/products/hardware/exp-relay/) is an output module that has 6 General Purpose Relays rated at 6A 250VAC. It enables control of industrial machines and actuators.

## Code

In this demo we will create a simple application which will toggle a relay on the EXP-RELAY expansion board in 3 second periods. This will make our lamp turn off for 3 seconds, then turn back on for 3 seconds, continuously.
<figure>
  <a data-fancybox="gallery" href="../img/relaylamp.jpg">
  <img src="../img/relaylamp.jpg"width="300"/>
  </a>
</figure>

With the [ZSDK,](https://www.zerynth.com/zsdk/) all libraries necessary for EXP-RELAY expansion are built-in . All you have to do is to import the relay module from the expansion library, do a proper initialization of the expansion board and then control the relay, simply, by calling the Relay library functions.

    from expansions import relay
    
    # Initialize board and relay expansion by providing the position of rotary switches.
    # In this demo, the arrow on the rotary switch points to 1.
    
    board.init()
    exp_relay = board.next_expansion(relay, (1,))
    
    while True:
    
        # Change the state of the relay every 3 seconds.
    
        if exp_relay.is_relay_on(exp_relay.OUT1):
            exp_relay.relay_off(exp_relay.OUT1)
        else:
            exp_relay.relay_on(exp_relay.OUT1)
        sleep(3000)

        

It is pretty simple. Most important, you don’t have to waste time searching through the schematics and datasheets for the GPIOs/ Registers. All of that is already configured and developed.


<figure>
  <a data-fancybox="gallery" href="../img/relaylampon.jpg">
  <img src="../img/relaylampon.jpg"width="200"/>
  </a>
</figure>

## More interesting tutorials
Have you checked our Multithreaded firmware demo and our Watchdog demo? [Click here to check them](https://docs.zerynth.com/latest/demos/zerynth-os/multi_thread_basic/)

We hope you enjoyed this new demo. Feel free to join our [community forum](https://community.zerynth.com/) if you have any additional questions.
