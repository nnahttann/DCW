let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

app.use('/api', bodyParser.json(), router); //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);
let bears = {
    list: [
        { "id": 1, "name": "Winnie", "weight": 50 },
        { "id": 2, "name": "Pooh", "weight": 60 }]
}
router.route('/bears')
    .get((req, res) => res.json(bears))
    .post((req, res) => {
        console.log(req.body)
        let newBear = {}
        newBear.id = (bears.list.length) ? bears.list[bears.list.length - 1].id + 1 : 1
        newBear.name = req.body.name
        newBear.weight = req.body.weight
        bears = { "list": [...bears.list, newBear] }
        res.json(bears)
    })

app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, () => console.log('server is running...'))