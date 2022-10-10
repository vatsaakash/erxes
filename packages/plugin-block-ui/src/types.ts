import { QueryResponse } from '@erxes/ui/src/types';

export interface IPackageDoc {
  name: string;
  description: string;
  wpId: string;
  level: string;
  projectWpId: string;
  projectId: string;
  price: number;
  duration: number;
  profit: number;
}

export interface IPackage extends IPackageDoc {
  _id: string;
  createdAt: Date;
  modifiedAt: Date;
}

export type PackagesQueryResponse = {
  packages: IPackage[];
} & QueryResponse;

export type packageTotalCountQueryResponse = {
  packageCounts: number;
  loading: boolean;
  refetch: () => void;
};

export type packageRemoveMutationResponse = {
  packagesRemove: (mutation: {
    variables: { packageIds: string[] };
  }) => Promise<any>;
};
