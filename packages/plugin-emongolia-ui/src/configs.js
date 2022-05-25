module.exports = {
  name: 'emongolia',
  port: 3127,
  exposes: {
    './routes': './src/routes.tsx',
  },
  routes: {
    url: 'http://localhost:3110/remoteEntry.js',
    scope: 'emongolia',
    module: './routes',
  },
  menus: [
    {
      text: 'E-Mongolia',
      image: '/images/icons/erxes-16.svg',
      to: '/settings/dan-settings',
      location: 'settings',
      scope: 'emongolia',
    },
  ],
};
