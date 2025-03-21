package com.gestionportefeuille.repositories
import scala.concurrent.Future
import slick.jdbc.PostgresProfile.api._
import com.gestionportefeuille.models.User


class Users(tag: Tag) extends Table[User](tag, "users") {
  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def username = column[String]("username")
  def email = column[String]("email", O.Unique)
  def password = column[String]("password")

  def * = (id, username, email, password) <> (User.tupled, User.unapply)
}

class UserRepository(db: Database) {
  private val users = TableQuery[Users]

  def create(user: User): Future[Int] = db.run(users += user)

  def findByEmail(email: String): Future[Option[User]] =
    db.run(users.filter(_.email === email).result.headOption)

  def findByUsername(username: String): Future[Option[User]] =
    db.run(users.filter(_.username === username).result.headOption)
}
