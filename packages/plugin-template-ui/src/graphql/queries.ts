const list = `
  query templatesQuery {
    templates {
      _id
      name
    }
  }
`;

const totalCount = `
  query templatesTotalCountQuery {
    templatesTotalCount
  }
`;

export default {
  list,
  totalCount
};
