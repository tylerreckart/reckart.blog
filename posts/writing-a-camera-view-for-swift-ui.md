---
date: "Nov 22, 2022"
title: "Writing a UIKit Camera View Wrapper for use in SwiftUI"
description: "Like all other modern digital cameras, the iPhone also has an excellent light meter built in. You can get fantastic images from an iPhone. Consistent metering is one of the most crucial aspect for getting those results. So, I decided to change my ethos and focus on using the tools at hand to acheive more consistent results. That starts with interacting directly with the iPhone's camera. In order to do so, we'll need to start by building out the view model that the camera session will run in and apply any user inputs to the camera's session."
published: true
---
At the time of writing, one of the iOS APIs that hasn't been made fully interoperable with SwiftUI is [`AVFoundation`](https://developer.apple.com/documentation/avfoundation), and more specifically the [`AVCaptureDevice`](https://developer.apple.com/documentation/avfoundation/avcapturedevice) API for creating a preview of the current camera view. One of my long term goals for [Aspen](https://apps.apple.com/us/app/aspen-photographers-notebook/id1643250194) has been to build in a spot metering function that will let me leave my [Sekonic L-508](https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=sekonic+l-508&_sacat=0&LH_TitleDesc=0&_osacat=0&_odkw=sekonic+l-508&LH_PrefLoc=2) light meter at home. 

It took me a long time to conceptualize how the metering system would work. Metering for large format photography is something that I really struggled with early on. Thanks to a recent episode of [The Spooky Park Bench Podcast](https://thespookyparkbench.podbean.com/e/episode-27-it-s-alex-burke/) featuring large format landscape photographer [Alex Burke](https://www.alexburkephoto.com), things clicked into place for me when Alex shared his metering ethos and how he use a digital camera to compose for large format.

Alex uses a [mirco four thirds](https://en.wikipedia.org/wiki/Micro_Four_Thirds_system) camera to compose and make his initial exposure calculations. The 4:3 aspect ratio isn't too far from 4:5, which is the format Alex shoots. So, with careful consideration using a digital camera to compose for large format is fairly simple.

What's more interesting though, is that he uses his digital camera's built-in light meter to calculate the base exposure and then compensates for aperture or conditions from there. This makes sense. Modern digital cameras have excellent light meters. I have long struggled with my dedicated meter. I have gotten fantastic results, but I have also miscalculated and ended up with drastically underexposed images even when the calculations seemed right in the moment.

Like all other modern digital cameras, the iPhone also has an excellent light meter built in. You can get fantastic images from an iPhone. Consistent metering is one of the most crucial aspect for getting those results. So, I decided to change my ethos and focus on using the tools at hand to acheive more consistent results. That starts with interacting directly with the iPhone's camera.

In order to do so, we'll need to start by building out the view model that the camera session will run in and apply any user inputs to the camera's session.

```swift
import SwiftUI
import AVFoundation

class CameraViewModel: NSObject, ObservableObject, AVCapturePhotoCaptureDelegate {
    @Published var device: AVCaptureDevice!

    @Published var session = AVCaptureSession()
    @Published var photoOutput = AVCapturePhotoOutput()
    
    @Published var preview: AVCaptureVideoPreviewLayer!
    @Published var previewURL: URL?
}
```

Below the defined variables, the model also needs to instantiate a [`AVCaptureDevice.DiscoverySession`](https://developer.apple.com/documentation/avfoundation/avcapturedevice/discoverysession) in order to retrieve capture data from the device's cameras. For the purpose of this test I've decided to limit it to the rear wide angle camera, but camera can be accessed from this object.

```swift
let discoverySession = AVCaptureDevice.DiscoverySession(
    deviceTypes: [.builtInWideAngleCamera],
    mediaType: .video,
    position: .back
)
```

With the class and base variables defined, we can now define a `setUp` method to initialize the camera session.

```swift
func setUp() {
    do {
        // Start the AVCaptureSession
        self.session.beginConfiguration()
        
        // Ensure all inputs/outputs area cleared at run time.
        for input in session.inputs { session.removeInput(input) }
        for output in session.outputs { session.removeOutput(output) }
        
        // Manually select rear camera and declare the AVCaptureDeviceInput
        self.device = self.discoverySession.devices[0]
        let input = try AVCaptureDeviceInput(device: self.device)
        
        // Add the input to the active session.
        if self.session.canAddInput(input) {
            self.session.addInput(input)
        }
        
        // Additional configuration if photo capture/output is desired.
        // if self.session.canAddOutput(self.photoOutput) {
        //     self.session.addOutput(self.photoOutput)
        // }
        
        // Commit the configuration.
        self.session.commitConfiguration()
    } catch {
        // Log any errors.
        print(error.localizedDescription)
    }
}
```

Now that the base view model has been defined, we'll need to write a simple [`UIViewRepresentable`](https://developer.apple.com/documentation/swiftui/uiviewrepresentable/) UIKit wrapper for `CameraViewModel` for use in SwiftUI.

```swift
public struct CameraPreview: UIViewRepresentable {
    @StateObject var camera = CameraViewModel()
    
    public func makeUIView(context: Context) -> UIView {
        let view = UIView(frame: UIScreen.main.bounds)
        
        // Add the session to the preview layer
        camera.preview = AVCaptureVideoPreviewLayer(session: camera.session)
        // Display property configuration
        camera.preview.frame = view.frame
        camera.preview.videoGravity = .resizeAspectFill

        view.layer.addSublayer(camera.preview)
        
        DispatchQueue.global(qos: .userInteractive).async {
            camera.session.startRunning()
        }
        
        return view
    }
    
    
    public func updateUIView(_ uiView: UIView, context: Context) {}
}
```

That's all that you need to get a basic camera session running in a SwiftUI View.

```swift
@main
struct App: App {
    @StateObject var camera = CameraViewModel()

    var body: some Scene {
        WindowGroup {
            ZStack {
                CameraPreview()
                    .environmentObject(camera)
                    .edgesIgnoringSafeArea(.all)
            }
            .onAppear { camera.setUp() }
        }
    }
}
```