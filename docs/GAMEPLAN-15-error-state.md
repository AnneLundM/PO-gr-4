# Gameplan — Issue #15 Error-state

**Branch:** `15-error-state`  
**Status:** Nothing has been changed yet. This is a plan only.

---

## Step 0 — Sync branch before touching any code

Before Copilot (or any team member) writes a single line, run this in the terminal:

```sh
git switch 15-error-state
git pull origin 15-error-state
git fetch origin
git merge origin/main
npm install
npm run lint
npm run build
```

Then fix from the **current actual code**, not an outdated snapshot. If `npm run lint` exits with code 1 before our changes, that confirms the existing bugs in Part 1 are real.

---

## Part 1 — Existing bugs and lint errors (must be fixed before anything new is added)

These errors exist on the current branch **right now** and are not caused by our work.
Running `npm run lint` currently exits with code 1 (build will also warn/fail).

---

### Bug 1 · `src/components/productList/ProductList.jsx` — `fetch` never checks if the server returned an error

**File:** `src/components/productList/ProductList.jsx`  
**Lines:** ~17–29

**Current code:**
```js
const res = await fetch("https://gowala-t3pes.ondigitalocean.app/products");
const resJSON = await res.json()
const data = resJSON.data
setProducts(data.slice(0, 4))
```

**Why it's a problem:**  
`fetch` only throws if there is a *network* failure (no internet, DNS error, etc.).  
If the server returns HTTP 500, 404, 503, etc., `fetch` does **not** throw — it just returns a Response object with `res.ok === false`.  
The code above tries to parse and use that broken response as if it were valid, which will either crash silently or show nothing to the user.

**Fix:** Check `res.ok` right after `fetch` and throw a readable error:
```js
if (!res.ok) {
    throw new Error("API'et svarede ikke korrekt.");
}
```

Also: the current code does `resJSON.data` but doesn't guard against the API changing shape.  
Add `const data = resJSON.data ?? resJSON` (handles both shapes) and `if (!Array.isArray(data)) throw new Error(...)` to be safe.

---

### Bug 2 · `src/components/productList/ProductList.jsx` — `error` state is set but never shown to the user

**Current code:**
```js
const [error, setError] = useState(null);
// ...in catch:
setError(error)
// ...but there is no: if (error) return <something />
```

**Why it's a problem:**  
The error state exists and is set correctly in the catch block, but nothing renders when it has a value. The user sees a blank/broken page with zero feedback.

**Fix:** Add a render guard before the main `return`:
```jsx
if (error) {
    return <ErrorState ... onRetry={handleRetry} />;
}
```

---

### Lint Error 1 · `src/components/productList/ProductList.jsx` — `let active = true` (unused variable)

**Line 7:**
```js
let active = true
```

**Why it's a problem:**  
This variable is declared and assigned but never read or used anywhere in the component. ESLint flags it as `no-unused-vars` (error, not warning — build fails).

**Fix:** Delete the line entirely.

---

### Lint Error 2 · `src/components/productList/ProductList.jsx` — `fetchProducts` defined outside `useEffect` and called inside it

**Current code:**
```js
async function fetchProducts() {
    // calls setLoading, setError, setProducts
}
useEffect(() => {
    fetchProducts()   // ← lint error here
}, [])
```

**Why it's a problem:**  
`eslint-plugin-react-hooks` v5 (which this project uses) flags this as `react-hooks/set-state-in-effect`. The rule says: don't call a state-setting function synchronously inside an effect that was defined *outside* the effect — it can cause cascading renders and is hard to reason about.

**Fix:** Move `fetchProducts` **inside** the `useEffect` body. To allow a retry button to re-trigger the effect, use a `retryCount` state as the dependency:

```js
const [retryCount, setRetryCount] = useState(0);
function handleRetry() { setRetryCount(c => c + 1); }

useEffect(() => {
    async function fetchProducts() { /* ... */ }
    fetchProducts();
}, [retryCount])   // re-runs every time retry is clicked
```

---

