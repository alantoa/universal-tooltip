package expo.modules.universaltooltip.color

import android.graphics.Color
import java.lang.Exception

object ColorParser {
    @JvmStatic fun isValid(color: String?): Boolean {
        return try {
            Color.parseColor(color)
            true
        } catch (e: Exception) {
            false
        }
    }
}
