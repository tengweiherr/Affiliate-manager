import mongoose from 'mongoose';

const downlineSchema = mongoose.Schema({
    name: String,
    tfxi_id: Number,
    referral: String,
    attachment: Number,
    join_date:{
        type: Date,
        default: new Date()
    },
    fund: String,
    referral_fee: Number
});

const DownlineMessage = mongoose.model('DownlineMessage', downlineSchema);

export default DownlineMessage;