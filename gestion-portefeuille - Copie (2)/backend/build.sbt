lazy val akkaHttpVersion = "10.2.10"
lazy val akkaVersion    = "2.8.0"


resolvers += "Akka library repository".at("https://repo.akka.io/maven")

fork := true

lazy val root = (project in file("."))
  .settings(
    inThisBuild(List(
      organization    := "com.gestionportefeuille",
      scalaVersion    := "2.13.16"
    )),
    name := "gestion-portefeuille",
    libraryDependencies ++= Seq(
      "io.jvm.uuid"       %% "scala-uuid"               % "0.3.1",
      "com.typesafe.akka" %% "akka-http"                % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-spray-json"     % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-actor-typed"         % akkaVersion,
      "com.typesafe.akka" %% "akka-stream"              % akkaVersion,
      "com.typesafe.akka" %% "akka-actor"               % akkaVersion,
      "com.typesafe.akka" %% "akka-pki"                 % akkaVersion,
      "ch.qos.logback"    % "logback-classic"           % "1.4.14",
      "io.spray"         %% "spray-json"                % "1.3.6",

      "com.typesafe.slick" %% "slick" % "3.4.1",
      "com.typesafe.slick" %% "slick-hikaricp" % "3.4.1",
      "org.postgresql" % "postgresql" % "42.3.1",
      "com.typesafe" % "config" % "1.4.1",

      "com.github.jwt-scala" %% "jwt-core" % "9.0.5",

      "com.typesafe.akka" %% "akka-http-testkit"        % akkaHttpVersion % Test,
      "com.typesafe.akka" %% "akka-actor-testkit-typed" % akkaVersion     % Test,
      "org.scalatest"     %% "scalatest"                % "3.2.12"        % Test
    )
  )
