-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Jun 2026 pada 13.03
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_posyandu`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `activity` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `activity`, `created_at`) VALUES
(1, 1, 'Menambahkan jadwal posyandu baru', '2026-05-20 04:22:34'),
(2, 2, 'Melihat data pertumbuhan anak', '2026-05-20 04:22:34'),
(3, 3, 'Memperbarui profil akun', '2026-05-20 04:22:34'),
(4, 1, 'Menginput data gizi balita', '2026-05-20 04:22:34'),
(5, 4, 'Membaca notifikasi imunisasi', '2026-05-20 04:22:34'),
(6, 2, 'Menambahkan data pertumbuhan anak Ahmad Fauzan', '2026-05-20 07:49:31'),
(7, 2, 'Menambahkan data pertumbuhan anak Aisyah Putri', '2026-05-21 04:50:56'),
(8, 2, 'Menambahkan data pertumbuhan anak Nabila Zahra', '2026-05-21 04:54:48'),
(9, 2, 'Menambahkan data pertumbuhan anak Rafi Saputra', '2026-05-21 05:11:17'),
(10, 2, 'Menambahkan data pertumbuhan anak Rafi Saputra', '2026-05-21 12:42:59'),
(11, 2, 'Menambahkan data pertumbuhan anak Rafi Saputra', '2026-05-23 14:43:06'),
(12, 2, 'Menambahkan jadwal Penimbangan Balita', '2026-05-23 16:07:05'),
(13, 2, 'Mengubah jadwal Penimbangan Balita', '2026-05-23 16:09:56'),
(14, 2, 'Menghapus jadwal Penimbangan Balita', '2026-05-23 16:11:44'),
(15, 2, 'Menambahkan data pertumbuhan anak Rafi Saputra', '2026-05-25 07:41:05'),
(16, 2, 'Menambahkan data pertumbuhan anak Rafi Saputra', '2026-05-25 07:44:24'),
(17, 2, 'Menambahkan data pertumbuhan anak Rafi Saputra', '2026-05-25 08:00:59'),
(18, 1, 'Mengubah jadwal Posyandu Balita Bulanan', '2026-06-02 19:37:12'),
(19, 1, 'Menambahkan data pertumbuhan anak Ahmad Fauzan', '2026-06-03 19:15:26'),
(20, 1, 'Menambahkan data pertumbuhan anak Apri', '2026-06-04 18:21:54'),
(21, 1, 'Menambahkan data pertumbuhan anak Apri', '2026-06-07 08:59:18'),
(22, 1, 'Menambahkan data pertumbuhan anak bagong', '2026-06-07 09:00:05'),
(23, 1, 'Menambahkan data pertumbuhan anak Yanto', '2026-06-09 19:00:09'),
(24, 1, 'Menghapus jadwal Posyandu Balita Bulanan', '2026-06-10 07:26:44'),
(25, 1, 'Menambahkan jadwal Lomba panjat pinang', '2026-06-10 19:16:34'),
(26, 1, 'Menambahkan data pertumbuhan anak bagong', '2026-06-10 19:22:24'),
(27, 1, 'Menghapus jadwal Edukasi Pencegahan Gizi Buruk', '2026-06-10 19:42:55'),
(28, 1, 'Menghapus jadwal Pemeriksaan Tinggi Badan Anak', '2026-06-10 19:42:59'),
(29, 1, 'Menghapus jadwal Monitoring Berat Badan Balita', '2026-06-10 19:44:08'),
(30, 1, 'Menghapus jadwal Konsultasi Gizi Anak', '2026-06-10 19:44:11'),
(31, 1, 'Menghapus jadwal Lomba panjat pinang', '2026-06-10 19:44:14'),
(32, 1, 'Menghapus jadwal Deteksi Dini Stunting', '2026-06-10 19:44:19'),
(33, 1, 'Menghapus jadwal Pemberian Vitamin A', '2026-06-10 19:44:25'),
(34, 1, 'Menghapus jadwal Penyuluhan Gizi Balita', '2026-06-10 19:44:31'),
(35, 1, 'Menghapus jadwal Pemeriksaan Pertumbuhan Anak', '2026-06-10 19:44:34'),
(36, 1, 'Menambahkan jadwal Adu Panco', '2026-06-10 19:45:21'),
(37, 1, 'Menambahkan data pertumbuhan anak Yanto', '2026-06-10 20:03:56'),
(38, 1, 'Mengubah jadwal Adu Panco', '2026-06-10 20:07:01'),
(39, 1, 'Menambahkan data pertumbuhan anak dwi', '2026-06-10 20:19:17'),
(40, 1, 'Menambahkan data pertumbuhan anak Apri', '2026-06-10 20:20:09'),
(41, 1, 'Menambahkan data pertumbuhan anak dwi', '2026-06-10 20:20:41'),
(42, 1, 'Menambahkan data pertumbuhan anak ANjing', '2026-06-10 20:23:46'),
(43, 1, 'Menambahkan data pertumbuhan anak ANjing', '2026-06-10 20:23:46'),
(44, 1, 'Menambahkan data pertumbuhan anak putri', '2026-06-10 20:32:29'),
(45, 1, 'Menambahkan data pertumbuhan anak putri', '2026-06-11 08:18:12'),
(46, 1, 'Menambahkan data pertumbuhan anak Anjayani', '2026-06-11 08:59:05'),
(47, 1, 'Menambahkan data pertumbuhan anak asu', '2026-06-11 09:00:04'),
(48, 1, 'Menambahkan data pertumbuhan anak Jodi', '2026-06-12 21:17:00'),
(49, 1, 'Menambahkan data pertumbuhan anak dthf', '2026-06-13 09:52:06'),
(50, 1, 'Menambahkan jadwal Lomba renang', '2026-06-13 09:57:13'),
(51, 1, 'Menghapus jadwal Lomba renang', '2026-06-13 09:59:16'),
(52, 1, 'Menambahkan jadwal lomas', '2026-06-13 09:59:36'),
(53, 1, 'Menghapus jadwal lomas', '2026-06-13 10:00:01'),
(54, 1, 'Menambahkan jadwal asu', '2026-06-13 10:06:03'),
(55, 1, 'Mengubah jadwal asu', '2026-06-13 10:06:07'),
(56, 1, 'Menghapus jadwal asu', '2026-06-13 10:06:10'),
(57, 1, 'Menambahkan data pertumbuhan anak sad', '2026-06-15 16:46:49'),
(58, 1, 'Menambahkan data pertumbuhan anak alifa', '2026-06-15 18:04:45'),
(59, 1, 'Menambahkan data pertumbuhan anak alifa', '2026-06-15 18:04:56'),
(60, 1, 'Menambahkan data pertumbuhan anak alifa', '2026-06-15 18:24:18'),
(61, 1, 'Menambahkan data pertumbuhan anak sad', '2026-06-16 20:40:00'),
(62, 1, 'Menambahkan data pertumbuhan anak anjayani', '2026-06-16 21:03:52'),
(63, 1, 'Menambahkan data pertumbuhan anak anjayani', '2026-06-16 21:04:03'),
(64, 1, 'Menambahkan data pertumbuhan anak surioso', '2026-06-16 21:04:44'),
(65, 1, 'Menambahkan data pertumbuhan anak surioso', '2026-06-16 21:05:09'),
(66, 1, 'Menambahkan data pertumbuhan anak surioso', '2026-06-16 21:05:26'),
(67, 1, 'Menambahkan data pertumbuhan anak as', '2026-06-16 21:10:13'),
(68, 1, 'Menambahkan data pertumbuhan anak anjayanui', '2026-06-16 21:12:34'),
(69, 1, 'Menambahkan data pertumbuhan anak ads', '2026-06-16 21:13:39'),
(70, 1, 'Menambahkan data pertumbuhan anak ads', '2026-06-16 21:18:25'),
(71, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 11:25:33'),
(72, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 11:25:48'),
(73, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 11:26:05'),
(74, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 11:26:51'),
(75, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 11:34:11'),
(76, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 11:36:19'),
(77, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 11:42:03'),
(78, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 11:47:57'),
(79, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 11:50:55'),
(80, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 11:53:51'),
(81, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 11:56:25'),
(82, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 12:11:39'),
(83, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 12:11:50'),
(84, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-19 12:13:04'),
(85, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 09:46:06'),
(86, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 09:46:18'),
(87, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 09:46:24'),
(88, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 09:46:33'),
(89, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 09:46:57'),
(90, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 09:47:23'),
(91, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 09:47:32'),
(92, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 09:47:43'),
(93, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 09:51:24'),
(94, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 09:51:50'),
(95, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-21 09:52:35'),
(96, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 09:54:53'),
(97, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 09:55:38'),
(98, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 10:00:13'),
(99, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 10:04:57'),
(100, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 10:07:40'),
(101, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 10:09:21'),
(102, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 10:13:45'),
(103, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-21 10:19:24'),
(104, 1, 'Mengubah data pertumbuhan anak Apri', '2026-06-21 10:35:11'),
(105, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-22 07:41:06'),
(106, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-22 08:19:13'),
(107, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-22 09:22:34'),
(108, 1, 'Mengubah data pertumbuhan anak Dennis', '2026-06-22 09:25:23'),
(109, 1, 'Memperbarui data pertumbuhan anak Pit Nyoh periode 2026-07', '2026-06-23 10:13:14'),
(110, 1, 'Memperbarui data pertumbuhan anak Pit Nyoh periode 2026-08', '2026-06-23 10:13:41'),
(111, 1, 'Memperbarui data pertumbuhan anak Pit Nyoh periode 2026-06', '2026-06-23 10:14:08'),
(112, 1, 'Memperbarui data pertumbuhan anak Pit Nyoh periode 2026-11', '2026-06-23 10:23:29'),
(113, 1, 'Memperbarui data pertumbuhan anak Pit Nyoh periode 2026-12', '2026-06-23 10:24:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `children`
--

CREATE TABLE `children` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` enum('L','P') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `children`
--

