import { Container } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
import './ExamplePage.scss';

const ExamplePage = () => {
  const intl = useIntl();
  return (
    <main>
      <Container className="py-5">
        <h1>{intl.formatMessage(messages.title)}</h1>
        <p>{intl.formatMessage(messages.body)}</p>
      </Container>
    </main>
  );
};
export default ExamplePage;
