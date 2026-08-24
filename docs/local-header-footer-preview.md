# Local header / footer preview (no Docker build)

Same plugin slot IDs as `tutor-tels-theme-plugins` / `tutorindigo/plugin.py`:

| Slot | Widget id | Component |
|------|-----------|-----------|
| `org.openedx.frontend.layout.header.v1` | `tels_header` | `TelsHeader` |
| `org.openedx.frontend.layout.footer.v1` | `indigo_footer` | `IndigoFooter` (hides `default_contents`) |

## Files

| File | Role |
|------|------|
| [`env.config.jsx`](../env.config.jsx) | Registers slot plugins (mirrors Tutor `env.config.jsx` patch) |
| [`src/tels-chrome/`](../src/tels-chrome/) | Local copies of theme plugin widgets |
| [`src/tels-chrome/localIndigoConfig.js`](../src/tels-chrome/localIndigoConfig.js) | `INDIGO_*` defaults when `MFE_CONFIG_API_URL` is empty |
| [`src/tels-chrome/messages.js`](../src/tels-chrome/messages.js) | Header `defineMessages` (same ids as plugin `TelsHeader`) |
| [`src/tels-chrome/footer-messages.js`](../src/tels-chrome/footer-messages.js) | Footer `defineMessages` (same ids as plugin `IndigoFooter`) |
| [`src/plugin-slots/HeaderSlot/`](../src/plugin-slots/HeaderSlot/) | `<PluginSlot id="org.openedx.frontend.layout.header.v1" />` |
| [`src/index.jsx`](../src/index.jsx) | `HeaderSlot` + routes + `FooterSlot` |

Production Docker builds use the theme plugin JSX in `tutor-tels-theme-plugins`; this repo duplicates widgets under `src/tels-chrome/` for local `npm start`.

## Run

1. **Brand CSS** (header/footer `.tels-*` styles):

   ```bash
   cd ../../tels-brand-openedx && npm run serve
   ```

2. **Public MFE**:

   ```bash
   cd mfes/frontend-app-public
   npm install
   npm start
   ```

3. Open the public MFE URL (e.g. http://apps.local.openedx.io:2024/public/) — you should see TelsHeader, page content, and IndigoFooter.

`.env.development` sets `APP_ID=public`, `PARAGON_THEME_URLS` → brandOverride, and TitanEd logo URLs.

## Sync with theme plugin

**Source of truth:** `src/tels-chrome/` in this MFE.

When you change header/footer here, copy the same behavior into:

- `tutor-tels-theme-plugins/tutorindigo/components/TelsHeader.jsx`
- `tutor-tels-theme-plugins/tutorindigo/components/IndigoFooter.jsx`
- `tutor-tels-theme-plugins/tutorindigo/components/publicUrls.js`
- `tutor-tels-theme-plugins/tutorindigo/components/LanguageMenu.jsx`

Plugin widgets keep messages **inline** via `defineMessages` (Tutor patches concatenate files into one env.config scope). Message **ids** and **defaultMessage** strings must stay identical to this MFE.