### Lint Warning · `src/components/productList/ProductList.jsx` — `carousel` missing from `useEffect` deps

**Current code:**
```js
function carousel() {
    setCarouselIndex((carouselIndex) => (carouselIndex + 1) % products.length)
}
useEffect(() => {
    const interval = setInterval(() => { carousel() }, 2500);
    return () => clearInterval(interval)
}, [products])   // ← carousel is missing here
```

**Why it's a problem:**  
`carousel` is used inside the effect but not listed as a dependency. ESLint warns (`react-hooks/exhaustive-deps`). If you add `carousel` to the deps array, it will re-create the interval on every render because `carousel` is a new function reference every render.

**Fix:** Remove the separate `carousel` function and inline the logic directly inside `setInterval`:
```js
useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
        setCarouselIndex(i => (i + 1) % products.length);
    }, 2500);
    return () => clearInterval(interval);
}, [products])
```

---

### Lint Error 3 · `src/components/button/Button.jsx` — unused `styles` import

**Line 1:**
```js
import styles from "./button.module.css"
```

**Why it's a problem:**  
The `Button` component doesn't use any CSS module class names — the button gets its styles from the global `button {}` rule in the CSS file. The import is dead code and ESLint flags it as `no-unused-vars`.

**Fix:** Delete the import line.  
The CSS file itself does not need to change — the global selector `button { ... }` still works without the import.

---

### Lint Error 4 · `src/main.jsx` — unused `App` import

**Line 4:**
```js
import App from './App.jsx'
```

**Why it's a problem:**  
`App` is imported but the file uses `<RouterProvider router={router} />` — not `<App />`. `App` is used *inside* the router (as the shell layout), but `main.jsx` doesn't render it directly. ESLint flags it as `no-unused-vars`.

**Fix:** Delete the import from `main.jsx`.  
`App` remains the shell component used by `router.jsx` and does not need to change.

---

### Minor: carousel dots are hardcoded to exactly 4

**Current code:**
```jsx
<div className={`${styles.dot} ${carouselIndex === 0 && styles.active}`}></div>
<div className={`${styles.dot} ${carouselIndex === 1 && styles.active}`}></div>
<div className={`${styles.dot} ${carouselIndex === 2 && styles.active}`}></div>
<div className={`${styles.dot} ${carouselIndex === 3 && styles.active}`}></div>
```

**Why it's a problem:**  
If the API ever returns fewer than 4 products (or the slice count changes), some dots show for products that don't exist. It's also fragile to maintain manually.

**Fix:** Generate dots from the actual data:
```jsx
{products.map((_, index) => (
    <div
        key={index}
        className={`${styles.dot} ${carouselIndex === index ? styles.active : ""}`}
    ></div>
))}
```

---

## Part 2 — What to build for issue #15

### New file: `src/components/errorState/ErrorState.jsx`

A single reusable component. Takes these props:

| Prop | Type | Default | What it does |
|---|---|---|---|
| `title` | string | `"Noget gik galt"` | Headline shown to the user |
| `message` | string | `"Vi kunne ikke hente data..."` | Descriptive sentence |
| `actionText` | string | `"Prøv igen"` | Text on the retry button |
| `onRetry` | function | — | Called when retry is clicked. Button hidden if not passed |
| `variant` | `"error"` \| `"empty"` \| `"notFound"` | `"error"` | Controls visual tone — `error` is red/alarming, `empty` is neutral/calm, `notFound` is neutral |
| `cooldown` | number | `0` | Seconds the button is disabled after each click. Default `0` (no cooldown). Pass `10` for stricter protection |
| `maxRetries` | number | `null` | After this many attempts the button is hidden. Default `null` (unlimited). Pass `5` for stricter protection |

Accessibility: `role="alert"` + `aria-live="polite"` so screen readers announce the error automatically without needing focus.

Developer logging: always `console.error` the real error before showing the friendly message to the user — keeps debugging possible during demo/presentation:
```js
console.error("Fetch failed:", err);
setError(err);
```

