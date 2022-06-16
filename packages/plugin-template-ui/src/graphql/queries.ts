const templates = `
  query templatesQuery {
    templates {
      _id
      name
      content
      contentType
    }
  }
`;

const totalCount = `
  query templatesTotalCountQuery {
    templatesTotalCount
  }
`;

export default {
  templates,
  totalCount
};
