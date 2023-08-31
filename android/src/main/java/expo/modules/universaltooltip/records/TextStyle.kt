package expo.modules.universaltooltip.records
import android.graphics.Typeface
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

data class TextStyle(
    @Field var fontSize: Float = 13f,
    @Field var color: Int = -16777216,
    @Field var fontFamily: String?,
    @Field var fontWeight: String = "normal",
) : Record {

}

fun convertFontWeightToTypeface(fontWeight: String): Typeface {
    return when (fontWeight) {
        "normal" -> Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        "bold" -> Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        "100" -> Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        "200" -> Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        "300" -> Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        "400" -> Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        "500" -> Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        "600" -> Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        "700" -> Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        "800" -> Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        "900" -> Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        else -> Typeface.DEFAULT
    }
}