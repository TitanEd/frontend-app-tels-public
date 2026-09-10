import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';

import LegalLayout from './LegalLayout';
import messages from './eea-messages';

const EeaPrivacyPage = () => {
  const intl = useIntl();
  const sections = [
    { id: 'scope', title: intl.formatMessage(messages.scopeTitle), body: intl.formatMessage(messages.scopeBody) },
    { id: 'controller', title: intl.formatMessage(messages.controllerTitle), body: intl.formatMessage(messages.controllerBody) },
    { id: 'legal-basis', title: intl.formatMessage(messages.legalBasisTitle), body: intl.formatMessage(messages.legalBasisBody) },
    { id: 'categories', title: intl.formatMessage(messages.categoriesTitle), body: intl.formatMessage(messages.categoriesBody) },
    { id: 'transfers', title: intl.formatMessage(messages.transfersTitle), body: intl.formatMessage(messages.transfersBody) },
    { id: 'retention', title: intl.formatMessage(messages.retentionTitle), body: intl.formatMessage(messages.retentionBody) },
    { id: 'rights', title: intl.formatMessage(messages.rightsTitle), body: intl.formatMessage(messages.rightsBody) },
    { id: 'complaints', title: intl.formatMessage(messages.complaintsTitle), body: intl.formatMessage(messages.complaintsBody) },
    { id: 'dpo', title: intl.formatMessage(messages.dpoTitle), body: intl.formatMessage(messages.dpoBody) },
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
            privacyLink: (chunks) => <Link to="/privacy" className="tels-link">{chunks}</Link>,
          }}
        />
      )}
    />
  );
};

export default EeaPrivacyPage;
