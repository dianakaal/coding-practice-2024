import express from 'express'
const app = express()
const port = 8000

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})