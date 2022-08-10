import mongoose from 'mongoose';

//definição de atributos padrão para cada livro
const livroSchema = new mongoose.Schema(
    {
        id: {type: String},
        titulo:{type: String, required: true},
        //chave estrangeira, puxando referencia da coleção autores
        autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true},
        editora: {type: mongoose.Schema.Types.ObjectId, ref: 'editoras'},
        numeroPaginas:{type: Number}
    }
)

//criando coleção no banco, associando ao Schema
const livros = mongoose.model('livros', livroSchema)

export default livros