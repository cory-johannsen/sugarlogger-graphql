import Meal from './Meal'

function fetchMeals(database, query, parameters) {
  console.log('fetchMeals entered:', query, parameters)

  return database.query(query, parameters)
    .then((results) => {
      return results.rows.map((row) => {
        return new Meal(row.id, row.description, row.eaten_at, row.sugars, row.carbohydrates, row.calories)
      })
    })
    .catch((error) => {
      console.log('fetchMeals error:', error)
      return error
    })
}

const query = 'SELECT * FROM meal'

export default class MealRepository {
  constructor(database) {
    this.database = database
  }

  findAll() {
    return fetchMeals(this.database, query + ' ORDER BY eaten_at DESC', [])
  }

  findById(id) {
    return fetchMeals(this.database, query + ' WHERE id=$1', [id])
      .then((results) => {
        if (results.length > 0) {
          return results[0]
        }
      })
  }


  create(description, eatenAt, sugars, carbohydrates, calories) {
    console.log('MealRepository.create:', description, eatenAt, sugars, carbohydrates, calories)
    const query = 'INSERT INTO meal (description, eaten_at, sugars, carbohydrates) VALUES($1, $2, $3, $4, $5)'
    console.log('MealRepository.create: query:', query)
    return this.database.query(query, [description, eatenAt, sugars, carbohydrates, calories])
      .then((results) => {
        return this.findAll().then((meals) => {
          console.log('returning new meal', meals[0])
          return meals[0]
        })
      }).catch(e => {
        console.log(e)
        return e
      })
  }

  remove(id) {
    console.log('MealRepository.remove:', id)
    const query = 'DELETE FROM meal WHERE id=$1'
    return this.database.query(query, [id])
      .then((results) => {
        return true
      }).catch(e => {
        console.log(e)
        return e
      })
  }
}
