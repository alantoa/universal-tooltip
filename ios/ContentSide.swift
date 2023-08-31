import ExpoModulesCore
import Popovers

enum ContentSide:String, Enumerable {
  case any
  case top
  case bottom
  case right
  case left
  
  func toOriginAnchorSide() -> Popover.Attributes.Position.Anchor {
    switch self {
      case .any:
        return .top
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
  func toPopoverAnchorSide() -> Popover.Attributes.Position.Anchor {
    switch self {
      case .any:
        return .bottom
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
  func toSideOffset(offset:CGFloat) -> UIEdgeInsets {
    switch self {
      case .any:
        return .init(top: 0, left: 0, bottom: 0, right: 0)
      case .top:
        return .init(top: -offset, left: 0, bottom: 0, right: 0)
      case .bottom:
        return .init(top: 0, left: 0, bottom: -offset, right: 0)
      case .left:
        return .init(top: 0, left:-offset, bottom: 0, right: 0)
      case .right:
        return .init(top: 0, left: 0, bottom: 0, right: -offset)
    }
  }
  
  func toSideOffsetY(offset:CGFloat,isActive: Bool) -> CGFloat {
    if(isActive){
      return 0
    }
    switch self {
      case .any:
        return -10
      case .top:
        return -10
      case .bottom:
        return 10
      case .left:
        return 0
      case .right:
        return 0
    }
  }
  func toSideOffsetX(offset:CGFloat,isActive :Bool) -> CGFloat {
    if(isActive){
      return 0
    }
    switch self {
      case .any:
        return -10
      case .top:
        return 0
      case .bottom:
        return 0
      case .left:
        return -10
      case .right:
        return 10
    }
  }
}





