import express from 'express'
const app = express()
const port = 8000

let articlesInfo = [{
  name: 'learn-node',
  upvotes: 0,
},{
  name: 'learn-mongodb',
  upvotes: 0,
},{
  name: 'learn-react',
  upvotes: 0,
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
app.put('/api/articles/:name/upvote',(req, res) => {
  const { name } = req.params
  const article = articlesInfo.find(a => a.name && a.name === name)
  if (!article.name) {
    res.send('That article does not exist.')
  }
  article.upvotes += 1
  res.send(`The ${article.name} article now has ${article.upvotes} upvotes!`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})