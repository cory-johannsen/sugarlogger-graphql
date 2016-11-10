import express from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'

import schema from './schema'
import Database from './Database'
import ReadingRepository from './ReadingRepository'

const port = process.env.PORT || 3000

const database = new Database()
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
