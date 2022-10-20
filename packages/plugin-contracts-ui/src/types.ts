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
  isRoot: boolean;
}

export interface IContractCategory extends IContractCategoryDoc {
  _id: string;
  order: string;
  createdAt: Date;
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
  contractDetail: IContract;
  loading: boolean;
};

export type ContractCategoriesQueryResponse = {
  contractCategories: IContractCategory[];
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
