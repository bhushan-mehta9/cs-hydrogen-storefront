# Phase 4 — Checkout return (Hydrogen)

Goal: after Shopify checkout, **Continue shopping** returns to this storefront and the **session cart is cleared**.

Full redirect-theme guides also live in the backup repo:

- `F:\simple-react-shop-frontend\HEADLESS_CHECKOUT_REDIRECT.md`
- `F:\simple-react-shop-frontend\docs\REDIRECT_THEME_TROUBLESHOOTING.md`
- `F:\simple-react-shop-frontend\docs\hydrogen-redirect-localhost-http.patch.txt` (use port **3000** for Hydrogen dev)

## 4.1 Shopify Admin — redirect theme

1. Download [hydrogen-redirect-theme](https://github.com/Shopify/hydrogen-redirect-theme).
2. **Online Store → Themes** → upload → **Publish** (must be **Current theme**).
3. **Customize → Theme settings → Storefront → Hostname**
   - Local dev: `localhost:3000` (no `http://`, no trailing slash)
   - Preview deploy (Phase 5): your `….myshopify.dev` host only

## 4.2 Redirect theme code (cart clear param)

In **Edit code → `layout/theme.liquid`**, after `redirectUrl = new URL(redirectUrl);`:

- For **HTTP** local dev (recommended), add the localhost `http:` fix from the patch file (port **3000**).
- Set query param so the app clears cart:

```javascript
redirectUrl.searchParams.set("shopify_checkout", "complete");
```

Ensure checkout URLs are **not** redirected (see patch: exclude `/checkout` paths).

## 4.3 This repo (already wired)

| Piece | Location |
|-------|----------|
| Detect return + pending flag | `app/lib/checkoutReturn.js` |
| Clear cart via `/cart` POST | `ClearCartAfterShopifyReturn.jsx`, `cart.jsx` action |
| Set pending on Checkout click | `LocalCartPage.jsx` |
| `https://localhost` → `http://` | `app/dev/ensureLocalhostHttp.js` → `entry.client.jsx` |
| Setup instructions UI | Cart page → `ContinueShoppingSetup` |

Optional Admin var for docs hostname:

```text
PUBLIC_STOREFRONT_URL=http://localhost:3000
```

## 4.4 Test (local)

1. `npx shopify hydrogen dev` → add to cart → **Checkout**.
2. Complete or cancel on Shopify → **Continue shopping**.
3. Expect: `http://localhost:3000/?shopify_checkout=complete` (then param stripped).
4. Cart count **0**; header badge empty.

If HTTPS localhost fails before the app loads, apply the **http:** patch in the redirect theme or test return on **Preview URL** only (Phase 5).

## Exit criteria

- Return lands on Hydrogen (localhost or preview host).
- Cart cleared after return when `shopify_checkout=complete` or pending checkout flag is set.
