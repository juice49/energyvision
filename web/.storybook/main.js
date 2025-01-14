const { pathToFileURL } = require('url')
const webpack = require('webpack')

const path = require('path')

module.exports = {
  stories: [
    '../components/stories/docs/*.stories.mdx',
    '../components/stories/typography/**/*.stories.@(ts|tsx|mdx)',
    '../components/src/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-css-modules-preset'],
  previewMainTemplate: path.resolve(__dirname, 'template.ejs'),
  webpackFinal: async (config) => {
    // Respect the baseUrl from tsconfig
    config.resolve.modules.push(path.resolve(__dirname, '../components'))
    config.resolve.alias['@components'] = path.resolve(__dirname, '../components/src')
    config.resolve.alias['@stories'] = path.resolve(__dirname, '../components/stories')
    config.resolve.alias['@utils'] = path.resolve(__dirname, '../components/utils')

    const envVars = {
      STORYBOOK_BUILT_AT: Date.now(),
    }

    config.plugins.push(new webpack.EnvironmentPlugin(envVars))
    return config
  },
}
