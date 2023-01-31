const IMPORT_EXPORT_TYPES = [
  {
    text: 'Team member',
    contentType: 'user',
    icon: 'users'
  }
];

export default {
  importExportTypes: IMPORT_EXPORT_TYPES,
  insertImportItems: async ({ subdomain, data }) => {
    console.log(subdomain, data);
  },

  prepareImportDocs: async ({ subdomain, data }) => {
    console.log('=====================================');
    console.log(subdomain, data);

    return '1';
  }
};
