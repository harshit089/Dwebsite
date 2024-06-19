const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dataSchema = new mongoose.Schema({}, { strict: false });
const DataModel = mongoose.model('Data', dataSchema);

app.post('/api/filter', async (req, res) => {
    const { username, from, to, keyword } = req.body;
    const query = {};

    if (username) query.username = username;
    if (from || to) query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
    if (keyword) query.keyword = keyword;

    try {
        const results = await DataModel.find(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/plot', async (req, res) => {
    const { username, from, to, keyword } = req.body;
    const query = {};

    if (username) query.username = username;
    if (from || to) query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
    if (keyword) query.keyword = keyword;

    try {
        const results = await DataModel.find(query);
        const plots = results.map(result => ({
            labels: result.labels,
            datasets: [
                {
                    label: 'Data',
                    data: result.data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                }
            ]
        }));
        res.json(plots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
