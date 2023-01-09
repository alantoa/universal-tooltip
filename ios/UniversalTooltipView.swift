import ExpoModulesCore
import SwiftUI

class UniversalTooltipView: ExpoView, EasyTipViewDelegate {
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
  public required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
  }
  
  public func easyTipViewDidTap(_ tipView: EasyTipView) {
    onTap()
  }
  
  public func easyTipViewDidDismiss(_ tipView: EasyTipView) {
    onDismiss()
  }
  override func didUpdateReactSubviews() {
    let firstView = self.reactSubviews()[0] as! RCTView
    contentView = firstView
    
    for index in 1..<self.reactSubviews().count {
      let subView = self.reactSubviews()[index]
      self.addSubview(subView)
    }
  }
  override func layoutSubviews() {
    setCommonPreferences()
    if(opened){
      openTooltip()
    }
  }
  

  public func openTooltip (){
    text != nil ? openByText() : openByContentView()
  }
  public func setCommonPreferences(){
    preferences.drawing.backgroundColor = bubbleBackgroundColor
    preferences.drawing.cornerRadius = cornerRadius
    preferences.drawing.arrowPosition = side.toContentSide()
    switch side.toContentSide(){
      case .top:
        preferences.positioning.bubbleInsets = UIEdgeInsets(top: sideOffset, left: 1.0, bottom: 1.0, right: 1.0)
      case .any:
        preferences.positioning.bubbleInsets = UIEdgeInsets(top: sideOffset, left: 1.0, bottom: 1.0, right: 1.0)
      case .bottom:
        preferences.positioning.bubbleInsets = UIEdgeInsets(top: 1.0, left: 1.0, bottom: sideOffset, right: 1.0)
      case .right:
        preferences.positioning.bubbleInsets = UIEdgeInsets(top: 1.0, left: 1.0, bottom: 1.0, right: sideOffset)
      case .left:
        preferences.positioning.bubbleInsets = UIEdgeInsets(top: 1.0, left: sideOffset, bottom: 1.0, right: sideOffset)
    }
    
    if(presetAnimation == .fadeIn){
      switch preferences.drawing.arrowPosition{
        case .left:
          preferences.animating.dismissTransform = CGAffineTransform(translationX: 10, y: 0)
          preferences.animating.showInitialTransform = CGAffineTransform(translationX: 10, y: 0)
        case .right:
          preferences.animating.dismissTransform = CGAffineTransform(translationX: -10, y: 0)
          preferences.animating.showInitialTransform = CGAffineTransform(translationX: -10, y: 0)
        case .top, .any:
          preferences.animating.dismissTransform = CGAffineTransform(translationX: 0, y: 10)
          preferences.animating.showInitialTransform = CGAffineTransform(translationX: 0, y: 10)
        case .bottom:
          preferences.animating.dismissTransform = CGAffineTransform(translationX: 0, y: -10)
          preferences.animating.showInitialTransform = CGAffineTransform(translationX: 0, y: -10)
      }
    }
    preferences.animating.dismissOnTap = !disableTapToDismiss
    preferences.animating.showDuration = presetAnimation == .none ? 0 : showDuration
    preferences.animating.dismissDuration = presetAnimation == .none ? 0 : dismissDuration
  }
  
  public func openByContentView(){
    if(contentView == nil){
      return
    }
    preferences.positioning.contentInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
    tipView = DismissibleEasyTipView(contentView: contentView!, preferences: preferences, delegate: self)
    show()
  }
  
  public func openByText() {
    if(fontStyle?.fontFamily != nil){
      preferences.drawing.font = UIFont(name: (fontStyle?.fontFamily)!, size: textSize)!
    }else{
      preferences.drawing.font = fontWeight == "normal" ?  UIFont.systemFont(ofSize: textSize) : UIFont.boldSystemFont(ofSize: textSize)
    }
    preferences.drawing.foregroundColor = textColor
    
    let top = containerStyle?.paddingTop ?? Double(10), right = containerStyle?.paddingRight ?? Double(10), bottom = containerStyle?.paddingBottom ?? Double(10), left = containerStyle?.paddingLeft ?? Double(10);
    
    preferences.positioning.contentInsets = UIEdgeInsets(top: top, left: left, bottom: bottom, right: right)
    tipView = DismissibleEasyTipView(text: text!, preferences: preferences, delegate: self)
    show()
  }
  public func show(){
    if(disableDismissWhenTouchOutside){
      tipView?.show(forView: self)
    }else{
      tipView?.show(on: self)
    }
  }
  public func dismiss(){
    if(disableDismissWhenTouchOutside){
      tipView?.dismiss()
    }else{
      tipView?.hide()
    }
  }
  override func willMove(toWindow newWindow: UIWindow?) {
    dismiss()
  }
  
}

