import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import spray.json._
import akka.http.scaladsl.model.StatusCodes
import com.gestionportefeuille.models._


object MarketJsonProtocol extends DefaultJsonProtocol {
  implicit val marketDataFormat: RootJsonFormat[MarketData] = jsonFormat5(MarketData)
}

class MarketRoutes {
  import MarketJsonProtocol._

  private var marketData: List[MarketData] = List(
    MarketData(1, "Bitcoin", "BTC", 45000, 2.5),
    MarketData(2, "Ethereum", "ETH", 3200, -1.8),
    MarketData(3, "Apple", "AAPL", 150, 0.4)
  )

  val route: Route = pathPrefix("market") {
    concat(
      get {
        pathEndOrSingleSlash {
          complete(marketData.toJson.toString)
        }
      },
      get {
        path(IntNumber) { id =>
          marketData.find(_.id == id) match {
            case Some(data) => complete(data.toJson.toString)
            case None => complete(StatusCodes.NotFound, "Market data not found")
          }
        }
      }
    )
  }
}