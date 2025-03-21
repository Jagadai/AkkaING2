import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.Directives._
import scala.concurrent.ExecutionContextExecutor
import scala.util.{Failure, Success}
import com.gestionportefeuille.repositories.UserRepository
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext.Implicits.global
import com.gestionportefeuille.services.{PortfolioService, AssetService}

object App extends App {    
  implicit val system: ActorSystem = ActorSystem("portfolioSystem")
  implicit val executionContext: ExecutionContextExecutor = system.dispatcher

  val db = Database.forConfig("postgres") 
  val userRepo = new UserRepository(db)

  val portfolioService = new PortfolioService(db)
  val assetService = new AssetService(db)

  val authRoutes = new AuthRoutes(userRepo)  
  val userRoutes = new UserRoutes()
  val portfolioRoutes = new PortfolioRoutes(portfolioService, assetService)  
  val marketRoutes = new MarketRoutes()

  val routes: Route = concat(
    authRoutes.route,
    userRoutes.route,
    portfolioRoutes.route,
    marketRoutes.route
  )

  val host: String = Option(ConfigLoader.getString("server.host")).getOrElse("0.0.0.0") 
  val port: Int = Option(ConfigLoader.getInt("server.port")).getOrElse(8080) 

  Http().newServerAt(host, port).bind(routes).onComplete {
    case Success(binding) => 
      println(s"Serveur démarré sur ${binding.localAddress}")
    case Failure(ex) => 
      println(s"Erreur au démarrage du serveur : ${ex.getMessage}")
      system.terminate()
  }
}
