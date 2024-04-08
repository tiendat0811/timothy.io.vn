const User = require('../models/user');

exports.index = async (req, res) => {
    return res.json({ data: res.paginatedResults })
}

exports.create = async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).json({ user: newUser, message: 'Created successfully', status: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.update = async (req, res) => {

    try {
        const body = {
            ...req.body,
        };
        const user = await User.findByIdAndUpdate(req.params.id, body);
        await user.save();
        res.status(201).json({ user: user, message: 'Updated successfully', status: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json({ user: user, message: 'Deleted successfully', status: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}