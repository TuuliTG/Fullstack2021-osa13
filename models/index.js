const Blog = require('./blog')
const User = require('./user')
const BlogsList = require('./blogsList')
const ReadingList =  require('./readingList')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(ReadingList, {through: BlogsList})
ReadingList.belongsToMany(Blog, {through: BlogsList, as:'readings'})

ReadingList.belongsTo(User)
User.hasOne(ReadingList)

User.hasOne(Session)

module.exports = {Blog, User, ReadingList, BlogsList, Session}