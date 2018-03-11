import com.sun.xml.internal.messaging.saaj.util.ByteInputStream
import java.awt.Color
import java.awt.image.BufferedImage
import java.io.File
import javax.imageio.ImageIO

object ImageProcessor {
    private val redContribution = 0.21f
    private val greenContribution = 0.72f
    private val blueContribution = 0.07f

    fun process(file: File, afterProcess: (List<Pixel>) -> Unit) {
        return process(file.readBytes(), afterProcess)
    }

    fun process(content: ByteArray, afterProcess: (List<Pixel>) -> Unit) {
        val image = ImageIO.read(ByteInputStream(content, content.size))
        val intensities = calculateAlpha(image)
        afterProcess(normalize(intensities))
    }

    private fun calculateAlpha(image: BufferedImage): List<Pixel> {
        val width = 0 until image.width
        val height = 0 until image.height
        return height.flatMap { h ->
            width.map { w ->
                val gray = Color(image.getRGB(w, h)).let {
                    ((it.red * redContribution) + (it.green * greenContribution) + it.blue * blueContribution) / 3f
                }
                Pixel(h, w, gray)
            }
        }
    }

    private fun normalize(intensities: List<Pixel>): List<Pixel> {
        val all = intensities.map { it.alpha }
        val max = all.max() ?: 255f
        val min = all.min() ?: 0f
        return intensities.map { (h, w, i) ->
            val alpha = (1 - (i - min) / (max - min))
            Pixel(h, w, alpha.nanToZero())
        }
    }
}

fun Float.nanToZero(): Float = if (this.isNaN()) 0f else this