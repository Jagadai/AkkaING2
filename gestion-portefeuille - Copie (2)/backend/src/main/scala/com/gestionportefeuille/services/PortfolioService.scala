package com.gestionportefeuille.services

import slick.jdbc.PostgresProfile.api._
import com.gestionportefeuille.models.Portfolio
import scala.concurrent.{Future, ExecutionContext}

class PortfolioService(db: Database)(implicit ec: ExecutionContext) {

  def getPortfolios(userId: Int): Future[Seq[Portfolio]] = {
    val query = Portfolio.portfolios.filter(_.userId === userId).result
    db.run(query)
  }

  def createPortfolio(userId: Int): Future[Portfolio] = {
    val portfolio = Portfolio(None, userId, java.sql.Timestamp.valueOf(java.time.LocalDateTime.now()))
    val insertQuery = Portfolio.portfolios returning Portfolio.portfolios.map(_.id) into ((p, id) => p.copy(id = Some(id)))
    db.run(insertQuery += portfolio)
  }

  def addAssetToPortfolio(userId: Int, assetId: Int, quantity: Double): Future[Portfolio] = {
    Future.successful(Portfolio(None, userId, java.sql.Timestamp.valueOf(java.time.LocalDateTime.now()))) 
  }
}
