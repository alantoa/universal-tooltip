import ExpoModulesCore
import SwiftUI

class UniversalTooltipView: ExpoView {
  private var tipView: EasyTipView?
  var preferences: EasyTipView.Preferences = EasyTipView.Preferences()
  var contentView: UIView?
  var bubbleBackgroundColor: UIColor = .clear
  var side: ContentSide = .any
  var presetAnimation : PresetAnimation = .fadeIn
  
  public required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
  }
  
  override func didUpdateReactSubviews() {
    let firstView = self.reactSubviews()[0]
    contentView = firstView.reactSubviews()[0]
    for index in 1..<self.reactSubviews().count {
      let subView = self.reactSubviews()[index]
      self.addSubview(subView)
    }
  }
  
  
  override func didAddSubview(_ subview: UIView) {
    print("didAddSubview")
    print(subview)
  }
  
  override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    open()
  }
  override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
    dismiss()
  }
  
  public func open(){
    preferences.drawing.backgroundColor = bubbleBackgroundColor
    preferences.drawing.borderWidth = 0
    preferences.drawing.cornerRadius = 0
    preferences.drawing.arrowPosition = side.toContentSide()
    preferences.drawing.shadowColor=UIColor.clear
    
    preferences.positioning.bubbleInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
    preferences.positioning.contentInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)

    preferences.animating = getPresetAnimation(preferences: preferences)

    tipView = EasyTipView(contentView: contentView!, preferences: preferences)
    tipView?.show(forView: self,withinSuperview: window?.rootViewController?.view)
    
    
  }
  public func dismiss(){
    tipView?.dismiss()
  }
}

