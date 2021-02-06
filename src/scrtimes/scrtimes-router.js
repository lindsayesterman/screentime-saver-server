const path = require('path')
const express = require('express')
const xss = require('xss')
const ScrtimesService = require('./scrtimes-service')

const scrtimesRouter = express.Router()
const jsonParser = express.json()

const serializeScrtime = scrtime => ({
  id: scrtime.id,
  day_1: xss(scrtime.day_1),
  day_2: xss(scrtime.day_2),
  day_3: xss(scrtime.day_3),
  day_4: xss(scrtime.day_4),
  day_5: xss(scrtime.day_5),
  day_6: xss(scrtime.day_6),
  day_7: xss(scrtime.day_7),
  user_id: scrtime.user_id
})

scrtimesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ScrtimesService.getAllScrtimes(knexInstance)
      .then(scrtimes => {
        res.json(scrtimes.map(serializeScrtime))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { day_1, day_2, day_3 , day_4, day_5,day_6, day_7, user_id  } = req.body
    const newScrtime = { day_1, day_2, day_3 , day_4, day_5, day_6, day_7, user_id:req.user.id }

    for (const [key, value] of Object.entries(newScrtime)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    ScrtimesService.insertScrtime(
      req.app.get('db'),
      newScrtime
    )
      .then(scrtime => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${scrtime.id}`))
          .json(serializeScrtime(scrtime))
      })
      .catch(next)
  })

scrtimesRouter
  .route('/:scrtime_id')
  .all((req, res, next) => {
    ScrtimesService.getById(
      req.app.get('db'),
      req.params.scrtime_id
    )
      .then(scrtime => {
        if (!scrtime) {
          return res.status(404).json({
            error: { message: `Scrtime doesn't exist` }
          })
        }
        res.scrtime = scrtime
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeScrtime(res.scrtime))
  })
  .delete((req, res, next) => {
    ScrtimesService.deleteScrtime(
      req.app.get('db'),
      req.params.scrtime_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

  .patch(jsonParser, (req, res, next) => {
    const { day_1, day_2, day_3 , day_4, day_5, day_6, day_7, user_id } = req.body
    const scrtimeToUpdate = {  day_1, day_2, day_3 , day_4, day_5, day_6, day_7, user_id }

    const numberOfValues = Object.values(scrtimeToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either day_1, day_2, day_3 , day_4, day_5, day_6, day_7, or user_id '`
        }
      })

    ScrtimesService.updateScrtime(
      req.app.get('db'),
      req.params.scrtime_id,
      scrtimeToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = scrtimesRouter