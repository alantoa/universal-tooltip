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

class UniversalTooltipView: ExpoView {
  private var tipView: DismissibleEasyTipView?
  var preferences: EasyTipView.Preferences = EasyTipView.Preferences()
  var contentView: UIView?
  var bubbleBackgroundColor: UIColor = .clear
  var side: ContentSide = .any
  var presetAnimation : PresetAnimation = .fadeIn
  var showDuration: CGFloat = CGFloat(0.5)
  var dismissDuration: CGFloat = CGFloat(0.5)
  var cornerRadius : CGFloat = CGFloat(5)
  var text :String? = nil
  var maxWidth : Double = 200
  var containerStyle : ContainerStyle?
  var fontStyle : TextStyle?
  var sideOffset : Double = 1
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
  struct PopoverView: View {
    var contentView: UIView?
    
    var body: some View {
      Group {
        if let validContentView = contentView {
          if let firstSubview = (validContentView as? RCTView)?.reactSubviews()?.first {
            RepresentedUIView(contentView: validContentView)
              .frame(width: firstSubview.frame.width, height: firstSubview.frame.height)
          } else {
            fallbackTooltip()
          }
        } else {
          fallbackTooltip()
        }
      }
    }
    
    func fallbackTooltip() -> Text {
      Text("Tooltip")
        .bold()
        .foregroundColor(.white)
    }
  }
  override func layoutSubviews() {
    popover = Popover { PopoverView(contentView: self.contentView) }
    popover?.attributes.sourceFrame = { [weak self] in
      self.windowFrame()
    }
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
