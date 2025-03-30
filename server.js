const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const path = require('path');

const app = express();
// 简化 CORS 和请求处理配置
app.use(cors());
app.use(express.raw());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
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
        // 简化消息发送逻辑
        await pusher.trigger('my-channel', 'my-event', {
            message: 'hello world',
            time: new Date().toISOString()
        });
        
        res.status(200).send('OK');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error.message);
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