import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import spray.json._
import akka.http.scaladsl.model.StatusCodes
import com.gestionportefeuille.models._



object UserJsonProtocol extends DefaultJsonProtocol {
  implicit val userFormat: RootJsonFormat[User] = jsonFormat4(User)
}

class UserRoutes {
  import UserJsonProtocol._

  private var users: List[User] = List(
    User(1, "john_doe", "john@example.com", "password123"),
    User(2, "jane_doe", "jane@example.com", "password123")
  )

  val route: Route = pathPrefix("users") {
    concat(
      get {
        pathEndOrSingleSlash {
          complete(users.toJson.toString)
        }
      },
      post {
        entity(as[String]) { body =>
          val newUser = body.parseJson.convertTo[User]
          users = users :+ newUser
          complete(StatusCodes.Created, newUser.toJson.toString)
        }
      },
      get {
        path(IntNumber) { id =>
          users.find(_.id == id) match {
            case Some(user) => complete(user.toJson.toString)
            case None => complete(StatusCodes.NotFound, "User not found")
          }
        }
      }
    )
  }
}