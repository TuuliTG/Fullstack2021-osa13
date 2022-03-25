const router = require('express').Router()
require('express-async-errors')

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post('', async (req, res) => {
    const user = req.user
    console.log('creating blog for',user)
    console.log('userId', user.id)
    const {author, url, title} = req.body
    const blog = await Blog.create({
        author: author,
        url: url,
        title: title,
        userId:user.id
    })
    res.json(blog)
})

router.delete('/:id', async (req, res) => {    
    const id = req.params.id
    await Blog.destroy({
        where: {
            id: id
        }
    })
    res.status(204).end()
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