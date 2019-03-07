import com.ericsson.otp.erlang.*

fun List<Pixel>.typify() = OtpErlangList(this.map(::buildErlangMap).toTypedArray())

private fun buildErlangMap(pixel: Pixel): OtpErlangMap {
    val keys = arrayOf(OtpErlangAtom("height"), OtpErlangAtom("width"), OtpErlangAtom("alpha"))
    val values = arrayOf(OtpErlangInt(pixel.height), OtpErlangInt(pixel.width), OtpErlangFloat(pixel.alpha))

    return OtpErlangMap(keys, values)
}
