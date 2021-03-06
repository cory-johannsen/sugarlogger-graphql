import express from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'

import schema from './schema'
import RemoveResult from './RemoveResult'
import Database from './Database'
import DoseRepository from './DoseRepository'
import MealRepository from './MealRepository'
import ReadingRepository from './ReadingRepository'

const port = process.env.PORT || 3000

const database = new Database()
const doseRepository = new DoseRepository(database)
const mealRepository = new MealRepository(database)
const readingRepository = new ReadingRepository(database)


// The root provides a resolver function for each API endpoint
const root = {
  readings: () => {
    console.log("Processing request: readings")
    return readingRepository.findAll()
  },

  addReading: (input) => {
    const {value, takenAt} = input
    console.log(`Processing request: addReading('${value}', ${takenAt})`)
    return Promise.all([readingRepository.create(value, takenAt)]
      ).then((values) => {
        console.log('addReading values:', values)
        const reading = values[0]
        console.log('addReading returning:', reading)
        return reading
      }).catch((error) => {
        console.log('addReading error:', error)
      })
  },

  removeReading: (input) => {
    const {id} = input
    console.log(`Processing request: removeReading('${id}')`)
    return Promise.all([readingRepository.remove(id)]
      ).then((values) => {
        console.log('removeReading values:', values)
        return new RemoveResult(true, null)
      }).catch((error) => {
        console.log('addReading error:', error)
        return new RemoveResult(false, error)
      })
  },

  doses: () => {
    console.log("Processing request: doses")
    return doseRepository.findAll()
  },

  addDose: (input) => {
    const {value, takenAt} = input
    console.log(`Processing request: addDose('${value}', ${takenAt})`)
    return Promise.all([doseRepository.create(value, takenAt)]
      ).then((values) => {
        console.log('addDose values:', values)
        const dose = values[0]
        console.log('addDose returning:', dose)
        return dose
      }).catch((error) => {
        console.log('addDose error:', error)
      })
  },

  removeDose: (input) => {
    const {id} = input
    console.log(`Processing request: removeDose('${id}')`)
    return Promise.all([doseRepository.remove(id)]
      ).then((values) => {
        console.log('removeDose values:', values)
        return new RemoveResult(true, null)
      }).catch((error) => {
        console.log('addDose error:', error)
        return new RemoveResult(false, error)
      })
  },

  meals: () => {
    console.log("Processing request: meals")
    return mealRepository.findAll()
  },

  addMeal: (input) => {
    const {description, eatenAt, sugars, carbohydrates} = input
    console.log(`Processing request: addMeal('${description}', ${eatenAt}, ${sugars}, ${carbohydrates})`)
    return Promise.all([mealRepository.create(description, eatenAt, sugars, carbohydrates)]
      ).then((values) => {
        console.log('addMeal values:', values)
        const meal = values[0]
        console.log('addMeal returning:', meal)
        return meal
      }).catch((error) => {
        console.log('addMeal error:', error)
      })
  },

  removeMeal: (input) => {
    const {id} = input
    console.log(`Processing request: removeMeal('${id}')`)
    return Promise.all([doseRepository.remove(id)]
      ).then((values) => {
        console.log('removeMeal values:', values)
        return new RemoveResult(true, null)
      }).catch((error) => {
        console.log('addMeal error:', error)
        return new RemoveResult(false, error)
      })
  }
}

var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack
  }),
  pretty: true,
  graphiql: true
}))

app.post('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack
  }),
  pretty: true,
  graphiql: true
}))

app.listen(port)

console.log(`Running sugarlogger GraphQL API server at localhost:${port}/graphql`)
