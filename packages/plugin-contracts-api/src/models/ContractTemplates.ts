import { Model } from 'mongoose';
import { IModels } from '../connectionResolver';
import {
  contractTemplateSchema,
  IContractTemplate,
  IContractTemplateDocument
} from './definitions/contractTemplates';

export interface IContractTemplateModel
  extends Model<IContractTemplateDocument> {
  getContractTemplate(_id: string): IContractTemplateDocument;
  createContractTemplate(
    doc: IContractTemplate,
    user?: any
  ): IContractTemplateDocument;
  updateContractTemplate(
    _id: string,
    fields: IContractTemplate,
    userId: string
  ): IContractTemplateDocument;
  removeContractTemplate(_id: string): void;
  duplicateContractTemplate(_id: string, user: any): IContractTemplateDocument;
}

export const loadContractTemplateClass = (models: IModels) => {
  class ContractTemplate {
    /**
     * Get contract template
     */
    public static async getContractTemplate(_id: string) {
      const contractTemplate = await models.ContractTemplates.findOne({ _id });

      if (!contractTemplate) {
        throw new Error('Contract template not found');
      }

      return contractTemplate;
    }

    /**
     * create an contract template
     */
    public static async createContractTemplate(
      doc: IContractTemplate,
      user?: any
    ) {
      const template = await models.ContractTemplates.create({
        ...doc,
        createdAt: new Date(),
        modifiedAt: new Date(),
        createdBy: user._id
      });

      return models.ContractTemplates.getContractTemplate(template._id);
    }

    /**
     * Updates an contract template
     */
    public static async updateContractTemplate(
      _id: string,
      fields: IContractTemplate,
      userId: string
    ) {
      await models.ContractTemplates.updateOne(
        { _id },
        { $set: { ...fields, modifiedBy: userId, modifiedAt: new Date() } }
      );

      return models.ContractTemplates.findOne({ _id });
    }

    /**
     * Delete contract template
     */
    public static async removeContractTemplate(_id: string) {
      const contractTemplateObj = await models.ContractTemplates.findOne({
        _id
      });

      if (!contractTemplateObj) {
        throw new Error(`Contract template not found with id ${_id}`);
      }

      return contractTemplateObj.remove();
    }

    /**
     * Duplicate an contract template
     */
    public static async duplicateContractTemplate(_id: string, user: any) {
      const template = await models.ContractTemplates.getContractTemplate(_id);

      return models.ContractTemplates.createContractTemplate(
        {
          name: `${template.name} copied`,
          categoryId: template.categoryId,
          html: template.html,
          css: template.css
        },
        user
      );
    }
  }

  contractTemplateSchema.loadClass(ContractTemplate);

  return contractTemplateSchema;
};
