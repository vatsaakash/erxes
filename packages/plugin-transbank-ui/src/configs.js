module.exports = {
    name: 'transbank',
    port: 3023,
    scope: 'transbank',
    url: 'http://localhost:3029/remoteEntry.js',
    exposes: {
      './routes': './src/routes.tsx',
      './customerAddSection': './src/components/CustomerAddSection.tsx'
    },
    routes: {
      url: 'http://localhost:3029/remoteEntry.js',
      scope: 'transbank',
      module: './routes'
    },
    customerRightSidebarSection: [
      {
        text: 'customerAddSection',
        component: './customerAddSection',
        scope: 'transbank'
      }
    ],
   
  };
  