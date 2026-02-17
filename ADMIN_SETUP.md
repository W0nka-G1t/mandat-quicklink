# Guide de Configuration - Page Admin des Liens

## Création de l'utilisateur Admin

Pour créer l'utilisateur administrateur avec les identifiants demandés :
- **Username** : admin.Gro
- **Password** : ADMIN.click

Exécutez le script de seed à la racine du dossier `ql-api` :

```bash
cd ql-api
node seed-admin.js
```

Si l'utilisateur admin existe déjà, le script affichera un message confirmant cela.

## Accès à la page Admin

1. Connectez-vous avec les identifiants admin.Gro / ADMIN.click
2. Une fois connecté, vous verrez un lien "📊 Voir tous les liens" en haut à droite de la page
3. Cliquez sur ce lien pour voir tous les liens raccourcis créés
4. Les liens sont affichés **sans doublons** (groupés par URL original)

## Fonctionnalités de la page Admin

- ✅ Affichage de tous les liens raccourcis créés
- ✅ Suppression des doublons (un seul lien par URL original)
- ✅ Affichage du nombre de clics pour chaque lien
- ✅ Bouton de copie rapide pour les URLs raccatis
- ✅ Dates de création formatées en français
- ✅ Détection automatique du rôle utilisateur

## Sécurité

- L'accès est protégé par authentification JWT
- Seuls les utilisateurs avec le rôle "admin" peuvent accéder à cette page
- Le token est stocké en localStorage et vérifié à chaque requête

## Vérification

Pour vérifier que tout fonctionne :

1. Assurez-vous que le serveur est démarré sur le port 3000
2. Accédez à http://localhost:3000/
3. Cliquez sur "Se connecter"
4. Entrez : admin.Gro / ADMIN.click
5. Vous devriez voir le lien "📊 Voir tous les liens" en haut à droite
6. Cliquez dessus pour voir la page admin
