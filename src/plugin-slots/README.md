# Plugin slots (public MFE)

Open edX layout slots + local widgets used for `npm start` preview
(same widgets as `tutor-tels-theme-plugins` in production Docker builds).

| Path | Role |
|------|------|
| [`HeaderSlot/`](./HeaderSlot/) | Host: `org.openedx.frontend.layout.header.v1` |
| [`FooterSlot/`](./FooterSlot/) | Docs for `org.openedx.frontend.layout.footer.v1` (implementation in `@edx/frontend-component-footer`) |
| `TelsHeader.jsx` / `IndigoFooter.jsx` / … | Local header/footer widgets, URL helpers, Indigo config defaults |

See also [`docs/local-header-footer-preview.md`](../../docs/local-header-footer-preview.md).
