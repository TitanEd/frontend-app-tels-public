import AddDarkTheme from './AddDarkTheme';
import LanguageMenu from './LanguageMenu';
import ToggleThemeButton from './ToggleThemeButton';
import './HeaderControls.scss';

const HeaderControls = () => (
  <>
    <AddDarkTheme />
    <div className="indigo-header-controls">
      <LanguageMenu />
      <ToggleThemeButton />
    </div>
  </>
);
export default HeaderControls;
