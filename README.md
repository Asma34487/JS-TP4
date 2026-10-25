# TP4 - Gestion des commandes

Application JavaScript qui charge trois fichiers JSON lies (clients, produits, commandes) et affiche les commandes avec filtres, indicateurs et detail.

## Structure

- `index.html`, `css/style.css`
- `data/` : customers.json, products.json, orders.json
- `js/` : state.js, dataService.js, selectors.js, view.js, app.js

## Fonctionnalites

- Chargement avec fetch / async / await / try / catch
- Relations par identifiants (customerId, productId)
- Calcul des montants (ligne et total)
- Indicateurs, recherche par client, filtres statut et categorie
- Detail d'une commande dans un modal
- Message d'erreur si un fichier ne se charge pas
