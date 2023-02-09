import ExpoModulesCore

enum ContentSide:String, Enumerable {
  case any
  case top
  case bottom
  case right
  case left
  
  func toContentSide() -> EasyTipView.ArrowPosition {
    switch self {
      case .any:
        return .any
      case .top:
        return .bottom
      case .bottom:
        return .top
      case .left:
        return .right
      case .right:
        return .left
    }
  }
}


