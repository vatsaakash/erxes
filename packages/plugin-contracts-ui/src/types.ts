import { IUser, IUserDoc } from '@erxes/ui/src/auth/types';
import { QueryResponse } from '@erxes/ui/src/types';

export interface IContractDoc {
  name: string;
  contractId: string;
  categoryId: string;
  status: string;
  servicePackageId: number;
  userId: string;
  selectedMemberIds: string;
  apartmentId: string;
  deviceId: string;
  entranceNum: number;
  doorNum: number;
  orderCreatedDate: Date;
  installFinishedDate: Date;
  contractStartedDate: Date;
  contractCancelledDate: Date;
  contractEndDate: Date;
  serviceLoginUser: string;
  servicePassword: string;
  parentalControlEnableStatus: string;
  penaltyServiceFee: number;
}

export interface IContract extends IContractDoc {
  _id: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface IContractCategoryDoc {
  name: string;
  code: string;
  parentId?: string;
  description?: string;
  contractCount: number;
  contractTemplateCount: number;
  isRoot: boolean;
}

export interface IContractCategory extends IContractCategoryDoc {
  _id: string;
  order: string;
  createdAt: Date;
}

export interface IContractTemplateDoc {
  name: string;
  content: string;
  categoryId: string;
  createdAt?: Date;
  modifiedAt?: Date;
  createdBy?: string;
  createdUser?: IUser;
}

export interface IContractTemplate extends IContractTemplateDoc {
  _id: string;
}

export type ContractsQueryResponse = {
  contracts: IContract[];
} & QueryResponse;

export type ContractTotalCountQueryResponse = {
  contractCounts: number;
  loading: boolean;
  refetch: () => void;
};

export type ContractRemoveMutationResponse = {
  contractsRemove: (mutation: {
    variables: { contractIds: string[] };
  }) => Promise<any>;
};

export type DetailQueryResponse = {
  contractDetails: IContract;
  loading: boolean;
};

export type ContractCategoriesQueryResponse = {
  contractCategories: IContractCategory[];
  loading: boolean;
  refetch: () => void;
};

export type ContractTemplatesQueryResponse = {
  contractTemplates: IContractTemplate[];
  loading: boolean;
  refetch: () => void;
};

export type ContractTemplatesCountQueryResponse = {
  contractTemplateTotalCounts: number;
  loading: boolean;
  refetch: () => void;
};

export type ContractCategoriesCountQueryResponse = {
  contractCategoriesTotalCount: number;
  loading: boolean;
  refetch: () => void;
};

export type CategoryDetailQueryResponse = {
  contractCategoryDetail: IContractCategory;
  loading: boolean;
};

export type ContractCategoryRemoveMutationResponse = {
  contractCategoriesRemove: (mutation: {
    variables: { _id: string };
  }) => Promise<any>;
};

export type ContractTemplateMutationVariables = {
  name: string;
  categoryId: string;
  content: string;
};

export type ContractTemplateMutationResponse = {
  addContractTemplateMutation: (params: {
    variables: ContractTemplateMutationVariables;
  }) => Promise<any>;
};

export type ContractTemplateRemoveMutationResponse = {
  contractTemplateRemove: (mutation: {
    variables: { _id: string };
  }) => Promise<any>;
};

export type ContractTemplateDuplicateMutationResponse = {
  contractTemplatesDuplicate: (mutation: {
    variables: { _id: string };
  }) => Promise<any>;
};

export type ContractTemplateEditQueryResponse = {
  editContractTemplateMutation: (mutation: {
    variables: { _id: string };
  }) => Promise<any>;
  loading: boolean;
};

export type ContractTemplateDetailQueryResponse = {
  contractTemplateDetails: IContractTemplate;
  loading: boolean;
};
