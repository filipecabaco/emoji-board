import java.io.ByteArrayInputStream
import java.awt.Color
import java.awt.image.BufferedImage
import javax.imageio.ImageIO

object ImageProcessor {
    private const val redContribution = 0.21f
    private const val greenContribution = 0.72f
    private const val blueContribution = 0.07f

    fun process(content: ByteArray): List<Pixel>{
        val image = ImageIO.read(ByteArrayInputStream(content, 0, content.size))
        val intensities = calculateAlpha(image)
        return normalize(intensities)
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
        val max = all.maxOrNull() ?: 255f
        val min = all.minOrNull() ?: 0f
        return intensities.map { (h, w, i) ->
            val alpha = (1 - (i - min) / (max - min))
            Pixel(h, w, alpha.nanToZero())
        }
    }
}

fun Float.nanToZero(): Float = if (this.isNaN()) 0f else this