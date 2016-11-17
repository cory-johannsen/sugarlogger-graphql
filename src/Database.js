import Pool from 'pg-pool'

export default class Database {

  constructor() {
    this.pool = new Pool({
      database: 'sugarlogger',
      user: 'sugarlogger',
      //host: 'localhost',
      host: 'sugarlogger.cq3xeric7bhh.us-east-1.rds.amazonaws.com',
      post: 5432,
      ssl: false,
      max: 20, // set pool max size to 20
      min: 1,  // set min pool size to 1
      idleTimeoutMillis: 1000 // close idle clients after 1 second
    })
  }

  query = (text, values) => {
    // console.log(`Database.query: \"${text}\" ${values}`)
    return this.pool.query(text, values)
  }
}
