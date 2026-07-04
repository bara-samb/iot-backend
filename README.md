Structure du projet et rôle des fichiers
iot-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── sensorController.js
│
├── models/
│   └── senso_data.js
│
├── routes/
│   └── sensorRoutes.js
│
├── serial/
│   └── serialReader.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
| Fichier / Dossier                   | Rôle                                                                                                                                                           |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **server.js**                       | Point d'entrée de l'application. Il démarre le serveur Express, établit la connexion à MongoDB, charge le lecteur série et configure les routes de l'API REST. |
| **config/db.js**                    | Gère la connexion à MongoDB à l'aide de Mongoose. Centraliser cette connexion facilite la maintenance et la réutilisation du code.                             |
| **models/senso_data.js**            | Définit le schéma Mongoose représentant une mesure du capteur (température, humidité, état, date, etc.).                                                       |
| **serial/serialReader.js**          | Lit les données envoyées par l'Arduino via le port série, les convertit en objet JavaScript et les enregistre dans MongoDB.                                    |
| **controllers/sensorController.js** | Contient la logique métier de l'API : récupérer les mesures, la dernière mesure, compter ou supprimer les données.                                             |
| **routes/sensorRoutes.js**          | Définit les différentes routes de l'API REST et les associe aux fonctions du contrôleur.                                                                       |
| **.env**                            | Contient les variables d'environnement (URI MongoDB, port du serveur). Il n'est pas partagé sur GitHub pour protéger les informations sensibles.               |
| **.gitignore**                      | Indique à Git les fichiers et dossiers à ne pas versionner (node_modules, .env, etc.).                                                                         |
| **package.json**                    | Décrit le projet Node.js : nom, version, scripts et dépendances.                                                                                               |
| **package-lock.json**               | Verrouille les versions exactes des dépendances installées pour garantir un environnement identique sur toutes les machines.                                   |
| **README.md**                       | Documente le projet : installation, architecture, utilisation et présentation.                                                                                 |
Installation des dépendances

Installer les dépendances principales :

npm install express mongoose serialport @serialport/parser-readline dotenv cors
npm install morgan
npm install helmet
npm install express-validator
npm install socket.io

Installer Nodemon pour le développement :

npm install --save-dev nodemon

| Dépendance                      | Rôle                                                                 | Pourquoi est-elle importante ?                                                                                                                                                                                                                  |
| ------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Express**                     | Framework Web pour Node.js.                                          | Il permet de créer facilement un serveur HTTP et de développer une API REST. Dans ce projet, Express gère les routes (`/api/sensors`), les requêtes des utilisateurs et les réponses envoyées au navigateur ou à une application cliente.       |
| **Mongoose**                    | Bibliothèque de communication avec MongoDB.                          | Elle simplifie les opérations sur la base de données en utilisant des modèles (Models) et des schémas (Schemas). Elle permet d'ajouter, rechercher, modifier ou supprimer des documents sans écrire directement des requêtes MongoDB complexes. |
| **SerialPort**                  | Bibliothèque de communication série.                                 | Elle permet à Node.js de communiquer avec la carte Arduino via le port USB (COM3, COM4, etc.). Sans cette bibliothèque, le serveur ne pourrait pas recevoir les données envoyées par l'Arduino.                                                 |
| **@serialport/parser-readline** | Analyseur (Parser) des données série.                                | Les données reçues depuis le port série arrivent sous forme de flux continu de caractères. Cette bibliothèque les découpe automatiquement ligne par ligne (`\r\n`), ce qui facilite leur traitement et leur conversion en objet JSON.           |
| **Dotenv**                      | Gestion des variables d'environnement.                               | Elle charge automatiquement les informations contenues dans le fichier `.env`, comme le port du serveur ou l'URI de connexion à MongoDB. Cela évite d'écrire des informations sensibles directement dans le code source.                        |
| **CORS**                        | Gestion des requêtes inter-origines (Cross-Origin Resource Sharing). | Il autorise une application web (React, Angular, Vue.js, Flutter Web, etc.) à communiquer avec le serveur Node.js. Sans CORS, les navigateurs bloquent souvent les requêtes provenant d'une autre origine.                                      |


Scripts disponibles
Les scripts sont définis dans le fichier package.json.

Commande	Description
npm install:	Installe toutes les dépendances du projet.
npm start:	Lance l'application en mode production.
npm run dev:	Lance le serveur avec Nodemon et redémarre automatiquement à chaque modification du code.
Fonctionnement global

Le fonctionnement du projet peut être résumé par les étapes suivantes :

Le capteur DHT11 mesure la température et l'humidité.
L'Arduino lit ces mesures et les envoie au format JSON via le port série.
Le module serialReader.js reçoit les données dans Node.js.
Les données sont converties en objet JavaScript puis enregistrées dans MongoDB grâce à Mongoose.
Les données peuvent être :
consultées dans MongoDB Compass ;
récupérées via les routes de l'API REST (/api/sensors).
DHT11
   │
   ▼
Arduino UNO
   │
   ▼
Port Série (USB)
   │
   ▼
serialReader.js
   │
   ▼
Mongoose
   │
   ▼
MongoDB
   │
   ├── MongoDB Compass
   │
   └── API REST (Express)