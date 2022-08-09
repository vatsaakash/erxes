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
      text: 'Pos Client',
      url: 'http://localhost:3099/posclient',
      icon: 'icon-chat',
      blank: true,
      location: 'mainNavigation',
    },
  ],
};
