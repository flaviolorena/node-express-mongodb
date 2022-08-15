import editoras from '../models/Editora.js';

class EditoraController {
  
//find encontra todos os editoras, o callback devolve os editoras encontrados em json. há tratamento de erro como parametro
  static listarEditoras = async (req,res) =>{
    try{
      const editora = await editoras.find();
      res.status(200).json(editora);
    }
    catch(err){
      res.status(400).json({'message': `Lista não encontrada - ${err.message}  `})
    }
  }  

  static listarEditoraPorId = async (req,res) =>{
    try{
      const id = req.params.id;
      const editora = await editoras.findById(id)
      res.status(200).send(editora)
    }
    catch(err){
      res.status(400).json({'message': `ID não encontrado - ${err.message}  `})
    }
  }

  static cadastrarEditora = async (req,res) =>{
    try{
      let editora = new editoras(req.body);
      const cadastraEditora = await editora.save()
      res.status(201).send(cadastraEditora.toJSON())
    }
    catch(err){
      res.status(500).json({'message': `Falha ao cadastrar - ${err.message}  `})
    }
  }
  
  static atualizarEditora = async (req,res) =>{
    try{
      const id = req.params.id;
      await editoras.findByIdAndUpdate(id, {$set: req.body})
      res.status(200).send({message: 'editora atualizado com sucesso'})
    }
    catch(err){
      res.status(500).json({'message': `Falha ao atualizar - ${err.message}  `})
    }
  }

  static deletarEditora = async (req,res) =>{
    try{
      const id = req.params.id;
      await editoras.findByIdAndDelete(id);
      res.status(200).send({message: "Editora deletada com sucesso"})
    }
    catch(err){
      res.status(500).json({'message': `Falha ao deletar - ${err.message}  `})
    }
  }
}

export default EditoraController