Visual style: matches Newsletter and Footer — `#f7faf7` background, `#b5d6b3` border, `#6db33f` green accent, `#222` dark text. No new packages needed.

---

### New file: `src/components/errorState/errorState.module.css`

CSS Module with these class names:
- `.errorState` — the outer card/section
- `.errorIcon` — green circle with `!`
- `.content` — flex column for title + message + button
- `.title` — green headline
- `.message` — dark body text
- `.retryButton` — green button matching existing button style
- `.retryButton:disabled` — muted/greyed out style while on cooldown
- `.cooldownText` — small text showing "Prøv igen om X sek..." during cooldown

---

### Changes to `src/components/productList/ProductList.jsx`

1. Remove `import { CurrencyBitcoin }` (already unused, different from `styles`)
2. Add `import ErrorState from "../errorState/ErrorState"`
3. Apply all the fixes from Part 1 above
4. Add the `if (error) return <ErrorState ... />` block

---

### Changes to `src/pages/Products.jsx`

`Products.jsx` is still a placeholder. **Do not build the full products page** — that is issue #12.

Add a comment block showing where and how to wire in `ErrorState` when #12 is picked up:
```jsx
// TODO (#15 / #12): when this page fetches from the API, use ErrorState like this:
// import ErrorState from "../components/errorState/ErrorState";
// if (error) return <ErrorState title="..." message="..." actionText="Prøv igen" onRetry={fetchProducts} />;
```

---

## Part 2b — Spam / crash protection on the retry button

### Why this matters

If the API is down or slow, a user (or a bot) can hammer the retry button and fire hundreds of requests per second. This can:
- Overload the DigitalOcean API server
- Create a self-inflicted denial-of-service
- Cost the team money if the API has usage-based billing
- Make the UI feel broken (rapid re-renders, flickering)

### Solution — two layers of protection built into `ErrorState` itself

#### Layer 1: Cooldown timer (default 10 seconds)

After the retry button is clicked:
1. The button is immediately disabled and turns grey
2. A countdown text shows: `"Prøv igen om 9 sek..."`
3. After the cooldown the button re-enables

This is done entirely inside `ErrorState` using `useState` + `useEffect` — the parent component (`ProductList`, etc.) does **not** need to care about this.

```jsx
// Inside ErrorState:
const [secondsLeft, setSecondsLeft] = useState(0);

function handleClick() {
    onRetry();                  // call the parent's fetch
    setSecondsLeft(cooldown);   // start cooldown (default 10s)
}

useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
}, [secondsLeft]);

// Button JSX:
<button
    className={styles.retryButton}
    onClick={handleClick}
    disabled={secondsLeft > 0}
>
    {secondsLeft > 0 ? `Prøv igen om ${secondsLeft} sek...` : actionText}
</button>
```

#### Layer 2: Max retry limit (default 5 attempts)

After `maxRetries` clicks the button disappears entirely and a message is shown:
> "Vi kan stadig ikke hente data. Kontakt os hvis problemet fortsætter."

This prevents endless retrying when the server is clearly down for an extended period.

```jsx
const [retryAttempts, setRetryAttempts] = useState(0);

function handleClick() {
    if (retryAttempts >= maxRetries) return;
    onRetry();
    setRetryAttempts(a => a + 1);
    setSecondsLeft(cooldown);
}
```

### What this does NOT do

- It does **not** rate-limit the API server itself — that must be done server-side
- It does **not** add exponential backoff (10s flat cooldown is enough for a school project)
- It does **not** throttle the initial page load fetch — only the manual retry button

---

## Part 2c — Shared API utility: `src/utils/api.js`

### Why this matters

