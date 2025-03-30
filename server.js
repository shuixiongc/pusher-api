const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const pusher = new Pusher({
    appId: "1966830",
    key: "ff3ef8b9954432e95680",
    secret: "5088e7577641fea81c1f",
    cluster: "mt1",
    useTLS: true
});

app.post('/api/message', async (req, res) => {
    try {
        // 不再验证请求体，直接发送固定消息
        const result = await pusher.trigger('my-channel', 'my-event', {
            message: '测试消息',
            timestamp: new Date().toISOString()
        });
        
        console.log('Pusher result:', result);
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