---
date: "June 1, 2023"
title: "Writing a Tab View Controller in Swift UI"
description: "Swift UI is a fantastic jumping-off point for less experienced developers wanting to get into iOS development. It's relatively easy to use Swift's built-in components to put together an app that looks at home on Apple's platforms. However, Swift's built-ins aren't exactly the most flexible components when it comes to adapting for custom UIs. Writing a custom navigation controller gives you the ability to completely control the user experience as they flow through your apps."
published: true
---

In my opinion, Swift UI is a fantastic jumping-off point for less experienced developers wanting to get into iOS development. It reminds me of my earliest days of programming; just turn the clock back 15 years and swap Swift with HTML. One of the great things is that _a lot_ of the groundwork has been laid by Apple. It's relatively easy to use Swift's built-in components to put together an app that looks at home on Apple's platforms. However, Swift's built-ins aren't exactly the most flexible components when it comes to adapting for custom UIs. Writing a custom navigation controller gives you the ability to completely control the user experience as they flow through your apps. Let's see just how easy that is.

So, the first thing we'll need to do is define the view hierarchy. When working with custom navigation, I have found that it is often easier and more natural to have the tab view context live above the app's main navigation state, then nesting navigation views within each of the individual tab paths. Let's define these parent-level views through an `enum` declaration.

```swift
enum TabView {
    case home
    case search
    case discover
    case profile
    case settings
}
```

Then we need to consider the context of how the tab bar UI will render in relation to our views. The simplest way to do this is by using a `ZStack {}` wrapper to render the tab bar higher up in the application's z-axis and thus above each of our child views. The child views will need to account for the height of the wrapper, but that is a simple calculation. All we need to do to handle the view switching is utilize a simple switch statement that will render the target view based on the application's current state.

```swift
struct ContentView: View {
    // Define the currently active view. This should default to the home screen.
    @State private var activeView: TabView = .home

    var body: some View {
        ZStack {
            switch (activeView) {
                case .home:
                    Color.red
                case .search:
                    Color.blue
                case .discover:
                    Color.green
                case .profile:
                    Color.yellow
                case .settings:
                    Color.purple
            }

            // TabBar(activeView: $activeView)
        }
    }
}
```

We can then define the markup to render the view itself. For now, each tab option will be represented by an SF Symbol until the button component is defined.

```swift
struct TabBar: View {
    @Binding var activeView: TabView

    var body: some View {
        VStack(spacing: 0) {
            Spacer()
            
            Rectangle()
                .fill(Color(.systemGray5))
                .frame(height: 0.5)
            
            HStack(spacing: 0) {
                Image(systemName: "1.circle.fill")
                    .frame(maxWidth: .infinity)
                Image(systemName: "2.circle.fill")
                    .frame(maxWidth: .infinity)
                Image(systemName: "3.circle.fill")
                    .frame(maxWidth: .infinity)
                Image(systemName: "4.circle.fill")
                    .frame(maxWidth: .infinity)
                Image(systemName: "5.circle.fill")
                    .frame(maxWidth: .infinity)
            }
            .padding(.top, 15)
            .padding(.bottom, 30)
            .background(Color(.systemBackground))
        }
        .edgesIgnoringSafeArea(.bottom)
    }
}
```

At this stage you should have a screen that looks similar to this:

![An image showing the in-progress tab view UI](https://s3.us-east-2.amazonaws.com/reckart.blog-images/test.jpg)

The tab bar group item is similarly straightforward in its markup:

```swift
struct TabBarGroupItem: View {
    @Binding var activeView: TabView

    var targetView: TabView
    var image: String
    
    var body: some View {
        Button(action: {
            withAnimation(.spring()) {
                // Update the view.
                self.activeView = targetView
                // Provide haptic feedback.
                UIImpactFeedbackGenerator(style: .medium).impactOccurred()
            }
        }) {
            VStack(spacing: 6) {
                Image(systemName: image)
                    .font(.system(size: 22, weight: .medium))
                    .foregroundColor(activeView == targetView ? .blue : .gray)
                
                Circle()
                    .fill(activeView == targetView ? .blue : .clear)
                    .frame(width: 4, height: 4)
            }
            .frame(maxWidth: .infinity)
        }
    }
}
```

With that defined, the `TabBar` component can be updated with the view-switching markup.

```swift
HStack(spacing: 0) {
    TabBarGroupItem(activeView: $activeView, targetView: .home, image: "house")
    TabBarGroupItem(activeView: $activeView, targetView: .search, image: "magnifyingglass")
    TabBarGroupItem(activeView: $activeView, targetView: .discover, image: "safari")
    TabBarGroupItem(activeView: $activeView, targetView: .profile, image: "person.crop.circle")
    TabBarGroupItem(activeView: $activeView, targetView: .settings, image: "gearshape")
}
```

Now there are just a few more pieces we'll need to implement. Because we're using the z-axis to render the tab bar above the application's content, a shared `Screen` view can be used to provide a wrapper around the content for each tab that will let you adjust behavior and placement with a few simple modifiers. As seen in the snippet below, this is where you can use Swift's built-in transition modifiers to add some flavor to the way your views switch.

```swift
struct Screen<Content>: View where Content: View {
    let content: () -> Content

    init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }
    
    var body: some View {
        content()
            .edgesIgnoringSafeArea(.top)
            .transition(.push(from: .leading))
    }
}
```

If you're feeling ambitious, you could easily implement an intelligent "push" animation by defining the navigation scheme and using the index of the current screen with the target screen to determine which direction to animate the push from.

With that, the `Screen` view wrapper can be integrated into our application's root view.

```swift
struct ContentView: View {
    @State private var activeView: TabView = .home

    var body: some View {
        ZStack {
            switch (activeView) {
                case .home:
                    Screen { Color.red }
                case .search:
                    Screen { Color.blue }
                case .discover:
                    Screen { Color.green }
                case .profile:
                    Screen { Color.red }
                case .settings:
                    Screen { Color.purple }
            }

            TabBar(activeView: $activeView)
        }
    }
}
```

That's it! You now have a tab view controller at the root of your app that you have complete control over. You can add custom animations between views, interactions on tab changes, and more. 


![An animated GIF of the tab controller UI resulting from this tutorial](https://s3.us-east-2.amazonaws.com/reckart.blog-images/test.gif)