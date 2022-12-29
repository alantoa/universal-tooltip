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
      
      Prop("open") { (view, isPresented: Bool) in
        
      }
     
      Prop("side") { (view, side: ContentSide?) in
        view.side = side ?? .any
      }
      Prop("presetAnimation") { (view, presetAnimation: PresetAnimation?) in
        view.presetAnimation = presetAnimation ?? .fadeIn
      }
      Prop("showDuration") { (view, showDuration: Double? ) in
        view.setShowDuration((showDuration ?? 700) / 1000)
      }
      Prop("dismissDuration") { (view, dismissDuration: Double?) in
        print((dismissDuration ?? 700) / 1000)
        view.setDismissDuration((dismissDuration ?? 700) / 1000)
      }
    }
  }
}
