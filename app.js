const express = require("express");
const fs = require("fs");
const path = require("path"); // 👉 EKLENDİ
const bodyParser = require("body-parser"); // 👉 EKLENDİ

const app = express();
const PORT = 3000;

// Statik dosyaları sun (html, css, js)
app.use(express.static("public"));

// 👉 EKLENDİ: Form verilerini okuyabilmek için
app.use(bodyParser.urlencoded({ extended: true }));

// Çiçek verisini dönen endpoint
app.get("/api/flowers", (req, res) => {
  fs.readFile("./data/flower.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Veri okunamadı.");
      return;
    }
    res.send(JSON.parse(data));
  });
});

// 👉 EKLENDİ: Kullanıcı kayıt endpoint'i
app.post("/register", (req, res) => {
  const user = req.body; // Formdan gelen veriyi al
  const filePath = path.join(__dirname, "data", "users.json");

  let users = [];

  // users.json dosyası varsa oku
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, "utf8");
    users = JSON.parse(existing);
  }

  // Yeni kullanıcıyı listeye ekle
  users.push(user);

  // JSON dosyasına yaz
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.send("Kayıt başarılı!");
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
