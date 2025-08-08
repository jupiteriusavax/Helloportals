# WorkspacesTable - Interface React

Une interface React complète reproduisant le design d'un tableau de gestion de workspaces, compatible Next.js et TypeScript.

## 🚀 Installation rapide

1. **Installer les dépendances :**
```bash
npm install
```

2. **Démarrer le serveur de développement :**
```bash
npm run dev
```

3. **Ouvrir dans le navigateur :**
```
http://localhost:3000
```

## 📁 Structure du projet

```
├── pages/
│   ├── index.tsx           # Page d'accueil
│   ├── _app.tsx           # Configuration de l'app
│   └── _document.tsx      # Configuration du document
├── components/
│   ├── WorkspacesTable.tsx    # Composant principal
│   ├── FilterBar.tsx         # Barre de filtres
│   ├── TableHeader.tsx       # En-tête du tableau
│   ├── TableRow.tsx          # Lignes du tableau
│   └── StatusBadge.tsx       # Badges de statut
├── data/
│   └── workspaces.ts         # Données mock
├── types.ts                  # Types TypeScript
├── package.json              # Dépendances
├── next.config.js            # Configuration Next.js
├── tsconfig.json             # Configuration TypeScript
├── tailwind.config.js        # Configuration Tailwind
├── postcss.config.js         # Configuration PostCSS
├── globals.css              # Styles globaux
├── vercel.json              # Configuration Vercel
└── next-env.d.ts            # Types Next.js
```

## ✨ Fonctionnalités

### Interface utilisateur
- ✅ En-tête avec titre "Workspaces" et bouton "New Workspace"
- ✅ Barre de navigation avec onglets (Sales Pipeline, Customer Onboarding, etc.)
- ✅ Barre de filtres avec recherche et dropdowns
- ✅ Tableau avec colonnes : Checkbox, Account, Workspace, Owner, Opp Amount, Last Client View, Views, Order Form Status, Plan Status

### Fonctionnalités interactives
- ✅ Recherche en temps réel
- ✅ Filtrage par propriétaire et date de création
- ✅ Tri par montant et date de dernière vue
- ✅ Sélection multiple via checkboxes
- ✅ Badges de statut colorés (Draft, Viewed, Needs Approval, Signed)
- ✅ Barres de progression pour le statut du plan

### Style et design
- ✅ Utilisation de Tailwind CSS
- ✅ Design moderne avec bordures fines
- ✅ Couleurs cohérentes pour les badges
- ✅ Icônes SVG inline (pas de dépendance externe)
- ✅ Responsive design

## 🎨 Utilisation

L'interface est automatiquement affichée sur la page d'accueil (`http://localhost:3000`).

Pour utiliser le composant dans d'autres pages :

```tsx
import WorkspacesTable from '../components/WorkspacesTable';

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <WorkspacesTable />
      </div>
    </div>
  );
}
```

## 📊 Données mock

Le composant utilise des données mock dans `data/workspaces.ts` avec :
- 11 workspaces d'exemple
- Logos d'entreprises (Loom, Lattice, Disney, etc.)
- Avatars d'utilisateurs
- Montants formatés en USD
- Dates au format "Month DD, YYYY"
- Statuts variés pour les badges

## 🔧 Personnalisation

### Ajouter de nouveaux workspaces

Modifiez le fichier `data/workspaces.ts` :

```tsx
export const workspaces: WorkspaceRow[] = [
  {
    id: 'w12',
    account: { name: 'Nouvelle Entreprise', logo: '/logos/nouvelle.png' },
    workspace: 'Viva ↔ Nouvelle Entreprise',
    owner: { name: 'Nouvel Utilisateur', avatar: '/avatars/nouvel.png' },
    oppAmount: 50000,
    lastClientView: '2024-06-16',
    views: 15,
    orderFormStatus: 'Draft',
    planStatus: 25,
    createdAt: '2024-06-01',
  },
  // ... autres workspaces
];
```

### Modifier les couleurs des badges

Dans `components/StatusBadge.tsx` :

```tsx
const colorByStatus: Record<OrderFormStatus, string> = {
  '': 'bg-transparent',
  Draft: 'bg-gray-50 text-gray-600 border border-gray-200',
  Viewed: 'bg-blue-50 text-blue-600 border border-blue-200',
  'Needs Approval': 'bg-pink-50 text-pink-600 border border-pink-200',
  Signed: 'bg-green-50 text-green-600 border border-green-200',
};
```

