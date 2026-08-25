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
| [`src/plugin-slots/`](../src/plugin-slots/) | Local theme plugin widgets + HeaderSlot host |
| [`src/plugin-slots/localIndigoConfig.js`](../src/plugin-slots/localIndigoConfig.js) | `INDIGO_*` defaults when `MFE_CONFIG_API_URL` is empty |
| [`src/plugin-slots/messages.js`](../src/plugin-slots/messages.js) | Header `defineMessages` |
| [`src/plugin-slots/footer-messages.js`](../src/plugin-slots/footer-messages.js) | Footer `defineMessages` |
| [`src/plugin-slots/HeaderSlot/`](../src/plugin-slots/HeaderSlot/) | `<PluginSlot id="org.openedx.frontend.layout.header.v1" />` |
| [`src/index.jsx`](../src/index.jsx) | `HeaderSlot` + routes + `FooterSlot` |
| [`src/components/LoadingScreen.jsx`](../src/components/LoadingScreen.jsx) | Reusable skeleton loading UI for data pages |

Production Docker builds use the theme plugin JSX in `tutor-tels-theme-plugins`; this repo duplicates widgets under `src/plugin-slots/` for local `npm start`.

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

## Sync with theme plugin

**Source of truth (local):** `src/plugin-slots/` in this MFE.

When you change header/footer here, copy the same behavior into:

- `tutor-tels-theme-plugins/tutorindigo/components/TelsHeader.jsx`
- `tutor-tels-theme-plugins/tutorindigo/components/IndigoFooter.jsx`
- `tutor-tels-theme-plugins/tutorindigo/components/publicUrls.js`
- `tutor-tels-theme-plugins/tutorindigo/components/LanguageMenu.jsx`

Plugin widgets keep messages **inline** via `defineMessages`. Message **ids** and **defaultMessage** strings must stay identical to this MFE.
