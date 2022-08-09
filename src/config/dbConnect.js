import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://flaviolorena:123@cluster0.bhybf47.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;
