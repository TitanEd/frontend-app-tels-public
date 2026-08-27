import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';
import './ComingSoonPage.scss';

const ComingSoonPage = () => {
  const intl = useIntl();
  return (
    <main id="main">
      <div className="tels-container py-5 text-center">
        <h1 className="mb-3">{intl.formatMessage(messages.title)}</h1>
        <p className="lead mb-0">
          {intl.formatMessage(messages.body)}
        </p>
      </div>
    </main>
  );
};

export default ComingSoonPage;
