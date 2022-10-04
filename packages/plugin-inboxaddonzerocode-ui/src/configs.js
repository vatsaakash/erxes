module.exports = {
  name: 'inboxaddonzerocode',
  port: 3091,
  scope: 'inboxaddonzerocode',
  exposes: {
    './routes': './src/routes.tsx'
  },
  routes: {
    url: 'http://localhost:3091/remoteEntry.js',
    scope: 'inboxaddonzerocode',
    module: './routes'
  },
  menus: [
    {
      text: 'Zerocode AI',
      to: '/settings/inboxaddon-zerocodeai',
      image: '/images/icons/erxes-05.svg',
      location: 'settings',
      scope: 'inboxaddonzerocode',
      action: 'inboxManageZerocodeAi',
      permissions: ['inboxManageZerocodeAi']
    }
  ],
};
