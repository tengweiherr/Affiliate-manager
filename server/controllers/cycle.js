import CycleMessage from '../models/cycleMessage.js';
import mongoose from 'mongoose';

export const getCycle = async (req, res) => {
    try {
        const cycleMessages = await CycleMessage.find();
        res.status(200).json(cycleMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const createCycle = async (req, res) => {

    const cycle = req.body;

    const newCycle = new CycleMessage(cycle);

    try {
        await newCycle.save();
        res.status(201).json(newCycle);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

//{ id } = req.params ---> get the id from the url /post/id
// reset the id to _id 

export const updateCycle = async (req, res) => {

    const { id: _id } = req.params;

    //req.body will be sent from the frontend (form)
    const cycle = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No info with that id');

    const updatedCycle = await CycleMessage.findByIdAndUpdate(_id, { ...cycle, _id }, { new: true });

    res.json(updatedCycle);
}

export const deleteCycle = async (req, res) => {

    const { id } = req.params;

    const cycle = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No info with that id');

    await CycleMessage.findByIdAndRemove(id);

    res.json( {message: 'Cycle deleted successfully' });
}

