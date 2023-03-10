//
//  TextStyle.swift
//  UniversalTooltip
//
//  Created by Alan Toa on 2022/12/31.
//
import ExpoModulesCore

struct TextStyle: Record {
  @Field
  var fontSize: Double = 13
  
  @Field
  var color: UIColor = .white
  
  @Field
  var fontFamily: String?
}
