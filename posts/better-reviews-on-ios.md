---
date: "June 7, 2025"
title: "Guiding Users Reviews: Better Prompting in iOS"
description: "My new Swift Package, HappyPath, helps you intelligently prompt users for app reviews, making sure you ask at just the right time."
published: true
---

Over the past few years, as I have published multiple projects to the iOS app store, one of the most difficult aspects post-launch has been soliciting user feedback intelligently. As part of the development of my latest app, [Solar](https://apps.apple.com/us/app/solar-sun-tracker-forecast/id6745826724), I wrote a simple review engine with the goal of solving this problem. It's smart about when it asks, focusing on those "happy path" moments when your users are genuinely enjoying your app.

I've now open-sourced that engine and it's available on Github as [HappyPath](https://github.com/tylerreckart/HappyPath.git).

### What it Does (and Why I Think It's Cool)
- **Smart Asking:** It's not just a simple counter. HappyPath looks at how many times your app has been opened, how many "significant actions" a user has taken, and how long they've been using your app. It's all about catching them when they're happy.
- **You're in Control:** I've made the thresholds fully customizable. You decide how many launches, actions, or days pass before a prompt is considered. This means you can tailor it perfectly for your app.
- **Native & Seamless:** It uses Apple's own SKStoreReviewController, so the review prompt feels like a natural part of the app, not an annoying pop-up.
- **No Nagging:** It's version-aware. Once a user has reviewed a specific version, they won't be asked again for that same version. Phew!
- **Easy to Use:** It's built with a simple shared instance, so integrating it into your project is a breeze.

### A Peek Under the Hood
HappyPath keeps track of a few key things in UserDefaults:
- `hp_appLaunchCount`: How many times my app has been launched.
- `hp_significantActionCount`: How many "happy path" actions a user has completed.
- `hp_lastReviewRequestDate`: The last time a review was asked for.
- `hp_lastVersionPromptedForReview`: The app version when a review was last prompted.
- `hp_firstLaunchDate`: The very first time the app ran.

The magic happens in `requestReviewIfAppropriate()`. It checks all these conditions, and if everything aligns, it politely asks for that review.

You can use my default settings, or set your own thresholds:

```swift
import HappyPath
import SwiftUI

@main
struct MyApp: App {
    init() {
        // I usually just go with the defaults:
        _ = ReviewManager.shared

        // But if I want to tweak it:
        // let customThresholds = ReviewThresholds(
        //     minLaunchesBeforePrompt: 10, // My app needs more launches
        //     minSignificantActionsBeforePrompt: 5, // More actions needed
        //     minDaysSinceFirstLaunchBeforePrompt: 14, // Give them 2 weeks
        //     minDaysBetweenPrompts: 180 // Only every 6 months
        // )
        // _ = ReviewManager(thresholds: customThresholds)
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

### Track Launches
I call `incrementAppLaunchCount()` every time my app starts up. Easiest place is usually in your main ContentView's onAppear:

```swift
import SwiftUI
import HappyPath

struct ContentView: View {
    var body: some View {
        Text("Welcome to my awesome app!")
            .onAppear {
                ReviewManager.shared.incrementAppLaunchCount()
                print("App Launch Count Incremented!")
            }
    }
}
```

### Ask When Active
I also trigger `requestReviewOnAppActive()` when my app becomes active. I like a little delay to ensure the UI is fully loaded:

```swift
import SwiftUI
import HappyPath

struct ContentView: View {
    var body: some View {
        Text("Your amazing content is here.")
            .onAppear {
                ReviewManager.shared.incrementAppLaunchCount()
            }
            .onReceive(NotificationCenter.default.publisher(for: UIApplication.didBecomeActiveNotification)) { _ in
                // Give the UI a second to settle
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                    ReviewManager.shared.requestReviewOnAppActive()
                }
            }
    }
}
```

If conditions aren't met, the system logs might look like this:
```
🌟 HappyPath: Not prompting (launch count 1 < 5).
🌟 HappyPath: Not prompting (days since first launch 0 < 7).
```
But when they are, it's a beautiful sight:
```
🌟 HappyPath: All conditions met. Requesting review.
🌟 HappyPath: Review requested. Last prompt date and version updated.
```

### Log Happy Moments
This is the key! I call logSignificantAction() whenever a user does something great in my app – saves something, completes a level, whatever makes sense for your app.

```swift
import SwiftUI
import HappyPath

struct TaskCompletionView: View {
    var body: some View {
        Button("Mark Task as Done") {
            // My task completion logic here
            print("Task completed successfully!")
            ReviewManager.shared.logSignificantAction()
        }
        .padding()
    }
}
```

System logs will confirm the action:
```
👍 HappyPath: Significant action count: 1
```
(And if that action pushes the total over a threshold, a review prompt might pop up right after!)

Find HappyPath on GitHub: https://github.com/tylerreckart/HappyPath.git

Hope this helps you on your own app development journey! Let me know what you think.

Happy coding,  
**Tyler**