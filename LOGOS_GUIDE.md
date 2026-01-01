# Guide des Logos de Marques

## 📍 Emplacement des Logos

Les logos des marques partenaires sont stockés dans le backend Laravel :

**Chemin backend:** `05-Electro-Back-end/storage/app/public/`

**Logos actuels disponibles:**
- `samsung.png`
- `sony.png`
- `LG.png`
- `msi.png`
- `icons8-samsung.svg`
- `icons8-msi.svg`
- `cmi.png`

## 🔧 Comment Ajouter un Nouveau Logo

### 1. Ajouter le fichier image
Placez votre nouveau logo dans :
```
05-Electro-Back-end/storage/app/public/nom-marque.png
```

### 2. Mettre à jour brands.json
Éditez le fichier :
```
Frond-end/test/src/data/brands.json
```

Ajoutez une nouvelle entrée :
```json
{
    "name": "Nom de la Marque",
    "logo": "nom-marque.png"
}
```

### 3. Vérifier le lien symbolique
Assurez-vous que le lien symbolique Laravel est créé :
```bash
cd 05-Electro-Back-end
php artisan storage:link
```

## 🌐 Comment les Chemins Fonctionnent

Le service `image.js` transforme automatiquement les chemins :

- **Chemin relatif** (`samsung.png`) → `http://localhost:8000/storage/samsung.png`
- **URL absolue** (`https://...`) → reste inchangée
- **Chemin avec /** (`/storage/logo.png`) → `http://localhost:8000/storage/logo.png`

## 📝 Formats Recommandés

- **PNG** : Pour les logos avec transparence
- **SVG** : Pour les logos vectoriels (meilleure qualité)
- **Taille recommandée** : Maximum 200x100px pour de meilleures performances

## 🔍 Dépannage

Si un logo ne s'affiche pas :

1. Vérifiez que le fichier existe dans `storage/app/public/`
2. Vérifiez le nom du fichier (sensible à la casse)
3. Vérifiez que le backend Laravel est en cours d'exécution
4. Ouvrez la console du navigateur (F12) pour voir les erreurs
5. Vérifiez l'URL générée dans l'inspecteur d'éléments

## 🎨 Marques Actuelles

### Logos Locaux (Backend)
- Samsung
- Sony
- LG
- MSI

### Logos Externes (CDN)
- Apple
- Xiaomi
- Dell
- HP
- Asus
- Lenovo
- PlayStation
- Xbox
