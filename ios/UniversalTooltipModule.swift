import ExpoModulesCore

public class UniversalTooltipModule: Module {

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('UniversalTooltip')` in JavaScript.
    Name("UniversalTooltip")
    
    
    // view definition: Prop,
    View(UniversalTooltipView.self) {
      Events("onTap")
      Events("onDismiss")
      
      Prop("open") { (view, opened: Bool?) in
        view.opened = opened ?? false
      }
      Prop("side") { (view, side: ContentSide?) in
        view.side = side ?? .any
      }
      Prop("text") { (view, text: String?) in
        view.text = text
      }
      Prop("presetAnimation") { (view, presetAnimation: PresetAnimation?) in
        view.presetAnimation = presetAnimation ?? .fadeIn
      }
      Prop("showDuration") { (view, showDuration: Double? ) in
        view.setShowDuration((showDuration ?? 700) / 1000)
      }
      Prop("dismissDuration") { (view, dismissDuration: Double?) in
        view.setDismissDuration((dismissDuration ?? 700) / 1000)
      }
      Prop("containerStyle") { (view, containerStyle: ContainerStyle?) in
        view.containerStyle = containerStyle
      }
      Prop("fontStyle") { (view, fontStyle: TextStyle?) in
        view.fontStyle = fontStyle ?? TextStyle(fontSize: 13)
      }
      Prop("sideOffset") { (view, sideOffset: Double?) in
        view.sideOffset = sideOffset ?? Double(1)
      }
      Prop("disableTapToDismiss") { (view, disableTapToDismiss: Bool?) in
        view.disableTapToDismiss = disableTapToDismiss ?? false
      }
      Prop("borderRadius") { (view, borderRadius: Double?) in
        view.cornerRadius = borderRadius ?? CGFloat(0)
      }
      Prop("backgroundColor") { (view, backgroundColor: UIColor?) in
        view.bubbleBackgroundColor = backgroundColor ?? .clear
      }
      Prop("textColor") { (view, textColor: UIColor?) in
        view.textColor = textColor ?? .white
      }
      Prop("textSize") { (view, textSize: Double?) in
        view.textSize = textSize ?? CGFloat(13)
      }
      Prop("fontWeight") { (view, fontWeight: String) in
        view.fontWeight = fontWeight
      }
      
    }
  }
}
