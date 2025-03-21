package com.gestionportefeuille.models


case class MarketData(id: Int, name: String, symbol: String, price: Double, change: Double)

object MarketData {
  def create(name: String, symbol: String, price: Double, change: Double): MarketData =
    MarketData(id = scala.util.Random.nextInt(100000), name, symbol, price, change)
}
