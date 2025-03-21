package com.gestionportefeuille.models

import slick.jdbc.PostgresProfile.api._
import com.gestionportefeuille.models.User  

class UsersTable(tag: Tag) extends Table[User](tag, "users") {
  def id = column[Int]("id", O.PrimaryKey, O.AutoInc) 
  def username = column[String]("username")
  def email = column[String]("email")
  def password = column[String]("password")

  def * = (id, username, email, password) <> (User.tupled, User.unapply)  
}

object UsersTable {
  val query = TableQuery[UsersTable]
}
