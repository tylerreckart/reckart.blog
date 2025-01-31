---
date: "January 31, 2025"
title: "Aulos update- moving to pure seed hardware"
description: "In my last post, Sound Synthesis in C++, I introduced the instrument I have been prototyping for the last few months on the Daisy Patch module. Since then, things have evolved quite a bit—I've ditched the Patch submodule, gone all-in on the Seed hardware, and added additional components such as multiplexers to unlock way more control over CV and potentiometer input."
published: true
---
![Image showing the current Aulos hardware prototype running through an oscilloscope](https://s3.us-east-2.amazonaws.com/reckart.blog-images/1.jpeg)

In my last post, [Sound Synthesis in C++](https://reckart.blog/posts/sound-synthesis-in-cpp/), I introduced the instrument I have been prototyping for the last few months on the Daisy Patch module. Since then, things have evolved quite a bit—I've ditched the Patch submodule, gone all-in on the Seed hardware, and added additional components such as multiplexers to unlock way more control over CV and potentiometer input.

This was the next logical step in the prototyping process. If I wanted to turn the prototype into a real instrument, I needed to ditch the pre-built hardware and start prototyping my own circuit. Sure, this means designing a custom PCB and handling more of the low-level wiring myself, but that’s part of the fun, right?

One of the main limitations of the Seed is the number of available analog inputs. In order to circumvent this, I've utilized two **CD74HC4067 multiplexers**—game-changing ICs that lets me drastically expand the number of CV and pot inputs without needing extra ADC pins.

This setup means I can have a ton of tweakable parameters without running out of inputs, which is huge for the amount of tweakability that I want this instrument to have.

## What’s Next?

Now that the hardware is mostly sorted, here’s what’s next on my plate:

1. **Refining the firmware**—tweaking CV scaling, optimizing scanning, and making sure everything runs rock solid.
2. **Real-world testing**—pushing the multiplexer setup in different modulation scenarios to see how it holds up.
3. **Finalizing the hardware design**—getting it ready for a clean, reliable build and testing initial PCB designs.

Got thoughts, feedback, or just want to nerd out about synth design? Drop me a message or follow along on [GitHub](https://github.com/tylerreckart/aulos)!
