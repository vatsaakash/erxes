import { QueryResponse } from '@erxes/ui/src/types';

// SETTINGS

export type IConfigsMap = { [key: string]: any };

export type IConfig = {
  _id: string;
  code: string;
  value: any;
};

// query types
export type ConfigsQueryResponse = {
  configs: IConfig[];
  loading: boolean;
  refetch: () => void;
};

export type UnSyncedItemsQueryResponse = {
  configs: IConfig[];
} & QueryResponse;

export type CheckSyncItemsQueryResponse = {
  configs: IConfig[];
} & QueryResponse;

export type CheckItemsMutationVariables = {
  ids: string[];
  contentType: string;
};

export type CheckItemsMutationResponse = {
  checkItems: (params: {
    variables: CheckItemsMutationVariables;
  }) => Promise<any>;
};
