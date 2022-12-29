//
//  UIKitExtensions.swift
//  EasyTipView
//
//  Created by Teodor Patras on 29/06/16.
//  Copyright © 2016 teodorpatras. All rights reserved.
//
#if canImport(UIKit)
import UIKit

// MARK: - UIBarItem extension -
extension UIBarItem {
  var view: UIView? {
    if let item = self as? UIBarButtonItem, let customView = item.customView {
      return customView
    }
    return self.value(forKey: "view") as? UIView
  }
}

// MARK:- UIView extension -
extension UIView {
  
  func hasSuperview(_ superview: UIView) -> Bool{
    return viewHasSuperview(self, superview: superview)
  }
  
  fileprivate func viewHasSuperview(_ view: UIView, superview: UIView) -> Bool {
    if let sview = view.superview {
      if sview === superview {
        return true
      } else{
        return viewHasSuperview(sview, superview: superview)
      }
    } else{
      return false
    }
  }
  func getPresetAnimation (preferences: EasyTipView.Preferences,presetAnimation: PresetAnimation) -> EasyTipView.Preferences.Animating{
    //    preferences.positioning

    
    var animating = EasyTipView.Preferences.Animating()
    if(presetAnimation == .zoomIn){
      return animating
    }
    

    
    switch preferences.drawing.arrowPosition{
      case .left:
        animating.dismissTransform = CGAffineTransform(translationX: 15, y: 0)
        animating.showInitialTransform = CGAffineTransform(translationX: 15, y: 0)
      case .right:
        animating.dismissTransform = CGAffineTransform(translationX: -15, y: 0)
        animating.showInitialTransform = CGAffineTransform(translationX: -15, y: 0)
      case .top, .any:
        animating.dismissTransform = CGAffineTransform(translationX: 0, y: 15)
        animating.showInitialTransform = CGAffineTransform(translationX: 0, y: 15)
      case .bottom:
        animating.dismissTransform = CGAffineTransform(translationX: 0, y: -15)
        animating.showInitialTransform = CGAffineTransform(translationX: 0, y: -15)
    }

 

    return animating
    
  }
  
}

// MARK:- CGRect extension -
extension CGRect {
  var x: CGFloat {
    get {
      return self.origin.x
    }
    set {
      self.origin.x = newValue
    }
  }
  
  var y: CGFloat {
    get {
      return self.origin.y
    }
    
    set {
      self.origin.y = newValue
    }
  }
  
  var center: CGPoint {
    return CGPoint(x: self.x + self.width / 2, y: self.y + self.height / 2)
  }
}
#endif
