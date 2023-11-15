

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const jwt = require('jsonwebtoken')

app.use(express.urlencoded({extended: false}));
app.use(express.json())
// app.use(require('./routes/gadget'));
// app.use(require('./routes/category'));
app.use(require('./routes/user'));
// app.use(require('./routes/review'));
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`I want to be a great software engineer! Hey It's running on PORT ${PORT}`);
});

module.exports = app