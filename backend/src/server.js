import express from 'express'
import { MongoClient } from 'mongodb'


const app = express()
const port = 8000

let articlesInfo = [{
  name: 'learn-node',
  upvotes: 0,
  comments: [],
},{
  name: 'learn-mongodb',
  upvotes: 0,
  comments: [],
},{
  name: 'learn-react',
  upvotes: 0,
  comments: [],
}]

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/hello', (req, res) => {
	res.send(`Hello ${req.body.name}, how are you?`)
})

app.get('/hello/:name/bye/:otherName', (req, res) => {
  const {name, otherName} = req.params;
  res.send(`Hello ${name} and goodbye ${otherName}`)
})

// upvote endpoint without a db
app.put('/api/articles/:name/upvote', (req, res) => {
  const { name } = req.params
  const article = articlesInfo.find(a => a.name && a.name === name)
  if (!article) {
    res.status(404).send('That article does not exist.');
  }
  article.upvotes += 1
  res.send(`The ${article.name} article now has ${article.upvotes} upvotes!`)
})

// endpoint for adding comments to articles
app.post('/api/articles/:name/comments', (req, res) => {
  const { name } = req.params
  const { postedBy, text } = req.body

  const article = articlesInfo.find(a => a.name === name)
  if (article) {
    article.comments.push({ postedBy, text})
    res.send(article.comments)
  } else {
    res.send('That article does not exist.')
  }
})

// use Mongodb to load information about a given article
app.get('/api/articles/:name', async (req, res) => {
  const {name} = req.params

  const client = new MongoClient('mongodb://127.0.0.1:27017')
  await client.connect()

  const db = client.db('react-blog-db')

  const article = await db.collection('articles').findOne({ name })
  if (article) {
    res.json(article)
  } else {
    res.sendStatus(404)
  }
})

// upvote endpoing using Mongodb
app.put('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params
  
  const client = new MongoClient('mongodb://127.0.0.1:27017')
  await client.connect()

  const db = client.db('react-blog-db')

  await db.collection('articles').updateOne({ name }, {
    $inc: { upvotes: 1}
   })

  const article = await await db.collection('articles').findOne({ name })

  if (!article) {
    res.status(404).send('That article does not exist.');
  }
  
  res.send(`The ${article.name} article now has ${article.upvotes} upvotes!`)
})

// adding comments to articles endpoint using MongoDB
app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params
  const { postedBy, text } = req.body

  const client = new MongoClient('mongodb://127.0.0.1:27017')
  await client.connect()

  const db = client.db('react-blog-db')

  await db.collection('articles').updateOne({name},{
    $push: {comments: { postedBy, text }}
  })
  
  const article = await db.collection('articles').findOne({ name })

  if (article) {
    res.send(article.comments)
  } else {
    res.send('That article does not exist.')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})