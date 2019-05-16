# Système Info Web - Examen Trader

## Pré-requires

- Node.js >= 10.15 [Téléchargement ici](https://nodejs.org/en/)

## Déploiement

### 1. Clonez le dépôt GIT.

    git clone <URL>

### 2. Rendez-vous dans le projet, puis initialisez-le

    npm i

### 3. Unlockez le fichier env.json.example

    mv env.json.example env.json

### 4. Modifiez les informations de connection à la base de données dans le fichier env.json

```json
{
    "mysql": {
        "host": "localhost",
        "port": 3306,
        "user": "root",
        "password": "root",
        "connectTimeout": 30000
    }
}
```

### 5. À la racine du projet, lancez le serveur

    npm start

Vous devriez voir un message du type :

    Server started and listening on 0.0.0.0:8000 ...

### 6. URL de la ressource

La ressource se trouve à cette url : `localhost:8000`

