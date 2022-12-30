import ExpoModulesCore
import SwiftUI

class UniversalTooltipView: ExpoView {
  private var tipView: EasyTipView?
  var preferences: EasyTipView.Preferences = EasyTipView.Preferences()
  var contentView: UIView?
  var bubbleBackgroundColor: UIColor = .clear
  var side: ContentSide = .any
  var presetAnimation : PresetAnimation = .fadeIn
  var showDuration: CGFloat = CGFloat(0.7)
  var dismissDuration: CGFloat = CGFloat(0.7)
  var cornerRadius = CGFloat(0)
  var text :String? = nil
  var paddings : Array<Double>?
  
  public required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    
  }
  override func didUpdateReactSubviews() {
    let firstView = self.reactSubviews()[0] as! RCTView
    cornerRadius = firstView.borderRadius
    bubbleBackgroundColor = firstView.backgroundColor ?? .clear
    contentView = firstView
    
    print("didUpdateReactSubviews")
    //    print(firstView.insetsLayoutMarginsFromSafeArea)
    //    print(firstView.layer.frame.width)
    for index in 1..<self.reactSubviews().count {
      let subView = self.reactSubviews()[index]
      self.addSubview(subView)
    }
  }
  
  override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?)  {
    
    
    if(text != nil){
      openByText()
      
    }else{
      openByContentView()
    }
    
  }
  override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
    dismiss()
  }
  public func setShowDuration(_ duration: Double) {
    showDuration = duration
  }
  
  public func setDismissDuration(_ duration: Double) {
    dismissDuration = duration
  }
  
  public func openByContentView(){
    
    preferences.drawing.backgroundColor = bubbleBackgroundColor
    preferences.drawing.borderWidth = 0
    preferences.drawing.cornerRadius = cornerRadius
    preferences.drawing.arrowPosition = side.toContentSide()
    
    preferences.positioning.bubbleInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
    preferences.positioning.contentInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
    
    preferences.animating = getPresetAnimation(preferences: preferences,presetAnimation: presetAnimation)
    preferences.animating.showDuration = showDuration
    preferences.animating.dismissDuration = dismissDuration
    
    tipView = EasyTipView(contentView: contentView!, preferences: preferences)
    tipView?.show(forView: self,withinSuperview: window?.rootViewController?.view)
  }
  public func openByText() {
    
    preferences.drawing.backgroundColor = bubbleBackgroundColor
    preferences.drawing.borderWidth = 2
    preferences.drawing.cornerRadius = cornerRadius
    preferences.drawing.arrowPosition = side.toContentSide()
    
    // reactPaddingInsets
    //    preferences.positioning.bubbleInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
    var top = Double(10),right =  Double(10),bottom =  Double(10),left =  Double(10);
    

    switch paddings?.count {
      case 1:
        top = (paddings?[0])!
        right = (paddings?[0])!
        bottom = (paddings?[0])!
        left = (paddings?[0])!
      case 2:
        top = (paddings?[0])!
        right = (paddings?[1])!
        bottom = (paddings?[0])!
        left = (paddings?[1])!
      case 3:
        top = (paddings?[0])!
        right = (paddings?[1])!
        bottom = (paddings?[2])!
        left = (paddings?[1])!
      case 4:
        top = (paddings?[0])!
        right = (paddings?[1])!
        bottom = (paddings?[2])!
        left = (paddings?[3])!
      case .none: break
      case .some(_): break
        
    }
    print(paddings?.count,left)
    preferences.positioning.contentInsets = UIEdgeInsets(top: top, left: left, bottom: bottom, right: right)
    
    preferences.animating = getPresetAnimation(preferences: preferences,presetAnimation: presetAnimation)
    preferences.animating.showDuration = showDuration
    preferences.animating.dismissDuration = dismissDuration
    
    tipView = EasyTipView(text: text!, preferences: preferences)
    tipView?.show(forView: self,withinSuperview: window?.rootViewController?.view)
    
    //    guard ,
    //          tipView = EasyTipView(text: text, preferences: preferences)
    //          tipView?.show(forView: self,withinSuperview: window?.rootViewController?.view)
    //    else {
    //      throw TextNilException()
    //    }
    
    //    tipView = EasyTipView(text:text!,preferences: preferences)
    //    tipView?.show(forView: self,withinSuperview: window?.rootViewController?.view)
  }
  public func dismiss(){
    tipView?.dismiss()
  }
}

