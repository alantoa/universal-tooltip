package expo.modules.universaltooltip

import android.content.Context
import android.graphics.*
import android.view.View
import androidx.core.view.drawToBitmap
import com.skydoves.balloon.ArrowOrientation
import com.skydoves.balloon.Balloon
import com.skydoves.balloon.BalloonAnimation
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import expo.modules.universaltooltip.enums.ContentSide
import expo.modules.universaltooltip.enums.PresetAnimation
import expo.modules.universaltooltip.records.ContainerStyle
import expo.modules.universaltooltip.records.TextStyle
import kotlin.properties.Delegates


class UniversalTooltipView(context: Context, appContext: AppContext) :
    ExpoView(context, appContext) {

    var bitmapContentView: Bitmap? = null
    private var bitmapContentViewInvalidated = false
    private var mPaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private var mPorterDuffXferMode: PorterDuffXfermode = PorterDuffXfermode(PorterDuff.Mode.DST_IN);

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

    init {
        setLayerType(LAYER_TYPE_HARDWARE, null)
    }


    private fun updateBitmapView() {
//        var contentView = getChildAt(0)
//        println(contentView)
//        if (contentView != null) {
//            contentView.visibility = INVISIBLE
//        }
    }

    override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
        super.onLayout(changed, l, t, r, b)
        if (changed) {
            bitmapContentViewInvalidated = true;
        }
        if (opened) {
            openTooltip()
        }
    }

    override fun dispatchDraw(canvas: Canvas) {
        super.dispatchDraw(canvas)
        if (bitmapContentViewInvalidated) {
//            updateBitmapView();
            bitmapContentViewInvalidated = false;
        }
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
        val textTypeface = if(fontWeight == "normal") Typeface.NORMAL else Typeface.BOLD
        balloon = Balloon.Builder(context)
            .setText(text)
            .setBackgroundColor(bgColor)
            .setTextColor(textColor)
            .setTextSize(textSize)
            .setTextTypeface(textTypeface)
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
            .setBalloonAnimation(balloonAnimation)
            .setDismissWhenTouchOutside(!disableDismissWhenTouchOutside)
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
    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        bitmapContentViewInvalidated = true
    }
    override fun onDetachedFromWindow() {
        dismiss()
        super.onDetachedFromWindow()
    }
}
