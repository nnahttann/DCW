const express = require('express')
const app = express()
const cors = require('cors');
const PORT = 8000
let tasks = [
    { id: 1, name: 'Natthanon', weight : '61' ,picture:'https://img.salehere.co.th/p/1200x0/2021/04/12/qncbwapob7oc.jpg'},
    { id: 2, name: 'Non', weight : '35512' ,picture:'https://s.isanook.com/ca/0/ui/279/1398683/smudge_lord_74676910_3081513485321810_7742727386609073468_n_1577935993.jpg'},
    { id: 3, name: 'Narit', weight : '060' ,picture:'https://s.isanook.com/ca/0/ui/279/1398683/smudge_lord_69227705_153198209115656_5516742357305190864_n_1577936001.jpg'}
]
app.use(cors())

app.get('/', (req, res) => {
    res.json(tasks)
})

app.listen(PORT, () => console.log(`listen at ${PORT}`))