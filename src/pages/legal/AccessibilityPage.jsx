import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';

import LegalLayout from './LegalLayout';
import messages from './accessibility-messages';

const AccessibilityPage = () => {
  const intl = useIntl();
  const sections = [
    { id: 'commitment', title: intl.formatMessage(messages.commitmentTitle), body: intl.formatMessage(messages.commitmentBody) },
    { id: 'standards', title: intl.formatMessage(messages.standardsTitle), body: intl.formatMessage(messages.standardsBody) },
    { id: 'features', title: intl.formatMessage(messages.featuresTitle), body: intl.formatMessage(messages.featuresBody) },
    { id: 'course-content', title: intl.formatMessage(messages.courseContentTitle), body: intl.formatMessage(messages.courseContentBody) },
    { id: 'third-party', title: intl.formatMessage(messages.thirdPartyTitle), body: intl.formatMessage(messages.thirdPartyBody) },
    { id: 'assistive-tech', title: intl.formatMessage(messages.assistiveTitle), body: intl.formatMessage(messages.assistiveBody) },
    { id: 'known-issues', title: intl.formatMessage(messages.knownTitle), body: intl.formatMessage(messages.knownBody) },
    { id: 'feedback', title: intl.formatMessage(messages.feedbackTitle), body: intl.formatMessage(messages.feedbackBody) },
    { id: 'training', title: intl.formatMessage(messages.trainingTitle), body: intl.formatMessage(messages.trainingBody) },
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
            termsLink: (chunks) => <Link to="/terms" className="tels-link">{chunks}</Link>,
          }}
        />
      )}
    />
  );
};

export default AccessibilityPage;
