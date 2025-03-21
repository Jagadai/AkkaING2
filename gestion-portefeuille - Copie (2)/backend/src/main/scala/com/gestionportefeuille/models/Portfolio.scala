package com.gestionportefeuille.models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.Future
import java.sql.Timestamp

import scala.concurrent.ExecutionContext.Implicits.global

case class Portfolio(id: Option[Int], userId: Int, createdAt: Timestamp)

class Portfolios(tag: Tag) extends Table[Portfolio](tag, "portfolios") {
  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def userId = column[Int]("user_id")
  def createdAt = column[Timestamp]("created_at")

  def * = (id.?, userId, createdAt) <> ((Portfolio.apply _).tupled, Portfolio.unapply)
}

class PortfolioAssets(tag: Tag) extends Table[(Int, Int, Double)](tag, "portfolio_assets") {
  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def portfolioId = column[Int]("portfolio_id")
  def assetId = column[Int]("asset_id")
  def quantity = column[Double]("quantity")

  def * = (portfolioId, assetId, quantity)
  
  def portfolio = foreignKey("portfolio_fk", portfolioId, TableQuery[Portfolios])(_.id)
  def asset = foreignKey("asset_fk", assetId, TableQuery[Assets])(_.id)
}

object Portfolio {
  val portfolios = TableQuery[Portfolios]
  val portfolioAssets = TableQuery[PortfolioAssets]
  val assets = TableQuery[Assets]

  def create(userId: Int, createdAt: Timestamp)(implicit db: Database): Future[Portfolio] = {
    val insertAction = portfolios returning portfolios.map(_.id) into ((portfolio, id) => portfolio.copy(id = Some(id)))
    val portfolio = Portfolio(None, userId, createdAt)
    db.run(insertAction += portfolio)
  }

  def addAssetToPortfolio(userId: Int, asset: Asset, quantity: Double)(implicit db: Database): Future[Portfolio] = {
    val query = portfolios.filter(_.userId === userId).result.headOption
    db.run(query).flatMap {
      case Some(portfolio) =>
        val insertAction = portfolioAssets += (portfolio.id.get, asset.id.get, quantity)
        db.run(insertAction).map(_ => portfolio)
      case None =>
        Future.failed(new Exception("Portfolio not found for user"))
    }
  }
}
