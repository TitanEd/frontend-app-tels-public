import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';
import './ComingSoonPage.scss';

const ComingSoonPage = () => {
  const intl = useIntl();
  return (
    <main id="coming-soon-main" className="tels-coming-soon">
      <div className="tels-container tels-coming-soon__inner">
        <h1 className="tels-coming-soon__title">{intl.formatMessage(messages.title)}</h1>
        <p className="tels-coming-soon__body">
          {intl.formatMessage(messages.body)}
        </p>
      </div>
    </main>
  );
};

export default ComingSoonPage;
