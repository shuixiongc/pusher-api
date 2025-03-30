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
        // 添加请求体验证和默认消息
        const message = req.body && req.body.message ? req.body.message : 'hello world';
        
        await pusher.trigger('my-channel', 'my-event', {
            message: message,
            time: new Date().toISOString()
        });
        
        res.json({ 
            success: true,
            message: '消息已发送'
        });
    } catch (error) {
        console.error('Pusher error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});