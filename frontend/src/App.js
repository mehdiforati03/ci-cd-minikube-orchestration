import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [taches, setTaches] = useState([]);
  const [nouvelleTache, setNouvelleTache] = useState("");

  // --- Chargement initial ---
  useEffect(() => {
    axios.get('http://localhost:5000/taches')
      .then(res => setTaches(res.data))
      .catch(err => console.log(err));
  }, []);

  // --- Fonction Ajouter ---
  const ajouterTache = () => {
    if (!nouvelleTache.trim()) return;

    axios.post('http://localhost:5000/taches', {
      titre: nouvelleTache 
    })
    .then(res => {
      setTaches([...taches, res.data]);
      setNouvelleTache(""); 
    })
    .catch(err => console.log(err));
  };

  // --- Fonction Supprimer (NOUVEAU) ---
  const supprimerTache = (id) => {
    // 1. On demande au backend de supprimer dans la base de données
    axios.delete(`http://localhost:5000/taches/${id}`)
      .then(() => {
        // 2. Si c'est bon, on met à jour l'affichage en filtrant la liste
        setTaches(taches.filter(tache => tache.id !== id));
      })
      .catch(err => console.log("Erreur lors de la suppression :", err));
  };

  return (
    <div className="App">
      <h1>Ma Todo List Web </h1>
      <p>Version automatisée avec GitLab CI </p>

      {/* Formulaire d'ajout */}
      <div className="form-container">
        <input
          type="text"
          placeholder="Ajouter une tâche..."
          value={nouvelleTache}
          onChange={e => setNouvelleTache(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && ajouterTache()}
        />
        <button onClick={ajouterTache}>Ajouter</button>
      </div>

      {/* Liste des tâches */}
      <ul>
        {taches.map((tache) => (
          <li key={tache.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Texte de la tâche */}
            <span>{tache.titre}</span>
            
            {/* Bouton de suppression (Croix rouge) */}
            <button 
              onClick={() => supprimerTache(tache.id)}
              style={{
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "50%", // Bouton rond
                width: "30px",
                height: "30px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "10px",
                fontWeight: "bold"
              }}
              title="Supprimer cette tâche"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;