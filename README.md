# Mission Préhistoire — Diane (6e)

Jeu éducatif mobile basé sur les 7 photographies du chapitre de Diane « La longue histoire de l'humanité et des migrations ».

## Fonctionnalités

- **La frise du temps** : 6 défis interactifs de remise en ordre chronologique.
- **Premiers humains** : 8 questions sur les hominidés et leurs périodes.
- **Sur les routes du monde** : 8 défis, dont des repérages sur une carte schématique des continents.
- **La vie au Paléolithique** : 8 questions sur les nomades, le feu, les outils et l'art.
- **L'enquête des archéologues** : 8 questions sur les définitions et le document A.
- **Le grand défi du contrôle** : 12 questions mélangeant toutes les compétences.
- **Révision ciblée** selon les notions manquées (plus souvent proposées).
- **Carnet de révision** avec repères du cahier, définitions et compétences du contrôle.
- **Parents** : code `2207`, bilan thématique, historique et effacement de la progression.

## Installer

Depuis le site HTTPS publié, sur iPhone : Safari → Partager → Sur l'écran d'accueil.
Sur Android : Chrome → menu ⋮ → Installer l'application.
Le service worker met en cache le jeu lors de la première connexion pour un usage ultérieur hors ligne.

## Protection des données

Aucune inscription, publicité ou collecte des résultats. Tout est stocké localement (`localStorage`, clé `missionPrehistoireDiane_v1`). La progression n'est pas synchronisée entre appareils.
Le PIN `2207` n'est **pas une sécurité forte**, puisqu'il est inclus dans le code JavaScript chargé sur le téléphone. Il s'agit uniquement d'un verrouillage d'interface.

## Précision historique

Les dates sont les repères **du cours fourni** et non une synthèse actualisée des travaux scientifiques ; plusieurs repères sont arrondis. On ne présente pas l'évolution humaine comme une progression linéaire. La carte est volontairement schématique et ne représente pas des itinéraires exacts.

## Déploiement

Application statique HTML/CSS/JS sans compilation ni dépendance externe. Déployer les fichiers à la racine d'un hébergement HTTPS (Vercel, GitHub Pages, etc.). `index.html` est la page d'accueil.
