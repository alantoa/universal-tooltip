package expo.modules.universaltooltip.records
import android.graphics.Color
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.records.Field

data class TextStyle(
    @Field var fontSize: Float? = 13f,
    @Field var color: String? = "#fff",
    @Field var fontFamily: String? = null,

) : Record{

}

