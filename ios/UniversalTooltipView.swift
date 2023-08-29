import ExpoModulesCore

import Popovers
import SwiftUI

struct RepresentedUIView: UIViewRepresentable {
  var contentView: UIView
  
  func makeUIView(context: Context) -> UIView {
    contentView
  }
  
  func updateUIView(_ uiView: UIView, context: Context) {
  }
}

struct PopoverModifier: ViewModifier {
  let isActive: Bool
  let side: ContentSide
  let offset: CGFloat = 10
  let presetAnimation:PresetAnimation
  func body(content: Content) -> some View {
    switch presetAnimation {
      case .zoomIn:
         content
          .scaleEffect(self.isActive ? 1 : 0)
          .animation(.spring())
      default:
         content
          .opacity(self.isActive ? 1: 0)
          .offset(x: self.side.toSideOffsetX(offset: offset, isActive: isActive), y: self.side.toSideOffsetY(offset: offset, isActive:isActive))
    }
    
  }
}



class UniversalTooltipView: ExpoView {
  private var tipView: DismissibleEasyTipView?
  var preferences: EasyTipView.Preferences = EasyTipView.Preferences()
  var contentView: UIView?
  var bubbleBackgroundColor: UIColor = .clear
  var side: ContentSide = .any
  var presetAnimation : PresetAnimation = .fadeIn
  var showDuration: CGFloat = CGFloat(0.3)
  var dismissDuration: CGFloat = CGFloat(0.3)
  var cornerRadius : CGFloat = CGFloat(5)
  var text :String? = nil
  var maxWidth : Double? = 200
  var arrowWidth: Double = 20
  var arrowHeight: Double = 10
  var containerStyle : ContainerStyle?
  var fontStyle : TextStyle?
  var sideOffset : CGFloat = 1
  var opened: Bool = false {
    willSet(newValue) {
      if (newValue) {
        openTooltip()
      } else {
        dismiss()
      }
    }
  }
  let onDismiss = EventDispatcher()
  let onTap = EventDispatcher()
  var disableTapToDismiss = false
  var textColor: UIColor = .white
  var textSize: Double = 13
  var fontWeight: String = "normal"
  var disableDismissWhenTouchOutside = false
  var popover: Popover?
  
  public required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
  }
  
  
  
  
  override func didUpdateReactSubviews() {
    let firstView = self.reactSubviews()[0] as! RCTView
    contentView = firstView
    for index in 1..<self.reactSubviews().count {
      let subView = self.reactSubviews()[index]
      self.addSubview(subView)
    }
  }
  
  func fallbackTooltip() -> some View {
    let top = containerStyle?.paddingTop ?? 10.0
    let right = containerStyle?.paddingRight ?? 10.0
    let bottom = containerStyle?.paddingBottom ?? 10.0
    let left = containerStyle?.paddingLeft ?? 10.0
    return PopoverReader { context in
      Text(self.text ?? "")
        .bold()
        .padding(EdgeInsets(top: top, leading: left, bottom: bottom, trailing: right))
        .foregroundColor(Color(self.textColor))
        .background(
          GeometryReader { geometry in
            ZStack {
              // Draw the background color
              RoundedRectangle(cornerRadius: self.cornerRadius)
                .fill(Color(self.bubbleBackgroundColor))
              
              // Draw the arrow
              ArrowShape(arrowDirection: self.side, arrowSize: CGSize(width: self.arrowWidth, height: self.arrowHeight),curveRadius: 4)
                .fill(Color(self.bubbleBackgroundColor))
                .frame(width: geometry.size.width, height: geometry.size.height)
            }
          }
        )
      
    }
  }
  var body: some View {
    Group {
      if let validContentView = contentView {
        if let firstSubview = (validContentView as? RCTView)?.reactSubviews()?.first {
          RepresentedUIView(contentView: validContentView)
            .frame(width: firstSubview.frame.width, height: firstSubview.frame.height).background(
              GeometryReader { geometry in
                ZStack {
                  // Draw the background color
                  RoundedRectangle(cornerRadius: self.cornerRadius)
                    .fill(Color(self.bubbleBackgroundColor))
                  // Draw the arrow
                  ArrowShape(arrowDirection: self.side, arrowSize: CGSize(width: self.arrowWidth, height: self.arrowHeight),curveRadius: 4)
                    .fill(Color(self.bubbleBackgroundColor))
                    .frame(width: geometry.size.width, height: geometry.size.height)
                }
              }
            )
        } else {
          fallbackTooltip()
        }
      } else {
        fallbackTooltip()
      }
    }
  }
  
  override func layoutSubviews() {
    popover = Popover { self.body
      .modifier(PopoverModifier(isActive: true, side: self.side, presetAnimation:self.presetAnimation))}
    popover?.attributes.sourceFrame = { [weak self] in
      self.windowFrame()
    }
    
    popover?.attributes.sourceFrameInset = self.side.toSideOffset(offset: self.sideOffset + arrowHeight)
    popover?.attributes.screenEdgePadding = .zero
    popover?.attributes.presentation.animation = .easeIn(duration: showDuration)
    
    let customTransition: AnyTransition
    switch presetAnimation {
      case .none:
        customTransition = .identity
      case .fade:
        customTransition = .opacity
      default:
        customTransition = .modifier(
          active: PopoverModifier(isActive: false, side: self.side, presetAnimation:self.presetAnimation),
          identity: PopoverModifier(isActive: true, side: self.side, presetAnimation:self.presetAnimation)
        )
    }
    
    popover?.attributes.presentation.transition = customTransition
    popover?.attributes.position = .absolute(originAnchor: self.side.toOriginAnchorSide(), popoverAnchor: self.side.toPopoverAnchorSide())
    
    popover?.attributes.onDismiss = {
      self.onDismiss()
    }
  }
  
  
  //    var currentViewController = UIApplication.shared.keyWindow?.rootViewController
  //    while currentViewController?.presentedViewController != nil {
  //      currentViewController = currentViewController?.presentedViewController
  //    }
  //    currentViewController?.present(popover)
  
  
  func openTooltip (){
    if let unwrappedPopover = popover {
      self.reactViewController().present(unwrappedPopover)
    }
    
    //        text != nil ? openByText() : openByContentView()
    //        popover.dismiss()
  }
  public func dismiss(){
    popover?.dismiss()
  }
  
}
