const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const path = require('path');

const app = express();
// 修改 CORS 配置
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json({ strict: false }));
app.use('/', express.static(path.join(__dirname, 'public')));

const pusher = new Pusher({
    appId: "1966830",
    key: "ff3ef8b9954432e95680",
    secret: "5088e7577641fea81c1f",
    cluster: "mt1",
    useTLS: true
});

app.post('/api/message', async (req, res) => {
    console.log('收到请求:', {
        headers: req.headers,
        body: req.body
    });
    
    try {
        const result = await pusher.trigger('my-channel', 'my-event', {
            message: 'hello world',
            time: new Date().toISOString()
        });
        
        console.log('Pusher 结果:', result);
        res.json({ success: true });
    } catch (error) {
        console.error('Pusher 错误:', error);
        res.status(500).json({ error: error.message });
    }
});

// 添加全局错误处理
app.use((err, req, res, next) => {
    console.error('服务器错误:', err);
    res.status(500).json({ error: '服务器内部错误' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});