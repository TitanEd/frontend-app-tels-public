import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';

import LegalLayout from './LegalLayout';
import messages from './privacy-messages';

const PrivacyPage = () => {
  const intl = useIntl();
  const sections = [
    { id: 'scope', title: intl.formatMessage(messages.scopeTitle), body: intl.formatMessage(messages.scopeBody) },
    { id: 'collect', title: intl.formatMessage(messages.collectTitle), body: intl.formatMessage(messages.collectBody) },
    { id: 'use', title: intl.formatMessage(messages.useTitle), body: intl.formatMessage(messages.useBody) },
    { id: 'legal-basis', title: intl.formatMessage(messages.legalBasisTitle), body: intl.formatMessage(messages.legalBasisBody) },
    { id: 'share', title: intl.formatMessage(messages.shareTitle), body: intl.formatMessage(messages.shareBody) },
    { id: 'cookies', title: intl.formatMessage(messages.cookiesTitle), body: intl.formatMessage(messages.cookiesBody) },
    { id: 'retention', title: intl.formatMessage(messages.retentionTitle), body: intl.formatMessage(messages.retentionBody) },
    { id: 'rights', title: intl.formatMessage(messages.rightsTitle), body: intl.formatMessage(messages.rightsBody) },
    { id: 'children', title: intl.formatMessage(messages.childrenTitle), body: intl.formatMessage(messages.childrenBody) },
    { id: 'transfers', title: intl.formatMessage(messages.transfersTitle), body: intl.formatMessage(messages.transfersBody) },
    { id: 'security', title: intl.formatMessage(messages.securityTitle), body: intl.formatMessage(messages.securityBody) },
    { id: 'changes', title: intl.formatMessage(messages.changesTitle), body: intl.formatMessage(messages.changesBody) },
    { id: 'contact', title: intl.formatMessage(messages.contactTitle), body: intl.formatMessage(messages.contactBody) },
  ];

  return (
    <LegalLayout
      docTitle={intl.formatMessage(messages.docTitle)}
      title={intl.formatMessage(messages.title)}
      intro={intl.formatMessage(messages.intro)}
      sections={sections}
      lastUpdated={intl.formatMessage(messages.lastUpdated)}
      seeAlso={(
        <FormattedMessage
          {...messages.seeAlso}
          values={{
            termsLink: (chunks) => <Link to="/terms" className="tels-link">{chunks}</Link>,
          }}
        />
      )}
    />
  );
};

export default PrivacyPage;
