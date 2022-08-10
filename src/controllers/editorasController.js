import editoras from '../models/Editora.js';

class EditoraController {
  
//find encontra todos os editoras, o callback devolve os editoras encontrados em json. há tratamento de erro como parametro
  static listarEditoras = (req,res) =>{
    editoras.find((err, editoras) =>{
      res.status(200).json(editoras);
    })
  }  
  static listarEditoraPorId = (req,res) =>{
    const id = req.params.id;
    editoras.findById(id, (err,editoras) =>{
      if(err){
        res.status(400).send({message: `${err.message} - ID não encontrado`})
      }else{
        res.status(200).send(editoras)
      }
    } )
  }

// utiliza o schema para cadastrar editora, o metodo save para salvar no banco com o tratamento de erro. caso sucesso, retorna o status e converte em JSON 
  static cadastrarEditora = (req,res) =>{
    let editora = new editoras(req.body);
    editora.save((err) =>{
      if (err){
        res.status(500).send({message: `${err.message} - falha ao cadastrar editora` })
      }else{
        res.status(201).send(editora.toJSON())
      }
    })
  }
  
  static atualizarEditora = (req,res) =>{
    const id = req.params.id;
    editoras.findByIdAndUpdate(id, {$set: req.body},(err) =>{
      if(!err){
        res.status(200).send({message: 'editora atualizado com sucesso'})
      }else{
        res.status(500).send({message:err.message})
      }
    })
  }

  static deletarEditora = (req,res) =>{
    const id = req.params.id;
    editoras.findByIdAndDelete(id, (err,editoras) =>{
      if(!err){
        res.status(200).send({message: "editora removida"})
      }else{
        res.status(500).send({message: err.message})
      }
    } )
  }
}

export default EditoraController