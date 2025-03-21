package com.gestionportefeuille.models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

case class Asset(id: Option[Int], name: String, symbol: String, fixedPrice: Double)

class Assets(tag: Tag) extends Table[Asset](tag, "assets") {
  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def name = column[String]("name")
  def symbol = column[String]("symbol")
  def fixedPrice = column[Double]("fixed_price")

  def * = (id.?, name, symbol, fixedPrice) <> ((Asset.apply _).tupled, Asset.unapply)
}

object Asset {
  val assets = TableQuery[Assets]

  def create(name: String, symbol: String, fixedPrice: Double)(implicit db: Database): Future[Asset] = {
    val insertAction = assets returning assets.map(_.id) into ((asset, id) => asset.copy(id = Some(id)))
    val asset = Asset(None, name, symbol, fixedPrice)
    db.run(insertAction += asset)
  }

  def findAll(implicit db: Database): Future[List[Asset]] = {
    val query = assets.result
    db.run(query).map(_.toList)
  }

  def findById(id: Int)(implicit db: Database): Future[Option[Asset]] = {
    val query = assets.filter(_.id === id).result.headOption
    db.run(query)
  }
}
