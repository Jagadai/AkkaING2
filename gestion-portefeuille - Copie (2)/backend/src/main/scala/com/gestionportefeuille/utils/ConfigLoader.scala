import com.typesafe.config.{Config, ConfigFactory}

object ConfigLoader {
  private val config: Config = ConfigFactory.load()

  def getString(key: String): String = config.getString(key)
  def getInt(key: String): Int = config.getInt(key)
  def getDouble(key: String): Double = config.getDouble(key)
  def getBoolean(key: String): Boolean = config.getBoolean(key)
}