# Géo Explorateur — L'aventure d'Eliott 🧭

Application éducative mobile (PWA), autonome et sans compte, basée sur la leçon de géographie manuscrite d'Eliott : **GE01 – Les outils pour questionner l'espace : comment se repérer dans l'espace ?**

## Mini-jeux

- **Le bon outil** : choisir entre plan, carte et planisphère, et les classer du plus petit au plus grand.
- **Boussole magique** : identifier nord, sud, est, ouest.
- **Décodeur de carte** : titre, orientation, légende, échelle.
- **Grande exploration** : questions mélangées, y compris les six continents de la leçon.
- **Relire ma leçon** : fiches de rappel exactes d'après la copie.

Chaque partie se déroule en 8 questions (ou 12 pour la grande exploration), sans chronomètre. Après une première erreur, l'enfant peut réessayer. Le tableau Parents affiche les acquis par thème. PIN local : celui défini par le parent, dans `app.js` (protection légère côté client).

## Installer sur téléphone

Une fois le site déployé sur HTTPS :
- iPhone/iPad : Safari → Partager → Sur l'écran d'accueil → Ajouter.
- Android : Chrome → menu ⋮ → Installer l'application ou Ajouter à l'écran d'accueil.

Après la première visite, l'application et les illustrations sont conservées en cache pour fonctionner hors connexion. La progression est sauvegardée dans `localStorage` du même appareil/navigateur ; elle ne se synchronise pas entre appareils et sera perdue si les données du site sont effacées.

## Publication

Site statique sans dépendances et sans construction : `index.html`, `style.css`, `app.js`, manifest, icônes et service worker. Déploiement sur Vercel, GitHub Pages, Cloudflare Pages ou tout hébergeur HTTPS.

## Confidentialité

Pas de compte utilisateur, aucune API, aucune publicité, aucune donnée personnelle envoyée à un serveur. Le code parent est uniquement un verrouillage d'interface et **ne constitue pas une authentification sécurisée**.
