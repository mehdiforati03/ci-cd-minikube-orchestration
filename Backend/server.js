const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- CONFIGURATION DE LA BDD ---
const dbConfig = {
    host: process.env.DB_HOST || "127.0.0.1",
    user: "root",
    password: process.env.DB_PASSWORD || "", 
    database: "projet_web"
};

let db;

// --- FONCTION DE CONNEXION AVEC BOUCLE DE RECONNEXION ---
function handleDisconnect() {
    db = mysql.createConnection(dbConfig); // On crée la connexion

    db.connect((err) => {
        if (err) {
            console.error("Erreur de connexion BDD (ECONNREFUSED) : Nouvelle tentative dans 5 secondes...", err.message);
            setTimeout(handleDisconnect, 5000); // On attend 5 secondes avant de réessayer
        } else {
            console.log("Connecté à la base 'projet_web' avec succès !");
        }
    });

    // Si la connexion est perdue alors que le serveur tourne déjà
    db.on('error', (err) => {
        console.error("Erreur BDD fatale :", err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); 
        } else {
            throw err;
        }
    });
}

// Lancement de la première tentative de connexion
handleDisconnect();

// --- 1. ROUTE GET (Récupérer la liste) ---
app.get('/taches', (req, res) => {
    const sql = "SELECT * FROM taches";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

// --- 2. ROUTE POST (Ajouter une tâche) ---
app.post('/taches', (req, res) => {
    const sql = "INSERT INTO taches (titre) VALUES (?)";
    const values = [req.body.titre];

    db.query(sql, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ id: data.insertId, titre: req.body.titre });
    });
});


app.delete('/taches/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM taches WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Supprimé avec succès" });
    });
});


app.listen(5000, () => {
    console.log("Serveur lancé sur le port 5000");
});