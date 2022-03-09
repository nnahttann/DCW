const express = require('express')
const app = express()
const cors = require('cors');
const PORT = 8000
let tasks = [
    { id: 1, name: 'Natthanon', weight : '61' ,picture:'https://blog.lnw.co.th/wp-content/uploads/2011/09/logo_facebook.jpg'},
    { id: 2, name: 'Non', weight : '35512' },
    { id: 3, name: 'Narit', weight : '060' }
]
app.use(cors())

app.get('/', (req, res) => {
    res.json(tasks)
})

app.listen(PORT, () => console.log(`listen at ${PORT}`))