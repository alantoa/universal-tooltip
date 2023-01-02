import ExpoModulesCore
import SwiftUI

class UniversalTooltipView: ExpoView, EasyTipViewDelegate {
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
  var fontStyle : TextStyle?
  var sideOffset : Double = 1
  var isOpened : Bool = false
  var opened: Bool = false {
    didSet {
      if((contentView) != nil){
        toggleTooltip()
      }
      isOpened = opened
    }
  }
  let onDismiss = EventDispatcher()
  let onTap = EventDispatcher()
  var disableTapToDismiss = false
  
  public required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
  }

  public func easyTipViewDidTap(_ tipView: EasyTipView) {
    onTap()
    isOpened = false
  }
  
  public func easyTipViewDidDismiss(_ tipView: EasyTipView) {
    onDismiss()
  }
  override func didUpdateReactSubviews() {
    let firstView = self.reactSubviews()[0] as! RCTView
    cornerRadius = firstView.borderRadius
    bubbleBackgroundColor = firstView.backgroundColor ?? .clear
    contentView = firstView
    for index in 1..<self.reactSubviews().count {
      let subView = self.reactSubviews()[index]
      self.addSubview(subView)
    }
  }
  override func layoutSubviews() {
    setCommonPreferences()
    if(isOpened){
      openTooltip()
    }
  }
  
  override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    toggleTooltip()
  }
  public func toggleTooltip(){
    if(isOpened){
      dismiss()
    }else{
      openTooltip()
    }
  }
  public func openTooltip (){
    text != nil ? openByText() : openByContentView()
    isOpened = true
  }
  public func setShowDuration(_ duration: Double) {
    showDuration = duration
  }
  
  public func setDismissDuration(_ duration: Double) {
    dismissDuration = duration
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
          preferences.animating.dismissTransform = CGAffineTransform(translationX: 15, y: 0)
          preferences.animating.showInitialTransform = CGAffineTransform(translationX: 15, y: 0)
        case .right:
          preferences.animating.dismissTransform = CGAffineTransform(translationX: -15, y: 0)
          preferences.animating.showInitialTransform = CGAffineTransform(translationX: -15, y: 0)
        case .top, .any:
          preferences.animating.dismissTransform = CGAffineTransform(translationX: 0, y: 15)
          preferences.animating.showInitialTransform = CGAffineTransform(translationX: 0, y: 15)
        case .bottom:
          preferences.animating.dismissTransform = CGAffineTransform(translationX: 0, y: -15)
          preferences.animating.showInitialTransform = CGAffineTransform(translationX: 0, y: -15)
      }
    }
    preferences.animating.dismissOnTap = !disableTapToDismiss
    preferences.animating.showDuration = presetAnimation == .none ? 0 : showDuration
    preferences.animating.dismissDuration = presetAnimation == .none ? 0 : dismissDuration
  }
  
  public func openByContentView(){
    preferences.positioning.contentInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
    tipView = EasyTipView(contentView: contentView!, preferences: preferences, delegate: self)
    tipView?.show(forView: self,withinSuperview: window?.rootViewController?.view)
  }
  
  public func openByText() {
    preferences.drawing.font = UIFont.systemFont(ofSize: fontStyle?.fontSize ?? 13)
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
    preferences.positioning.contentInsets = UIEdgeInsets(top: top, left: left, bottom: bottom, right: right)
    tipView = EasyTipView(text: text!, preferences: preferences, delegate: self)
    tipView?.show(forView: self,withinSuperview: window?.rootViewController?.view)
    
  }
  public func dismiss(){
    tipView?.dismiss()
    isOpened = false
  }
}

