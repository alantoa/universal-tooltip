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
        return .top
      case .bottom:
        return .bottom
      case .left:
        return .left
      case .right:
        return .right
    }
  }
}