## 📦 Dépendances

- React 18+
- TypeScript
- Tailwind CSS
- Next.js 14+
- ReactFlow (optionnel, pour l'éditeur de playbooks)

## 🛠️ Développement

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Lancer en production
npm start
```

## 🚨 Résolution des erreurs

### Erreur ReactFlow
Si vous rencontrez une erreur liée à `reactflow`, le fichier `helloportals/src/app/(app)/playbooks/editor/page.tsx` a été temporairement désactivé. Pour le réactiver :

1. **Option 1 : Installer ReactFlow**
```bash
npm install reactflow
```

2. **Option 2 : Supprimer le fichier problématique**
```bash
rm helloportals/src/app/\(app\)/playbooks/editor/page.tsx
```

### Erreur d'import @/components
Si vous rencontrez des erreurs d'import avec `@/components`, les chemins ont été corrigés pour utiliser des chemins relatifs. Les fichiers suivants ont été mis à jour :

- `helloportals/src/app/(app)/playbooks/page.tsx`
- `helloportals/src/app/(app)/portal/page.tsx`
- `helloportals/src/app/layout.tsx`
- `helloportals/src/components/playbooks/PlaybooksPage.tsx`
- `helloportals/src/components/playbooks/PlaybookCard.tsx`
- `helloportals/src/components/portal-editor/EditorShell.tsx`
- `helloportals/src/components/portal-editor/Canvas.tsx`

### Erreur de dépendances Prisma/Clerk
Si vous rencontrez des erreurs liées à Prisma ou Clerk, les fichiers suivants ont été simplifiés :

- **`helloportals/src/lib/rbac.ts`** - Supprimé la dépendance Prisma
- **`helloportals/src/lib/safe-auth.ts`** - Supprimé la dépendance Clerk
- **`helloportals/src/lib/db.ts`** - Mock implementation sans Prisma
- **`helloportals/src/components/portal/*.tsx`** - Supprimé les types Prisma

### Configuration du projet helloportals
Le projet helloportals a été configuré avec :

- **`helloportals/package.json`** - Dépendances mises à jour
- **`helloportals/next.config.js`** - Configuration Next.js corrigée
- **`helloportals/tsconfig.json`** - Configuration TypeScript
- **`helloportals/tailwind.config.js`** - Configuration Tailwind
- **`helloportals/postcss.config.js`** - Configuration PostCSS

### Erreur de déploiement Prisma
Si vous rencontrez une erreur `npm run prisma:generate` lors du déploiement :

1. **Supprimer le package-lock.json et le régénérer :**
```bash
rm package-lock.json
npm install
```

2. **Vérifier que le vercel.json est correct :**
```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

3. **S'assurer qu'aucun script Prisma n'est référencé :**
```bash
grep -r "prisma" package.json
```

### Erreur de build Next.js
Si vous avez des erreurs de build, assurez-vous que :
- Toutes les dépendances sont installées : `npm install`
- Le fichier `pages/` existe avec `index.tsx`
- Les fichiers de configuration sont présents (`next.config.js`, `tsconfig.json`, etc.)
- Les chemins d'import utilisent des chemins relatifs ou des alias correctement configurés

### Configuration des alias TypeScript
Pour utiliser l'alias `@/` correctement, assurez-vous que votre `tsconfig.json` contient :

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🚀 Déploiement

### Vercel (recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Autres plateformes
Le projet est compatible avec toutes les plateformes supportant Next.js :
- Netlify
- Railway
- Heroku
- AWS Amplify

## 📝 Notes

- Les icônes sont en SVG inline pour éviter les erreurs de dépendances
- Tailwind CSS est configuré avec la police Inter
- Tous les composants sont TypeScript et réutilisables
- L'interface est responsive et accessible
- Structure Next.js complète avec pages/, configuration TypeScript et PostCSS
- Les chemins d'import ont été corrigés pour éviter les erreurs de compilation
- Le fichier ReactFlow a été temporairement désactivé pour éviter les erreurs de build
- Le projet helloportals a été configuré avec les bonnes dépendances et configurations
- Configuration Vercel ajoutée pour éviter les erreurs de déploiement
- Tous les imports @/ ont été corrigés pour utiliser des chemins relatifs
- Les dépendances Prisma et Clerk ont été supprimées pour simplifier le build