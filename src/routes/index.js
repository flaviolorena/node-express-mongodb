import express from 'express';
import livros from './livrosRoutes.js';
import autores from './autoresRoutes.js'
import editoras from './editorasRoutes.js'

// criação de rota para caminho raiz, pode ser criado aqui
const routes= (app) =>{
  app.route('/').get((req,res) =>{
    res.status(200).send("Hello Biblioteca")
  })

//utilização das rotas externas
  app.use(
    express.json(),
    livros, 
    autores,
    editoras

  )
}
export default routes

