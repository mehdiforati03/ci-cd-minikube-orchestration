#  DevSecOps Orchestration : Todo List (React, Node.js, MySQL) sur Minikube

Ce projet consiste en une application de gestion de tâches (**Todo List**) architecturée en micro-services. Il démontre la mise en place d'une infrastructure complète conteneurisée avec **Docker** et orchestrée via **Minikube**, avec un pipeline **CI/CD** sécurisé automatisé via **GitLab Runner**.

##  Les techniques
* **Frontend** : React.js (Interface utilisateur)
* **Backend** : Node.js (API REST)
* **Base de données** : MySQL (Persistance des données)
* **Orchestration** : Minikube
* **Sécurité & Qualité** : Trivy (Scan de vulnérabilités images & manifests)
* **CI/CD** : GitLab Runner (Pipeline multi-étapes)

##  Architecture du Projet
Le dépôt est organisé de manière professionnelle pour séparer les responsabilités :
* `/frontend` : Application client React.
* `/Backend` : Serveur API Node.js.
* `/k8s` : Manifestes Kubernetes pour l'orchestration.
* `.gitlab-ci.yml` : Configuration du pipeline DevSecOps.
* `init.sql` : Script d'initialisation MySQL.

##  Pipeline CI/CD & Sécurité
Le pipeline automatise le cycle de vie du projet en 5 étapes majeures :
1. **Build** : Construction des images Docker pour chaque micro-service.
2. **Test** : Validation fonctionnelle via des tests unitaires.
3. **Quality & Security (Shift-Left)** : Analyse de la propreté du code et **scan de sécurité avec Trivy** pour détecter les CVE (vulnérabilités) dans les images Docker.
4. **Deployment** : Déploiement automatisé sur le cluster Minikube via `kubectl apply`.
5. **Verify (Shift-Right)** : Vérification de l'état de santé des pods et services en environnement de runtime pour garantir la disponibilité réelle.

###  Compétences
Ce projet m'a permis de maîtriser :
 * **DevSecOps** : Intégration native de la sécurité (Trivy) dès la phase de contrôle qualité.
 * **Infrastructure as Code** : Gestion sécurisée des déploiements Minikube.
 * **Automatisation** : Réduction de la surface d'attaque par l'automatisation des tests et des vérifications.
