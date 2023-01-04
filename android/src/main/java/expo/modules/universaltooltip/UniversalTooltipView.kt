package expo.modules.universaltooltip

import android.content.Context
import android.view.MotionEvent
import com.skydoves.balloon.Balloon
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import android.annotation.SuppressLint
import android.graphics.Color
import android.graphics.Rect
import android.view.View

import com.skydoves.balloon.ArrowOrientation
import com.skydoves.balloon.BalloonAnimation

import expo.modules.kotlin.viewevent.EventDispatcher

import expo.modules.universaltooltip.records.ContainerStyle
import expo.modules.universaltooltip.enums.ContentSide
import expo.modules.universaltooltip.enums.PresetAnimation
import expo.modules.universaltooltip.records.TextStyle
import kotlin.properties.Delegates
import kotlin.Boolean

class UniversalTooltipView(context: Context, appContext: AppContext) :
    ExpoView(context, appContext) {
    private var lastEventTime = -1L
    private var lastAction = -1

    val onTap by EventDispatcher()
    val onDismiss by EventDispatcher()
    var opened: Boolean by Delegates.observable(
        false
    ) { _, _, newValue ->
        run {
            if (newValue) {
                openTooltip()
            } else {
                dismiss()
            }
        }
    }
    var balloon: Balloon? = null
    var isOpen = false
    var side: ContentSide? = null
    var text: String = ""
    var presetAnimation: PresetAnimation? = null
    var showDuration: Double = 300.0
    var dismissDuration: Long = 300
    var containerStyle: ContainerStyle? = null

    var fontStyle: TextStyle? = null
    var sideOffset: Int = 5
    var disableTapToDismiss: Boolean = false
    var borderRadius: Float = 5f
    var enableDismissWhenTouchOutside = false
    var bgColor: Int = Color.BLACK
    var textColor: Int = Color.WHITE
    var textSize: Float = 13f

    override fun onInterceptTouchEvent(ev: MotionEvent): Boolean {
        if (super.onInterceptTouchEvent(ev)) {
            return true
        }

        // We call `onTouchEvent` and wait until button changes state to `pressed`, if it's pressed
        // we return true so that the gesture handler can activate.
        onTouchEvent(ev)
        return isPressed
    }

    override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
        if (opened) {
            openTooltip()
        }
        super.onLayout(changed, l, t, r, b)
    }

    private fun toggleTooltip() {
        if (isOpen) {
            dismiss()
        } else {
            openTooltip()
        }
    }

    @SuppressLint("ClickableViewAccessibility")
    override fun onTouchEvent(event: MotionEvent): Boolean {
        val eventTime = event.eventTime
        val action = event.action
        if (lastEventTime != eventTime || lastAction != action) {
            lastEventTime = eventTime
            lastAction = action
            if (event.action === MotionEvent.ACTION_UP) {
                toggleTooltip()
            }
            return super.onTouchEvent(event)
        }
        return false
    }

    private fun openTooltip() {
        val pdBottom =
            if (containerStyle?.paddingBottom == null) 10 else containerStyle?.paddingBottom!!
        val pdTop =
            if (containerStyle?.paddingTop == null) 10 else containerStyle?.paddingTop!!
        val pdLeft =
            if (containerStyle?.paddingLeft == null) 10 else containerStyle?.paddingRight!!
        val pdRight =
            if (containerStyle?.paddingRight == null) 10 else containerStyle?.paddingRight!!

        val arrowOrientation = when (side) {
            ContentSide.Top -> ArrowOrientation.TOP
            ContentSide.Bottom -> ArrowOrientation.BOTTOM
            ContentSide.Right -> ArrowOrientation.START
            ContentSide.Left -> ArrowOrientation.END
            null -> ArrowOrientation.TOP
        }
        val balloonAnimation = when (presetAnimation) {
            PresetAnimation.FadeIn -> BalloonAnimation.FADE
            PresetAnimation.ZoomIn -> BalloonAnimation.OVERSHOOT
            PresetAnimation.None -> BalloonAnimation.NONE
            null -> BalloonAnimation.FADE
        }

        balloon = Balloon.Builder(context)
            .setText(text)
            .setBackgroundColor(bgColor)
            .setTextColor(textColor)
            .setTextSize(textSize)
            .setArrowSize(5)
            .setArrowPosition(0.5f)
            .setArrowOrientation(arrowOrientation)
            .setPaddingBottom(pdBottom)
            .setPaddingTop(pdTop)
            .setPaddingLeft(pdLeft)
            .setPaddingRight(pdRight)
            .setCornerRadius(borderRadius)
            .setOnBalloonClickListener {
                onTap(mapOf())
                if (!disableTapToDismiss) {
                    dismiss()
                }
            }
            .setOnBalloonDismissListener {
                onDismiss(mapOf())
            }
            .setDismissWhenTouchOutside(enableDismissWhenTouchOutside)
            .setBalloonAnimation(balloonAnimation)
            // Todo: use XML set style just like web & iOS
            //.setBalloonAnimationStyle()
            .build()

        when (side) {
            ContentSide.Top -> balloon?.showAlignTop(this, 0, -sideOffset)
            ContentSide.Bottom -> balloon?.showAlignBottom(this, 0, sideOffset)
            ContentSide.Right -> balloon?.showAlignRight(this, sideOffset, 0)
            ContentSide.Left -> balloon?.showAlignLeft(this, -sideOffset, 0)
            null -> balloon?.showAlignTop(this)
        }
        isOpen = true
    }

    private fun dismiss() {
        balloon?.dismiss()
        isOpen = false
    }
    
    override fun onDetachedFromWindow() {
        dismiss()
        super.onDetachedFromWindow()
    }

}
