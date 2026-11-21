# Mission Multipli 🚀

Une application web installable (PWA) en français pour entraîner les tables de multiplication de 2 à 12, pensée pour Diane, 11 ans, en 6e.

## Pourquoi ce jeu
- 3 mini-jeux : Chasse aux étoiles (QCM), Code secret (saisie) et Cartes mémoire (rappel).
- Missions courtes de 10 questions, sans chronomètre et sans pénalité humiliante.
- Aides visuelles, décomposition des calculs, second essai encouragé.
- Les calculs difficiles reviennent plus fréquemment : entraînement adaptatif.
- Étoiles, historique et tableau de bord parent.
- Une session de 5 à 8 minutes par jour est conseillée.

## Installer sur un téléphone

1. Déployer **tous les fichiers de ce dossier à la racine d'un site HTTPS** : Vercel, Cloudflare Pages, Netlify ou autre.
2. **iPhone :** ouvrir l'URL sur Safari, toucher **Partager** puis **Sur l'écran d'accueil** → **Ajouter**.
3. **Android :** ouvrir l'URL dans Chrome, menu **⋮** → **Installer l'application** (ou **Ajouter à l'écran d'accueil**).
4. Après la première visite en ligne et la mise en cache, l'application peut fonctionner hors connexion.

> Ne pas lancer la PWA directement comme fichier `file://` pour l'installation et le service worker : il faut du HTTPS (ou `localhost` pour les tests).

## Tester en local

```bash
python -m http.server 8000
# Ouvrir http://localhost:8000
```

Aucune compilation et aucune dépendance : HTML, CSS, JavaScript et icônes statiques.

## Données et confidentialité

- Aucun compte et aucun service tiers ; aucune donnée envoyée à un serveur.
- Statistiques conservées localement dans le navigateur via `localStorage` (clé `missionMultipli_v1`).
- Supprimer les données du navigateur, réinstaller ou changer de téléphone peut faire perdre les résultats.
- Les parents peuvent effacer les progrès dans le tableau de bord.

## Structure

- `index.html` : application et trois jeux.
- `manifest.webmanifest` : déclaration d'installation PWA.
- `sw.js` : cache pour jouer hors connexion.
- `icon*.png`, `icon.svg`, `apple-touch-icon.png` : icônes Android et iOS.

Projet indépendant des applications de tennis, sans code ni identifiants partagés.