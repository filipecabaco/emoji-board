import java.io.File
import java.io.FileOutputStream
import java.util.*

object VideoProcessor {

    fun process(originalPath: String, content: ByteArray, afterProcess: (List<Pixel>) -> Unit) {
        val extension = File(originalPath).extension
        val tmpPath = "${UUID.randomUUID()}"
        tempFile("$tmpPath.$extension", content)

        val process = Runtime.getRuntime().exec("ffmpeg -i $originalPath -r 1/1 $tmpPath-%03d.png")
        while (process.isAlive) {}
        println("Finished processing video!")

        processImages(tmpPath, afterProcess)
        println("Finished processing images!")
        cleanup(tmpPath)
        println("Finished cleanup!")
    }

    private fun processImages(path: String, afterProcess: (List<Pixel>) -> Unit) {
        val regex = Regex("$path.*.png\$")
        findFilesByRegex(regex).sorted().forEach { ImageProcessor.process(it, afterProcess) }
    }

    private fun cleanup(path: String) {
        val regex = Regex("$path.*")
        findFilesByRegex(regex).forEach { it.delete() }
    }

    private fun findFilesByRegex(regex: Regex): List<File> {
        return File(".")
                .list()
                .map { File(it) }
                .filter { regex.matches(it.name) && it.isFile }
    }

    private fun tempFile(path: String, content: ByteArray) {
        val stream = FileOutputStream(path)
        stream.use { s ->
            s.write(content)
        }
    }
}