import { Model } from 'mongoose';
import * as _ from 'underscore';
import { IModels } from '../connectionResolver';
import {
  IContract,
  IContractDocument,
  contractSchema,
  IContractCategoryDocument,
  IContractCategory,
  contractCategorySchema
} from './definitions/contracts';

export interface IContractModel extends Model<IContractDocument> {
  getContract(_id: string): Promise<IContractDocument>;
  createContract(doc: IContract): Promise<IContractDocument>;
  updateContract(_id: string, doc: IContract): Promise<IContractDocument>;
  removeContracts(
    subdomain: string,
    contractIds: string[]
  ): Promise<IContractDocument>;
}

export interface IContractCategoryModel
  extends Model<IContractCategoryDocument> {
  getContractCatogery(selector: any): Promise<IContractCategoryDocument>;
  createContractCategory(
    doc: IContractCategory
  ): Promise<IContractCategoryDocument>;
  updateContractCategory(
    _id: string,
    doc: IContractCategory
  ): Promise<IContractCategoryDocument>;
  removeContractCategory(_id: string): Promise<IContractCategoryDocument>;
}

export const loadContractClass = (models: IModels) => {
  class Contract {
    // create
    public static async createContract(doc: IContract) {
      return models.Contracts.create({
        ...doc,
        createdAt: new Date()
      });
    }

    /**
     * Update car
     */
    public static async updateContract(_id, doc) {
      const contract = await models.Contracts.getContract(_id);

      if (contract.categoryId !== doc.categoryId) {
        const category = await models.ContractCategories.getContractCatogery({
          _id: doc.categoryId
        });

        if (category.parentId) {
          doc.parentCategoryId = category.parentId;
        }
      }

      await models.Contracts.updateOne(
        { _id },
        { $set: { ...doc, modifiedAt: new Date() } }
      );

      return models.Contracts.findOne({ _id });
    }

    /**
     * Remove car
     */
    public static async removeContracts(subdomain: string, contractIds) {
      return models.Contracts.deleteMany({ _id: { $in: contractIds } });
    }

    public static async getContract(_id: string) {
      const contract = await models.Contracts.findOne({ _id });

      if (!contract) {
        throw new Error('Contract not found');
      }

      return contract;
    }
  }

  contractSchema.loadClass(Contract);

  return contractSchema;
};

export const loadContractCatgoryClass = (models: IModels) => {
  class ContractCategory {
    /**
     *
     * Get Car Cagegory
     */

    public static async getContractCatogery(selector: any) {
      const contactCategory = await models.ContractCategories.findOne(selector);

      if (!contactCategory) {
        throw new Error('Contact category not found');
      }

      return contactCategory;
    }

    // create
    public static async createContractCategory(doc) {
      const parentCategory = doc.parentId
        ? await models.ContractCategories.findOne({
            _id: doc.parentId
          }).lean()
        : undefined;

      // Generatingg order
      doc.order = await this.generateOrder(parentCategory, doc);

      return models.ContractCategories.create(doc);
    }

    public static async updateContractCategory(_id, doc) {
      const parentCategory = doc.parentId
        ? await models.ContractCategories.findOne({
            _id: doc.parentId
          }).lean()
        : undefined;

      if (parentCategory && parentCategory.parentId === _id) {
        throw new Error('Cannot change category');
      }

      // Generatingg  order
      doc.order = await this.generateOrder(parentCategory, doc);

      const carCategory = await models.ContractCategories.getContractCatogery({
        _id
      });

      const childCategories = await models.ContractCategories.find({
        $and: [
          { order: { $regex: new RegExp(carCategory.order, 'i') } },
          { _id: { $ne: _id } }
        ]
      });

      await models.ContractCategories.updateOne({ _id }, { $set: doc });

      // updating child categories order
      childCategories.forEach(async category => {
        let order = category.order;

        order = order.replace(carCategory.order, doc.order);

        await models.ContractCategories.updateOne(
          { _id: category._id },
          { $set: { order } }
        );
      });

      return models.ContractCategories.findOne({ _id });
    }

    public static async removeContractCategory(_id) {
      await models.ContractCategories.getContractCatogery({ _id });

      let count = await models.Contracts.countDocuments({ categoryId: _id });
      count += await models.ContractCategories.countDocuments({
        parentId: _id
      });

      if (count > 0) {
        throw new Error("Can't remove a contract category");
      }

      return models.ContractCategories.deleteOne({ _id });
    }

    /**
     * Generating order
     */
    public static async generateOrder(parentCategory, doc) {
      const order = parentCategory
        ? `${parentCategory.order}/${doc.code}`
        : `${doc.code}`;

      return order;
    }
  }

  contractCategorySchema.loadClass(ContractCategory);

  return contractCategorySchema;
};
