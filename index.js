require('dotenv').config()
const { Sequelize, DataTypes, Model } = require('sequelize')
const express = require('express')
const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull:false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

Blog.sync()

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

app.get('/api/blogs', async (req, res) => {
    try{
    const blogs = await Blog.findAll()
    res.json(blogs)
    } catch(error) {
        console.log('error in get')
        return res.status(400).json({ error })
    }
})

app.post('/api/blogs', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        res.json(blog)
    } catch(error) {
        console.log('error in post')
        return res.status(400).json({ error })
    }
    
})

app.delete('/api/blogs/:id', async (req, res) => {    
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
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})

main()