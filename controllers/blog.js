const router = require('express').Router()
require('express-async-errors')

const { Blog, User } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('', async (req, res) => {
    const blogs = await Blog.findAll({
        include: {
            model: User
        }
    })
    res.json(blogs)
})

router.post('', async (req, res) => {
    const user = req.user
    const {author, url, title} = req.body
    const blog = await Blog.create({
        author: author,
        url: url,
        title: title,
        userId:user.id
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