import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.model.HttpMethods
import akka.http.scaladsl.model.headers._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import spray.json.DefaultJsonProtocol._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Success, Failure}
import pdi.jwt._
import com.gestionportefeuille.models.User
import com.gestionportefeuille.repositories._

case class AuthRequest(username: String, password: String)
case class AuthResponse(token: String)

object AuthJsonFormats {
  implicit val authRequestFormat = jsonFormat2(AuthRequest) 
  implicit val authResponseFormat = jsonFormat1(AuthResponse)
}

class AuthRoutes(userRepo: UserRepository)(implicit ec: ExecutionContext) {
  import AuthJsonFormats._

  val secretKey = "superSecretKey"

  val corsHeaders = respondWithHeaders(
    `Access-Control-Allow-Origin`.*,
    `Access-Control-Allow-Methods`(HttpMethods.POST, HttpMethods.GET, HttpMethods.OPTIONS),
    `Access-Control-Allow-Headers`("Content-Type")
  )

  val route: Route = corsHeaders {
    pathPrefix("auth") {
      path("register") {
        post {
          entity(as[AuthRequest]) { req =>
            println(s"Requête reçue : ${req.username}")
            val user = User(0, req.username, "", hashPassword(req.password))
            onComplete(userRepo.create(user)) {
              case Success(_) => complete(StatusCodes.Created, "Utilisateur créé")
              case Failure(ex) => 
                println(s"Erreur lors de l'inscription : ${ex.getMessage}") // Debug
                complete(StatusCodes.BadRequest, "Erreur lors de l'inscription")
            }
          }
        }
      } ~
      path("login") {
        post {
          entity(as[AuthRequest]) { req =>
            val futureUser: Future[Option[User]] = userRepo.findByUsername(req.username)

            onComplete(futureUser) {
              case Success(Some(user)) if checkPassword(req.password, user.password) =>
                val token = Jwt.encode(s"""{"username":"${user.username}"}""", secretKey, JwtAlgorithm.HS256)
                println(s"Connexion réussie pour ${user.username}")
                complete(AuthResponse(token))

              case Success(None) =>
                println("Utilisateur non trouvé")
                complete(StatusCodes.Unauthorized, "Utilisateur non trouvé")

              case Failure(ex) =>
                println(s"Erreur lors de la connexion : ${ex.getMessage}")
                complete(StatusCodes.InternalServerError, "Erreur interne")
            }
          }
        }
      } ~
      options { 
        complete(StatusCodes.OK)
      }
    }
  }

  def hashPassword(password: String): String = password.reverse 
  def checkPassword(password: String, hash: String): Boolean = password.reverse == hash
}
