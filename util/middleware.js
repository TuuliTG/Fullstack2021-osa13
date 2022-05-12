const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')

const userExtractor = async (request, response, next) => {
    console.log('userExtractor')
    request.token = getTokenFrom(request)
    let decodedToken
    if (request.token) {
      const isValid = await tokenIsStillValid(request.token)
      if(isValid) {      
        try {
          decodedToken = jwt.verify(request.token, SECRET)
          if (decodedToken.id) {
            const user = await User.findByPk(decodedToken.id)
            if(!user.disabled){
              request.user = user
            } else {
              await Session.destroy({
                where: {
                    user_id: user.id
                }
            })
            }
          }
        } catch (error) {
          request.user = null
        }
      } else {
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

  const tokenIsStillValid = async (token) => {
    const session = await Session.findOne({
      where: {
        token: token
      }
    })    
    if (session !== null) {      
      return true 
    } else {      
      return false
    }
  }

  module.exports = {userExtractor}