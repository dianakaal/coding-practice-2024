import express from 'express'
import { db, connectToDb} from './db.js'
import fs from 'fs'
import admin from 'firebase-admin'

const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
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

/*app.use(async (req, res, next) => {
  const authToken = req.headers.authorization; // Use authorization header with Bearer token pattern
  console.log("The request headers were: ", req.headers)

  if (authToken) {
    console.log("Got an authToken")
    try {
      req.user = await admin.auth().verifyIdToken(authToken)
      console.log("Verified the token with answer: ", req.user)
    } catch (e) {
      console.log("Caught an error: ", e)
      return res.sendStatus(400)
    }
  }

  // if the user is not logged in, below allows them to browser articles anyhow
  req.user = req.user || {}

  console.log("If this is an empty object then the user is not logged in: ", req.user)

  next()
})*/

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
  console.log("If this is an empty object then the user is not logged in: ", req.user);

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

// APIs which use MongoDb

// load information about a given article
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

// upvote endpoint
app.put('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params
  const { uid } = req.user

  const article = await db.collection('articles').findOne({ name })

  if (article) {
    const upvoteIdsOfArticles = article.upvoteIds || []
    article.canUpvote = uid && !upvoteIdsOfArticles.includes(uid)

    if (canUpvote) {
      await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1},
        $push: { upvoteIds: uid },
       })
    }
    const updatedArticle = await db.collection('articles').findOne({ name })

    // have server respond with an updated article instead of a message
    res.json(updatedArticle)
  } else {
    res.send('That article does not exist')
  }
})

// adding comments to articles endpoint
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

connectToDb(() => {
  console.log('Successfully connected to the database!')
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})