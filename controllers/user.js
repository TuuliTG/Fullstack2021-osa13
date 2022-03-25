const router = require('express').Router()
require('express-async-errors')
const { User, Blog } = require('../models')

const userFinder = async (req, res, next) => {
    req.user = await User.findAll({
        where: {username: req.params.username},
        include: {
            model: Blog
        }
    })
    next()
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
      include: {
          model: Blog
      }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

router.get('/:username', userFinder, async (req, res) => {
  if (req.user) {
    res.json(req.user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', userFinder, async (req, res) => {
    if (req.user) {
        req.user[0].name = req.body.name
        await req.user[0].save()
        res.json(req.user[0])
    } else {
        res.status(404).end()
    }
})

module.exports = router