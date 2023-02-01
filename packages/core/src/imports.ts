import { generateModels } from './connectionResolver';

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
    const { result, contentType, properties } = data;

    const bulkDoc: any = [];

    // Iterating field values
    for (const fieldValue of result) {
      const doc: any = {
        scopeBrandIds,
        customFieldsData: []
      };

      let colIndex: number = 0;

      // Iterating through detailed properties
      for (const property of properties) {
        const value = (fieldValue[colIndex] || '').toString();

        if (contentType === 'customer') {
          doc.state = 'customer';
        }
        if (contentType === 'lead') {
          doc.state = 'lead';
        }

        switch (property.name) {
          case 'password':
            {
              doc.customFieldsData.push({
                field: property.id,
                value: fieldValue[colIndex]
              });

              doc.customFieldsData = await sendFormsMessage({
                subdomain,
                action: 'fields.prepareCustomFieldsData',
                data: doc.customFieldsData,
                isRPC: true,
                defaultValue: doc.customFieldsData,
                timeout: 60 * 1000 // 1 minute
              });
            }
            break;

          case 'customData':
            {
              doc[property.name] = value;
            }
            break;

          case 'ownerEmail':
            {
              const userEmail = value;

              const owner = await sendCoreMessage({
                subdomain,
                action: 'users.findOne',
                data: {
                  email: userEmail
                },
                isRPC: true
              });

              doc.ownerId = owner ? owner._id : '';
            }
            break;

          case 'pronoun':
            {
              doc.sex = generatePronoun(value);
            }
            break;

          case 'companiesPrimaryNames':
            {
              doc.companiesPrimaryNames = value.split(',');
            }
            break;

          case 'companiesPrimaryEmails':
            {
              doc.companiesPrimaryEmails = value.split(',');
            }
            break;

          case 'customersPrimaryEmails':
            doc.customersPrimaryEmails = value.split(',');
            break;

          case 'vendorCode':
            doc.vendorCode = value;
            break;

          case 'tag':
            {
              const type = contentType === 'lead' ? 'customer' : contentType;

              const tagName = value;

              let tag = await sendTagsMessage({
                subdomain,
                action: 'findOne',
                data: { name: tagName, type: `contacts:${type}` },
                isRPC: true
              });

              if (!tag) {
                tag = await sendTagsMessage({
                  subdomain,
                  action: 'createTag',
                  data: { name: tagName, type: `contacts:${type}` },
                  isRPC: true
                });
              }

              doc.tagIds = tag ? [tag._id] : [];
            }

            break;

          case 'assignedUserEmail':
            {
              const assignedUser = await sendCoreMessage({
                subdomain,
                action: 'users.findOne',
                data: {
                  email: value
                },
                isRPC: true
              });

              doc.assignedUserIds = assignedUser ? [assignedUser._id] : [];
            }

            break;

          default:
            {
              doc[property.name] = value;

              if (property.name === 'createdAt' && value) {
                doc.createdAt = new Date(value);
              }

              if (property.name === 'modifiedAt' && value) {
                doc.modifiedAt = new Date(value);
              }

              if (property.name === 'primaryName' && value) {
                doc.names = [value];
              }

              if (property.name === 'primaryEmail' && value) {
                doc.emails = [value];
              }

              if (property.name === 'primaryPhone' && value) {
                doc.phones = [value];
              }

              if (property.name === 'phones' && value) {
                doc.phones = value.split(',');
              }

              if (property.name === 'emails' && value) {
                doc.emails = value.split(',');
              }

              if (property.name === 'names' && value) {
                doc.names = value.split(',');
              }

              if (property.name === 'isComplete') {
                doc.isComplete = Boolean(value);
              }
            }
            break;
        } // end property.type switch

        colIndex++;
      } // end properties for loop

      if (
        (contentType === 'customer' || contentType === 'lead') &&
        !doc.emailValidationStatus
      ) {
        doc.emailValidationStatus = 'unknown';
      }

      if (
        (contentType === 'customer' || contentType === 'lead') &&
        !doc.phoneValidationStatus
      ) {
        doc.phoneValidationStatus = 'unknown';
      }

      // set board item created user

      bulkDoc.push(doc);
    }

    return bulkDoc;
  }
};
