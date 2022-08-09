const posCurrentUser = `
  query PosCurrentUser {
    posCurrentUser {
      _id
      createdAt
    createdAt
      details {
        avatar
        birthDate
        description
        fullName
        location
        operatorPhone
        position
        shortName
        workStartedDate
      }
      email
      firstName
      isActive
      isOwner
      lastName
      primaryEmail
      primaryPhone
      username
    }
  }
`;

export default { posCurrentUser };
