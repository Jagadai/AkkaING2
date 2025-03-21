import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.model.StatusCodes
import scala.concurrent.ExecutionContext
import spray.json._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import com.gestionportefeuille.models.{Portfolio, Asset}
import com.gestionportefeuille.services.{PortfolioService, AssetService}
import java.sql.Timestamp
import java.text.SimpleDateFormat

object PortfolioJsonProtocol extends DefaultJsonProtocol {
  implicit val timestampFormat: RootJsonFormat[Timestamp] = new RootJsonFormat[Timestamp] {
    def write(obj: Timestamp): JsValue = JsString(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(obj))
    def read(json: JsValue): Timestamp = json match {
      case JsString(s) => Timestamp.valueOf(s)
      case _ => deserializationError("Expected Timestamp as JsString")
    }
  }

  implicit val portfolioFormat: RootJsonFormat[Portfolio] = jsonFormat3(Portfolio.apply)
  implicit val assetFormat: RootJsonFormat[Asset] = jsonFormat4(Asset.apply)
}

class PortfolioRoutes(portfolioService: PortfolioService, assetService: AssetService)(implicit ec: ExecutionContext) {
  
  import PortfolioJsonProtocol._

  val route: Route = pathPrefix("portfolio") {
    concat(
      get {
        path(IntNumber) { userId =>
          onSuccess(portfolioService.getPortfolios(userId)) { portfolios =>
            complete(portfolios.toJson)
          }
        }
      },
      
      post {
        path("create" / IntNumber) { userId =>
          onSuccess(portfolioService.createPortfolio(userId)) { newPortfolio =>
            complete(StatusCodes.Created, newPortfolio.toJson)
          }
        }
      },
      
      post {
        path("addAsset" / IntNumber / IntNumber) { (userId, assetId) =>
          entity(as[JsObject]) { data =>
            // Extraire la quantité de l'actif depuis le JSON
            val quantity = data.fields.get("quantity").flatMap(_.convertTo[Option[Double]]).getOrElse(0.0)

            onSuccess(portfolioService.addAssetToPortfolio(userId, assetId, quantity)) { updatedPortfolio =>
              complete(StatusCodes.OK, updatedPortfolio.toJson)
            }
          }
        }
      },

      get {
        path("assets") {
          onSuccess(assetService.getAssets()) { assets =>
            println("Assets: " + assets)  
            complete(assets.toJson)  
          }

        }
      }
    )
  }
}
