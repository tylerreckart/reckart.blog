---
date: "Aug 21, 2022"
title: "Tools for Analog Photography"
description: "One of the benefits of specializing in large format photography is the flexibility that comes with using a view camera. The angles and movements available allow for nearly endless flexibility in the composition of a photograph. While that creates a lot of room for creative freedom, some considerations need to be made."
published: true
---
One of the benefits of specializing in large format photography is the flexibility that comes with using a view camera. The angles and movements available allow for nearly endless flexibility in the composition of a photograph. While that creates a lot of room for creative freedom, some considerations need to be made. The image circle projected by the lens onto the film plane needs to be wide enough to cover the movements, but more importantly, the extension of the bellows needs to be factored into the final exposure.

The culprit is the [inverse square law](https://en.wikipedia.org/wiki/Inverse-square_law). As the bellows are extended, the intensity of light available to expose the negative is inversely proportional to the square of the distance from the film plane. That fall off of light needs to be factored into the final exposure. Otherwise, you'll end up with a dark, underexposed image.

The calculation to compensate for bellows extension is simple, but it's a pain to do in the field or working with extreme extensions for macro photography. I've had the formula in a small notebook that I keep with my large format gear to reference when out in the field, but I thought there could be a better way. So I decided to build one.

![](https://s3.us-east-2.amazonaws.com/reckart.blog-images/ansel_recording-1.gif)

This little photography app, which I've taken to calling Aspen, solves that problem. In its current state, you can adjust for bellows extension, film reciprocity, as well as filter factors. It also includes a handy notebook for referencing exposures in the future.

The app is still very early in its development, but it's been a very handy tool for me as I have been exploring extreme macros and working with alternative printing processes. I haven't put it on the app store yet, but if you're handy with Xcode, you can [view the source](https://github.com/tylerreckart/Aspen) on Github and build it locally to run on your device.

More updates will come as I add additional features and build out the user experience.