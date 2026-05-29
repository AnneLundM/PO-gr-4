# Hvad er lavet — Gruppe 4 (PO)

## Projekt: Gowala Farms hjemmeside

---

## Mappestruktur i PO-gr-4

```
PO-gr-4/
├── Commit-regler.md
├── DONE.md
├── eslint.config.js
├── GithubIssues.md
├── index.html
├── package.json
├── package-lock.json
├── ProductGoal+Backlog.md
├── README.md
├── Scrum-team.md
├── vite.config.js
├── Værdisæt.md
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── router.jsx
    ├── assets/
    │   ├── backgrounds/
    │   │   ├── background.jpg
    │   │   ├── blob_01.jpg
    │   │   ├── blob_02.jpg
    │   │   ├── footer_bg.jpg
    │   │   ├── logo.png
    │   │   └── page_header_01.jpg
    │   ├── cards/
    │   │   ├── 01.png
    │   │   ├── 02.png
    │   │   └── 03.png
    │   ├── headerslider/
    │   │   ├── 01.jpg
    │   │   ├── 02.jpg
    │   │   ├── 03.jpg
    │   │   └── 04.jpg
    │   ├── products/
    │   │   ├── beaf.jpg
    │   │   ├── brie.jpg
    │   │   ├── butter.jpg
    │   │   ├── cream.jpg
    │   │   ├── gouda.jpg
    │   │   ├── gullash.jpg
    │   │   ├── icecream.jpg
    │   │   ├── meat.jpg
    │   │   ├── milk.jpg
    │   │   ├── milk_products.jpg
    │   │   ├── mozzarella.jpg
    │   │   ├── no-product.jpg
    │   │   ├── parmasan.jpg
    │   │   ├── pork.jpg
    │   │   └── pork1.jpg
    │   └── sponsors/
    │       ├── 01.png
    │       ├── 02.png
    │       ├── 03.png
    │       ├── 04.png
    │       └── 05.png
    ├── components/
    │   ├── hero/
    │   │   ├── hero.css
    │   │   └── hero.jsx          ← tom, ikke implementeret
    │   └── productList/
    │       ├── ProductList.jsx   ← placeholder
    │       └── productList.module.css
    └── pages/
        ├── Home.jsx
        └── Products.jsx          ← placeholder
```

---

## Kodebase (React + Vite)

### Opsætning
- Vite + React projekt initialiseret
- ESLint konfigureret (`eslint.config.js`) med react-hooks og react-refresh plugins
- `index.html` med root-element og favicon

### Routing
- React Router v7 konfigureret i `src/router.jsx`
- Ruter: `/` → `Home`, `/products` → `Products`
- `App.jsx` med `<Outlet />` som layout-wrapper

### Sider
| Side | Status |
|------|--------|
| `Home.jsx` | Oprettet — importerer `ProductList` og `hero` |
| `Products.jsx` | Oprettet — placeholder `<h1>Products</h1>` |

### Komponenter
| Komponent | Status |
|-----------|--------|
| `hero/hero.jsx` | Oprettet — tom (ikke implementeret endnu) |
| `hero/hero.css` | Oprettet |
| `productList/ProductList.jsx` | Oprettet — placeholder `<h1>ProductList</h1>` |
| `productList/productList.module.css` | Oprettet |

### Assets
Alle billedfiler er tilføjet under `src/assets/`:
- `backgrounds/` — 6 filer (baggrunde, logo, header)
- `cards/` — 3 filer
- `headerslider/` — 4 filer
- `products/` — 15 filer (produktbilleder til API-data)
- `sponsors/` — 5 filer

---

## Produktbacklog — status (MoSCoW)

### Must have
- [ ] Hero-section på forsiden (slider)
- [ ] Produkt-liste på forsiden med data fra API
- [ ] Responsivt layout
- [ ] Tilmelding til nyhedsbrev
- [ ] Footer

### Should have
- [ ] Produktside
- [ ] Navigation
- [ ] Filtrering af produkter
- [ ] Loading-state
- [ ] Error-state
- [ ] Kontaktformular
- [ ] Læg i kurv-funktionalitet

### Could have
- [ ] Animationer
- [ ] Dark/light mode
- [ ] Kurv-side
- [ ] Services-side
- [ ] Om-side

---

## Dokumentation / Scrum-filer

| Fil | Indhold |
|-----|---------|
| `README.md` | Projektoverblik, links til Figma og API, indholdsfortegnelse |
| `ProductGoal+Backlog.md` | Product Goal og prioriteret Product Backlog (MoSCoW) |
| `Scrum-team.md` | Rollefordeling: PO (underviser), SM (Tim), Developers (Jonas, Hassan, Mathias) |
| `Værdisæt.md` | Fælles Scrum-værdier: Engagement, Fokus, Åbenhed, Respekt, Mod |
| `Commit-regler.md` | Git commit-regler: engelsk, bydeform, atomic commits, issue-referencer |
| `GithubIssues.md` | Guide til GitHub Issues (labels, milestones, sub-issues m.m.) |

---

## Padlet-handoff (Scrum + Git commits)

Filen `scrum-git-commits-handoff-udvidet.md` indeholder forbedrede svar til Padlet-opgaverne.

### Scrum-svar (9 spørgsmål)
1. Hvad er Scrum, og hvorfor kaldes det et framework?
2. De tre Scrum-søjler: gennemsigtighed, inspektion og tilpasning
3. De fem Scrum-værdier
4. De tre ansvar i et Scrum Team (Product Owner, Scrum Master, Developers)
5. Product Ownerens vigtigste opgaver
6. Scrum Masterens vigtigste opgaver
7. Formålet med et Sprint
8. Forskellen på Product Backlog og Sprint Backlog
9. Hvad er et Increment, og hvornår er noget færdigt (Definition of Done)

### Git commit-svar (5 spørgsmål)
1. Hvorfor er et godt commit mere end et gemmepunkt?
2. Hvad betyder atomic commit?
3. Hvorfor er "Update" og "Rettelser" dårlige commit-beskeder?
4. Hvordan kobler man et commit til et GitHub Issue?
5. Hvad tjekker man med `git status` og `git diff` før commit?

### Ekstra (Del 6)
- Brug "ansvar" frem for "roller" (Scrum Guide 2020)
- Dansk grammatik: "Product Ownerens" og "Scrum Masterens"
- Scrum-events oversigt (Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective)
- Definition of Done forklaret
- `Closes #nr` / `Fixes #nr` til automatisk issue-lukning

---

## Rettelser til Padlet (vigtigste)
- `Project Owner` → **Product Owner**
- `Produce Owner` → **Product Owner**
- `Develeper` → **Developers**
- `scrum master` → **Scrum Master**
- `product backlog` → **Product Backlog**
- `Definition of done` → **Definition of Done**
