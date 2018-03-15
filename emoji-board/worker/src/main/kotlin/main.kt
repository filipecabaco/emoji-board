import com.ericsson.otp.erlang.*
import kotlin.concurrent.thread

fun main(args: Array<String>) {
    System.setProperty("java.awt.headless", "true")

    val conn = OtpNode("worker@localhost")
    conn.setCookie("secret")
    val mailbox = conn.createMbox("mailbox")
    receive(mailbox)
}

private tailrec fun receive(mailbox: OtpMbox) {
    println("Worker is ready and awaiting for messages")
    val msg = mailbox.receive() as OtpErlangTuple
    val type = msg.elementAt(0) as OtpErlangAtom
    thread(start = true) {
        when (type) {
            OtpErlangAtom("image") -> processImageMsg(msg, mailbox)
            else -> println("I don't know this message...")
        }
    }
    receive(mailbox)
}

private fun processImageMsg(msg: OtpErlangTuple, mailbox: OtpMbox) {
    println("Processing Image...")
    val sender = msg.elementAt(1) as OtpErlangPid
    val content = msg.elementAt(2) as OtpErlangBinary
    val pixels = ImageProcessor.process(content = content.binaryValue())
    mailbox.send(sender, pixels.typify())
    println("I'm done!")
}

