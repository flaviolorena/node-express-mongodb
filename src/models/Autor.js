import mongoose from 'mongoose';

//definição de atributos padrão para cada livro
const autorSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required:true},
        nacionalidade: {type: String}
    },
    {
      versionKey: false
    }
)

//criando coleção no banco, associando ao Schema
const autores = mongoose.model('autores', autorSchema)

export default autores