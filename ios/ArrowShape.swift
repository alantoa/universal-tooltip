//
//  ArrowShape.swift
//  UniversalTooltip
//
//  Created by Alan Toa on 2023/8/29.
//
import SwiftUI
import Accelerate

struct ArrowShape: Shape {
  var arrowDirection: ContentSide
  var arrowSize: CGSize
  var curveRadius: CGFloat = 4.0
  
  func path(in rect: CGRect) -> Path {
    var path = Path()
    
    switch arrowDirection {
        //      case .bottom:
        //        path.move(to: CGPoint(x: rect.midX - arrowSize.width / 2, y: rect.minY))
        //        path.addLine(to: CGPoint(x: rect.midX - curveRadius, y: rect.minY - curveRadius))
        //        path.addQuadCurve(to: CGPoint(x: rect.midX + curveRadius, y: rect.minY - curveRadius),
        //                          control: CGPoint(x: rect.midX, y: rect.minY - arrowSize.height))
        //        path.addLine(to: CGPoint(x: rect.midX + arrowSize.width / 2, y: rect.minY))
        //      case .top:
        //        path.move(to: CGPoint(x: rect.midX - arrowSize.width / 2, y: rect.maxY))
        //        path.addLine(to: CGPoint(x: rect.midX - curveRadius, y: rect.maxY + curveRadius))
        //        path.addQuadCurve(to: CGPoint(x: rect.midX + curveRadius, y: rect.maxY + curveRadius),
        //                          control: CGPoint(x: rect.midX, y: rect.maxY + arrowSize.height))
        //        path.addLine(to: CGPoint(x: rect.midX + arrowSize.width / 2, y: rect.maxY))
        //
        //      case .right:
        //        path.move(to: CGPoint(x: rect.minX, y: rect.midY - arrowSize.width / 2))
        //        path.addLine(to: CGPoint(x: rect.minX - curveRadius, y: rect.midY - curveRadius))
        //        path.addQuadCurve(to: CGPoint(x: rect.minX - curveRadius, y: rect.midY + curveRadius),
        //                          control: CGPoint(x: rect.minX - arrowSize.height, y: rect.midY))
        //        path.addLine(to: CGPoint(x: rect.minX, y: rect.midY + arrowSize.width / 2))
        //      case .left:
        //        path.move(to: CGPoint(x: rect.maxX, y: rect.midY - arrowSize.width / 2))
        //        path.addLine(to: CGPoint(x: rect.maxX + curveRadius, y: rect.midY - curveRadius))
        //        path.addQuadCurve(to: CGPoint(x: rect.maxX + curveRadius, y: rect.midY + curveRadius),
        //                          control: CGPoint(x: rect.maxX + arrowSize.height, y: rect.midY))
        //        path.addLine(to: CGPoint(x: rect.maxX, y: rect.midY + arrowSize.width / 2))
        //      case .any:
        //        path.move(to: CGPoint(x: rect.midX - arrowSize.width / 2, y: rect.minY))
        //        path.addLine(to: CGPoint(x: rect.midX - curveRadius, y: rect.minY - curveRadius))
        //        path.addQuadCurve(to: CGPoint(x: rect.midX + curveRadius, y: rect.minY - curveRadius),
        //                          control: CGPoint(x: rect.midX, y: rect.minY - arrowSize.height))
        //        path.addLine(to: CGPoint(x: rect.midX + arrowSize.width / 2, y: rect.minY))
      case .bottom:
        path.move(to: CGPoint(x: rect.midX - arrowSize.width / 2, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.midX, y: rect.minY - arrowSize.height))
        path.addLine(to: CGPoint(x: rect.midX + arrowSize.width / 2, y: rect.minY))
        
      case .top:
        path.move(to: CGPoint(x: rect.midX - arrowSize.width / 2, y: rect.maxY))
        path.addLine(to: CGPoint(x: rect.midX, y: rect.maxY + arrowSize.height))
        path.addLine(to: CGPoint(x: rect.midX + arrowSize.width / 2, y: rect.maxY))
        
      case .right:
        path.move(to: CGPoint(x: rect.minX, y: rect.midY - arrowSize.width / 2))
        path.addLine(to: CGPoint(x: rect.minX - arrowSize.height, y: rect.midY))
        path.addLine(to: CGPoint(x: rect.minX, y: rect.midY + arrowSize.width/2))
        
      case .left:
        path.move(to: CGPoint(x: rect.maxX, y: rect.midY - arrowSize.width / 2))
        path.addLine(to: CGPoint(x: rect.maxX + arrowSize.height, y: rect.midY))
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.midY + arrowSize.width / 2))
      case .any:
        path.move(to: CGPoint(x: rect.midX - arrowSize.width / 2, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.midX, y: rect.minY - arrowSize.height))
        path.addLine(to: CGPoint(x: rect.midX + arrowSize.width / 2, y: rect.minY))
    }
    path.closeSubpath()
    return path
  }
}
