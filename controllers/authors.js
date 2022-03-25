const router = require('express').Router()
require('express-async-errors')
sequelize = require('sequelize')

const {Blog} = require('../models')

router.get('', async (req,res) => {
    const authors = await Blog.findAll({
        attributes: ['author', 
        [sequelize.fn("COUNT", sequelize.col('id')), "blogs"],
        [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
        ],
        group: 'author'
    })
    res.json(authors)
})

module.exports = router