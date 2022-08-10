import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';


//caso aconteça erro, dispara no console
db.on('error', console.log.bind(console, 'Erro de conexão com o banco'))
//tentativa de conexão, caso dê certo, console informa
db.once('open', () => console.log('conexão com o banco feita com sucesso'))

const app = express();

app.use(express.json())

routes(app)

export default app;
