const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Kullanıcılar dizisi
const users = [
  { kullaniciadi: "user1", sifre: "pass1" },
  { kullaniciadi: "user2", sifre: "pass2" },
];

app.use(express.json());
app.use(cors());

// Kullanıcıları döndüren GET endpoint'i
app.get("/api/kullanicilar", (req, res) => {
  res.json(users);
});

// Yeni kullanıcı oluşturan POST endpoint'i
app.post("/api/kayitol", (req, res) => {
  const { kullaniciadi, sifre } = req.body;
  const newUser = { kullaniciadi, sifre };
  users.push(newUser);
  res.json(newUser);
});

// Giriş yapan kullanıcıya hoşgeldin mesajı döndüren POST endpoint'i
app.post("/api/giris", (req, res) => {
  const { kullaniciadi, sifre } = req.body;
  const user = users.find(
    (u) => u.kullaniciadi === kullaniciadi && u.sifre === sifre
  );

  if (user) {
    res.send(`Hoşgeldin, ${user.kullaniciadi}!`);
  } else {
    res.status(401).send("Geçersiz kullanıcı adı veya şifre.");
  }
});

// API'nin dinlemeye başlaması
app.listen(port, () => {
  console.log(`API çalışıyor: http://localhost:${port}`);
});
