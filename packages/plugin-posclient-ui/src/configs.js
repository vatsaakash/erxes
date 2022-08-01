module.exports = {
  name: 'posclient',
  port: 3099,
  scope: 'posclient',
  exposes: {
    './routes': './src/routes.tsx',
  },
  routes: {
    url: 'http://localhost:3099/remoteEntry.js',
    scope: 'posclient',
    module: './routes',
  },
  menus: [
    {
      text: 'Posclients',
      to: 'http://localhost:3099/',
      blank: true,
      image: '/images/icons/erxes-18.svg',
      location: 'settings',
      scope: 'posclient',
    },
  ],
};
