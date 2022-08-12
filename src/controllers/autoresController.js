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
    const autor = await autores.find()
    if(!autor) return res.status(400).send({message: `${err.message} - Autor não encontrado`})
    res.json(autor)
  }

  // static listarAutorPorId = (req,res) =>{
  //   const id = req.params.id;
  //   autores.findById(id, (err,autores) =>{
  //     if(err){
  //       res.status(400).send({message: `${err.message} - ID não encontrado`})
  //     }else{
  //       res.status(200).send(autores)
  //     }
  //   } )
  // }  
  
  static listarAutorPorId = async (req,res) =>{
    const id = req.params.id;
    const autor = await autores.findById(id)
    if(!autor){
      //não esta exibindo a mensagem de erro
      res.status(200).send({'message': "ID nao encontrado"})
    }else{
      res.status(200).send(autor)
    }

    // if(!autor){
    //   // res.status(400).json({"message": "Sem autores"});
    //   // console.log("nao encontrado")
    //   res.send("nao encontrado")
    //   console.log("nao deu")

    // }else{
    //   res.status(200).send(autor)
    // }
}  
  

// utiliza o schema para cadastrar autor, o metodo save para salvar no banco com o tratamento de erro. caso sucesso, retorna o status e converte em JSON 
  static cadastrarAutor = (req,res) =>{
    let autor = new autores(req.body);
    autor.save((err) =>{
      if (err){
        res.status(500).send({message: `${err.message} - falha ao cadastrar autor` })
      }else{
        res.status(201).send(autor.toJSON())
      }
    })
  }
  
  static atualizarAutor = (req,res) =>{
    const id = req.params.id;
    autores.findByIdAndUpdate(id, {$set: req.body},(err) =>{
      if(!err){
        res.status(200).send({message: 'autor atualizado com sucesso'})
      }else{
        res.status(500).send({message:err.message})
      }
    })
  }

  static deletarAutor = (req,res) =>{
    const id = req.params.id;
    autores.findByIdAndDelete(id, (err,autores) =>{
      if(!err){
        res.status(200).send({message: "autor removido"})
      }else{
        res.status(500).send({message: err.message})
      }
    } )
  }
}

export default AutorController