const ScrtimesService = {
    getAllScrtimes(knex) {
      return knex.select('*').from('scrtimes')
    },
   
    insertScrtime(knex, newScrTime) {
      return knex
        .insert(newScrTime)
        .into('scrtimes')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('scrtimes')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteScrtime(knex, id) {
      return knex('scrtimes')
        .where({ id })
        .delete()
    },
  
    updateScrtime(knex, id, newScrtimeFields) {
      return knex('scrtimes')
        .where({ id })
        .update(newScrtimeFields)
    },
  }
  
  module.exports = ScrtimesService