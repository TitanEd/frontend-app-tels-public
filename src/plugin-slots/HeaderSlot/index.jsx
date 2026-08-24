import { PluginSlot } from '@openedx/frontend-plugin-framework';
import './index.scss';
/**
 * Host for the shared marketing header (TelsHeader) injected by
 * tutor-tels-theme-plugins via PLUGIN_SLOTS.
 * Slot ID: org.openedx.frontend.layout.header.v1
 */
const HeaderSlot = () => (<PluginSlot id="org.openedx.frontend.layout.header.v1" />);
export default HeaderSlot;
