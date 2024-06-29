const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

const funcionarioRouter = require('./api/funcionario');
const notebookRouter = require('./api/notebook');
const monitorRouter = require('./api/monitor');
const tecladoRouter = require('./api/teclado');
const mouseRouter = require('./api/mouse');
const desktopRouter = require('./api/desktop');
const acessoriosRouter = require('./api/acessorios');
const nobreakRouter = require('./api/nobreak');
const headsetRouter = require('./api/headset');
const celularRouter = require('./api/celular');

app.use('/funcionario', funcionarioRouter);
app.use('/notebook', notebookRouter);
app.use('/monitor', monitorRouter);
app.use('/teclado', tecladoRouter);
app.use('/mouse', mouseRouter);
app.use('/desktop', desktopRouter);
app.use('/acessorios', acessoriosRouter);
app.use('/nobreak', nobreakRouter);
app.use('/headset', headsetRouter);
app.use('/celular', celularRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
