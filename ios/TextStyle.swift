//
//  TextStyle.swift
//  UniversalTooltip
//
//  Created by Alan Toa on 2022/12/31.
//
import ExpoModulesCore
import SwiftUI

struct TextStyle: Record {
  @Field
  var fontSize: Double = 13
  
  @Field
  var color: UIColor = .black
  
  @Field
  var fontFamily: String?
  
  @Field
  var fontWeight: String = "normal"
}

func fontWeightToSwiftUI(_ weight: String) -> Font.Weight {
  switch weight {
    case "normal", "400":
      return .regular
    case "bold", "700":
      return .bold
    case "100":
      return .ultraLight
    case "200":
      return .thin
    case "300":
      return .light
    case "500":
      return .medium
    case "600":
      return .semibold
    case "800":
      return .heavy
    case "900":
      return .black
    default:
      return .regular
  }
}
