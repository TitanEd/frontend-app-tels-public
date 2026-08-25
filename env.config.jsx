/**
 * Local plugin slot config — mirrors tutor-tels-theme-plugins for the `public` MFE.
 * Preview TelsHeader + IndigoFooter with `npm start` (no Docker image build).
 *
 * Slot IDs (same as Tutor PLUGIN_SLOTS / tutorindigo/plugin.py):
 *   org.openedx.frontend.layout.header.v1  → widget id: tels_header
 *   org.openedx.frontend.layout.footer.v1  → widget id: indigo_footer (hides default)
 */
import { TelsHeader, IndigoFooter } from './src/plugin-slots';

function addPlugins(config, slotName, plugins) {
  if (!config.pluginSlots[slotName]) {
    config.pluginSlots[slotName] = {
      keepDefault: true,
      plugins: [],
    };
  }
  config.pluginSlots[slotName].plugins.push(...plugins);
}

async function setConfig() {
  const config = {
    pluginSlots: {},
  };

  try {
    const { DIRECT_PLUGIN, PLUGIN_OPERATIONS } = await import('@openedx/frontend-plugin-framework');

    // Apply when APP_ID=public (.env.development). Omit guard to always load in this MFE repo.
    const appId = process.env.APP_ID || 'public';
    if (appId === 'public') {
      addPlugins(config, 'org.openedx.frontend.layout.header.v1', [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'tels_header',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: TelsHeader,
          },
        },
      ]);

      addPlugins(config, 'org.openedx.frontend.layout.footer.v1', [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'default_contents',
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'indigo_footer',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: IndigoFooter,
          },
        },
      ]);
    }
  } catch (err) {
    console.error('env.config.jsx failed to apply plugin slots:', err);
  }

  return config;
}

export default setConfig;
