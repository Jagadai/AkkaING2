import scala.collection.mutable
import com.gestionportefeuille.models._


class MarketService {
  private val marketData: mutable.Map[Int, MarketData] = mutable.Map(
    1 -> MarketData(1, "Bitcoin", "BTC", 45000, 2.5),
    2 -> MarketData(2, "Ethereum", "ETH", 3200, -1.8),
    3 -> MarketData(3, "Apple", "AAPL", 150, 0.4)
  )

  def getAllMarketData: List[MarketData] = {
    marketData.values.toList
  }

  def getMarketDataById(id: Int): Option[MarketData] = {
    marketData.get(id)
  }

  def updateMarketPrice(id: Int, newPrice: Double, newChange: Double): Option[MarketData] = {
    marketData.get(id) match {
      case Some(data) =>
        val updatedData = data.copy(price = newPrice, change = newChange)
        marketData.update(id, updatedData)
        Some(updatedData)
      case None => None
    }
  }
}