const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

const pusher = new Pusher({
    appId: "1966830",
    key: "ff3ef8b9954432e95680",
    secret: "5088e7577641fea81c1f",
    cluster: "mt1",
    useTLS: true
});

app.post('/api/message', async (req, res) => {
    try {
        await pusher.trigger('my-channel', 'my-event', {
            message: 'hello world'
        });
        res.json({ success: true });
    } catch (error) {
        console.error('Pusher error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});