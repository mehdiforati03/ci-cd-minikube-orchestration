SET NAMES utf8;
SET character_set_client = utf8mb4;

CREATE DATABASE IF NOT EXISTS projet_web;
USE projet_web;

CREATE TABLE IF NOT EXISTS taches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  termine BOOLEAN DEFAULT false
);


INSERT INTO taches (titre, termine) VALUES ('Réussir mon projet Docker', true), ('Automatisation terminée', false);