require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    printBlogs()
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

const printBlogs = async () => {
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    for (let index = 0; index < blogs.length; index++) {
        const blog = blogs[index]
        console.log(`${blog.author}: "${blog.title}", ${blog.likes} likes`)
    }
}
main()





