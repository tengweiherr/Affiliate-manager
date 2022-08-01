import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    id: { type: String },
    password: { type: String, required: true },
});


export default mongoose.model('User', userSchema);