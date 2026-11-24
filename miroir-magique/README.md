# Miroir Magique ✦ Symétrie axiale, 6e

Mini-application éducative PWA sans compte, publicités, serveur ou données collectées, conçue pour Diane (6e) d'après les cinq photos de son cours sur la symétrie axiale.

## Missions tactiles

- Le point miroir : placer le point A′ par glisser-déposer sur un diagramme interactif.
- La chasse aux invariants : reconnaître un point situé sur l'axe.
- Le pont symétrique : construire les deux extrémités d'un segment de même longueur.
- La planète miroir : déplacer le centre d'un cercle tout en conservant son rayon.
- Les droites jumelles : déplacer deux points pour obtenir l'image d'une droite.
- L'artiste des figures : déplacer trois sommets d'un triangle.
- Grand défi : mélange des six types de construction.

Les questions alternent entre axes horizontal, vertical et obliques, tous calculés géométriquement. Des guides perpendiculaires, des cibles et des explications aident après les erreurs. Toutes les interactions peuvent se faire par toucher, souris ou flèches du clavier sur un point sélectionné.

## Données et parents

Les progrès sont conservés via `localStorage` sur le téléphone utilisé, et ne sont pas synchronisés. L'espace parents possède un **code pédagogique local** `2207`, sans prétendre remplacer une protection de sécurité serveur.

## Utilisation / hébergement

Déployer le dossier entier sur un hébergement statique HTTPS (Vercel, Cloudflare Pages, GitHub Pages). Le service worker met en cache les ressources pour le fonctionnement hors connexion après le premier chargement réussi. Sur iPhone : Safari > Partager > Sur l'écran d'accueil. Sur Android : Chrome > menu > Installer l'application.

Aucune dépendance npm ni compilation nécessaire.
