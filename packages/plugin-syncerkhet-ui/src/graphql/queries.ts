// Settings

const configs = `
  query configs {
    configs {
      _id
      code
      value
    }
  }
`;

const unSyncedItems = `
  query unSyncedItems ($contentType: string, $ids: [String]) {
    unSyncedItems (contentType: $contentType, ids: $ids) {
      id
      isSynced
    }
  }
`;

const checkSyncItems = `
  query checkSyncItems (
    $contentType: String,
    $page: Int,
    $perPage: Int,

    $boardId: String
    $pipelineId: String
    $stageId: String

    $posId: String

    $beginDate: Date
    $endDate: Date
  ) {
    checkSyncItems (
      contentType: $contentType
      page: $page
      perPage: $perPage

      boardId: $boardId
      pipelineId: $pipelineId
      stageId: $stageId

      posId: $posId

      beginDate: $beginDate
      endDate: $endDate
    ) {
      id
      isSynced
    }
  }
`;

export default {
  configs,
  checkSyncItems,
  unSyncedItems
};
