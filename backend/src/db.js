import mongoose from 'mongoose'

export const connectDB= async ()=> {
    try {
        await mongoose.connect('mongodb+srv://monicamt:123QWERTY@cluster0.ub3nd.mongodb.net/proyectoraul?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Conexion exitosa')
    } catch (error) {
      console.error(error)
    }
}
