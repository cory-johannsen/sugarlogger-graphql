import Dose from './Dose'


function fetchDoses(database, query, parameters) {
  // console.log('fetchDoses entered:', query, parameters)

  return database.query(query, parameters)
    .then((results) => {
      return results.rows.map((row) => {
        return new Dose(row.id, row.value, row.taken_at)
      })
    })
    .catch((error) => {
      console.log('fetchDoses error:', error)
      return error
    })
}

const query = 'SELECT * FROM dose'

export default class DoseRepository {
  constructor(database) {
    this.database = database
  }

  findAll() {
    return fetchDoses(this.database, query + ' ORDER BY taken_at DESC', [])
  }

  findById(id) {
    return fetchDoses(this.database, query + ' WHERE id=$1', [id])
      .then((results) => {
        if (results.length > 0) {
          return results[0]
        }
      })
  }


  create(value, takenAt) {
    console.log('DoseRepository.create:', value, takenAt)
    const query = 'INSERT INTO dose (value, taken_at) VALUES($1, $2)'
    console.log('DoseRepository.create: query:', query)
    return this.database.query(query, [value, takenAt])
      .then((results) => {
        return this.findAll().then((doses) => {
          console.log('returning new dose', doses[0])
          return doses[0]
        })
      }).catch(e => {
        console.log(e)
        return e
      })
  }

  remove(id) {
    console.log('DoseRepository.remove:', id)
    const query = 'DELETE FROM dose WHERE id=$1'
    return this.database.query(query, [id])
      .then((results) => {
        return true
      }).catch(e => {
        console.log(e)
        return e
      })
  }
}
