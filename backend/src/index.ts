import express from "express";
import 'dotenv/config';
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Express + TypeScript + ES6 🚀" });
});

app.use((_req, res) => {
  res.status(404).json({
    message: 'Route not found'
  })
})

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err)

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});