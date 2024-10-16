import express from 'express'
import { db, connectToDb} from './db.js'
import fs from 'fs'
import admin from 'firebase-admin'
import path from 'path'
import 'dotenv/config'

// reacreating __dirname when the type is not equal to module
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// credentials.json file is used with Google Cloud
const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
)
admin.initializeApp({
  credential: admin.credential.cert(credentials)
})


const app = express()

app.use(express.json())

// below lets the Node server serve provided files statically
app.use(express.static(path.join(__dirname, '../build')))

// handle any requests that do not stat with "/api"
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.use(async (req, res, next) => {
  const authToken = req.headers.authorization; // Use authorization header with Bearer token pattern
  console.log("The request headers were: ", req.headers);

  if (authToken && authToken.startsWith("Bearer ")) {
    const token = authToken.split("Bearer ")[1]; // Extract the token part after 'Bearer '
    console.log("Got an authToken:", token);

    try {
      req.user = await admin.auth().verifyIdToken(token); // Verify the token
      console.log("Verified the token with answer: ", req.user);
    } catch (e) {
      console.log("Caught an error: ", e);
      return res.sendStatus(400);
    }
  }

  // If the user is not logged in, allow them to browse anonymously
  req.user = req.user || {};

  next();
});


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

// endpoint for fetching articles
app.get('/articles', (res) => {
  const articles = articlesInfo.find({}).toArray()
  if(articles.length > 0) {
    res.send(articles)
  } else {
    res.send('No articles to show')
  }
});

// load information about a given article from MongoDB
app.get('/api/articles/:name', async (req, res) => {
  const {name} = req.params
  const { uid } = req.user

  const article = await db.collection('articles').findOne({ name })

  if (article) {
    const upvoteIdsOfArticles = article.upvoteIds || []
    article.canUpvote = uid && !upvoteIdsOfArticles.includes(uid)
    res.json(article)
  } else {
    res.sendStatus(404)
  }
})

app.use((req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(401)
  }
})

// upvote endpoint using MongoDB
app.put('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params
  const { uid } = req.user


  try {
    const article = await db.collection('articles').findOne({ name })

    const upvoteIdsOfArticles = article.upvoteIds || []
    const canUpvote = uid && !upvoteIdsOfArticles.includes(uid)

    if (canUpvote) {
      await db.collection('articles').updateOne(
        { name },
        {
          $inc: { upvotes: 1},
          $push: { upvoteIds: uid },
        },
      )

    const updatedArticle = await db.collection('articles').findOne({ name })
  
    // have server respond with an updated article instead of a message
    res.json(updatedArticle)
    } else {
      res.status(404).send('That article does not exist')
  }
 } catch (error) {
  console.error('Error upvoting article:', error);
    res.status(500).send('Internal Server Error');
 }
})

// adding comments to articles endpoint using MongoDB
app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params
  const { text } = req.body
  const { email } = req.user

  await db.collection('articles').updateOne({name},{
    $push: {comments: { postedBy: email, text }},
  })
  
  const article = await db.collection('articles').findOne({ name })

  if (article) {
    res.json(article)
  } else {
    res.send('That article does not exist.')
  }
})

// tell server which port to listen to based on environment variable from hosting platform or locally
const PORT = process.env.PORT || 8000
console.log('The PORT value is: ',PORT)

connectToDb(() => {
  console.log('Successfully connected to the database!')
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
})