import { requireLogin } from '@erxes/api-utils/src/permissions';
import { Templates, ITemplate } from '../../models';

const templateMutations = {
  /**
   * Creates a new template
   */
  async templatesAdd(_root, doc: ITemplate) {
    const template = await Templates.createTemplate(doc);

    return template;
  }
};

requireLogin(templateMutations, 'templatesAdd');

export default templateMutations;
