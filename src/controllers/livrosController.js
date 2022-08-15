import livros from '../models/Livro.js';

class LivroController {
  
//find encontra todos os livros, o callback devolve os livros encontrados em json. há tratamento de erro como parametro
  static listarLivros = async (req,res) =>{
    try{
      const livro = await    
        livros.find()
        .populate(['autor', 'editora'])
        .exec()
        res.status(200).json(livro);
    }
    catch(err){
      res.status(400).json({'message': `Lista de livros não encontrada - ${err.message}  `})
    }
  } 

  static listarLivroPorId = async (req,res) =>{
    try{
      const id = req.params.id;
      const livro = await   
        livros.findById(id)
        .populate(['autor', 'editora'])
        .exec()
        res.status(200).send(livro);

    }
    catch(err){
      res.status(400).json({'message': `ID não encontrado - ${err.message}  `})

    }
 
  }

// utiliza o schema para cadastrar livro, o metodo save para salvar no banco com o tratamento de erro. caso sucesso, retorna o status e converte em JSON 
  static cadastrarLivro = async (req,res) =>{
    try{
      let livro = new livros(req.body);
      const cadastroLivro = await livro.save()
      res.status(201).send(cadastroLivro.toJSON())
    }
    catch(err){
      res.status(500).json({'message': `Falha ao cadastrar - ${err.message}  `})
    }
  }

  static atualizarLivro = async (req,res) =>{
    try{
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, {$set: req.body})
      res.status(200).send({message: 'Livro atualizado com sucesso'})
    }
    catch(err){
      res.status(500).json({'message': `Falha ao atualizar - ${err.message}  `})
    }
  }

  static deletarLivro = async (req,res) =>{
    try{
      const id = req.params.id;
      await livros.findByIdAndDelete(id)
      res.status(200).send({message: "Livro deletado com sucesso"})
    }
    catch(err){
      res.status(500).json({'message': `Falha ao deletar - ${err.message}  `})
    }
  }

  static listarPorTitulo = async (req,res) =>{
    try{
      const titulo = req.query.titulo;
      const listaLivro = await livros.find({"titulo": titulo}, )
      res.status(200).send(listaLivro)
      
    }
    catch(err){
      res.status(400).json({'message': `Livro não encontrado - ${err.message}  `})
    }

  }
}

export default LivroController