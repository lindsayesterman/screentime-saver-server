const path = require('path')
const express = require('express')
const xss = require('xss')
const FriendsService = require('./friends-service')

const friendsRouter = express.Router()
const jsonParser = express.json()

const serializeFriend = friend => ({
  id: friend.id,
  friend_name: xss(friend.friend_name),
  friend_user_id: xss(friend.friend_user_id),
  date_created: friend.date_created,
})

friendsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    FriendsService.getAllFriends(knexInstance)
      .then(friends => {
        res.json(friends.map(serializeFriend))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { friend_name, friend_user_id  } = req.body
    const newFriend = { friend_name, friend_user_id }

    for (const [key, value] of Object.entries(newFriend)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    newFriend.friend_name = friend_name;
    newFriend.friend_user_id = friend_user_id;

    FriendsService.insertFriend(
      req.app.get('db'),
      newFriend
    )
      .then(friend => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${friend.id}`))
          .json(serializeFriend(friend))
      })
      .catch(next)
  })

friendsRouter
  .route('/:friend_id')
  .all((req, res, next) => {
    FriendsService.getById(
      req.app.get('db'),
      req.params.friend_id
    )
      .then(friend => {
        if (!friend) {
          return res.status(404).json({
            error: { message: `Friend doesn't exist` }
          })
        }
        res.friend = friend
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeFriend(res.friend))
  })
  .delete((req, res, next) => {
    FriendsService.deleteFriend(
      req.app.get('db'),
      req.params.friend_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { friend_name, friend_user_id } = req.body
    const friendToUpdate = { friend_name, friend_user_id }

    const numberOfValues = Object.values(friendToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'friend_name'`
        }
      })

    FriendsService.updateFriend(
      req.app.get('db'),
      req.params.friend_id,
      friendToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = friendsRouter