INSERT INTO `children` (`id`, `user_id`, `name`, `birth_date`, `gender`, `created_at`) VALUES
(50, 4, 'Apri', '2026-05-19', 'L', '2026-06-19 11:25:20'),
(51, 14, 'Dennis', '2026-04-21', 'L', '2026-06-21 09:32:20'),
(52, 14, 'Apri', '2026-03-22', 'L', '2026-06-22 09:28:22'),
(56, 14, 'Pit Nyoh', '2026-04-23', 'P', '2026-06-23 10:12:15'),
(57, 14, 'Siti', '2024-02-15', 'P', '2026-06-23 10:28:20'),
(65, 14, 'Eji', '2024-06-07', 'L', '2026-06-25 10:51:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `growth_records`
--

CREATE TABLE `growth_records` (
  `id` int(11) NOT NULL,
  `child_id` int(11) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `age_month` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `period_month` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `growth_records`
--

INSERT INTO `growth_records` (`id`, `child_id`, `weight`, `height`, `age_month`, `created_at`, `period_month`) VALUES
(86, 50, 2.00, 200.00, 1, '2026-06-19 11:25:20', '2026-06'),
(87, 51, 4.00, 20.00, 2, '2026-06-21 09:32:20', '2026-06'),
(88, 52, 200.00, 100.00, 3, '2026-06-22 09:28:22', '2026-06'),
(89, 51, 4.00, 20.00, 2, '2026-06-21 09:32:20', '2026-06'),
(90, 56, 20.00, 40.00, 2, '2026-06-23 10:12:15', NULL),
(91, 56, 50.00, 40.00, 3, '2026-06-23 10:13:14', '2026-07'),
(92, 56, 50.00, 60.00, 4, '2026-06-23 10:13:41', '2026-08'),
(93, 56, 50.00, 6.00, 2, '2026-06-23 10:14:08', '2026-06'),
(94, 56, 50.00, 6.00, 7, '2026-06-23 10:23:29', '2026-11'),
(95, 56, 50.00, 70.00, 8, '2026-06-23 10:24:54', '2026-12'),
(96, 57, 18.00, 70.00, 28, '2026-06-23 10:28:20', '2026-06'),
(104, 65, 13.00, 70.00, 24, '2026-06-25 10:51:50', '2026-06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `interpretations`
--

CREATE TABLE `interpretations` (
  `id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `detail` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `interpretations`
--

INSERT INTO `interpretations` (`id`, `status`, `title`, `description`, `detail`, `created_at`) VALUES
(1, 'gizi_buruk', 'Status Gizi Buruk', 'Berat badan anak jauh di bawah standar WHO.', 'Memerlukan intervensi gizi dan pemantauan intensif.', '2026-06-11 08:36:19'),
(2, 'gizi_kurang', 'Status Gizi Kurang', 'Berat badan anak berada di bawah standar WHO.', 'Perlu peningkatan asupan energi dan protein.', '2026-06-11 08:36:19'),
(3, 'normal', 'Status Gizi Normal', 'Pertumbuhan anak sesuai standar WHO.', 'Pertahankan pola makan seimbang dan pemantauan rutin.', '2026-06-11 08:36:19'),
(4, 'gizi_lebih', 'Status Gizi Lebih', 'Berat badan anak berada di atas standar WHO.', 'Perlu pengaturan pola makan dan aktivitas fisik.', '2026-06-11 08:36:19');

-- --------------------------------------------------------

--
-- Struktur dari tabel `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `is_read`, `created_at`) VALUES
(1, 2, 'Jadwal penimbangan bulan Mei telah tersedia.', 0, '2026-05-20 04:22:19'),
(2, 3, 'Anak Anda perlu pemeriksaan gizi tambahan.', 1, '2026-05-20 04:22:19'),
(3, 4, 'Imunisasi campak dijadwalkan minggu depan.', 0, '2026-05-20 04:22:19'),
(4, 5, 'Data pertumbuhan berhasil diperbarui.', 1, '2026-05-20 04:22:19'),
(5, 2, 'Jangan lupa hadir pada jadwal posyandu.', 0, '2026-05-20 04:22:19');

-- --------------------------------------------------------

--
-- Struktur dari tabel `nutrition_status`
--

CREATE TABLE `nutrition_status` (
  `id` int(11) NOT NULL,
  `growth_id` int(11) DEFAULT NULL,
  `weight_zscore` decimal(10,2) DEFAULT NULL,
  `nutrition_status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `height_zscore` decimal(10,2) DEFAULT NULL,
  `stunting_status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `nutrition_status`
--

INSERT INTO `nutrition_status` (`id`, `growth_id`, `weight_zscore`, `nutrition_status`, `created_at`, `height_zscore`, `stunting_status`) VALUES
(53, 86, -2.60, 'gizi_kurang', '2026-06-19 11:25:20', 79.00, 'normal'),
(54, 87, 1.40, 'normal', '2026-06-21 09:32:20', -15.74, 'severe_stunting'),
(55, 88, 393.40, 'gizi_lebih', '2026-06-22 09:28:23', 26.37, 'normal'),
(56, 90, 33.60, 'gizi_lebih', '2026-06-23 10:12:15', -5.06, 'severe_stunting'),
(57, 91, 93.60, 'gizi_lebih', '2026-06-23 10:13:14', -5.06, 'severe_stunting'),
(58, 92, 93.60, 'gizi_lebih', '2026-06-23 10:13:41', 6.06, 'normal'),
(59, 93, 93.60, 'gizi_lebih', '2026-06-23 10:14:08', -23.94, 'severe_stunting'),
(60, 94, 61.00, 'gizi_lebih', '2026-06-23 10:23:29', -24.88, 'severe_stunting'),
(61, 95, 61.00, 'gizi_lebih', '2026-06-23 10:24:54', 1.79, 'normal'),
(62, 96, 6.50, 'gizi_lebih', '2026-06-23 10:28:20', -4.81, 'severe_stunting'),
(63, 104, 0.59, 'normal', '2026-06-25 10:51:50', -5.83, 'severe_stunting');

-- --------------------------------------------------------

--
-- Struktur dari tabel `recommendations`
--

CREATE TABLE `recommendations` (
  `id` int(11) NOT NULL,
  `status` enum('gizi_buruk','gizi_kurang','normal','gizi_lebih') NOT NULL,
  `category` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `recommendations`
--

INSERT INTO `recommendations` (`id`, `status`, `category`, `title`, `description`, `created_at`) VALUES
(1, 'gizi_buruk', 'TINDAKAN MEDIS & RUJUKAN', 'Rujuk segera ke fasilitas kesehatan', 'Rujuk segera ke Puskesmas atau rumah sakit terdekat untuk penanganan medis lebih lanjut oleh tenaga kesehatan profesional.', '2026-05-23 15:20:03'),
(2, 'gizi_buruk', 'TINDAKAN MEDIS & RUJUKAN', 'Periksa penyebab mendasar', 'Periksa kemungkinan infeksi berulang, penyakit kronik, atau kelainan metabolik yang menghambat penyerapan nutrisi.', '2026-05-23 15:20:03'),
(3, 'gizi_buruk', 'TINDAKAN MEDIS & RUJUKAN', 'Pemberian RUTF', 'Pemberian Makanan Terapeutik Siap Saji (RUTF) direkomendasikan WHO sebagai penanganan pertama gizi buruk tanpa komplikasi medis.', '2026-05-23 15:20:03'),
(4, 'gizi_buruk', 'NUTRISI & PEMBERIAN MAKAN', 'ASI dan MPASI bertahap', 'Pastikan ASI eksklusif tetap diberikan untuk bayi usia 0–6 bulan dan kombinasikan dengan MPASI bergizi tinggi secara bertahap.', '2026-05-23 15:20:03'),
(5, 'gizi_buruk', 'NUTRISI & PEMBERIAN MAKAN', 'Tingkatkan protein hewani', 'Tingkatkan asupan protein hewani seperti telur, ikan, daging, hati ayam, atau kacang-kacangan dalam porsi kecil namun sering.', '2026-05-23 15:20:03'),
(6, 'gizi_buruk', 'NUTRISI & PEMBERIAN MAKAN', 'Pantau berat badan mingguan', 'Pantau berat badan setiap minggu sampai kondisi stabil dengan target kenaikan 5–10 g/kg/hari selama fase pemulihan.', '2026-05-23 15:20:03'),
(7, 'gizi_buruk', 'DUKUNGAN KELUARGA & KOMUNITAS', 'Edukasi orang tua', 'Edukasi orang tua tentang praktik pemberian makan yang tepat, kebersihan, dan stimulasi tumbuh kembang.', '2026-05-23 15:20:03'),
(8, 'gizi_buruk', 'DUKUNGAN KELUARGA & KOMUNITAS', 'Program PMT-P', 'Daftarkan anak ke program PMT-P dari Puskesmas atau Dinas Kesehatan setempat.', '2026-05-23 15:20:03'),
(9, 'gizi_kurang', 'NUTRISI & POLA MAKAN', 'Tingkatkan kualitas makan', 'Berikan makanan dengan kepadatan nutrisi tinggi 3–4 kali/hari dan utamakan protein hewani, sayuran hijau, serta karbohidrat kompleks.', '2026-05-23 15:20:23'),
(10, 'gizi_kurang', 'NUTRISI & POLA MAKAN', 'Lanjutkan ASI', 'Lanjutkan ASI hingga usia 2 tahun sambil memberikan MPASI bergizi seimbang sesuai usia.', '2026-05-23 15:20:23'),
(11, 'gizi_kurang', 'NUTRISI & POLA MAKAN', 'Variasikan kelompok pangan', 'Pastikan anak mendapatkan makanan dari minimal 4 kelompok pangan setiap hari.', '2026-05-23 15:20:23'),
(12, 'gizi_kurang', 'SUPLEMENTASI', 'Vitamin A rutin', 'Berikan suplementasi Vitamin A secara rutin sesuai jadwal untuk mendukung daya tahan tubuh.', '2026-05-23 15:20:23'),
(13, 'gizi_kurang', 'SUPLEMENTASI', 'Zinc dan zat besi', 'Suplementasi Zinc dan Zat Besi sesuai rekomendasi tenaga kesehatan.', '2026-05-23 15:20:23'),
(14, 'gizi_kurang', 'SUPLEMENTASI', 'Taburia', 'Taburia direkomendasikan untuk anak usia 6–59 bulan dengan gizi kurang.', '2026-05-23 15:20:23'),
(15, 'gizi_kurang', 'PEMANTAUAN & STIMULASI', 'Pantau pertumbuhan bulanan', 'Pantau pertumbuhan setiap bulan di Posyandu dan rujuk bila tidak ada perbaikan.', '2026-05-23 15:20:23'),
(16, 'gizi_kurang', 'PEMANTAUAN & STIMULASI', 'Stimulasi tumbuh kembang', 'Lakukan stimulasi tumbuh kembang melalui bermain dan interaksi aktif orang tua.', '2026-05-23 15:20:23'),
(17, 'normal', 'POLA MAKAN & NUTRISI', 'Penuhi gizi seimbang', 'Berikan variasi makanan dari semua kelompok pangan: karbohidrat, protein, lemak sehat, sayur, dan buah.', '2026-05-23 15:20:35'),
(18, 'normal', 'POLA MAKAN & NUTRISI', 'Lanjutkan ASI', 'Lanjutkan ASI hingga usia 2 tahun dengan MPASI sesuai usia.', '2026-05-23 15:20:35'),
(19, 'normal', 'POLA MAKAN & NUTRISI', 'Frekuensi makan teratur', 'Berikan 3 kali makan utama dan 2 kali selingan bergizi setiap hari.', '2026-05-23 15:20:35'),
(20, 'normal', 'POLA MAKAN & NUTRISI', 'Hidrasi cukup', 'Pastikan anak cukup minum air putih dan hindari minuman manis berlebihan.', '2026-05-23 15:20:35'),
(21, 'normal', 'AKTIVITAS & STIMULASI', 'Aktivitas fisik aktif', 'Dorong aktivitas fisik aktif minimal 180 menit/hari.', '2026-05-23 15:20:35'),
(22, 'normal', 'AKTIVITAS & STIMULASI', 'Stimulasi motorik dan kognitif', 'Stimulasi melalui bermain, menggambar, membaca, dan interaksi sosial.', '2026-05-23 15:20:35'),
(23, 'normal', 'PEMANTAUAN RUTIN', 'Rutin timbang bulanan', 'Lakukan penimbangan rutin setiap bulan di Posyandu.', '2026-05-23 15:20:35'),
(24, 'normal', 'PEMANTAUAN RUTIN', 'Lengkapi imunisasi', 'Lengkapi imunisasi sesuai jadwal Kemenkes RI.', '2026-05-23 15:20:35'),
(25, 'normal', 'PEMANTAUAN RUTIN', 'Jaga kebersihan lingkungan', 'Biasakan cuci tangan dan gunakan sanitasi yang baik untuk mencegah infeksi.', '2026-05-23 15:20:35'),
(26, 'gizi_lebih', 'POLA MAKAN', 'Kurangi gula dan lemak', 'Batasi minuman manis, makanan ultra-proses, gorengan, dan jajanan tinggi kalori.', '2026-05-23 15:20:55'),
(27, 'gizi_lebih', 'POLA MAKAN', 'Perbanyak buah dan sayur', 'Gunakan buah dan sayur segar sebagai camilan pengganti makanan manis.', '2026-05-23 15:20:55'),
(28, 'gizi_lebih', 'POLA MAKAN', 'Atur jadwal makan', 'Atur porsi dan jadwal makan sesuai kebutuhan usia anak.', '2026-05-23 15:20:55'),
(29, 'gizi_lebih', 'POLA MAKAN', 'Ganti minuman manis', 'Utamakan air putih dibanding minuman manis.', '2026-05-23 15:20:55'),
(30, 'gizi_lebih', 'AKTIVITAS FISIK', 'Tingkatkan aktivitas fisik', 'Dorong aktivitas fisik intensitas sedang–tinggi minimal 60 menit/hari.', '2026-05-23 15:20:55'),
(31, 'gizi_lebih', 'AKTIVITAS FISIK', 'Batasi screen time', 'Batasi screen time maksimal 1 jam/hari untuk usia 3–5 tahun.', '2026-05-23 15:20:55'),
(32, 'gizi_lebih', 'KONSULTASI & PEMANTAUAN', 'Konsultasi ahli gizi', 'Lakukan konsultasi dengan dokter atau ahli gizi untuk evaluasi mendalam.', '2026-05-23 15:20:55'),
(33, 'gizi_lebih', 'KONSULTASI & PEMANTAUAN', 'Pantau tren Z-Score', 'Pantau tren Z-Score setiap bulan untuk memastikan pertumbuhan tetap sehat.', '2026-05-23 15:20:55'),
(34, 'gizi_lebih', 'KONSULTASI & PEMANTAUAN', 'Hindari diet ketat', 'Hindari pembatasan makan berlebihan dan fokus pada perubahan pola hidup keluarga.', '2026-05-23 15:20:55'),
(35, 'gizi_buruk', 'INTERPRETASI', 'Gizi Buruk', 'Berat badan anak berada di bawah -3 SD menurut standar WHO sehingga termasuk kategori gizi buruk.', '2026-06-11 08:24:10'),
(36, 'gizi_kurang', 'INTERPRETASI', 'Gizi Kurang', 'Berat badan anak berada antara -2 SD sampai -3 SD menurut standar WHO sehingga termasuk kategori gizi kurang.', '2026-06-11 08:24:11'),
(37, 'normal', 'INTERPRETASI', 'Normal', 'Berat badan anak berada dalam rentang normal sesuai standar WHO.', '2026-06-11 08:24:11'),
(38, 'gizi_lebih', 'INTERPRETASI', 'Gizi Lebih', 'Berat badan anak berada di atas +2 SD menurut standar WHO sehingga termasuk kategori gizi lebih.', '2026-06-11 08:24:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `schedule_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `activity` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','parent','super_admin') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `nik` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `role`, `created_at`, `nik`) VALUES
(1, 'Admin Posyandu', 'admin@posyandu.com', '081111111111', '$2b$10$XyXNQngJsRjCWrXn8/IydO6jWeiLqSb6cTW/rRDbRmOcO1Dpti3S6', 'admin', '2026-05-20 04:20:38', NULL),
(2, 'Super Admin', 'superadmin@posyandu.com', '082222222222', '$2b$10$.71fynNXNQkNA8VeNjyKV.blZIFaNRefMGwTIGRUey9/OD5t1vbqa', 'super_admin', '2026-05-20 04:20:38', NULL),
(3, 'Siti Aminah', 'siti@gmail.com', '083333333333', '$2b$10$1x1KMb.2rgBNnysAVEz1nePkaRfgE//GxQZ3hxYkp9szK9CmshJSy', 'parent', '2026-05-20 04:20:38', NULL),
(4, 'Budi Santoso', 'budi@gmail.com', '084444444444', '$2b$10$1x1KMb.2rgBNnysAVEz1nePkaRfgE//GxQZ3hxYkp9szK9CmshJSy', 'parent', '2026-05-20 04:20:38', NULL),
(5, 'Dewi Lestari', 'dewi@gmail.com', '085555555555', '$2b$10$1x1KMb.2rgBNnysAVEz1nePkaRfgE//GxQZ3hxYkp9szK9CmshJSy', 'parent', '2026-05-20 04:20:38', NULL),
(6, 'Parent Baru', 'parentbaru@gmail.com', '081234567890', '$2b$10$gpV1wx8V/VxAiYQBFfZGMuiuX2CfkHPMUMEFJmaxqW.RXh6UXU79e', 'parent', '2026-05-20 05:54:39', NULL),
(7, 'Nabil', 'nabil@gmail.com', '0822334455', '$2b$10$q6sYS.6crL.nq6mg/2STHesY9oxMDQGQgsufPYio142pCc5MnIJzC', 'parent', '2026-05-20 07:07:44', NULL),
(9, 'ucup', 'asu@gmail.com', '083895226496', '123', 'admin', '2026-06-05 17:48:43', '32523'),
(10, 'yantis', 'anjay@gmail.com', '0808', '$2b$10$KXaqg5tA1QttO/g9brF9RuROAw1JFPxJVBegYu3dxxJQRk0od980G', 'parent', '2026-06-06 09:53:57', '1111111111111111'),
(11, 'Dwi Ananda', 'alfri@gmail.com', '123', '$2b$10$y9e8TdI6Dh0GhJthlWQKZeRjYC0RDvAjV7vAu90pYY/SOXyRQweuO', 'parent', '2026-06-10 19:46:09', '1111111111111111'),
(14, 'nabil', 'nabila@gmail.com', '0898', '$2b$10$2b9sOVd6KUxvn1fAUwN4S.MvfB9hcCeMfCzOLPxqgLH0hMk/1wlIa', 'parent', '2026-06-11 20:59:54', '3201110706040001'),
(16, 'baru', 'raiyamadenda205@gmail.com', '787898', '$2b$10$L400XhInI7wriyTkFI0OC.Z.K5VDXFQWgLn79Kj7lCjr2rYp2qdS2', 'parent', '2026-06-11 21:39:14', '1111111111111111'),
(17, 'Rena Asgar', 'rena@gmail.com', '0838', '$2b$10$C/22XGcS1SSTNjw7YYnHNecqeJMM4gctxg89w8rke.gfQZRITeytW', 'parent', '2026-06-11 21:48:09', '3201110706040001'),
(18, 'Arap', 'arap@gmail.com', '087', '$2b$10$75/OKRmCyikZPQo0VaWMHuqt8FSwHCBLSPq9O5upCSew.za8cILG2', 'admin', '2026-06-22 09:01:50', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `who_standards`
--

CREATE TABLE `who_standards` (
  `id` int(11) NOT NULL,
  `age_month` int(11) NOT NULL,
  `gender` enum('L','P') NOT NULL,
  `measurement_type` enum('BB','TB') NOT NULL,
  `l` decimal(10,4) DEFAULT NULL,
  `m` decimal(10,4) DEFAULT NULL,
  `s` decimal(10,5) DEFAULT NULL,
  `sd3neg` decimal(10,2) DEFAULT NULL,
  `sd2neg` decimal(10,2) DEFAULT NULL,
  `sd1neg` decimal(10,2) DEFAULT NULL,
  `sd0` decimal(10,2) DEFAULT NULL,
  `sd1` decimal(10,2) DEFAULT NULL,
  `sd2` decimal(10,2) DEFAULT NULL,
  `sd3` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `who_standards`
--

INSERT INTO `who_standards` (`id`, `age_month`, `gender`, `measurement_type`, `l`, `m`, `s`, `sd3neg`, `sd2neg`, `sd1neg`, `sd0`, `sd1`, `sd2`, `sd3`) VALUES
(1, 0, 'L', 'BB', 0.3487, 3.3464, 0.14602, 2.10, 2.50, 2.90, 3.30, 3.90, 4.40, 5.00),
(2, 1, 'L', 'BB', 0.2297, 4.4709, 0.13395, 2.90, 3.40, 3.90, 4.50, 5.10, 5.80, 6.60),
(3, 2, 'L', 'BB', 0.1970, 5.5675, 0.12385, 3.80, 4.30, 4.90, 5.60, 6.30, 7.10, 8.00),
(4, 3, 'L', 'BB', 0.1738, 6.3762, 0.11727, 4.40, 5.00, 5.70, 6.40, 7.20, 8.00, 9.00),
(5, 4, 'L', 'BB', 0.1553, 7.0023, 0.11316, 4.90, 5.60, 6.20, 7.00, 7.80, 8.70, 9.70),
(6, 5, 'L', 'BB', 0.1395, 7.5105, 0.11080, 5.30, 6.00, 6.70, 7.50, 8.40, 9.30, 10.40),
(7, 6, 'L', 'BB', 0.1257, 7.9340, 0.10958, 5.70, 6.40, 7.10, 7.90, 8.80, 9.80, 10.90),
(8, 7, 'L', 'BB', 0.1134, 8.2970, 0.10902, 5.90, 6.70, 7.40, 8.30, 9.20, 10.30, 11.40),
(9, 8, 'L', 'BB', 0.1021, 8.6151, 0.10882, 6.20, 6.90, 7.70, 8.60, 9.60, 10.70, 11.90),
(10, 9, 'L', 'BB', 0.0917, 8.9014, 0.10881, 6.40, 7.10, 8.00, 8.90, 9.90, 11.00, 12.30),
(11, 10, 'L', 'BB', 0.0820, 9.1649, 0.10891, 6.60, 7.40, 8.20, 9.20, 10.20, 11.40, 12.70),
(12, 11, 'L', 'BB', 0.0730, 9.4122, 0.10906, 6.80, 7.60, 8.40, 9.40, 10.50, 11.70, 13.00),
(13, 12, 'L', 'BB', 0.0644, 9.6479, 0.10925, 6.90, 7.70, 8.60, 9.60, 10.80, 12.00, 13.30),
(14, 13, 'L', 'BB', 0.0563, 9.8749, 0.10949, 7.10, 7.90, 8.80, 9.90, 11.00, 12.30, 13.70),
(15, 14, 'L', 'BB', 0.0487, 10.0953, 0.10976, 7.20, 8.10, 9.00, 10.10, 11.30, 12.60, 14.00),
(16, 15, 'L', 'BB', 0.0413, 10.3108, 0.11007, 7.40, 8.30, 9.20, 10.30, 11.50, 12.80, 14.30),
(17, 16, 'L', 'BB', 0.0343, 10.5228, 0.11041, 7.50, 8.40, 9.40, 10.50, 11.70, 13.10, 14.60),
(18, 17, 'L', 'BB', 0.0275, 10.7319, 0.11079, 7.70, 8.60, 9.60, 10.70, 12.00, 13.40, 14.90),
(19, 18, 'L', 'BB', 0.0211, 10.9385, 0.11119, 7.80, 8.80, 9.80, 10.90, 12.20, 13.70, 15.30),
(20, 19, 'L', 'BB', 0.0148, 11.1430, 0.11164, 8.00, 8.90, 10.00, 11.10, 12.50, 13.90, 15.60),
(21, 20, 'L', 'BB', 0.0087, 11.3462, 0.11211, 8.10, 9.10, 10.10, 11.30, 12.70, 14.20, 15.90),
(22, 21, 'L', 'BB', 0.0029, 11.5486, 0.11261, 8.20, 9.20, 10.30, 11.50, 12.90, 14.50, 16.20),
(23, 22, 'L', 'BB', -0.0028, 11.7504, 0.11314, 8.40, 9.40, 10.50, 11.80, 13.20, 14.70, 16.50),
(24, 23, 'L', 'BB', -0.0083, 11.9514, 0.11369, 8.50, 9.50, 10.70, 12.00, 13.40, 15.00, 16.80),
(25, 24, 'L', 'BB', -0.0137, 12.1515, 0.11426, 8.60, 9.70, 10.80, 12.20, 13.60, 15.30, 17.10),
(26, 25, 'L', 'BB', -0.0189, 12.3502, 0.11485, 8.80, 9.80, 11.00, 12.40, 13.90, 15.50, 17.50),
(27, 26, 'L', 'BB', -0.0240, 12.5466, 0.11544, 8.90, 10.00, 11.20, 12.50, 14.10, 15.80, 17.80),
(28, 27, 'L', 'BB', -0.0289, 12.7401, 0.11604, 9.00, 10.10, 11.30, 12.70, 14.30, 16.10, 18.10),
(29, 28, 'L', 'BB', -0.0337, 12.9303, 0.11664, 9.10, 10.20, 11.50, 12.90, 14.50, 16.30, 18.40),
(30, 29, 'L', 'BB', -0.0385, 13.1169, 0.11723, 9.20, 10.40, 11.70, 13.10, 14.80, 16.60, 18.70),
(31, 30, 'L', 'BB', -0.0431, 13.3000, 0.11781, 9.40, 10.50, 11.80, 13.30, 15.00, 16.90, 19.00),
(32, 31, 'L', 'BB', -0.0476, 13.4798, 0.11839, 9.50, 10.70, 12.00, 13.50, 15.20, 17.10, 19.30),
(33, 32, 'L', 'BB', -0.0520, 13.6567, 0.11896, 9.60, 10.80, 12.10, 13.70, 15.40, 17.40, 19.60),
(34, 33, 'L', 'BB', -0.0564, 13.8309, 0.11953, 9.70, 10.90, 12.30, 13.80, 15.60, 17.60, 19.90),
(35, 34, 'L', 'BB', -0.0606, 14.0031, 0.12008, 9.80, 11.00, 12.40, 14.00, 15.80, 17.80, 20.20),
(36, 35, 'L', 'BB', -0.0648, 14.1736, 0.12062, 9.90, 11.20, 12.60, 14.20, 16.00, 18.10, 20.40),
(37, 36, 'L', 'BB', -0.0689, 14.3429, 0.12116, 10.00, 11.30, 12.70, 14.30, 16.20, 18.30, 20.70),
(38, 37, 'L', 'BB', -0.0729, 14.5113, 0.12168, 10.10, 11.40, 12.90, 14.50, 16.40, 18.60, 21.00),
(39, 38, 'L', 'BB', -0.0769, 14.6791, 0.12220, 10.20, 11.50, 13.00, 14.70, 16.60, 18.80, 21.30),
(40, 39, 'L', 'BB', -0.0808, 14.8466, 0.12271, 10.30, 11.60, 13.10, 14.80, 16.80, 19.00, 21.60),
(41, 40, 'L', 'BB', -0.0846, 15.0140, 0.12322, 10.40, 11.80, 13.30, 15.00, 17.00, 19.30, 21.90),
(42, 41, 'L', 'BB', -0.0883, 15.1813, 0.12373, 10.50, 11.90, 13.40, 15.20, 17.20, 19.50, 22.10),
(43, 42, 'L', 'BB', -0.0920, 15.3486, 0.12425, 10.60, 12.00, 13.60, 15.30, 17.40, 19.70, 22.40),
(44, 43, 'L', 'BB', -0.0957, 15.5158, 0.12478, 10.70, 12.10, 13.70, 15.50, 17.60, 20.00, 22.70),
(45, 44, 'L', 'BB', -0.0993, 15.6828, 0.12531, 10.80, 12.20, 13.80, 15.70, 17.80, 20.20, 23.00),
(46, 45, 'L', 'BB', -0.1028, 15.8497, 0.12586, 10.90, 12.40, 14.00, 15.80, 18.00, 20.50, 23.30),
(47, 46, 'L', 'BB', -0.1063, 16.0163, 0.12643, 11.00, 12.50, 14.10, 16.00, 18.20, 20.70, 23.60),
(48, 47, 'L', 'BB', -0.1097, 16.1827, 0.12700, 11.10, 12.60, 14.30, 16.20, 18.40, 20.90, 23.90),
(49, 48, 'L', 'BB', -0.1131, 16.3489, 0.12759, 11.20, 12.70, 14.40, 16.30, 18.60, 21.20, 24.20),
(50, 49, 'L', 'BB', -0.1165, 16.5150, 0.12819, 11.30, 12.80, 14.50, 16.50, 18.80, 21.40, 24.50),
(51, 50, 'L', 'BB', -0.1198, 16.6811, 0.12880, 11.40, 12.90, 14.70, 16.70, 19.00, 21.70, 24.80),
(52, 51, 'L', 'BB', -0.1230, 16.8471, 0.12943, 11.50, 13.10, 14.80, 16.80, 19.20, 21.90, 25.10),
(53, 52, 'L', 'BB', -0.1262, 17.0132, 0.13005, 11.60, 13.20, 15.00, 17.00, 19.40, 22.20, 25.40),
(54, 53, 'L', 'BB', -0.1294, 17.1792, 0.13069, 11.70, 13.30, 15.10, 17.20, 19.60, 22.40, 25.70),
(55, 54, 'L', 'BB', -0.1325, 17.3452, 0.13133, 11.80, 13.40, 15.20, 17.30, 19.80, 22.70, 26.00),
(56, 55, 'L', 'BB', -0.1356, 17.5111, 0.13197, 11.90, 13.50, 15.40, 17.50, 20.00, 22.90, 26.30),
(57, 56, 'L', 'BB', -0.1387, 17.6768, 0.13261, 12.00, 13.60, 15.50, 17.70, 20.20, 23.20, 26.60),
(58, 57, 'L', 'BB', -0.1417, 17.8422, 0.13325, 12.10, 13.70, 15.60, 17.80, 20.40, 23.40, 26.90),
(59, 58, 'L', 'BB', -0.1447, 18.0073, 0.13389, 12.20, 13.80, 15.80, 18.00, 20.60, 23.70, 27.20),
(60, 59, 'L', 'BB', -0.1477, 18.1722, 0.13453, 12.30, 14.00, 15.90, 18.20, 20.80, 23.90, 27.60),
(61, 60, 'L', 'BB', -0.1506, 18.3366, 0.13517, 12.40, 14.10, 16.00, 18.30, 21.00, 24.20, 27.90),
(62, 0, 'L', 'TB', 1.0000, 49.8842, 0.03795, 1.89, 44.20, 46.10, 48.00, 49.90, 51.80, 53.70),
(63, 1, 'L', 'TB', 1.0000, 54.7244, 0.03557, 1.95, 48.90, 50.80, 52.80, 54.70, 56.70, 58.60),
(64, 2, 'L', 'TB', 1.0000, 58.4249, 0.03424, 2.00, 52.40, 54.40, 56.40, 58.40, 60.40, 62.40),
(65, 3, 'L', 'TB', 1.0000, 61.4292, 0.03328, 2.04, 55.30, 57.30, 59.40, 61.40, 63.50, 65.50),
(66, 4, 'L', 'TB', 1.0000, 63.8860, 0.03257, 2.08, 57.60, 59.70, 61.80, 63.90, 66.00, 68.00),
(67, 5, 'L', 'TB', 1.0000, 65.9026, 0.03204, 2.11, 59.60, 61.70, 63.80, 65.90, 68.00, 70.10),
(68, 6, 'L', 'TB', 1.0000, 67.6236, 0.03165, 2.14, 61.20, 63.30, 65.50, 67.60, 69.80, 71.90),
(69, 7, 'L', 'TB', 1.0000, 69.1645, 0.03139, 2.17, 62.70, 64.80, 67.00, 69.20, 71.30, 73.50),
(70, 8, 'L', 'TB', 1.0000, 70.5994, 0.03124, 2.21, 64.00, 66.20, 68.40, 70.60, 72.80, 75.00),
(71, 9, 'L', 'TB', 1.0000, 71.9687, 0.03117, 2.24, 65.20, 67.50, 69.70, 72.00, 74.20, 76.50),
(72, 10, 'L', 'TB', 1.0000, 73.2812, 0.03118, 2.28, 66.40, 68.70, 71.00, 73.30, 75.60, 77.90),
(73, 11, 'L', 'TB', 1.0000, 74.5388, 0.03125, 2.33, 67.60, 69.90, 72.20, 74.50, 76.90, 79.20),
(74, 12, 'L', 'TB', 1.0000, 75.7488, 0.03137, 2.38, 68.60, 71.00, 73.40, 75.70, 78.10, 80.50),
(75, 13, 'L', 'TB', 1.0000, 76.9186, 0.03154, 2.43, 69.60, 72.10, 74.50, 76.90, 79.30, 81.80),
(76, 14, 'L', 'TB', 1.0000, 78.0497, 0.03174, 2.48, 70.60, 73.10, 75.60, 78.00, 80.50, 83.00),
(77, 15, 'L', 'TB', 1.0000, 79.1458, 0.03197, 2.53, 71.60, 74.10, 76.60, 79.10, 81.70, 84.20),
(78, 16, 'L', 'TB', 1.0000, 80.2113, 0.03222, 2.58, 72.50, 75.00, 77.60, 80.20, 82.80, 85.40),
(79, 17, 'L', 'TB', 1.0000, 81.2487, 0.03250, 2.64, 73.30, 76.00, 78.60, 81.20, 83.90, 86.50),
(80, 18, 'L', 'TB', 1.0000, 82.2587, 0.03279, 2.70, 74.20, 76.90, 79.60, 82.30, 85.00, 87.70),
(81, 19, 'L', 'TB', 1.0000, 83.2418, 0.03310, 2.76, 75.00, 77.70, 80.50, 83.20, 86.00, 88.80),
(82, 20, 'L', 'TB', 1.0000, 84.1996, 0.03342, 2.81, 75.80, 78.60, 81.40, 84.20, 87.00, 89.80),
(83, 21, 'L', 'TB', 1.0000, 85.1348, 0.03376, 2.87, 76.50, 79.40, 82.30, 85.10, 88.00, 90.90),
(84, 22, 'L', 'TB', 1.0000, 86.0477, 0.03410, 2.93, 77.20, 80.20, 83.10, 86.00, 89.00, 91.90),
(85, 23, 'L', 'TB', 1.0000, 86.9410, 0.03445, 3.00, 78.00, 81.00, 83.90, 86.90, 89.90, 92.90),
(86, 24, 'L', 'TB', 1.0000, 87.8161, 0.03479, 3.06, 78.70, 81.70, 84.80, 87.80, 90.90, 93.90),
(87, 25, 'L', 'TB', 1.0000, 87.9720, 0.03542, 3.12, 78.60, 81.70, 84.90, 88.00, 91.10, 94.20),
(88, 26, 'L', 'TB', 1.0000, 88.8065, 0.03576, 3.18, 79.30, 82.50, 85.60, 88.80, 92.00, 95.20),
(89, 27, 'L', 'TB', 1.0000, 89.6197, 0.03610, 3.24, 79.90, 83.10, 86.40, 89.60, 92.90, 96.10),
(90, 28, 'L', 'TB', 1.0000, 90.4120, 0.03642, 3.29, 80.50, 83.80, 87.10, 90.40, 93.70, 97.00),
(91, 29, 'L', 'TB', 1.0000, 91.1828, 0.03674, 3.35, 81.10, 84.50, 87.80, 91.20, 94.50, 97.90),
(92, 30, 'L', 'TB', 1.0000, 91.9327, 0.03704, 3.41, 81.70, 85.10, 88.50, 91.90, 95.30, 98.70),
(93, 31, 'L', 'TB', 1.0000, 92.6631, 0.03733, 3.46, 82.30, 85.70, 89.20, 92.70, 96.10, 99.60),
(94, 32, 'L', 'TB', 1.0000, 93.3753, 0.03761, 3.51, 82.80, 86.40, 89.90, 93.40, 96.90, 100.40),
(95, 33, 'L', 'TB', 1.0000, 94.0711, 0.03787, 3.56, 83.40, 86.90, 90.50, 94.10, 97.60, 101.20),
(96, 34, 'L', 'TB', 1.0000, 94.7532, 0.03812, 3.61, 83.90, 87.50, 91.10, 94.80, 98.40, 102.00),
(97, 35, 'L', 'TB', 1.0000, 95.4236, 0.03836, 3.66, 84.40, 88.10, 91.80, 95.40, 99.10, 102.70),
(98, 36, 'L', 'TB', 1.0000, 96.0835, 0.03858, 3.71, 85.00, 88.70, 92.40, 96.10, 99.80, 103.50),
(99, 37, 'L', 'TB', 1.0000, 96.7337, 0.03879, 3.75, 85.50, 89.20, 93.00, 96.70, 100.50, 104.20),
(100, 38, 'L', 'TB', 1.0000, 97.3749, 0.03900, 3.80, 86.00, 89.80, 93.60, 97.40, 101.20, 105.00),
(101, 39, 'L', 'TB', 1.0000, 98.0073, 0.03919, 3.84, 86.50, 90.30, 94.20, 98.00, 101.80, 105.70),
(102, 40, 'L', 'TB', 1.0000, 98.6310, 0.03937, 3.88, 87.00, 90.90, 94.70, 98.60, 102.50, 106.40),
(103, 41, 'L', 'TB', 1.0000, 99.2459, 0.03954, 3.92, 87.50, 91.40, 95.30, 99.20, 103.20, 107.10),
(104, 42, 'L', 'TB', 1.0000, 99.8515, 0.03971, 3.97, 88.00, 91.90, 95.90, 99.90, 103.80, 107.80),
(105, 43, 'L', 'TB', 1.0000, 100.4485, 0.03986, 4.00, 88.40, 92.40, 96.40, 100.40, 104.50, 108.50),
(106, 44, 'L', 'TB', 1.0000, 101.0374, 0.04002, 4.04, 88.90, 93.00, 97.00, 101.00, 105.10, 109.10),
(107, 45, 'L', 'TB', 1.0000, 101.6186, 0.04016, 4.08, 89.40, 93.50, 97.50, 101.60, 105.70, 109.80),
(108, 46, 'L', 'TB', 1.0000, 102.1933, 0.04031, 4.12, 89.80, 94.00, 98.10, 102.20, 106.30, 110.40),
(109, 47, 'L', 'TB', 1.0000, 102.7625, 0.04045, 4.16, 90.30, 94.40, 98.60, 102.80, 106.90, 111.10),
(110, 48, 'L', 'TB', 1.0000, 103.3273, 0.04059, 4.19, 90.70, 94.90, 99.10, 103.30, 107.50, 111.70),
(111, 49, 'L', 'TB', 1.0000, 103.8886, 0.04073, 4.23, 91.20, 95.40, 99.70, 103.90, 108.10, 112.40),
(112, 50, 'L', 'TB', 1.0000, 104.4473, 0.04086, 4.27, 91.60, 95.90, 100.20, 104.40, 108.70, 113.00),
(113, 51, 'L', 'TB', 1.0000, 105.0041, 0.04100, 4.31, 92.10, 96.40, 100.70, 105.00, 109.30, 113.60),
(114, 52, 'L', 'TB', 1.0000, 105.5596, 0.04113, 4.34, 92.50, 96.90, 101.20, 105.60, 109.90, 114.20),
(115, 53, 'L', 'TB', 1.0000, 106.1138, 0.04126, 4.38, 93.00, 97.40, 101.70, 106.10, 110.50, 114.90),
(116, 54, 'L', 'TB', 1.0000, 106.6668, 0.04139, 4.41, 93.40, 97.80, 102.30, 106.70, 111.10, 115.50),
(117, 55, 'L', 'TB', 1.0000, 107.2188, 0.04152, 4.45, 93.90, 98.30, 102.80, 107.20, 111.70, 116.10),
(118, 56, 'L', 'TB', 1.0000, 107.7697, 0.04165, 4.49, 94.30, 98.80, 103.30, 107.80, 112.30, 116.70),
(119, 57, 'L', 'TB', 1.0000, 108.3198, 0.04177, 4.52, 94.70, 99.30, 103.80, 108.30, 112.80, 117.40),
(120, 58, 'L', 'TB', 1.0000, 108.8689, 0.04190, 4.56, 95.20, 99.70, 104.30, 108.90, 113.40, 118.00),
(121, 59, 'L', 'TB', 1.0000, 109.4170, 0.04202, 4.60, 95.60, 100.20, 104.80, 109.40, 114.00, 118.60),
(122, 60, 'L', 'TB', 1.0000, 109.9638, 0.04214, 4.63, 96.10, 100.70, 105.30, 110.00, 114.60, 119.20),
(123, 0, 'P', 'BB', 0.3809, 3.2322, 0.14171, 2.00, 2.40, 2.80, 3.20, 3.70, 4.20, 4.80),
(124, 1, 'P', 'BB', 0.1714, 4.1873, 0.13724, 2.70, 3.20, 3.60, 4.20, 4.80, 5.50, 6.20),
(125, 2, 'P', 'BB', 0.0962, 5.1282, 0.13000, 3.40, 3.90, 4.50, 5.10, 5.80, 6.60, 7.50),
(126, 3, 'P', 'BB', 0.0402, 5.8458, 0.12619, 4.00, 4.50, 5.20, 5.80, 6.60, 7.50, 8.50),
(127, 4, 'P', 'BB', -0.0050, 6.4237, 0.12402, 4.40, 5.00, 5.70, 6.40, 7.30, 8.20, 9.30),
(128, 5, 'P', 'BB', -0.0430, 6.8985, 0.12274, 4.80, 5.40, 6.10, 6.90, 7.80, 8.80, 10.00),
(129, 6, 'P', 'BB', -0.0756, 7.2970, 0.12204, 5.10, 5.70, 6.50, 7.30, 8.20, 9.30, 10.60),
(130, 7, 'P', 'BB', -0.1039, 7.6422, 0.12178, 5.30, 6.00, 6.80, 7.60, 8.60, 9.80, 11.10),
(131, 8, 'P', 'BB', -0.1288, 7.9487, 0.12181, 5.60, 6.30, 7.00, 7.90, 9.00, 10.20, 11.60),
(132, 9, 'P', 'BB', -0.1507, 8.2254, 0.12199, 5.80, 6.50, 7.30, 8.20, 9.30, 10.50, 12.00),
(133, 10, 'P', 'BB', -0.1700, 8.4800, 0.12223, 5.90, 6.70, 7.50, 8.50, 9.60, 10.90, 12.40),
(134, 11, 'P', 'BB', -0.1872, 8.7192, 0.12247, 6.10, 6.90, 7.70, 8.70, 9.90, 11.20, 12.80),
(135, 12, 'P', 'BB', -0.2024, 8.9481, 0.12268, 6.30, 7.00, 7.90, 8.90, 10.10, 11.50, 13.10),
(136, 13, 'P', 'BB', -0.2158, 9.1699, 0.12283, 6.40, 7.20, 8.10, 9.20, 10.40, 11.80, 13.50),
(137, 14, 'P', 'BB', -0.2278, 9.3870, 0.12294, 6.60, 7.40, 8.30, 9.40, 10.60, 12.10, 13.80),
(138, 15, 'P', 'BB', -0.2384, 9.6008, 0.12299, 6.70, 7.60, 8.50, 9.60, 10.90, 12.40, 14.10),
(139, 16, 'P', 'BB', -0.2478, 9.8124, 0.12303, 6.90, 7.70, 8.70, 9.80, 11.10, 12.60, 14.50),
(140, 17, 'P', 'BB', -0.2562, 10.0226, 0.12306, 7.00, 7.90, 8.90, 10.00, 11.40, 12.90, 14.80),
(141, 18, 'P', 'BB', -0.2637, 10.2315, 0.12309, 7.20, 8.10, 9.10, 10.20, 11.60, 13.20, 15.10),
(142, 19, 'P', 'BB', -0.2703, 10.4393, 0.12315, 7.30, 8.20, 9.20, 10.40, 11.80, 13.50, 15.40),
(143, 20, 'P', 'BB', -0.2762, 10.6464, 0.12323, 7.50, 8.40, 9.40, 10.60, 12.10, 13.70, 15.70),
(144, 21, 'P', 'BB', -0.2815, 10.8534, 0.12335, 7.60, 8.60, 9.60, 10.90, 12.30, 14.00, 16.00),
(145, 22, 'P', 'BB', -0.2862, 11.0608, 0.12350, 7.80, 8.70, 9.80, 11.10, 12.50, 14.30, 16.40),
(146, 23, 'P', 'BB', -0.2903, 11.2688, 0.12369, 7.90, 8.90, 10.00, 11.30, 12.80, 14.60, 16.70),
(147, 24, 'P', 'BB', -0.2941, 11.4775, 0.12390, 8.10, 9.00, 10.20, 11.50, 13.00, 14.80, 17.00),
(148, 25, 'P', 'BB', -0.2975, 11.6864, 0.12414, 8.20, 9.20, 10.30, 11.70, 13.30, 15.10, 17.30),
(149, 26, 'P', 'BB', -0.3005, 11.8947, 0.12441, 8.40, 9.40, 10.50, 11.90, 13.50, 15.40, 17.70),
(150, 27, 'P', 'BB', -0.3032, 12.1015, 0.12472, 8.50, 9.50, 10.70, 12.10, 13.70, 15.70, 18.00),
(151, 28, 'P', 'BB', -0.3057, 12.3059, 0.12506, 8.60, 9.70, 10.90, 12.30, 14.00, 16.00, 18.30),
(152, 29, 'P', 'BB', -0.3080, 12.5073, 0.12545, 8.80, 9.80, 11.10, 12.50, 14.20, 16.20, 18.70),
(153, 30, 'P', 'BB', -0.3101, 12.7055, 0.12587, 8.90, 10.00, 11.20, 12.70, 14.40, 16.50, 19.00),
(154, 31, 'P', 'BB', -0.3120, 12.9006, 0.12633, 9.00, 10.10, 11.40, 12.90, 14.70, 16.80, 19.30),
(155, 32, 'P', 'BB', -0.3138, 13.0930, 0.12683, 9.10, 10.30, 11.60, 13.10, 14.90, 17.10, 19.60),
(156, 33, 'P', 'BB', -0.3155, 13.2837, 0.12737, 9.30, 10.40, 11.70, 13.30, 15.10, 17.30, 20.00),
(157, 34, 'P', 'BB', -0.3171, 13.4731, 0.12794, 9.40, 10.50, 11.90, 13.50, 15.40, 17.60, 20.30),
(158, 35, 'P', 'BB', -0.3186, 13.6618, 0.12855, 9.50, 10.70, 12.00, 13.70, 15.60, 17.90, 20.60),
(159, 36, 'P', 'BB', -0.3201, 13.8503, 0.12919, 9.60, 10.80, 12.20, 13.90, 15.80, 18.10, 20.90),
(160, 37, 'P', 'BB', -0.3216, 14.0385, 0.12988, 9.70, 10.90, 12.40, 14.00, 16.00, 18.40, 21.30),
(161, 38, 'P', 'BB', -0.3230, 14.2265, 0.13059, 9.80, 11.10, 12.50, 14.20, 16.30, 18.70, 21.60),
(162, 39, 'P', 'BB', -0.3243, 14.4140, 0.13135, 9.90, 11.20, 12.70, 14.40, 16.50, 19.00, 22.00),
(163, 40, 'P', 'BB', -0.3257, 14.6010, 0.13213, 10.10, 11.30, 12.80, 14.60, 16.70, 19.20, 22.30),
(164, 41, 'P', 'BB', -0.3270, 14.7873, 0.13293, 10.20, 11.50, 13.00, 14.80, 16.90, 19.50, 22.70),
(165, 42, 'P', 'BB', -0.3283, 14.9727, 0.13376, 10.30, 11.60, 13.10, 15.00, 17.20, 19.80, 23.00),
(166, 43, 'P', 'BB', -0.3296, 15.1573, 0.13460, 10.40, 11.70, 13.30, 15.20, 17.40, 20.10, 23.40),
(167, 44, 'P', 'BB', -0.3309, 15.3410, 0.13545, 10.50, 11.80, 13.40, 15.30, 17.60, 20.40, 23.70),
(168, 45, 'P', 'BB', -0.3322, 15.5240, 0.13630, 10.60, 12.00, 13.60, 15.50, 17.80, 20.70, 24.10),
(169, 46, 'P', 'BB', -0.3335, 15.7064, 0.13716, 10.70, 12.10, 13.70, 15.70, 18.10, 20.90, 24.50),
(170, 47, 'P', 'BB', -0.3348, 15.8882, 0.13800, 10.80, 12.20, 13.90, 15.90, 18.30, 21.20, 24.80),
(171, 48, 'P', 'BB', -0.3361, 16.0697, 0.13884, 10.90, 12.30, 14.00, 16.10, 18.50, 21.50, 25.20),
(172, 49, 'P', 'BB', -0.3374, 16.2511, 0.13968, 11.00, 12.40, 14.20, 16.30, 18.80, 21.80, 25.50),
(173, 50, 'P', 'BB', -0.3387, 16.4322, 0.14051, 11.10, 12.60, 14.30, 16.40, 19.00, 22.10, 25.90),
(174, 51, 'P', 'BB', -0.3400, 16.6133, 0.14132, 11.20, 12.70, 14.50, 16.60, 19.20, 22.40, 26.30),
(175, 52, 'P', 'BB', -0.3414, 16.7942, 0.14213, 11.30, 12.80, 14.60, 16.80, 19.40, 22.60, 26.60),
(176, 53, 'P', 'BB', -0.3427, 16.9748, 0.14293, 11.40, 12.90, 14.80, 17.00, 19.70, 22.90, 27.00),
(177, 54, 'P', 'BB', -0.3440, 17.1551, 0.14371, 11.50, 13.00, 14.90, 17.20, 19.90, 23.20, 27.40),
(178, 55, 'P', 'BB', -0.3453, 17.3347, 0.14448, 11.60, 13.20, 15.10, 17.30, 20.10, 23.50, 27.70),
(179, 56, 'P', 'BB', -0.3466, 17.5136, 0.14525, 11.70, 13.30, 15.20, 17.50, 20.30, 23.80, 28.10),
(180, 57, 'P', 'BB', -0.3479, 17.6916, 0.14600, 11.80, 13.40, 15.30, 17.70, 20.60, 24.10, 28.50),
(181, 58, 'P', 'BB', -0.3492, 17.8686, 0.14675, 11.90, 13.50, 15.50, 17.90, 20.80, 24.40, 28.80),
(182, 59, 'P', 'BB', -0.3505, 18.0445, 0.14748, 12.00, 13.60, 15.60, 18.00, 21.00, 24.60, 29.20),
(183, 60, 'P', 'BB', -0.3518, 18.2193, 0.14821, 12.10, 13.70, 15.80, 18.20, 21.20, 24.90, 29.50),
(184, 0, 'P', 'TB', 1.0000, 49.1477, 0.03790, 1.86, 43.60, 45.40, 47.30, 49.10, 51.00, 52.90),
(185, 1, 'P', 'TB', 1.0000, 53.6872, 0.03640, 1.95, 47.80, 49.80, 51.70, 53.70, 55.60, 57.60),
(186, 2, 'P', 'TB', 1.0000, 57.0673, 0.03568, 2.04, 51.00, 53.00, 55.00, 57.10, 59.10, 61.10),
(187, 3, 'P', 'TB', 1.0000, 59.8029, 0.03520, 2.11, 53.50, 55.60, 57.70, 59.80, 61.90, 64.00),
(188, 4, 'P', 'TB', 1.0000, 62.0899, 0.03486, 2.16, 55.60, 57.80, 59.90, 62.10, 64.30, 66.40),
(189, 5, 'P', 'TB', 1.0000, 64.0301, 0.03463, 2.22, 57.40, 59.60, 61.80, 64.00, 66.20, 68.50),
(190, 6, 'P', 'TB', 1.0000, 65.7311, 0.03448, 2.27, 58.90, 61.20, 63.50, 65.70, 68.00, 70.30),
(191, 7, 'P', 'TB', 1.0000, 67.2873, 0.03441, 2.32, 60.30, 62.70, 65.00, 67.30, 69.60, 71.90),
(192, 8, 'P', 'TB', 1.0000, 68.7498, 0.03440, 2.37, 61.70, 64.00, 66.40, 68.70, 71.10, 73.50),
(193, 9, 'P', 'TB', 1.0000, 70.1435, 0.03444, 2.42, 62.90, 65.30, 67.70, 70.10, 72.60, 75.00),
(194, 10, 'P', 'TB', 1.0000, 71.4818, 0.03452, 2.47, 64.10, 66.50, 69.00, 71.50, 73.90, 76.40),
(195, 11, 'P', 'TB', 1.0000, 72.7710, 0.03464, 2.52, 65.20, 67.70, 70.30, 72.80, 75.30, 77.80),
(196, 12, 'P', 'TB', 1.0000, 74.0150, 0.03479, 2.58, 66.30, 68.90, 71.40, 74.00, 76.60, 79.20),
(197, 13, 'P', 'TB', 1.0000, 75.2176, 0.03496, 2.63, 67.30, 70.00, 72.60, 75.20, 77.80, 80.50),
(198, 14, 'P', 'TB', 1.0000, 76.3817, 0.03514, 2.68, 68.30, 71.00, 73.70, 76.40, 79.10, 81.70),
(199, 15, 'P', 'TB', 1.0000, 77.5099, 0.03534, 2.74, 69.30, 72.00, 74.80, 77.50, 80.20, 83.00),
(200, 16, 'P', 'TB', 1.0000, 78.6055, 0.03555, 2.79, 70.20, 73.00, 75.80, 78.60, 81.40, 84.20),
(201, 17, 'P', 'TB', 1.0000, 79.6710, 0.03576, 2.85, 71.10, 74.00, 76.80, 79.70, 82.50, 85.40),
(202, 18, 'P', 'TB', 1.0000, 80.7079, 0.03598, 2.90, 72.00, 74.90, 77.80, 80.70, 83.60, 86.50),
(203, 19, 'P', 'TB', 1.0000, 81.7182, 0.03620, 2.96, 72.80, 75.80, 78.80, 81.70, 84.70, 87.60),
(204, 20, 'P', 'TB', 1.0000, 82.7036, 0.03643, 3.01, 73.70, 76.70, 79.70, 82.70, 85.70, 88.70),
(205, 21, 'P', 'TB', 1.0000, 83.6654, 0.03666, 3.07, 74.50, 77.50, 80.60, 83.70, 86.70, 89.80),
(206, 22, 'P', 'TB', 1.0000, 84.6040, 0.03688, 3.12, 75.20, 78.40, 81.50, 84.60, 87.70, 90.80),
(207, 23, 'P', 'TB', 1.0000, 85.5202, 0.03711, 3.17, 76.00, 79.20, 82.30, 85.50, 88.70, 91.90),
(208, 24, 'P', 'TB', 1.0000, 86.4153, 0.03734, 3.23, 76.70, 80.00, 83.20, 86.40, 89.60, 92.90),
(209, 25, 'P', 'TB', 1.0000, 86.5904, 0.03786, 3.28, 76.80, 80.00, 83.30, 86.60, 89.90, 93.10),
(210, 26, 'P', 'TB', 1.0000, 87.4462, 0.03808, 3.33, 77.50, 80.80, 84.10, 87.40, 90.80, 94.10),
(211, 27, 'P', 'TB', 1.0000, 88.2830, 0.03830, 3.38, 78.10, 81.50, 84.90, 88.30, 91.70, 95.00),
(212, 28, 'P', 'TB', 1.0000, 89.1004, 0.03851, 3.43, 78.80, 82.20, 85.70, 89.10, 92.50, 96.00),
(213, 29, 'P', 'TB', 1.0000, 89.8991, 0.03872, 3.48, 79.50, 82.90, 86.40, 89.90, 93.40, 96.90),
(214, 30, 'P', 'TB', 1.0000, 90.6797, 0.03893, 3.53, 80.10, 83.60, 87.10, 90.70, 94.20, 97.70),
(215, 31, 'P', 'TB', 1.0000, 91.4430, 0.03913, 3.58, 80.70, 84.30, 87.90, 91.40, 95.00, 98.60),
(216, 32, 'P', 'TB', 1.0000, 92.1906, 0.03933, 3.63, 81.30, 84.90, 88.60, 92.20, 95.80, 99.40),
(217, 33, 'P', 'TB', 1.0000, 92.9239, 0.03952, 3.67, 81.90, 85.60, 89.30, 92.90, 96.60, 100.30),
(218, 34, 'P', 'TB', 1.0000, 93.6444, 0.03971, 3.72, 82.50, 86.20, 89.90, 93.60, 97.40, 101.10),
(219, 35, 'P', 'TB', 1.0000, 94.3533, 0.03989, 3.76, 83.10, 86.80, 90.60, 94.40, 98.10, 101.90),
(220, 36, 'P', 'TB', 1.0000, 95.0515, 0.04006, 3.81, 83.60, 87.40, 91.20, 95.10, 98.90, 102.70),
(221, 37, 'P', 'TB', 1.0000, 95.7399, 0.04024, 3.85, 84.20, 88.00, 91.90, 95.70, 99.60, 103.40),
(222, 38, 'P', 'TB', 1.0000, 96.4187, 0.04041, 3.90, 84.70, 88.60, 92.50, 96.40, 100.30, 104.20),
(223, 39, 'P', 'TB', 1.0000, 97.0885, 0.04057, 3.94, 85.30, 89.20, 93.10, 97.10, 101.00, 105.00),
(224, 40, 'P', 'TB', 1.0000, 97.7493, 0.04073, 3.98, 85.80, 89.80, 93.80, 97.70, 101.70, 105.70),
(225, 41, 'P', 'TB', 1.0000, 98.4015, 0.04089, 4.02, 86.30, 90.40, 94.40, 98.40, 102.40, 106.40),
(226, 42, 'P', 'TB', 1.0000, 99.0448, 0.04105, 4.07, 86.80, 90.90, 95.00, 99.00, 103.10, 107.20),
(227, 43, 'P', 'TB', 1.0000, 99.6795, 0.04120, 4.11, 87.40, 91.50, 95.60, 99.70, 103.80, 107.90),
(228, 44, 'P', 'TB', 1.0000, 100.3058, 0.04135, 4.15, 87.90, 92.00, 96.20, 100.30, 104.50, 108.60),
(229, 45, 'P', 'TB', 1.0000, 100.9238, 0.04150, 4.19, 88.40, 92.50, 96.70, 100.90, 105.10, 109.30),
(230, 46, 'P', 'TB', 1.0000, 101.5337, 0.04164, 4.23, 88.90, 93.10, 97.30, 101.50, 105.80, 110.00),
(231, 47, 'P', 'TB', 1.0000, 102.1360, 0.04179, 4.27, 89.30, 93.60, 97.90, 102.10, 106.40, 110.70),
(232, 48, 'P', 'TB', 1.0000, 102.7312, 0.04193, 4.31, 89.80, 94.10, 98.40, 102.70, 107.00, 111.30),
(233, 49, 'P', 'TB', 1.0000, 103.3197, 0.04206, 4.35, 90.30, 94.60, 99.00, 103.30, 107.70, 112.00),
(234, 50, 'P', 'TB', 1.0000, 103.9021, 0.04220, 4.38, 90.70, 95.10, 99.50, 103.90, 108.30, 112.70),
(235, 51, 'P', 'TB', 1.0000, 104.4786, 0.04233, 4.42, 91.20, 95.60, 100.10, 104.50, 108.90, 113.30),
(236, 52, 'P', 'TB', 1.0000, 105.0494, 0.04246, 4.46, 91.70, 96.10, 100.60, 105.00, 109.50, 114.00),
(237, 53, 'P', 'TB', 1.0000, 105.6148, 0.04259, 4.50, 92.10, 96.60, 101.10, 105.60, 110.10, 114.60),
(238, 54, 'P', 'TB', 1.0000, 106.1748, 0.04272, 4.54, 92.60, 97.10, 101.60, 106.20, 110.70, 115.20),
(239, 55, 'P', 'TB', 1.0000, 106.7295, 0.04285, 4.57, 93.00, 97.60, 102.20, 106.70, 111.30, 115.90),
(240, 56, 'P', 'TB', 1.0000, 107.2788, 0.04298, 4.61, 93.40, 98.10, 102.70, 107.30, 111.90, 116.50),
(241, 57, 'P', 'TB', 1.0000, 107.8227, 0.04310, 4.65, 93.90, 98.50, 103.20, 107.80, 112.50, 117.10),
(242, 58, 'P', 'TB', 1.0000, 108.3613, 0.04322, 4.68, 94.30, 99.00, 103.70, 108.40, 113.00, 117.70),
(243, 59, 'P', 'TB', 1.0000, 108.8948, 0.04334, 4.72, 94.70, 99.50, 104.20, 108.90, 113.60, 118.30),
(244, 60, 'P', 'TB', 1.0000, 109.4233, 0.04347, 4.76, 95.20, 99.90, 104.70, 109.40, 114.20, 118.90);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `children`
--
ALTER TABLE `children`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `growth_records`
--
ALTER TABLE `growth_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `child_id` (`child_id`);

--
-- Indeks untuk tabel `interpretations`
--
ALTER TABLE `interpretations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `nutrition_status`
--
ALTER TABLE `nutrition_status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `growth_id` (`growth_id`);

--
-- Indeks untuk tabel `recommendations`
--
ALTER TABLE `recommendations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_schedule_user` (`created_by`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `who_standards`
--
ALTER TABLE `who_standards`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT untuk tabel `children`
--
ALTER TABLE `children`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT untuk tabel `growth_records`
--
ALTER TABLE `growth_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT untuk tabel `interpretations`
--
ALTER TABLE `interpretations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `nutrition_status`
--
ALTER TABLE `nutrition_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT untuk tabel `recommendations`
--
ALTER TABLE `recommendations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT untuk tabel `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `who_standards`
--
ALTER TABLE `who_standards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=245;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `children`
--
ALTER TABLE `children`
  ADD CONSTRAINT `children_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `growth_records`
--
ALTER TABLE `growth_records`
  ADD CONSTRAINT `growth_records_ibfk_1` FOREIGN KEY (`child_id`) REFERENCES `children` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `nutrition_status`
--
ALTER TABLE `nutrition_status`
  ADD CONSTRAINT `nutrition_status_ibfk_1` FOREIGN KEY (`growth_id`) REFERENCES `growth_records` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `fk_schedule_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
