import DownlineMessage from '../models/downlineMessage.js';
import mongoose from 'mongoose';

export const getDownline = async (req, res) => {
    try {
        const downlineMessages = await DownlineMessage.find();
        res.status(200).json(downlineMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const getDownlineByReferral = async (req, res) => {
    try {
        const downlineMessages = await DownlineMessage.find({ referral: req.params.referral });
        res.status(200).json(downlineMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const createDownline = async (req, res) => {

    console.log(req.body);

    const downline = req.body;

    const newDownline = new DownlineMessage(downline);

    try {
        await newDownline.save();
        res.status(201).json(newDownline);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

//{ id } = req.params ---> get the id from the url /post/id
// reset the id to _id 

export const updateDownline = async (req, res) => {

    const { id: _id } = req.params;

    //req.body will be sent from the frontend (form)
    const downline = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No info with that id');

    const updatedDownline = await DownlineMessage.findByIdAndUpdate(_id, { ...downline, _id }, { new: true });

    res.json(updatedDownline);
}

export const deleteDownline = async (req, res) => {

    const { id } = req.params;

    const downline = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No info with that id');

    await DownlineMessage.findByIdAndRemove(id);

    res.json( {message: 'Downline deleted successfully' });
}

