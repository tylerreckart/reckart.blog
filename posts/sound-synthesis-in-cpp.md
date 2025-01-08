---
date: "January 8, 2025"
title: "Aulos- Sound Synthesis in C++"
description: "Explore Aulos, my modern DSP-based take on the Trautonium. Combining subharmonic synthesis with modular sensibilities, this project bridges historical sound design and digital technology."
published: true
---

Over the last few years, I've become very interested in modular synthesis. I've played instruments since I was a child, and as a programmer, the composability of a modular synthesizer has always been very attractive to me. One early form of synthesis technology that has fascinated me for years is the [Trautonium](https://www.youtube.com/watch?v=KqnLZXOySyY). When I first heard recordings of the instrument, its rich harmonic textures and gliding tones captured my imagination. It wasn’t just the sound itself but the way the instrument invited a performer to interact with it—fluid, expressive, and unlike anything a traditional keyboard could achieve.

Over the course of the last year, I have been heavily invested in building and designing my own instruments that allow for deep interaction with sound. Modular synthesis taught me that the process of shaping sound can be as rewarding as the final result. The Trautonium’s focus on subharmonic synthesis felt like a perfect match for the kind of exploratory sound design I enjoy—an intersection of historical technique and modern modular sensibilities.

This project is my attempt to modernize the sound of the Trautonium using digital signal processing (DSP). The implementation starts with a core oscillator that generates a fundamental frequency, and from there, additional oscillators create subharmonics by dividing the fundamental pitch. Each subharmonic oscillator contributes harmonics that can be dynamically mixed, recreating the harmonic depth that made the original instrument so special. Here's how this works programmatically:

```cpp
// Generate subharmonic frequencies
pitch_sub[0] = pitch_main / 2.f;
pitch_sub[1] = pitch_main / 3.f;
pitch_sub[2] = pitch_main / 4.f;
pitch_sub[3] = pitch_main / 5.f;
```

Each oscillator supports multiple waveforms—sine, triangle, saw, ramp, and square—allowing for additional tone shaping. Another key feature is scale quantization. The original Trautonium offered continuous pitch control via a ribbon controller, but in this digital version, MIDI notes can be quantized to predefined scales for musical structure. Pitch information is quantized like this:

```cpp
int QuantizeToScale(int note, int scale_index)
{
    int octave = note / 12;
    int note_in_octave = note % 12;
    const int *scale = scales[scale_index];

    for (int i = 0; i < 7 && scale[i] != -1; i++)
    {
        if (note_in_octave <= scale[i])
            return octave * 12 + scale[i];
    }
    return (octave + 1) * 12 + scale[0];
}
```

Please take a look at this short demo of the current firmware for insight into the Aulos' sonic character:
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZTuEySEleiw?si=QhjEwcg9u15bxqwA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

If you're curious to learn more or experiment with this implementation, the project is [open-source](https://github.com/tylerreckart/aulos).