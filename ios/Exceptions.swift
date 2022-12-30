//
//  Exceptions.swift
//  UniversalTooltip
//
//  Created by Alan Toa on 2022/12/30.
//
import ExpoModulesCore

internal class TextNilException: Exception {
  override var reason: String {
    "Try to use text to Tooltip, but not found, you must be make sure add text prop."
  }
}
