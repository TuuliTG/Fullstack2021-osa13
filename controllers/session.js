const router = require('express').Router()
require('express-async-errors')
sequelize = require('sequelize')

const {Session} = require('../models')

router.delete('', async (req,res) => {
    const user = req.user
    if (user) {
        await Session.destroy({
            where: {
                user_id: user.id
            }
        })
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})



module.exports = router