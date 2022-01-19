export const types = `
  type Ad {
    customerId: String
    loyalty: Float
  }

  type Loyalty {
    modifiedAt: Date,
    customerId: String,
    value: Float,
    dealId: String,
    userId: String,

    user: User
    customer: Customer
    deal: Deal
  }


`;

export const queries = `
  ads(
    tagId: String
    page: Int
    perPage: Int
  ): JSON
`;
