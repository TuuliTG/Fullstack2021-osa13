const Blog = require('./blog')
const User = require('./user')
const BlogsList = require('./blogsList')
const ReadingList =  require('./readingList')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(ReadingList, {through: BlogsList})
ReadingList.belongsToMany(Blog, {through: BlogsList, as:'readings'})

ReadingList.belongsTo(User)
User.hasOne(ReadingList)

module.exports = {Blog, User, ReadingList, BlogsList}