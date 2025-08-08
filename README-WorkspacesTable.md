# WorkspacesTable - Interface React

Une interface React complète reproduisant le design d'un tableau de gestion de workspaces, compatible Next.js et TypeScript.

## Structure des composants

### Composants principaux

- **`WorkspacesTable.tsx`** - Composant principal du tableau
- **`FilterBar.tsx`** - Barre de filtres avec recherche et dropdowns
- **`TableHeader.tsx`** - En-tête du tableau avec tri
- **`TableRow.tsx`** - Ligne individuelle du tableau
- **`StatusBadge.tsx`** - Badge de statut coloré

### Données

- **`data/workspaces.ts`** - Données mock pour les workspaces
- **`types.ts`** - Types TypeScript pour l'interface

## Fonctionnalités

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
- ✅ Icônes Heroicons
- ✅ Responsive design

## Utilisation

```tsx
import WorkspacesTable from './components/WorkspacesTable';

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

## Données mock

Le composant utilise des données mock dans `data/workspaces.ts` avec :
- 11 workspaces d'exemple
- Logos d'entreprises (Loom, Lattice, Disney, etc.)
- Avatars d'utilisateurs
- Montants formatés en USD
- Dates au format "Month DD, YYYY"
- Statuts variés pour les badges

## Personnalisation

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

## Dépendances requises

- React 18+
- TypeScript
- Tailwind CSS
- Heroicons (@heroicons/react)

## Installation

```bash
npm install @heroicons/react
```

Assurez-vous que Tailwind CSS est configuré dans votre projet Next.js.
