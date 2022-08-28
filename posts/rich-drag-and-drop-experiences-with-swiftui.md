---
date: "August 28, 2022"
title: "Drag-and-Drop with SwiftUI"
description: "One of the requirements I decided on early on in the development of Ansel was a completely customizable dashboard. This blog post is an overview of that implementation in SwiftUI."
published: true
---
One of the requirements I decided on early on in the development of Ansel was a completely customizable dashboard. Ansel ships bundled with several different tools for calculating exposure, however not all photographers use every one of these tools. It was important to me that the app allowed users to add and remove tiles as well as reorder their position on the dashboard.  

There are several ways to accomplish this behavior. My initial implementation was to use native Gesture recognition. However, the amount of overhead required to allow the additional tiles to recognize the current gesture was more than I wanted to try and implement as part of the app's MVP. With that in mind, I turned to `.onDrag` and `.onDrop` handlers. While the handlers themselves didn't have what I needed out of the box, defining a custom `DropDelegate` was an easy enough solution.

This post provides an overview of that implementation. It's not a step-by-step tutorial, but it should suffice for those with even a passing knowledge of Swift and SwiftUI.

Let's start with a simple data model:

```swift
struct DashboardTile: Identifiable, Equatable {
    static func ==(lhs: DashboardTile, rhs: DashboardTile) -> Bool {
        return lhs.id == rhs.id
    }

    var id: String {
        self.key
    }

    var key: String
    var label: String
}
```
This model provides a simple data structure with two properties, `key` and `label`. With our data structure in hand, we need to define our `DroppableTileDelegate` that will handle override the default drag-and-drop handler's behavior.

```swift
struct DroppableTileDelegate<DashboardTile: Equatable>: DropDelegate {
    let tile: DashboardTile
    var listData: [DashboardTile]

    @Binding var current: DashboardTile?
    @Binding var hasLocationChanged: Bool
    
    var moveAction: (IndexSet, Int) -> Void
    
    func dropEntered(info: DropInfo) -> Void {
        guard tile != current, let current = current else { return }

        let from = listData.firstIndex(of: current)
        let to = listData.firstIndex(of: tile) else { return }
        
        hasLocationChanged = true
        
        if listData[to] != current {
            moveAction(
                IndexSet(integer: from), to > from ? to + 1 : to
            )
        }
    }

    func dropUpdated(info: DropInfo) -> DropProposal? {
        DropProposal(operation: .move)
    }
    
    func performDrop(info: DropInfo) -> Bool {
        hasLocationChanged = false
        current = nil
        return true
    }
}
```

With the `DroppableTileDelegate` defined, we can define the view that our layout will live in. Note that the tiles and the binding representing the currently dragged tiles are passed into this view from the parent view. This allows data to be shared with other views if necessary. The default drag preview behavior is overwritten by the `preview` closure that follows the definition of the `.onDrag` handler. If we don't override this with our UI, the default hard-edged previews will be shown. For some apps that might be all that is necessary, but since my dashboard tiles had rounded edges, it required that a custom overlay that used `contentShape` to trim those corners be used.

```swift
struct DashboardTileView<Content: View, DashboardTile: Identifiable & Equatable>: View {
    @Binding var tiles: [DashboardTile]
    @Binding var draggingTile: DashboardTile?

    let content: (DashboardTile) -> Content
    let moveAction: (IndexSet, Int) -> Void

    @State private var hasLocationChanged: Bool = false
    
    init(
        tiles: Binding<[DashboardTile]>,
        draggingTile: Binding<DashboardTile?>,
        @ViewBuilder content: @escaping (DashboardTile) -> Content,
        moveAction: @escaping (IndexSet, Int) -> Void
    ) {
        self._tiles = tiles
        self.content = content
        self.moveAction = moveAction
        self._draggingTile = draggingTile
    }
    
    let screenWidth = UIScreen.main.bounds.width
    
    var body: some View {
        VStack {
            ForEach(tiles) { tile in
                VStack {
                    content(tile)
                        .overlay(
                            draggingTile == tile
                            ? RoundedRectangle(cornerRadius: 17).fill(.thinMaterial)
                            : nil
                        )
                        .onDrag {
                            draggingTile = tile
                            return NSItemProvider(object: "\(tile.id)" as NSString)
                        } preview: {
                            content(tile)
                                .frame(minWidth: screenWidth - 20, minHeight: 80)
                                .contentShape(.dragPreview, RoundedRectangle(cornerRadius: 18, style: .continuous))
                        }
                        .onDrop(
                            of: [UTType.text],
                            delegate: DroppableTileDelegate(
                                tile: tile,
                                listData: tiles,
                                current: $draggingTile,
                                hasLocationChanged: $hasLocationChanged
                            ) { from, to in
                                withAnimation {
                                    moveAction(from, to)
                                }
                            }
                        )
                }
            }
        }
    }
}
```

The custom drop delegate that we defined above is passed into the `delegate` parameter of the `.onDrop` handler. A trailing closure also allows for the view to be animated when the `moveAction` is invoked. From there, all we need to do is define the action itself.

```swift
func moveTile(_ from: IndexSet, _ to: Int) -> Void {
    layout.move(fromOffsets: from, toOffset: to)
}
```

With the above all defined (and compiling without error), all we have to do is reference the `DashboardTileView` and pass in the associated bindings.

```swift
DashboardTileView(tiles: $layout, draggingTile: $draggingTile) { tile in
    SimpleTile(tile: tile)
} moveAction: { from, to in
    moveTile(from, to)
}
```

Voila!

![A GIF depicting the UI that results from the post above](https://s3.us-east-2.amazonaws.com/reckart.blog-images/dashboard_dnd.gif)