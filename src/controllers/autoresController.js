import autores from '../models/Autor.js';

class AutorController {
  
//find encontra todos os autores, o callback devolve os autores encontrados em json. há tratamento de erro como parametro
  // static listarAutores = (req,res) =>{
  //   autores.find((err, autores) =>{
  //     res.status(200).json(autores);
  //   })
  // }

  //cara youtube q funciona
  // static listarAutores = async (req,res) =>{
  //   const autoresBusca = await autores.find()
  //   if(!autoresBusca) return res.status(200).json({'message': "Sem autores"});
  //   res.json(autoresBusca)
  // }  
  
  //teste adaptação
  static listarAutores = async (req,res) =>{
    try{
      const autor = await autores.find()
      res.status(200).json(autor)

    }
    catch(err){
      res.status(400).json({'message': `Lista não encontrada - ${err.message}  `})
    }
  }



  static listarAutorPorId = async (req,res) =>{
    try{
      const id = req.params.id;
      const autor = await autores.findById(id)
      res.status(200).send(autor)
    }
    catch(err){
      res.status(400).json({'message': `ID não encontrado - ${err.message}  `})
    }
}  
  

// utiliza o schema para cadastrar autor, o metodo save para salvar no banco com o tratamento de erro. caso sucesso, retorna o status e converte em JSON 
  // static cadastrarAutor = (req,res) =>{
  //   let autor = new autores(req.body);
  //   autor.save((err) =>{
  //     if (err){
  //       res.status(500).send({message: `${err.message} - falha ao cadastrar autor` })
  //     }else{
  //       res.status(201).send(autor.toJSON())
  //     }
  //   })
  // }  
  
  static cadastrarAutor = async (req,res) =>{
    try{
      let autor = new autores(req.body);
      const cadastroAutor = await autor.save();
      res.status(201).send(cadastroAutor.toJSON())

    }
    catch(err){
      res.status(500).json({'message': `Falha ao cadastrar - ${err.message}  `})
    }
  }
  
  static atualizarAutor = async (req,res) =>{
    try{
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, {$set: req.body})
      res.status(200).send({message: 'Autor atualizado com sucesso'})
    }
    catch(err){
      res.status(500).json({'message': `Falha ao atualizar - ${err.message}  `})
    }
  }
  
  static deletarAutor = async (req,res) =>{
    try{
      const id = req.params.id;
      await autores.findByIdAndDelete(id)
      res.status(200).send({message: "Autor deletado com sucesso"})
    }
    catch(err){
      res.status(500).json({'message': `Falha ao deletar - ${err.message}  `})

    }
  }
}

export default AutorController