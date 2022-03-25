const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
    console.log('userExtractor')
    request.token = getTokenFrom(request)
    let decodedToken
    if (request.token) {
      try {
        decodedToken = jwt.verify(request.token, SECRET)
        if (decodedToken.id) {
          const user = await User.findByPk(decodedToken.id)
          request.user = user
        }
      } catch (error) {
        request.user = null
      }
    } else {
      request.user = null
    }
    next()
  }
  
  const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      console.log('authoritazion found')
      return authorization.substring(7)
    }
    return null
  }

  module.exports = {userExtractor}