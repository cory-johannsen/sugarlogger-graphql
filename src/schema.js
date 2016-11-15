import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Reading {
    id: Int!
    value: Int!
    takenAt: String!
  }

  type Dose {
    id: Int!
    value: Int!
    takenAt: String!
  }

  type RemoveResult {
    success: Boolean!
    error: String
  }

  input ReadingInput {
    id: Int!
    value: Int!
    takenAt: String!
  }

  input DoseInput {
    id: Int!
    value: Int!
    takenAt: String!
  }

  type Query {
    readings: [Reading!]
    doses: [Dose!]
  }

  type Mutation {
    addReading(value: Int!, takenAt: String!): Reading!
    removeReading(id: Int!): RemoveResult!

    addDose(value: Int!, takenAt: String!): Dose!
    removeDose(id: Int!): RemoveResult!
  }

`)

export default schema
