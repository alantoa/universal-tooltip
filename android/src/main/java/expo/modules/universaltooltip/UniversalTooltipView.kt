package expo.modules.universaltooltip

import android.content.Context
import android.content.res.Resources
import android.graphics.*
import android.view.View
import android.view.ViewGroup
import com.skydoves.balloon.*
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.universaltooltip.enums.ContentSide
import expo.modules.universaltooltip.enums.PresetAnimation
import expo.modules.universaltooltip.records.ContainerStyle
import expo.modules.universaltooltip.records.TextStyle
import kotlin.properties.Delegates

class UniversalTooltipView(context: Context) :
    ViewGroup(context) {
    private var isViewInvalidated = false
    private var isInitialized = false
    val onTap by EventDispatcher()
    val onDismiss by EventDispatcher()
    var opened: Boolean by Delegates.observable(
        false
    ) { _, _, newValue ->
        run {
            if(isInitialized) {
                if (newValue) {
                    openTooltip()
                } else {
                    dismiss()
                }
            }
        }
    }
    private var balloon: Balloon? = null
    var isOpen = false
    var side: ContentSide? = null
    var text: String? = null
    var maxWidth: Int =
        (Resources.getSystem().displayMetrics.widthPixels / Resources.getSystem().displayMetrics.density).toInt()
    var presetAnimation: PresetAnimation? = null
    var showDuration: Double = 300.0
    var containerStyle: ContainerStyle? = null
    var fontStyle: TextStyle? = null
    var sideOffset: Int = 5
    var disableTapToDismiss: Boolean = false
    var borderRadius: Float = 5f
    var disableDismissWhenTouchOutside = false
    var bgColor: Int = Color.BLACK
    var textColor: Int = Color.WHITE
    var textSize: Float = 13f
    var fontWeight: String = "normal"
    var layoutView: View? = null

    init {
        setLayerType(LAYER_TYPE_HARDWARE, null)
    }

    private fun updateContentView() {
        if (text != null) return
        val contentView = getChildAt(0) as ViewGroup
        if (contentView != null) {
            contentView.layoutParams =
                LayoutParams(contentView.measuredWidth, contentView.measuredHeight)
            removeView(contentView)
            layoutView = contentView
        }

    }

    override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
        if (changed) {
            isViewInvalidated = true;
        }
        if (opened) {
           openTooltip()
        }
        isInitialized = true
    }


    override fun dispatchDraw(canvas: Canvas) {
        super.dispatchDraw(canvas)
        if (isViewInvalidated) {
            updateContentView();
            isViewInvalidated = false;
        }
    }


    private fun openTooltip() {
        if (text != null) {
            openByText()
        } else {
            openByContentView()
        }
        when (side) {
            ContentSide.Top -> balloon?.showAlignTop(this, 0, -sideOffset)
            ContentSide.Bottom -> balloon?.showAlignBottom(this, 0, sideOffset)
            ContentSide.Right -> balloon?.showAlignRight(this, sideOffset, 0)
            ContentSide.Left -> balloon?.showAlignLeft(this, -sideOffset, 0)
            null -> balloon?.showAlignTop(this)
        }
        isOpen = true
    }

    private fun getBalloonAnimation(): BalloonAnimation {
        return when (presetAnimation) {
            PresetAnimation.FadeIn -> BalloonAnimation.FADE
            PresetAnimation.ZoomIn -> BalloonAnimation.OVERSHOOT
            PresetAnimation.None -> BalloonAnimation.NONE
            null -> BalloonAnimation.FADE
        }
    }

    private fun getArrowOrientation(): ArrowOrientation {
        return when (side) {
            ContentSide.Top -> ArrowOrientation.TOP
            ContentSide.Bottom -> ArrowOrientation.BOTTOM
            ContentSide.Right -> ArrowOrientation.START
            ContentSide.Left -> ArrowOrientation.END
            null -> ArrowOrientation.TOP
        }
    }

    private fun openByText() {
        val pdBottom: Int =
            if (containerStyle?.paddingBottom == null) 10 else containerStyle?.paddingBottom!!
        val pdTop =
            if (containerStyle?.paddingTop == null) 10 else containerStyle?.paddingTop!!
        val pdLeft =
            if (containerStyle?.paddingLeft == null) 10 else containerStyle?.paddingRight!!
        val pdRight =
            if (containerStyle?.paddingRight == null) 10 else containerStyle?.paddingRight!!

        val textTypeface = if (fontWeight == "normal") Typeface.NORMAL else Typeface.BOLD

        balloon = Balloon.Builder(context)
            .setText(text!!)
            .setBackgroundColor(bgColor)
            .setTextColor(textColor)
            .setTextSize(textSize)
            .setTextTypeface(textTypeface)
            .setArrowSize(5)
            .setArrowPositionRules(ArrowPositionRules.ALIGN_ANCHOR)
            .setArrowPosition(0.5f)
            .setMaxWidth(maxWidth)
            .setArrowOrientation(getArrowOrientation())
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
            .setBalloonAnimation(getBalloonAnimation())
            .setDismissWhenTouchOutside(!disableDismissWhenTouchOutside)
            // Todo: use XML set style just like web & iOS
            //.setBalloonAnimationStyle()
            .build()

    }

    private fun openByContentView() {
        balloon = Balloon.Builder(context)
            .setLayout(layoutView!!)
            .setArrowColor(bgColor)
            .setArrowSize(5)
            .setArrowPosition(0.5f)
            .setArrowOrientation(getArrowOrientation())
            .setOnBalloonClickListener {
                onTap(mapOf())
                if (!disableTapToDismiss) {
                    dismiss()
                }
            }
            .setOnBalloonDismissListener {
                onDismiss(mapOf())
            }
            .setBalloonAnimation(getBalloonAnimation())
            .setDismissWhenTouchOutside(!disableDismissWhenTouchOutside)
            // Todo: use XML set style just like web & iOS
            //.setBalloonAnimationStyle()
            .build()
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
