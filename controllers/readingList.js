const router = require('express').Router()
require('express-async-errors')
const { Op } = require('sequelize')

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
        console.log('no reading list found, creating list')
        
        readingList = await ReadingList.create({
            userId: user_id
        })
    }
    const readingListId = req.readingList === null ? readingList.id : req.readingList.id    
    const blogList = await BlogsList.create({
        blogId: blog_id,
        readingListId: readingListId
    })
    res.json(blogList)
})

router.put('/:id', async (req, res) => {
  const user = req.user
  
  if(user){
    const list = await ReadingList.findOne({where: {userId: user.id}})
    if(list) {
        const bloglist = await BlogsList.findOne({
            where: {
                [Op.and]: {
                    readingListId: list.id,
                    blogId: req.params.id
                }
            }
        })
        if(bloglist) {
            bloglist.read = req.body.read
            await bloglist.save()
            res.json(bloglist)
        } else {
            res.status(404).end()
        }
    }
  } else {
    res.status(403).end()
  }
})

module.exports = router