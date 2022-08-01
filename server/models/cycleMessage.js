import mongoose from 'mongoose';

const cycleSchema = mongoose.Schema({
    profit: Number,
    start_date:{
        type: Date,
        default: new Date()
    },
    end_date:{
        type: Date,
        default: new Date()
    },

});

const CycleMessage = mongoose.model('CycleMessage', cycleSchema);

export default CycleMessage;