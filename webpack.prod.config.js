const { createConfig } = require('@openedx/frontend-build');

const config = createConfig('webpack-prod');

// Open edX frontend-build only file-loads jpg/png/gif — add webp for local brand assets.
config.module.rules.forEach((rule) => {
  if (rule.test && rule.test.toString().includes('jpe?g')) {
    rule.test = /\.(jpe?g|png|gif|webp)(\?v=\d+\.\d+\.\d+)?$/;
  }
});

module.exports = config;
