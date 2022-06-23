const list = `
  query surveysQuery {
    surveys {
      _id
      name
    }
  }
`;

const totalCount = `
  query surveysTotalCountQuery {
    surveysTotalCount
  }
`;

export default {
  list,
  totalCount
};
