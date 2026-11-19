const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Koneksi Database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Sesuaikan password database kamu
    database: 'db_sekolah'
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi database gagal:', err);
        return;
    }
    console.log('Database MySQL terhubung!');
});

app.listen(PORT, () => {
    console.log(`Server backend berjalan di http://localhost:${PORT}`);
});

// 1. CREATE (Tambah Data)
app.post('/api/siswa', (req, res) => {
    const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;
    const sql = 'INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Data siswa berhasil ditambahkan' });
    });
});

// 2. READ (Ambil Data)
app.get('/api/siswa', (req, res) => {
    db.query('SELECT * FROM siswa', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 3. UPDATE (Ubah Data)
app.put('/api/siswa/:kode', (req, res) => {
    const { kode } = req.params;
    const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;
    const sql = 'UPDATE siswa SET nama_siswa = ?, alamat_siswa = ?, tgl_siswa = ?, jurusan_siswa = ? WHERE kode_siswa = ?';
    db.query(sql, [nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa, kode], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data siswa berhasil diperbarui' });
    });
});

// 4. DELETE (Hapus Data)
app.delete('/api/siswa/:kode', (req, res) => {
    const { kode } = req.params;
    db.query('DELETE FROM siswa WHERE kode_siswa = ?', [kode], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data siswa berhasil dihapus' });
    });
});

app.listen(PORT, () => {
    console.log(`Server backend berjalan di http://localhost:${PORT}`);
});