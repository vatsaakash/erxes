module.exports = {
  name: 'template',
  port: 3012,
  scope: 'template',
  exposes: {
    './routes': './src/routes.tsx'
  },
  routes: {
    url: 'http://localhost:3012/remoteEntry.js',
    scope: 'template',
    module: './routes'
  },
  menus: [
    {
      text: 'Templates',
      to: '/templates',
      image: '/images/icons/erxes-18.svg',
      location: 'settings',
      scope: 'template'
    }
  ]
};