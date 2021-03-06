const express = require('express');
const cors = require('cors');
const login = require('./routes/LoginRoute');
const register = require('./routes/RegisterRoute');
const nursery = require('./routes/NurseryRoute');
const passwordChange = require('./routes/PasswordChangeRoute');
const fertilizer = require('./routes/FertilizerRoute');
const seedling = require('./routes/SeedlingRoute');
const warehouse = require('./routes/WarehouseRoute');
const order = require('./routes/OrderRoute');
const shopitem = require('./routes/ShopItemRoute');
const admin = require('./routes/AdminRoute');
const comment = require('./routes/CommentRoute');
const rating = require('./routes/RatingRoute');
const courier = require('./routes/CourierRoute');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', login);

app.use('/register', register);

app.use('/changepassword', passwordChange);

app.use('/nursery', nursery);

app.use('/fertilizer', fertilizer);

app.use('/seedling', seedling);

app.use('/warehouse', warehouse);

app.use('/order', order);

app.use('/shopitem', shopitem);

app.use('/admin', admin);

app.use('/comment', comment);

app.use('/rating', rating);

app.use('/courier', courier);

app.use(cors());

const port = 3001;

app.listen(port, () => {
  console.log('Server is running!');
});
