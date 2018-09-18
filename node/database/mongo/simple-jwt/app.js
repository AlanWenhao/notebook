const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const methods = require('./middlewares/methods');
const { PORT } = require('./config');
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
express.urlencoded({ extended: true })

app.use(methods);

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
