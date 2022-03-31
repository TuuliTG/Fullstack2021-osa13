const router = require('express').Router()
require('express-async-errors')
const { Op } = require('sequelize')

const { Blog, User } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('', async (req, res) => {
    console.log(req.query)
    let blogs
    if(req.query.search){
        blogs = await Blog.findAll({
            order: [
                ['likes', 'DESC']
            ],
            where: {
                [Op.or]: {
                    title: {
                        [Op.iLike]:'%' + req.query.search + '%'
                    },
                    author: {
                        [Op.iLike]:'%' + req.query.search + '%'
                    }
                }
                
            },
            include: {
                model: User
            }
        })
    } else {
        blogs = await Blog.findAll({
            order: [
                ['likes', 'DESC']
            ],
            include: {
                model: User
            }
        })
    }
    res.json(blogs)
})

router.post('', async (req, res) => {
    const user = req.user
    const {author, url, title, year} = req.body
    const blog = await Blog.create({
        author: author,
        url: url,
        title: title,
        userId:user.id,
        year: year
    })
    res.json(blog)
})

router.delete('/:id', blogFinder,async (req, res) => {    
    const user = req.user
    const blog = req.blog
    console.log('userId',user.id)
    console.log('blog user id', blog.userId)
    if (user && blog.userId === user.id) {
        const id = req.params.id
        await Blog.destroy({
            where: {
                id: id
            }
        })
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

router.put('/:id', blogFinder,async (req, res)=> {
    if (req.blog) {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

module.exports = router