exports.salary = async (req, res) => {
    try {
        const { msnv, time } = req.query;
        const url = `http://webapi.mailinh.vn:2017/api/salary?pwsws=B@nCNTT!20I8&usr=${msnv}&dte=${time}&staffcode=123`
        const result = await fetch(url, {
            method: 'GET',
        });
        const data = await result.json();
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
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}