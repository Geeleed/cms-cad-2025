-- Migration 002: Add news table; add video & page content into cad__resource

-- 1. Create news table
CREATE TABLE IF NOT EXISTS cadcenter.news (
  id       SERIAL        PRIMARY KEY,
  img_src  TEXT          NOT NULL DEFAULT '',
  title    TEXT          NOT NULL,
  date     VARCHAR(100)  NOT NULL DEFAULT '',
  href     TEXT          NOT NULL DEFAULT ''
);

-- 2. Seed news rows (idempotent)
INSERT INTO cadcenter.news (id, img_src, title, date, href) VALUES
  (5, 'https://mpics.mgronline.com/pics/Images/568000006193501.JPEG', 'CAD CENTER ตอกย้ำสุขภาพเด็กออทิสติก ต้อนรับผู้เชี่ยวชาญด้านเวชศาสตร์ฟังก์ชัน', '30 มิ.ย. 2568 10:14', 'https://mgronline.com/greeninnovation/detail/9680000061191'),
  (4, 'https://static.naewna.com/uploads/news/source/891857.jpg', 'บำบัดเด็ก''ออทิสติก''โดยสหวิชาชีพ ทำตั้งแต่''อายุน้อย-ต่อเนื่อง''เสริมพฤติกรรมเชิงบวก', 'วันจันทร์ ที่ 16 มิถุนายน พ.ศ. 2568, 06.00 น.', 'https://www.naewna.com/local/891857'),
  (3, 'https://www.matichon.co.th/wp-content/uploads/2025/06/11-20.jpg', 'CAD CENTER จับมือ SUNSHINE MIND CLINIC ร่วมรักษาและบำบัดเด็กออทิสติกโดยจิตแพทย์เด็ก', 'วันที่ 5 มิถุนายน 2568 - 15:13 น.', 'https://www.matichon.co.th/publicize/news_5216216'),
  (2, 'https://www.matichon.co.th/wp-content/uploads/2025/05/01-56-728x486.jpg', 'ศูนย์พัฒนาเด็ก CAD CENTER จับมือจิตแพทย์เด็กผนึกทีมสหวิชาชีพร่วมบำบัดเด็กออทิสติก', 'วันที่ 13 พฤษภาคม 2568 - 15:14 น.', 'https://www.matichon.co.th/publicize/news_5180557'),
  (1, 'https://static.naewna.com/uploads/news/source/875479.jpg', '''ออทิสติกในวัยเด็ก'' สังคมไทยต้องตระหนักรู้ร่วมกัน', 'วันจันทร์ ที่ 7 เมษายน พ.ศ. 2568, 06.00 น.', 'https://www.naewna.com/local/875479')
ON CONFLICT (id) DO NOTHING;

-- Sync sequence
SELECT setval(
  pg_get_serial_sequence('cadcenter.news', 'id'),
  COALESCE((SELECT MAX(id) FROM cadcenter.news), 0) + 1,
  false
);