The fetch pattern (AbortController + `res.ok` check + offline detection + timeout) will be copy-pasted into every future API component (#12, #20, etc.).
Instead of repeating 15 lines in each file, extract it once into a shared helper. Every future issue then calls one line.

### New file: `src/utils/api.js`

```js
const API_BASE_URL = "https://gowala-t3pes.ondigitalocean.app";

export async function fetchJson(path, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            ...options,
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error("API'et svarede ikke korrekt.");
        }

        return await response.json();
    } catch (err) {
        if (err.name === "AbortError") {
            throw new Error("Serveren svarer ikke. Prøv igen om lidt.");
        }
        if (!navigator.onLine) {
            throw new Error("Du ser ud til at være offline. Tjek din internetforbindelse.");
        }
        throw err;
    } finally {
        clearTimeout(timeout);
    }
}
```

### How ProductList uses it

Instead of the raw `fetch(...)` call:
```js
import { fetchJson } from "../../utils/api";

// Inside fetchProducts:
const resJSON = await fetchJson("/products");
const data = resJSON.data ?? resJSON;
```

This also removes the need to inline AbortController and offline detection separately in `ProductList.jsx`.

### How every future API component uses it

```js
const resJSON = await fetchJson("/products");   // #12, #20, etc.
```

Error handling, timeout, and offline detection are all in one place.

---

## Part 3 — How ErrorState fits into future issues

This section shows every planned issue that will call the API, so the team knows where to drop in `<ErrorState />` when those branches are created.

### Issues that WILL need ErrorState

| Issue | Page/Component | When to add ErrorState |
|---|---|---|
| **#12 Produktside** | `src/pages/Products.jsx` | When the full `/products` fetch is added — use same pattern as ProductList |
| **#13 Filtrering af produkter** | `src/pages/Products.jsx` | Filtering runs on top of the same fetch as #12 — ErrorState is already there from #12 |
| **#14 Loading-state** | `ProductList.jsx` + `Products.jsx` | Sister issue to #15. Loading-state replaces `<h1>Loader...</h1>` with a spinner/skeleton. ErrorState and LoadingState sit side by side in the same render guards |
| **#17 Læg i kurv** | `src/components/productList/ProductList.jsx` + `Products.jsx` | "Add to cart" works on product cards — those cards only render after a successful fetch, so ErrorState already covers the failure path |
| **#20 Kurv-side** | `src/pages/Kurv.jsx` (new) | If the basket page fetches order/product data from the API, add ErrorState there too |

### Issues that do NOT need ErrorState

These issues are UI-only / static content / client-side only:

| Issue | Reason |
|---|---|
| **#10 Header/navigation** | Static nav links, no API |
| **#11 Responsive layout** | CSS changes only |
| **#16 Kontaktformular** | Client-side form — if a submit endpoint is added later, consider a submit-error state, but that's different from API data fetching |
| **#18 Animationer** | CSS/JS animations only |
| **#19 Dark/light mode** | localStorage only |
| **#21 Services-side** | Static content page |
| **#22 Om-side** | Static content page |
| **#24 Home Page Service Section** | Static cards with text/images |
| **#5 Hero** | Static slider |
| **#4 Forside** | Page shell, no direct API call |

---

## Part 4 — The exact pattern every future API component should copy

When a new issue adds a fetch call, the developer should use this pattern:

```jsx
import ErrorState from "../components/errorState/ErrorState";

// Inside the component:
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [retryCount, setRetryCount] = useState(0);

// Incrementing retryCount re-triggers the useEffect — cooldown + max retries
// are handled inside ErrorState itself, not here
function handleRetry() { setRetryCount(c => c + 1); }

useEffect(() => {
    async function fetchData() {
        try {
            setLoading(true);
            setError(null);

            const resJSON = await fetchJson("/products");   // see Part 2c — handles timeout, offline, res.ok
            const data = resJSON.data ?? resJSON;
            if (!Array.isArray(data)) throw new Error("Uventet dataformat.");

            setData(data);
        } catch (err) {
            console.error("Fetch failed:", err);   // always log real error for devs
            setError(err);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
}, [retryCount]);

// Render guards — always in this order:
if (loading) return <LoadingState />;   // issue #14 will add this
if (error)   return (
    <ErrorState
        title="Kunne ikke hente data"
        message="Prøv igen senere."
        actionText="Prøv igen"
        onRetry={handleRetry}
        cooldown={10}     // optional: 10s between retries (default is 0 — no cooldown)
        maxRetries={5}    // optional: after 5 attempts hide button (default is null — unlimited)
    />
);
```

---

## Summary — what needs to happen on this branch

| Step | File(s) | What |
|---|---|---|
| 1 | `ProductList.jsx` | Delete `let active = true` |
| 2 | `ProductList.jsx` | Add `res.ok` check + array guard in fetch |
| 3 | `ProductList.jsx` | Move `fetchProducts` inside `useEffect`, add `retryCount` state |
| 4 | `ProductList.jsx` | Inline carousel logic to fix exhaustive-deps warning |
| 5 | `ProductList.jsx` | Make dots dynamic with `.map()` |
| 6 | `ProductList.jsx` | Add `if (error) return <ErrorState ... />` |
| 7 | `ProductList.jsx` | Remove unused `CurrencyBitcoin` import, add `ErrorState` import |
| 8 | `Button.jsx` | Remove unused `styles` import |
| 9 | `main.jsx` | Remove unused `App` import |
| 10 | `Products.jsx` | Add TODO comment for future ErrorState wiring |
| 11 | `errorState/ErrorState.jsx` | Create new component (with cooldown + max retry built in) |
| 12 | `errorState/errorState.module.css` | Create new styles (including disabled button + countdown text) |

After steps 1–12: `npm run lint` should pass and `npm run build` should succeed.

---

## Part 6 — Additional error states not yet covered

These are real failure scenarios the app does not currently handle. They are listed by priority.

---

### 6.1 · Empty state — API works but returns 0 products

**Priority: Must do soon**  
**Relevant issues: #12 #13 #15**

**What happens now:**  
The product grid renders with zero items — completely blank, no message, no explanation.  
This will also happen on the Products page (#12) when a filter (#13) returns no matches.

**Fix:**  
No new component needed — add an `isEmpty` check before rendering the grid:

```jsx
if (products.length === 0) {
    return (
        <ErrorState
            title="Ingen produkter fundet"
            message="Vi fandt ingen produkter. Prøv at ændre dit filter eller kom tilbage senere."
        />
    );
}
```

Because `onRetry` is not passed, the retry button is hidden automatically — the message is calm, not alarming.

**Where to add it:**
- `ProductList.jsx` — after the `if (error)` guard
- `Products.jsx` — same, when #12 is built

---

### 6.2 · React Error Boundary — component crashes during render

**Priority: Separate issue — do right after #15 merges**  
**Relevant issues: all of them**

> ℹ️ Moved out of #15 scope. Issue #15 is about API fetch errors. ErrorBoundary covers JS render crashes — a different kind of failure. One file, ~30 lines. Create as a new issue (e.g. #25) immediately after #15.

**What happens now:**  
If any component throws a JS error *during rendering* (e.g. reading a property on `undefined`, a missing key, a bad prop), React **unmounts the entire page** and shows a completely blank white screen. No message. No recovery. `ErrorState` cannot catch this — it only handles errors from `fetch`.

**Fix:**  
Create one `ErrorBoundary` class component and wrap the app with it in `App.jsx`. This is the only place in React where class components are still necessary.

**New file: `src/components/errorBoundary/ErrorBoundary.jsx`**

```jsx
import { Component } from "react";
import ErrorState from "../errorState/ErrorState";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    handleReset() {
        this.setState({ hasError: false });
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorState
                    title="Noget gik galt"
                    message="En uventet fejl opstod. Prøv at genindlæse siden."
                    actionText="Genindlæs"
                    onRetry={() => window.location.reload()}
                />
            );
        }
        return this.props.children;
    }
}
```

**Change to `src/App.jsx`:**

```jsx
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

// Wrap <Outlet /> (or the full return) in <ErrorBoundary>
<ErrorBoundary>
    <Outlet />
</ErrorBoundary>
```

---

### 6.3 · 404 page — user navigates to an unknown URL

**Priority: Separate issue — should do soon**  
**Relevant issues: #10 (navigation)**

> ℹ️ Moved out of #15 scope. Create as a separate issue alongside or after ErrorBoundary.

**What happens now:**  
Navigating to `/anything-that-doesnt-exist` shows a completely blank page.

**Fix:**  
Add a catch-all route to `router.jsx` and a simple `NotFound.jsx` page.

**New file: `src/pages/NotFound.jsx`**

```jsx
import ErrorState from "../components/errorState/ErrorState";
import { useNavigate } from "react-router";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <ErrorState
            title="Side ikke fundet"
            message="Den side du leder efter findes ikke."
            actionText="Gå til forsiden"
            onRetry={() => navigate("/")}
        />
    );
}
```

**Change to `src/router.jsx`:**

```jsx
import NotFound from "./pages/NotFound";

// Add as last child in the router:
{
    path: "*",
    element: <NotFound />
}
```

This reuses `ErrorState` — no extra styling needed.

---

### 6.4 · Fetch timeout — API hangs and never responds

**Priority: Should do soon**  
**Relevant issues: #15 #12**

**What happens now:**  
`fetch` has no timeout. If the server is slow or stalled, the loading spinner runs forever with no way out.

**Fix:**  
Add an `AbortController` with a 10-second timeout inside the fetch function. If it fires, it throws an error that the existing `catch` block handles and shows `ErrorState`.

```js
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 10000); // 10s

try {
    const res = await fetch("https://gowala-t3pes.ondigitalocean.app/products", {
        signal: controller.signal
    });
    clearTimeout(timeout);
    // ... rest of fetch
} catch (err) {
    if (err.name === "AbortError") {
        throw new Error("Serveren svarer ikke — prøv igen.");
    }
    throw err;
}
```

This goes inside `fetchProducts` in `ProductList.jsx` and in every future fetch function.

---

### 6.5 · Offline detection — user has no internet

**Priority: Nice to have**  
**Relevant issues: #15 #12**

**What happens now:**  
A "no internet" failure and a "server returned 500" failure both show the same generic error message. They feel very different to the user.

**Fix:**  
Check `navigator.onLine` (and/or detect the `TypeError: Failed to fetch` message) in the catch block and show a specific message:

```js
} catch (err) {
    if (!navigator.onLine || err.message === "Failed to fetch") {
        setError(new Error("Du ser ud til at være offline. Tjek din internetforbindelse."));
    } else {
        setError(err);
    }
}
```

No changes to `ErrorState` needed — it just displays whatever message is passed.

---

### 6.6 · Broken product images — `<img src>` fails to load

**Priority: Nice to have**  
**Relevant issues: #12 #15 #17**

**What happens now:**  
If a product's image URL is broken or missing, the browser shows an ugly broken-image icon inside the product card.

**Fix:**  
Add `onError` to every product `<img>` tag to swap in a placeholder:

```jsx
<img
    src={product.image}
    alt={product.title}
    onError={(e) => { e.target.src = "/placeholder-product.jpg"; }}
/>
```

A simple grey placeholder image (`public/placeholder-product.jpg`) needs to be added to the project. No component changes needed.

---

### 6.7 · Contact form submit error — #16 when built

**Priority: Later (do when #16 is built)**  
**Relevant issues: #16 Kontaktformular**

**What happens now:**  
Not built yet.

**When built:**  
If the form POST fails, the error should appear *inline below the form* — not replace the whole page like a fetch error would. This is a different UX pattern.

Use a simple inline `<p>` with a red/warning colour, not `<ErrorState>`. Something like:

```jsx
{submitError && (
    <p className={styles.submitError}>
        Beskeden kunne ikke sendes. Prøv igen.
    </p>
)}
```

---

### 6.8 · Basket localStorage corruption — #20 when built

**Priority: Later (do when #20 is built)**  
**Relevant issues: #20 Kurv-side**

**What happens now:**  
Not built yet.

**When built:**  
If basket data in `localStorage` is malformed or from an older schema, `JSON.parse()` throws and can crash the basket. Wrap it in a try/catch with a fallback:

```js
function loadBasket() {
    try {
        return JSON.parse(localStorage.getItem("basket")) ?? [];
    } catch {
        localStorage.removeItem("basket"); // wipe corrupted data
        return [];
    }
}
```

No `ErrorState` needed — silently reset to an empty basket, which is the safest recovery.

---

## Manual test checklist

After implementation, verify the feature works by running these tests manually:

1. **Trigger error state** — temporarily change the fetch path to `/wrong-url` in `api.js` and confirm `ErrorState` appears with the correct message
2. **Retry button** — click it and confirm the component re-fetches (loading state briefly reappears)
3. **Cooldown** — if `cooldown={10}` is passed, confirm button is disabled for 10 seconds and shows the countdown text
4. **Max retries** — if `maxRetries={5}` is passed, click 5 times and confirm the button disappears and contact message appears
5. **Offline** — open DevTools → Network → set to Offline. Reload the page and confirm the offline-specific message appears
6. **Timeout** — temporarily change the timeout in `api.js` to `100` ms. Confirm the timeout error message appears
7. **Empty state** — temporarily force `data = []` after the fetch and confirm the empty state message appears (not the crash/error message)
8. **`variant` prop** — confirm `variant="empty"` looks calm/neutral, `variant="error"` looks more urgent
9. **Restore** — revert the temp changes and confirm the normal product grid loads
10. **Lint** — run `npm run lint` and confirm it exits with code 0
11. **Build** — run `npm run build` and confirm no errors

This checklist is teacher-friendly: it shows you thought about testing, not just implementation.

---

## Revised summary — what belongs in #15 vs separate issues

### #15 — Do now on this branch

| Step | File(s) | What |
|---|---|---|
| 0 | — | Sync branch (git pull + merge main + npm install) |
| 1 | `utils/api.js` | Create shared fetch helper (timeout + offline + `res.ok`) |
| 2 | `ProductList.jsx` | Delete `let active = true` |
| 3 | `ProductList.jsx` | Replace raw fetch with `fetchJson`, add array guard |
| 4 | `ProductList.jsx` | Move fetch inside `useEffect`, add `retryCount` state |
| 5 | `ProductList.jsx` | Inline carousel logic (fix exhaustive-deps) |
| 6 | `ProductList.jsx` | Dynamic dots with `.map()` |
| 7 | `ProductList.jsx` | `if (error)` → `<ErrorState variant="error" />` |
| 8 | `ProductList.jsx` | `if (products.length === 0)` → `<ErrorState variant="empty" />` |
| 9 | `ProductList.jsx` | Fix imports (remove `CurrencyBitcoin`, add `ErrorState` + `fetchJson`) |
| 10 | `Button.jsx` | Remove unused `styles` import |
| 11 | `main.jsx` | Remove unused `App` import |
| 12 | `Products.jsx` | Add TODO comment for future ErrorState wiring |
| 13 | `errorState/ErrorState.jsx` | Create component (`variant`, `cooldown=0`, `maxRetries=null`) |
| 14 | `errorState/errorState.module.css` | Create styles |

After steps 0–14: `npm run lint` exits 0 and `npm run build` succeeds. Run the manual test checklist above.

---

### Separate issues — create these after #15 merges

| Suggested issue | What | Why separate |
|---|---|---|
| **#25 — Error Boundary** | `errorBoundary/ErrorBoundary.jsx` + wrap `App.jsx` | Different failure type (render crash vs fetch error) |
| **#26 — 404 page** | `pages/NotFound.jsx` + catch-all route in `router.jsx` | Routing concern, not fetch concern |
| **#27 — Broken image fallback** | `onError` on `<img>` tags + `public/placeholder-product.jpg` | Depends on #12 product grid being built |
| **When #16 is built** | Inline submit error in contact form | Completely different UX pattern than `ErrorState` |
| **When #20 is built** | `localStorage` corruption guard in basket | Completely different failure domain |
