const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(port, () => console.log(`Server connected on port ${port}`));
