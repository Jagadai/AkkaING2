package com.gestionportefeuille.services

import com.gestionportefeuille.models.Asset
import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.PostgresProfile.api._

class AssetService(db: Database)(implicit ec: ExecutionContext) {

  def getAssets(): Future[List[Asset]] = {
    val query = Asset.assets.result
    db.run(query).map(_.toList)
  }

}
