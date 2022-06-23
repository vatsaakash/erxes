module.exports = {
  name: 'survey',
  port: 3012,
  scope: 'survey',
  exposes: {
    './routes': './src/routes.tsx'
  },
  routes: {
    url: 'http://localhost:3012/remoteEntry.js',
    scope: 'survey',
    module: './routes'
  },
  menus: [
    {
      text: 'Surveys',
      to: '/surveys',
      image: '/images/icons/erxes-18.svg',
      location: 'settings',
      scope: 'survey'
    }
  ]
};