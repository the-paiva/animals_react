const jsonServer = require('json-server')
const auth = require('json-server-auth')
const express = require('express') // <--- Use Express
const cors = require('cors')

const app = express()
const router = jsonServer.router('db.json')

app.db = router.db

app.use(cors()) 
app.use(express.json()) // <--- Isso deve corrigir o body parser!
app.use(auth)
app.use(router)

const PORT = 3333
app.listen(PORT, () => {
  console.log(`JSON Server + Auth rodando na porta ${PORT}`)
})