package expo.modules.universaltooltip

import android.content.Context
import android.view.MotionEvent
import android.view.View
import com.skydoves.balloon.Balloon
import com.skydoves.balloon.BalloonSizeSpec
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import android.annotation.SuppressLint
import android.graphics.Color
import android.graphics.fonts.FontStyle
import android.os.Build
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.core.view.get
import com.skydoves.balloon.ArrowOrientation
import com.skydoves.balloon.BalloonAnimation
import expo.modules.core.utilities.ifNull
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.viewevent.EventDispatcher

import expo.modules.universaltooltip.records.ContainerStyle
import expo.modules.universaltooltip.enums.ContentSide
import expo.modules.universaltooltip.enums.PresetAnimation
import expo.modules.universaltooltip.records.TextStyle
import expo.modules.universaltooltip.color.ColorParser

class UniversalTooltipView(context: Context, appContext: AppContext) :
    ExpoView(context, appContext) {
    private var lastEventTime = -1L
    private var lastAction = -1

    val onTap by EventDispatcher()
    val onDismiss by EventDispatcher()

    var balloon: Balloon? = null
    var opened = false
    var side: ContentSide? = null
    var text: String = ""
    var presetAnimation: PresetAnimation? = null
    var showDuration: Double = 300.0
    var dismissDuration: Double = 300.0
    var containerStyle: ContainerStyle? = null

    var fontStyle: TextStyle? = null
    var sideOffset: Int = 5
    var disableTapToDismiss: Boolean = false
    var borderRadius: Float = 5f

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

        super.onLayout(changed, l, t, r, b)
    }

    @SuppressLint("ClickableViewAccessibility")
    override fun onTouchEvent(event: MotionEvent): Boolean {
        val eventTime = event.eventTime
        val action = event.action
        if (lastEventTime != eventTime || lastAction != action) {
            lastEventTime = eventTime
            lastAction = action
            if (event.action === MotionEvent.ACTION_UP) {
                openTooltip()
            }
            return super.onTouchEvent(event)
        }
        return false
    }

    private fun openTooltip() {
        var pdBottom =
            if (containerStyle?.paddingBottom == null) 10 else containerStyle?.paddingBottom!!
        var pdTop =
            if (containerStyle?.paddingTop == null) 10 else containerStyle?.paddingTop!!
        var pdLeft =
            if (containerStyle?.paddingLeft == null) 10 else containerStyle?.paddingRight!!
        var pdRight =
            if (containerStyle?.paddingRight == null) 10 else containerStyle?.paddingRight!!

        var arrowOrientation = when (side) {
            ContentSide.Top -> ArrowOrientation.TOP
            ContentSide.Bottom -> ArrowOrientation.BOTTOM
            ContentSide.Right -> ArrowOrientation.START
            ContentSide.Left -> ArrowOrientation.END
            null -> ArrowOrientation.TOP
        }
        var balloonAnimation = when (presetAnimation){
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
            }
            .setOnBalloonDismissListener {
               onDismiss(mapOf())
            }
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

    }

    private fun dismiss() {
        balloon?.dismiss()
    }


}
