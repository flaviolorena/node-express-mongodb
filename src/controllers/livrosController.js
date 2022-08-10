import livros from '../models/Livro.js';

class LivroController {
  
//find encontra todos os livros, o callback devolve os livros encontrados em json. há tratamento de erro como parametro
  static listarLivros = (req,res) =>{
    livros.find()
      .populate(['autor', 'editora'])
      .exec((err, livros) =>{
        res.status(200).json(livros);
      })
  }  
  static listarLivroPorId = (req,res) =>{
    const id = req.params.id;
    livros.findById(id)
      .populate(['autor', 'editora'])
      .exec(
        (err,livros) =>{
          if(err){
            res.status(400).send({message: `${err.message} - ID não encontrado`})
          }else{
            res.status(200).send(livros)
          }
        } 
      )
  }

// utiliza o schema para cadastrar livro, o metodo save para salvar no banco com o tratamento de erro. caso sucesso, retorna o status e converte em JSON 
  static cadastrarLivro = (req,res) =>{
    let livro = new livros(req.body);
    livro.save((err) =>{
      if (err){
        res.status(500).send({message: `${err.message} - falha ao cadastrar livro` })
      }else{
        res.status(201).send(livro.toJSON())
      }
    })
  }
  
  static atualizarLivro = (req,res) =>{
    const id = req.params.id;
    livros.findByIdAndUpdate(id, {$set: req.body},(err) =>{
      if(!err){
        res.status(200).send({message: 'livro atualizado com sucesso'})
      }else{
        res.status(500).send({message:err.message})
      }
    })
  }

  static deletarLivro = (req,res) =>{
    const id = req.params.id;
    livros.findByIdAndDelete(id, (err,livros) =>{
      if(!err){
        res.status(200).send({message: "Livro removido"})
      }else{
        res.status(500).send({message: err.message})
      }
    } )
  }

  static listarPorTitulo = (req,res) =>{
    const titulo = req.query.titulo;
    livros.find({"titulo": titulo}, {}, (err, livros) =>{
      if(err){
        res.status(500).send({message: err.message})
      }else{
        res.status(200).send(livros)
      }
    })
  }
}

export default LivroController