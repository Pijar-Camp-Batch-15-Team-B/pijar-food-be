-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS comment_id_seq;

-- Table Definition
CREATE TABLE "public"."comment" (
    "id" int4 NOT NULL DEFAULT nextval('comment_id_seq'::regclass),
    "recipe_id" int8,
    "username" varchar(100),
    "photo_profile" text,
    "message" text
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS untitled_table_210_id_seq;

-- Table Definition
CREATE TABLE "public"."recipe" (
    "id" int4 NOT NULL DEFAULT nextval('untitled_table_210_id_seq'::regclass),
    "title" varchar(60),
    "ingridients" text,
    "image" text,
    "video_url" text
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "username" varchar(100),
    "phone_number" varchar(20),
    "email" varchar(100),
    "password" varchar(250),
    "photo_profile" text DEFAULT 'https://png.pngtree.com/png-clipart/20220213/original/pngtree-avatar-bussinesman-man-profile-icon-vector-illustration-png-image_7268049.png'::text
);

INSERT INTO "public"."comment" ("id", "recipe_id", "username", "photo_profile", "message") VALUES
(1, 5, 'Bayem sore', 'https://i.pinimg.com/564x/9f/a5/98/9fa598830ffc1e8ae304064fcb781e31.jpg', 'saya sudah mencoba resepnya, enak sekali');
INSERT INTO "public"."comment" ("id", "recipe_id", "username", "photo_profile", "message") VALUES
(4, 6, 'pijarfood', 'https://i.pinimg.com/564x/9f/a5/98/9fa598830ffc1e8ae304064fcb781e31.jpg', 'Masakannya Enak!!');
INSERT INTO "public"."comment" ("id", "recipe_id", "username", "photo_profile", "message") VALUES
(5, 12, 'pijarfood', 'https://i.pinimg.com/564x/9f/a5/98/9fa598830ffc1e8ae304064fcb781e31.jpg', 'Terimakasih Masakannya');

INSERT INTO "public"."recipe" ("id", "title", "ingridients", "image", "video_url") VALUES
(1, 'Pindang Petai Kuah Cabe Hijau', '4 ekor ikan pindang, 2 papan petai, 15 gr Fiber Creme, 2 buah tomat, 5 siung bawang putih, 6 siung bawang merah, 8 biji cabe hijau, 4 biji cabe merah, 1 ruas jahe, 2 lembar daun salam, 1 batang serai, 1 ruas lengkuas, secukupnya Garam dan bumbu kaldu, 300 gr air matang, secukupnya minyak', 'https://img-global.cpcdn.com/recipes/d0ed9d1ffd176120/1360x964cq70/pindang-petai-kuah-cabe-hijau-foto-resep-utama.webp', 'https://www.youtube.com/watch?v=ND-A3Vcsg7I');
INSERT INTO "public"."recipe" ("id", "title", "ingridients", "image", "video_url") VALUES
(2, 'Seblak Creamy Mie Bakso', '600 ml air, 50 gr kerupuk bawang (warna-warni), 50 gr mie keriting, 1 sendok makan Kobe Bumbu Nasi Goreng Poll Pedas, 1 butir telur (kocok lepas), 3 buah bakso (belah 4 tidak putus dan goreng), 3 sendok makan susu full cream', 'https://img-global.cpcdn.com/recipes/0a21b79e53f8c583/1360x964cq70/resep-seblak-creamy-mie-bakso-foto-resep-utama.webp', 'https://www.youtube.com/watch?v=kvNK8LYSzYY');
INSERT INTO "public"."recipe" ("id", "title", "ingridients", "image", "video_url") VALUES
(3, 'Balado Ikan Kembung', '500 gr ikan kembung potong sesuai selera, 1 bh jeruk nipis utk membersihkan ikan, 3 lbr daun jeruk, secukupnya garam, 1 sachet kaldu bubuk masako, secukupnya minyak goreng, 9 bh bawang merah, 100 gr cabe merah keriting (saya tambah 3 bh cabe rawit merah besar), 1/2 bh tomat yg agak besar', 'https://img-global.cpcdn.com/recipes/ec98b5df13c00406/1360x964cq70/balado-ikan-kembung-foto-resep-utama.webp', 'https://www.youtube.com/watch?v=4waHrfXOPlk');
INSERT INTO "public"."recipe" ("id", "title", "ingridients", "image", "video_url") VALUES
(4, 'Talam labu kuning', '150 gr labu kuning, 75 gr gula pasir, 75 gr tepung tapioka, 25 gr tepung beras, 150 ml santan, 1/4 sdr garam, Bahan lapisan putih, 100 ml santan, 20 tepung beras, 15 tepung tapioka, 1/4 sdt garam', 'https://img-global.cpcdn.com/recipes/f937b5eae0c41569/1360x964cq70/talam-labu-kuning-foto-resep-utama.webp', 'https://www.youtube.com/watch?v=vyCxKmH9sno'),
(5, 'Ceker Balado', '1 kg ceker ayam, 15 buah cabai rawit merah, 5 buah cabai merah besar, 7 buah bamer, 3 buah baput, 3 buah kemiri, 1/6 sdt garam, 1 sdt gulpas, 500 ml air rebusan ceker, 1 ruas jahe geprek, 1 ruas laja/ lengkuas geprek, 3 lbr daun salam, 3 lembar daun jeruk, 1 btg sereh', 'https://img-global.cpcdn.com/recipes/25837e26f65b0aa3/1360x964cq70/ceker-balado-foto-resep-utama.webp', 'https://www.youtube.com/watch?v=McAq04w-xaU'),
(6, 'Sop Oyong Wortel Bakso', '1 buah oyong, 1 buah wortel, 5 butir bakso, iris bulat, 1/4 buah bawang bombay, cincang, 2 siung bawang putih, cincang, 300 ml air, 1 batang daun bawang, iris, Secukupnya garam dan kaldu bubuk, Secukupnya minyak goreng', 'https://img-global.cpcdn.com/recipes/1f1206f64383b50a/1360x964cq70/sop-oyong-wortel-bakso-foto-resep-utama.webp', 'https://www.youtube.com/watch?v=gLKGxJhI-Rs'),
(7, 'Sayur Pare Daun Pepaya Bumbu kuah Buntil', '2 buah pare ukuran agak kecil, belah 2 lalu buang bijinya, 10 lembar daun pepaya (pepaya pahit + pepaya jepang), 5 lembar daun jambu biji, 1 sdt garam, 1/2 sdt masako sapi, 1/4 sdt gula pasir, 65 ml santan instan, 1 butir telur ukuran besar (optional), 1 sdm teri jengki tawar goreng, 500 ml air, 2 sdm minyak goreng, 3 buah cabe ijo/merah keriting, 2 buah cabe rawit merah, 5 butir bawang merah, 2 siung bawang putih, 1 cm kunyit, 1 lembar serai, geprek, 1 lembar daun jeruk, buang tulangnya, 2 lembar daun salam, 1 ruas jari lengkuas, geprek, 2 buah cabe rawit merah besar utuh', 'https://img-global.cpcdn.com/recipes/6c4ac480413a116b/1360x964cq70/sayur-pare-daun-pepaya-bumbu-kuah-buntil-foto-resep-utama.webp', 'https://www.youtube.com/watch?v=sqbECwOHrv8'),
(8, 'Ayam Goreng Serundeng Lengkuas', '2 kg Ayam, potong sesuai selera, 1 batang sereh ukuran besar digeprek, 3 lembar daun salam, 10 lembar daun jeruk, buang batang daunnya, 250 g lengkuas, pilih yg muda lalu diparut, 80 g gula merah (optional), Secukupnya garam, kaldu bubuk, penyedap rasa (test rasa), Bumbu halus, 15 siung bawang merah, 10 siung bawang putih, 1/2 sdm ketumbar, 5 butir kemiri, 1 sdt jinten, 3 ruas jari kunyit, 2 ruas jari jahe', 'https://img-global.cpcdn.com/recipes/6ffda1227748c7dd/1360x964cq70/ayam-goreng-serundeng-lengkuas-foto-resep-utama.webp', 'https://www.youtube.com/watch?v=QinXnt857XE'),
(9, 'Opor Ayam Bumbu Kuning', '1/2 kg ayam rebus dengan api sedang cenderung kecil, 2 bks santan kemasan kecil, 1 bh serai, 2 lbr daun jeruk, 1 runs lengkuas, 1 ruas jahe, 1 ruas kunyit, 3 siung bawang merah, 2 siung bawang putih, Garam, Micin, Air', 'https://asset.kompas.com/crops/v_3HiPZ4Bv2WZ4vgZwiH7RrnVnE=/0x83:1000x750/750x500/data/photo/2021/07/19/60f4ff9a5a749.jpg', 'https://www.youtube.com/watch?v=NDb5SBG5JHA'),
(10, 'Bothok pare teri', '2 buah pare, 30 gr teri kering, 1/2 butir kelapa muda, parut, Bumbu halus, 10 bh cabai merah, 5 btr bawang merah, 2 siung bawang putih, 1 ruang kencur, 1 cm lengkuas muda, 5 daun jeruk, secukupnya Garam dan kaldu bubuk', 'https://img-global.cpcdn.com/recipes/108d92cd438c71e2/1360x964cq70/bothok-pare-teri-foto-resep-utama.webp', 'https://www.youtube.com/watch?v=5j4zAK9PY2g'),
(12, 'Iga Bakar', 'Iga, Kecap, dll', 'https://img-global.cpcdn.com/recipes/fe7cd4a3f4a1b0a6/1200x630cq70/photo.jpg', 'https://www.youtube.com/watch?v=S540aslmopc&pp=ygUJSWdhIEJha2Fy');

INSERT INTO "public"."users" ("id", "username", "phone_number", "email", "password", "photo_profile") VALUES
(1, 'Bayem sore', '081234567', 'xafohe8873@othao.com', '$2b$10$nf0C2Q0syq5lr50juqeMleyJRTCdtL3nublTqiuC/77WpoOukTIoW', 'https://png.pngtree.com/png-clipart/20220213/original/pngtree-avatar-bussinesman-man-profile-icon-vector-illustration-png-image_7268049.png');
INSERT INTO "public"."users" ("id", "username", "phone_number", "email", "password", "photo_profile") VALUES
(2, 'rayhan', '08978574952', 'rayhangt89@gmail.com', '$2b$10$vUL9HDouZNsZOvKOFnQmZe3HaEFqn1.5eWCVJ4wPC/yiYm0G2t/kS', 'https://png.pngtree.com/png-clipart/20220213/original/pngtree-avatar-bussinesman-man-profile-icon-vector-illustration-png-image_7268049.png');
INSERT INTO "public"."users" ("id", "username", "phone_number", "email", "password", "photo_profile") VALUES
(5, 'pijarfood', '087787584421', 'pijarfood@gmail.com', '$2b$10$tNmvNzSmUF1Far/tyYg1Lulf7g.dBQQOipVeDvgbZAWoHWCZ9b6fG', 'https://png.pngtree.com/png-clipart/20220213/original/pngtree-avatar-bussinesman-man-profile-icon-vector-illustration-png-image_7268049.png');
