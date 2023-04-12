const { Pool } = require('pg')  //destructuring
 
const pool = new Pool( ); //connect to postgres database
 
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}