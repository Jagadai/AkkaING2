# Utiliser une image officielle Scala avec SBT
FROM openjdk:11


# Installer SBT et Scala manuellement
RUN apt-get update && apt-get install -y curl unzip \
    && curl -fsL https://github.com/sbt/sbt/releases/download/v1.8.0/sbt-1.8.0.tgz | tar xz -C /usr/local \
    && curl -fsL https://downloads.lightbend.com/scala/2.13.10/scala-2.13.10.tgz | tar xz -C /usr/local

# Ajouter SBT et Scala au PATH
ENV PATH="/usr/local/sbt/bin:/usr/local/scala-2.13.10/bin:$PATH"

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY . .

# Télécharger les dépendances et compiler le projet
RUN sbt compile

# Exposer le port utilisé par l'application Scala
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["sbt", "run"]