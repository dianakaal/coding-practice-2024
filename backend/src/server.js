import express from 'express'
import { db, connectToDb} from './db.js'
import fs from 'fs'
import admin from 'firebase-admin'

const credentials = JSON.parse(
  fs.readFileSync('../credentials.json')
)
admin.initializeApp({
  credential: admin.credential.cert(credentials)
})


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

app.use(async (req, res, next) => {
  const { authToken } = req.headers

  if (authToken) {
    try {
      req.user = await admin.auth().verifyIdToken(authToken)
    } catch (e) {
      res.sendStatus(400)
    }
  } 

  next()
  
})

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
app.put('/api/non-db/articles/:name/upvote', (req, res) => {
  const { name } = req.params
  const article = articlesInfo.find(a => a.name && a.name === name)
  if (!article) {
    res.status(404).send('That article does not exist.');
  }
  article.upvotes += 1
  res.send(`The ${article.name} article now has ${article.upvotes} upvotes!`)
})

// endpoint for adding comments to articles
app.post('/api/non-db/articles/:name/comments', (req, res) => {
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

// APIs which use MongoDb

// load information about a given article
app.get('/api/articles/:name', async (req, res) => {
  const {name} = req.params

  const article = await db.collection('articles').findOne({ name })

  if (article) {
    res.json(article)
  } else {
    res.sendStatus(404)
  }
})

// upvote endpoint
app.put('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params
  
  await db.collection('articles').updateOne({ name }, {
    $inc: { upvotes: 1},
   })

  const article = await db.collection('articles').findOne({ name })

  if (article) {
    // have server respond with an updated article instead of a message
    res.json(article)
  } else {
    res.send('Oops, that article does not exist.');
  }
  
  // old way of responding about an upvote
  //res.send(`The ${article.name} article now has ${article.upvotes} upvotes!`)
})

// adding comments to articles endpoint
app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params
  const { postedBy, text } = req.body

  await db.collection('articles').updateOne({name},{
    $push: {comments: { postedBy, text }},
  })
  
  const article = await db.collection('articles').findOne({ name })

  if (article) {
    res.json(article)
  } else {
    res.send('That article does not exist.')
  }
})

connectToDb(() => {
  console.log('Successfully connected to the database!')
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})