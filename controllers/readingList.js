const router = require('express').Router()
require('express-async-errors')

const { ReadingList, BlogsList } = require('../models')

const readingListFinder = async (req, res, next) => {    
    const list = await ReadingList.findOne({where: {userId: req.body.user_id}})
    req.readingList = list === null ? null : list
    next()
}

router.post('', readingListFinder,async (req, res) => {
    const {blog_id, user_id} = req.body
    let readingList

    if(!req.readingList) {
        console.log('no reading list found, creating list');
        
        readingList = await ReadingList.create({
            userId: user_id
        })
    }
    const readingListId = req.readingList === null ? readingList.id : req.readingList.id
    console.log('readingListId', readingListId);
    console.log('Blog id', blog_id);
    
    
    const blogList = await BlogsList.create({
        blogId: blog_id,
        readingListId: readingListId
    })
    res.json(blogList)
})

module.exports = router