//
//  DismissibleEasyTipView.swift
//  UniversalTooltip
//
//  Created by Alan Toa on 2023/1/5.
//
class DismissibleEasyTipView: EasyTipView {
  
  lazy var tapRecognizer: UITapGestureRecognizer = {
    
    let tapRecognizer = UITapGestureRecognizer(target: self, action: #selector(self.didTapOnScreen))
    tapRecognizer.numberOfTapsRequired = 1
    
    return tapRecognizer
  }()
//  lazy var panRecognizer: UIPanGestureRecognizer = {
//    let panRecognizer = UIPanGestureRecognizer(target: self, action: #selector(self.didTapOnScreen))
//    return panRecognizer
//
//  }()
  
  lazy var dismissView: UIView = {
    
    let view = UIView()
    
    view.backgroundColor = .clear
    view.frame = UIScreen.main.bounds
    
    return view
  }()

  func show(on view: UIView) {
    self.show(forView: view)
    
    guard let superView = self.superview else { return }
    
    self.addDismissView(on: superView)
  }
  
  private func addDismissView(on superView: UIView) {
    
    if self.dismissView.superview == nil {
      superView.addSubview(self.dismissView)
    }
    
    if !(self.dismissView.gestureRecognizers ?? []).contains(self.tapRecognizer) {
      self.dismissView.addGestureRecognizer(self.tapRecognizer)
    }
//    if !(self.dismissView.gestureRecognizers ?? []).contains(self.panRecognizer) {
//      self.dismissView.addGestureRecognizer(self.panRecognizer)
//    }
//    
    self.tapRecognizer.isEnabled = true
  }
  
  func hide() {
    
    self.dismissView.removeFromSuperview()
    self.tapRecognizer.isEnabled = false
    self.dismiss()
  }
  
  @objc func didTapOnScreen() {
    self.hide()
  }
}
