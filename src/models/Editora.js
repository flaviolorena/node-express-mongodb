import mongoose from 'mongoose';

//definição de atributos padrão para cada livro
const editoraSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required:true},
        pais: {type: String}
    },

)

//criando coleção no banco, associando ao Schema
const editoras = mongoose.model('editoras', editoraSchema)

export default editoras;