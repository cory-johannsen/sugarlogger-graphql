import Reading from './Reading'


function fetchReadings(database, query, parameters) {
  // console.log('fetchReadings entered:', query, parameters)

  return database.query(query, parameters)
    .then((results) => {
      return results.rows.map((row) => {
        return new Reading(row.id, row.name)
      })
    })
    .catch((error) => {
      console.log('fetchReadings error:', error)
      return error
    })
}

const query = 'SELECT * FROM reading'

export default class ReadingRepository {
  constructor(database) {
    this.database = database
  }

  findAll() {
    return fetchReadings(this.database, query, [])
  }

  findById(id) {
    return fetchReadings(this.database, query + ' WHERE id=$1', [id])
      .then((results) => {
        if (results.length > 0) {
          return results[0]
        }
      })
  }


  create(value, takenAt) {
    console.log('ReadingRepository.create:', departmentName)
    const query = 'INSERT INTO reading (value, taken_at) VALUES($1, $2)'
    console.log('ReadingRepository.create: query:', query)
    return this.database.query(query, [value, takenAt])
      .then((results) => {
        const readings = this.findAll()
        return readings[readings.length - 1]
      }).catch(e => {
        console.log(e)
        return e
      })
  }

}
