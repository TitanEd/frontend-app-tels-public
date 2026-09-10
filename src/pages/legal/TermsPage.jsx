import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';

import LegalLayout from './LegalLayout';
import messages from './terms-messages';

const TermsPage = () => {
  const intl = useIntl();
  const sections = [
    { id: 'acceptance', title: intl.formatMessage(messages.acceptanceTitle), body: intl.formatMessage(messages.acceptanceBody) },
    { id: 'eligibility', title: intl.formatMessage(messages.eligibilityTitle), body: intl.formatMessage(messages.eligibilityBody) },
    { id: 'content', title: intl.formatMessage(messages.contentTitle), body: intl.formatMessage(messages.contentBody) },
    { id: 'conduct', title: intl.formatMessage(messages.conductTitle), body: intl.formatMessage(messages.conductBody) },
    { id: 'payments', title: intl.formatMessage(messages.paymentsTitle), body: intl.formatMessage(messages.paymentsBody) },
    { id: 'third-party', title: intl.formatMessage(messages.thirdPartyTitle), body: intl.formatMessage(messages.thirdPartyBody) },
    { id: 'ip', title: intl.formatMessage(messages.ipTitle), body: intl.formatMessage(messages.ipBody) },
    { id: 'disclaimers', title: intl.formatMessage(messages.disclaimersTitle), body: intl.formatMessage(messages.disclaimersBody) },
    { id: 'liability', title: intl.formatMessage(messages.liabilityTitle), body: intl.formatMessage(messages.liabilityBody) },
    { id: 'termination', title: intl.formatMessage(messages.terminationTitle), body: intl.formatMessage(messages.terminationBody) },
    { id: 'law', title: intl.formatMessage(messages.lawTitle), body: intl.formatMessage(messages.lawBody) },
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

export default TermsPage;
