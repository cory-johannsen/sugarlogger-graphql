import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Reading {
    id: Int!
    value: Int!
    takenAt: String!
  }


  input ReadingInput {
    id: Int!
    value: Int!
    takenAt: String!
  }

  type Query {
    readings: [Reading!]
  }

  type Mutation {
    addReading(value: Int!, takenAt: String!): Reading!
  }

`)

export default schema
