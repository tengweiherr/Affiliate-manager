import mongoose from 'mongoose';

const downlineSchema = mongoose.Schema({
    name: String,
    tfxi_id: Number,
    referral: String,
    attachment: Number,
    join_date:{
        type: string,
        default: new Date().toString()
    },
    fund: String,
});

const DownlineMessage = mongoose.model('DownlineMessage', downlineSchema);

export default DownlineMessage;