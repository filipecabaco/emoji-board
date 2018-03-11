import com.ericsson.otp.erlang.*
import kotlin.concurrent.thread

fun main(args: Array<String>) {
    val name = "worker@localhost"
    val cookie = "secret"
    System.setProperty("java.awt.headless", "true")

    val conn = OtpNode(name)
    conn.setCookie(cookie)

    val mailbox = conn.createMbox("mailbox")

    println(conn.node())
    println("Cookie in use: ${conn.cookie()}")
    receive(mailbox)
}

private fun receive(mailbox: OtpMbox) {
    println("Worker is ready and awaiting for messages")
    val msg = mailbox.receive() as OtpErlangTuple
    val type = msg.elementAt(0) as OtpErlangAtom
    thread(start = true) {
        when (type) {
            OtpErlangAtom("image") -> {
                println("Processing Image...")
                val sender = msg.elementAt(1) as OtpErlangPid
                val content = msg.elementAt(2) as OtpErlangTuple
                processImage(sender, content, mailbox)
                println("I'm done!")
            }
            OtpErlangAtom("video") -> {
                println("Processing Video...")
                val sender = msg.elementAt(1) as OtpErlangPid
                val content = msg.elementAt(2) as OtpErlangTuple
                processVideo(sender, content, mailbox)
                println("I'm done!")
            }
            else -> {
                println("I don't know this message...")
            }
        }
    }
    receive(mailbox)
}


private fun processImage(sender: OtpErlangPid, content: OtpErlangTuple, mailbox: OtpMbox) {
    ImageProcessor.process(
            content = (content.elementAt(1) as OtpErlangBinary).binaryValue(),
            afterProcess = { image: List<Pixel> -> sendImage("image", image, sender, mailbox)})
}

private fun processVideo(sender: OtpErlangPid, content: OtpErlangTuple, mailbox: OtpMbox) {
    VideoProcessor.process(
            originalPath = (content.elementAt(0) as OtpErlangString).stringValue(),
            content = (content.elementAt(1) as OtpErlangBinary).binaryValue(),
            afterProcess = { image: List<Pixel> ->
                Thread.sleep(800)
                sendImage("video", image, sender, mailbox)
            })
}

private fun sendImage(type: String, image: List<Pixel>, sender: OtpErlangPid, mailbox: OtpMbox) {
    val tupleResponse = OtpErlangTuple(arrayOf( OtpErlangAtom(type), image.typify()))
    println("Image with ${image.size} pixels being sent...")
    mailbox.send(sender, tupleResponse)
}
