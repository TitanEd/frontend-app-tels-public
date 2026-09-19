import { useIntl, defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  skip: {
    id: 'tels.a11y.skipToMain',
    defaultMessage: 'Skip to main content',
    description: 'Skip navigation link for keyboard users',
  },
});

const SkipLink = () => {
  const intl = useIntl();
  return (
    <a className="tels-skip-link" href="#main">
      {intl.formatMessage(messages.skip)}
    </a>
  );
};

export default SkipLink;
