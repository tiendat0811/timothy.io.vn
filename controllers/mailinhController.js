const Log = require('../models/log');
exports.salary = async (req, res) => {
    try {
        const { msnv, time } = req.query;
        const url = `http://webapi.mailinh.vn:2017/api/salary?pwsws=B@nCNTT!20I8&usr=${msnv}&dte=${time}&staffcode=123`
        const result = await fetch(url, {
            method: 'GET',
        });
        const data = await result.json();
        if (data.length > 0) {
            addLog(msnv, 'salary');
        }
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.revenue = async (req, res) => {
    try {
        const { msnv, time } = req.query;
        const url = `http://webapi.mailinh.vn:2017/api/Revenue?pwsws=B@nCNTT!20I8&usr=${msnv}&dte=${time}&staffcode=123`
        const result = await fetch(url, {
            method: 'GET',
        });
        const data = await result.json();
        if (data.length > 0) {
            addLog(msnv, 'revenue');
        }
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.infostaff = async (req, res) => {
    try {
        const { msnv } = req.query;
        const url = `http://webapi.mailinh.vn:2017/api/infostaff?pwsws=B@nCNTT!20I8&usr=${msnv}`
        const result = await fetch(url, {
            method: 'GET',
        });
        const data = await result.json();
        if (data.length > 0) {
            addLog(msnv, 'infostaff');
        }
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const addLog = (msnv, type) => {
    try {
        Log.findOne({ msnv: msnv }).then((log) => {
            if (log != null) {
                log.count = log.count + 1;
                log.actions.push({
                    action: type,
                    time: new Date().toISOString()
                });
                log.updatedAt = new Date().toISOString();
                log.save();
            } else {
                const newLog = new Log({
                    msnv: msnv,
                    count: 1,
                    actions: [
                        {
                            action: type,
                            time: new Date().toISOString()
                        }
                    ],
                    createdDate: new Date().toISOString(),
                    createdAt: new Date().getTime(),
                    updatedAt: new Date().toISOString()
                });
                newLog.save();
            }
        });
    } catch (error) {
        console.log("[ERROR] addLog: ", error)
    }
}