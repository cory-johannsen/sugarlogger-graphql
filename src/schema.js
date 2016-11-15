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

  type Meal {
    id: Int!
    description: String!
    eatenAt: String!
    sugars: Int!
    carbohydrates: Int!
  }

  type RemoveResult {
    success: Boolean!
    error: String
  }

  type Query {
    readings: [Reading!]
    doses: [Dose!]
    meals: [Meal!]
  }

  type Mutation {
    addReading(value: Int!, takenAt: String!): Reading!
    removeReading(id: Int!): RemoveResult!

    addDose(value: Int!, takenAt: String!): Dose!
    removeDose(id: Int!): RemoveResult!

    addMeal(description: String!, eatenAt: String!, sugars: Int!, carbohydrates: Int!): Meal!
    removeMeal(id: Int!): RemoveResult!
  }

`)

export default schema
