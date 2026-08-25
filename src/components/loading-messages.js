import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  loadingLabel: {
    id: 'tels.loading.label',
    defaultMessage: 'Loading',
    description: 'Accessible label for page/data loading state',
  },
  loadingData: {
    id: 'tels.loading.data',
    defaultMessage: 'Loading data…',
    description: 'Visible status text while page data loads',
  },
});

export default messages;
