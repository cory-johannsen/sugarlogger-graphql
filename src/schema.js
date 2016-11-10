import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Reading {
    id: Int!
    value: Int!
    takenAt: Int!
  }


  input ReadingInput {
    id: Int!
    value: Int!
    takenAt: Int!
  }

  type Query {
    readings: [Reading!]
  }

  type Mutation {
    addReading(value: Int!, takenAt: Int!): Reading!
  }

`)

export default schema
