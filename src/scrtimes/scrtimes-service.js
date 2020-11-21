const ScrtimesService = {
    getAllScrtimes(knex) {
      return knex.select('*').from('scrtimes')
    },
   
    insertNote(knex, newScrTime) {
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
  
    deleteNote(knex, id) {
      return knex('scrtimes')
        .where({ id })
        .delete()
    },
  
    updateNote(knex, id, newScrtimeFields) {
      return knex('scrtimes')
        .where({ id })
        .update(newScrtimeFields)
    },
  }
  
  module.exports = ScrtimesService