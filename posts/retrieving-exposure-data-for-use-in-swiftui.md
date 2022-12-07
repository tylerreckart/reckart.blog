---
date: "December 6, 2022"
title: "Retrieving Exposure Data From A Capture Device In SwiftUI"
description: "In my last blog post, I wrote about the process of putting together a simple UIKit view model that would allow the `AVCaptureDevice` API to be used in a SwiftUI-heavy application. This post follows-up on that foundation by retrieving exposure information for future offset calculations for light metering."
published: true
---

In my [last blog post](/posts/writing-a-camera-view-for-swift-ui/), I wrote about the process of putting together a simple UIKit view model that would allow the `AVCaptureDevice` API to be used in a SwiftUI-heavy application. I also explained that the purpose at the outset of this experiment was to take the exposure data gathered by the iPhone’s camera and use that as a method for calculating metered exposures for film photography. This post serves as a direct follow-up where I’ll detail the process for retrieving exposure information from the EXIF data provided by the `AVCapturePhotoCaptureDelegate` after a successful capture. Since this is a follow-up post, I won’t go into detail on much of the existing structure for the `CameraViewModel`.

The iPhone’s camera is accurate enough to calculate a proper exposure in almost all cases.  The `device` object exposes plenty of methods for manually setting ISO and exposure modes. These methods are incredibly handy when you want to control the values of your exposure in real-time, but when put into the context of light metering, their usefulness diminishes. All of the data needed to calculate each piece of the exposure triangle is already included in the EXIF data generated when an image is captured.

This starts with writing a method to make an exposure and capture its data. This method will live in the existing `CameraViewModel` class.

```swift
func capture() {
    if let photoOutputConnection = self.photoOutput.connection(with: .video) {
        photoOutputConnection.videoOrientation = .portrait
    }
        
    var photoSettings = AVCapturePhotoSettings()
        
    if self.device.isFlashAvailable {
        photoSettings.flashMode = .off
    }
        
    photoSettings.photoQualityPrioritization = .balanced
        
    DispatchQueue.global(qos: .userInteractive).async {
        self.photoOutput.capturePhoto(with: photoSettings, delegate: self)
    }
}
```

The important line to note above is `self.photoOutput.capturePhoto(with: photoSettings, delegate: self)`. This statement declares that the model’s `photoOutput` should capture a photo with the settings declared in the method above, with the model itself serving as the delegate. This means that the model will need an additional method to handle the output. However, first we’ll need to define a class that can serve as a container for the captured metadata.

```swift
class PhotoMetadata: Equatable {
    static func == (lhs: PhotoMetadata, rhs: PhotoMetadata) -> Bool {
        return lhs.captureId == rhs.captureId
    }
    
    var captureId: UUID = UUID()
    
    var iso: Int64?
    var lensAperture: Double?
    var exposureDurationSeconds: Double?
}
```

With the metadata class defined, the output method can be written as:

```swift
func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
    for category in photo.metadata {
        if category.key == "{Exif}" {
            let container = PhotoMetadata()

            let isoRatings = (category.value as AnyObject).object(forKey: "ISOSpeedRatings") as! [Any?]
            container.iso = isoRatings.first as? Int64
                
            let apertureValue = (category.value as AnyObject).object(forKey: "ApertureValue")
            container.lensAperture = apertureValue as? Double

            let exposureTime = (category.value as AnyObject).object(forKey: "ExposureTime")
            container.exposureDurationSeconds = exposureTime as? Double
                
            self.metadata = container
        }
    }
}
```

With the output method defined, the needed markup for making the exposure and displaying the captured metadata is simple and straightforward. We’ll start by adding a few state variables to the parent view.

```swift
@State private var calculated: Bool = false
@State private var iso: Int64?
@State private var lensAperture: Double?
@State private var exposureDurationSeconds: Double?
```

From there, the view markup can be written as follows:

```swift
ZStack {
    CameraPreview()
        .environmentObject(camera)
        .edgesIgnoringSafeArea(.all)
                
    if device != nil {
        VStack {
            if self.calculated {
                VStack(alignment: .leading) {
                    Text("ISO: \(Int(self.iso!))")
                    Text("F-Stop: \(self.lensAperture!)")
                    Text("Shutter Speed: \(self.exposureDurationSeconds!)seconds")
                }
                .foregroundColor(Color.black)
                .padding()
                .background(Color.white)
                .cornerRadius(8)
            }
                        
            Spacer()
                        
            Button(action: { self.camera.capture() }) {
                Text("Calculate")
            }
        }
        .padding()
    }
}
.onAppear {
	camera.setUp()
                
    if camera.device != nil {
    	device = camera.device
    }
}
```

The capture method written earlier can be accessed through the already defined camera object in a SwiftUI button with `self.camera.capture()`.  The final step is just to chain a change handler to track when the camera’s `metadata` object changes and display that information to the user.

```swift
.onChange(of: camera.metadata) { newState in
    self.iso = newState?.iso
    self.lensAperture = newState?.lensAperture
    self.exposureDurationSeconds = newState?.exposureDurationSeconds
                
    self.calculated = true
}
```

That’s it! As long as Xcode doesn’t yell at you or throw and build errors your way, when launching the app in its current state you should be able to view the camera output and capture exposure information. Setting ISO, aperture, or exposure length values will come in subsequent posts.

<div style="display:flex;justify-content:center">
    <img src="https://media4.giphy.com/media/nLXP6ajtjNbLX8B1Wi/giphy.gif" max-height="720px" style="border-radius:18px;margin-top:20px;">
</div>
