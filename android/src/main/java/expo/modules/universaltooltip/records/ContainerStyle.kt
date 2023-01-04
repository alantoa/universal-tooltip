package expo.modules.universaltooltip.records

import expo.modules.kotlin.records.Record
import expo.modules.kotlin.records.Field

data class ContainerStyle(
    @Field var paddingTop: Int = 10,
    @Field var paddingRight: Int = 10,
    @Field var paddingBottom: Int = 10,
    @Field var paddingLeft: Int = 10,
) : Record {
}
