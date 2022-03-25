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
    const blog = await Blog.create(req.body)
    res.json(blog)

    console.log('error in post')
    return res.status(400).json({ error })
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
    if(req.blog) {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

module.exports = router