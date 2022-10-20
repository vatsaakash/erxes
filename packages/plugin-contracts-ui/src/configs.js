module.exports = {
  name: 'contracts',
  port: 3017,
  scope: 'contracts',
  exposes: {
    './routes': './src/routes.tsx'
  },
  routes: {
    url: 'http://localhost:3017/remoteEntry.js',
    scope: 'contracts',
    module: './routes'
  },
  menus: [
    {
      text: 'Contracts',
      to: '/contracts',
      image: '/images/icons/erxes-18.svg',
      location: 'settings',
      scope: 'contracts'
    }
  ]
};
