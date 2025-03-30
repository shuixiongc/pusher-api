const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ strict: false }));  // 放宽 JSON 解析限制
app.use('/', express.static(path.join(__dirname, 'public')));

const pusher = new Pusher({
    appId: "1966830",
    key: "ff3ef8b9954432e95680",
    secret: "5088e7577641fea81c1f",
    cluster: "mt1",
    useTLS: true
});

app.post('/api/message', async (req, res) => {
    console.log('收到请求:', req.body);  // 添加请求日志
    
    try {
        const result = await pusher.trigger('my-channel', 'my-event', {
            message: 'hello world',
            time: new Date().toISOString()
        });
        
        console.log('Pusher 结果:', result);  // 添加结果日志
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