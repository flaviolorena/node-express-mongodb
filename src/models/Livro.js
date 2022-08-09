import mongoose from 'mongoose';

//definição de atributos padrão para cada livro
const livroSchema = new mongoose.Schema(
    {
        id: {type: String},
        titulo:{type: String, required: true},
        autor: {type: String, required: true},
        editora: {type: String, required: true},
        numeroPaginas:{type: Number}
    }
)

//criando coleção no banco, associando ao Schema
const livros = mongoose.model('livros', livroSchema)

export default livros