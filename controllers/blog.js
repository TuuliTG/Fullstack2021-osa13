const router = require('express').Router()

const { Blog } = require('../models')

router.get('', async (req, res) => {
    try{
    const blogs = await Blog.findAll()
    res.json(blogs)
    } catch(error) {
        console.log('error in get')
        return res.status(400).json({ error })
    }
})

router.post('', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        res.json(blog)
    } catch(error) {
        console.log('error in post')
        return res.status(400).json({ error })
    }
    
})

router.delete('/:id', async (req, res) => {    
    const id = req.params.id
    try {
        await Blog.destroy({
            where: {
                id: id
            }
        })
        res.status(204).end()
    } catch(error) {
        console.log('error in delete')
        return res.status(400).json({ error })
    }
})

module.exports = router