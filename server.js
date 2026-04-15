import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/api/contact", async (req, res) => {
    try {
        const { name, phone, subject, message } = req.body;

        const text = `
🚀 Новая заявка с сайта

👤 Имя: ${name}
📞 Телефон: ${phone}
📌 Тема: ${subject}
💬 Сообщение: ${message}
`;

        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text,
        });

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
