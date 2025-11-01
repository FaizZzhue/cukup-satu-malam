const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

const router = require('./src/api/routes/routes');
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api', router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));