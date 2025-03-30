const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();
app.use(cors());
app.use(express.json());
// 修改静态文件路径配置
app.use(express.static(__dirname + '/public'));

const pusher = new Pusher({
    appId: "1966830",
    key: "ff3ef8b9954432e95680",
    secret: "5088e7577641fea81c1f",
    cluster: "mt1",
    useTLS: true
});

app.post('/api/message', async (req, res) => {
    try {
        // 添加请求体验证
        const message = req.body.message || 'hello world';
        
        const result = await pusher.trigger('my-channel', 'my-event', {
            message: message,
            timestamp: new Date().toISOString()
        });
        
        console.log('Pusher result:', result);
        res.json({ 
            success: true, 
            message: message,
            result 
        });
    } catch (error) {
        console.error('Pusher error:', error);
        res.status(500).json({ error: error.message });
    }
});

// 添加错误处理中间件
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});