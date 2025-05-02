#!/usr/bin/env bash
# ==========================================
# سكربت Bash شامل لإعداد ونشر مشروع Next.js
# يعمل على Debian/Ubuntu.
# ==========================================

# إعادة توجيه الأخطاء إلى ملف log (تشغيل صامت)
exec 2>error.log

# دالة للمحاولة حتى 3 مرات عند الفشل
retry() {
  local n=0
  until [ "$n" -ge 3 ]; do
    "$@" && break
    n=$((n+1))
    echo "محاولة #$n: $*" >&2
    sleep 1
  done
  if [ "$n" -ge 3 ]; then
    echo "خطأ: فشل الأمر بعد 3 محاولات: $*" >&2
    exit 1
  fi
}

# التحقق من Git
if ! command -v git >/dev/null 2>&1; then
  retry apt-get update -qq
  retry apt-get install -y -qq git
fi

# التحقق من Node.js و npm
if ! command -v node >/dev/null 2>&1; then
  retry apt-get update -qq
  retry apt-get install -y -qq nodejs npm
fi

# التحقق من curl (مطلوب لتحميل سكربت pnpm)
if ! command -v curl >/dev/null 2>&1; then
  retry apt-get update -qq
  retry apt-get install -y -qq curl
fi

# التحقق من pnpm
if ! command -v pnpm >/dev/null 2>&1; then
  # تثبيت pnpm عبر السكربت الرسمي
  retry curl -fsSL https://get.pnpm.io/install.sh | sh -
  # إضافة pnpm إلى المسار (حسب الدليل الافتراضي للتثبيت)
  export PATH="$HOME/.local/share/pnpm:$PATH"
fi

# الانتقال إلى مجلد المشروع (أو استنساخه إذا لم يكن موجودًا)
PROJECT_DIR="very-upset"
if [ ! -d "$PROJECT_DIR" ]; then
  retry git clone https://github.com/omanaq/very-upset.git "$PROJECT_DIR"
fi
cd "$PROJECT_DIR"

# تثبيت تبعيات المشروع
retry pnpm install

# تثبيت @tailwindcss/postcss وإعداد postcss.config.js
retry pnpm add -D @tailwindcss/postcss
retry pnpm add -D autoprefixer
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
EOF

# إنشاء مجلد الصور ونقلها
mkdir -p public/images
find . -type f -iname "*.jpg" -o -iname "*.png" -o -iname "*.webp" | while read -r img; do
  # تجنب نقل الصور الموجودة بالفعل في public/images
  if [[ "$img" == public/images* ]]; then
    continue
  fi
  mv -f "$img" public/images/
done

# محاولة تحديث مسارات الصور في الكود إلى basePath الجديد (اختياري)
# مثال: src="/images/ -> src="/very-upset/images/
grep -RIl "src=[\"']/images/" -Z . | while read -r file; do
  sed -i 's|/images/|/very-upset/images/|g' "$file"
done

# توليد صفحات الفصول
CHAPTER_DIR="src/app/chapters"
mkdir -p "$CHAPTER_DIR"
for i in $(seq 1 16); do
  chapter_path="$CHAPTER_DIR/chapter-$i"
  mkdir -p "$chapter_path"
  page_file="$chapter_path/page.tsx"
  echo "import Link from 'next/link';" > "$page_file"
  echo "export default function Chapter$i() {" >> "$page_file"
  echo "  return (" >> "$page_file"
  echo "    <div>" >> "$page_file"

  # استيراد محتوى الفصل إذا وجد
  if [ -f "chapter-$i.md" ]; then
    content_file="chapter-$i.md"
  elif [ -f "chapter-$i.txt" ]; then
    content_file="chapter-$i.txt"
  else
    content_file=""
  fi
  if [ -n "$content_file" ]; then
    while IFS= read -r line; do
      echo "      <p>$line</p>" >> "$page_file"
    done < "$content_file"
  fi

  # زر التالي (إلا في الفصل الأخير)
  if [ "$i" -lt 16 ]; then
    next_idx=$((i+1))
    echo "      <Link href=\"/chapters/chapter-$next_idx\"><button>التالي</button></Link>" >> "$page_file"
  fi

  echo "    </div>" >> "$page_file"
  echo "  );" >> "$page_file"
  echo "}" >> "$page_file"
done

# إنشاء الصفحة الرئيسية (Cover)
cat > src/app/page.tsx << 'EOF'
import Link from 'next/link';
export default function HomePage() {
  return (
    <div>
      <img src="/very-upset/images/cover.jpg" alt="Cover" />
      <Link href="/chapters/chapter-1"><button>ابدأ الرحلة</button></Link>
    </div>
  );
}
EOF

# إنشاء صفحة رسالة القارئ من ملف موجود إذا وُجد
letter=""
if [ -f "Model.md" ]; then
  letter="Model.md"
elif [ -f "رسالة_إلى_القارئ.txt" ]; then
  letter="رسالة_إلى_القارئ.txt"
fi
if [ -n "$letter" ]; then
  mkdir -p src/app/letter-to-reader
  cat > src/app/letter-to-reader/page.tsx << 'EOF'
export default function LetterToReader() {
  return (
    <div>
EOF
  while IFS= read -r line; do
    echo "      <p>$line</p>" >> src/app/letter-to-reader/page.tsx
  done < "$letter"
  cat >> src/app/letter-to-reader/page.tsx << 'EOF'
    </div>
  );
}
EOF
fi

# إعداد next.config.js للنشر على GitHub Pages
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',         // لتصدير ساكن (Next.js 13+ بديل next export)
  basePath: '/very-upset',  // مسار فرعي حسب اسم المستودع
  images: { unoptimized: true },  // تعطيل تحسين الصور (ضروري للتصدير الثابت)10
};
module.exports = nextConfig;
EOF

# بناء وتصدير المشروع
retry pnpm build
retry pnpm export

# نشر المحتوى الثابت على فرع gh-pages
git fetch origin
git switch --orphan gh-pages
git reset --hard
cp -r out/* .
# إنشاء ملف .nojekyll لتجنب تجاوز GitHub Pages لبعض الملفات
touch .nojekyll
git add -A
git commit -m "Deploy to GitHub Pages"
git push -f origin gh-pages

# العودة إلى الفرع الرئيسي (الأساسي)
git checkout main || git checkout master

echo "تم النشر بنجاح إلى https://omanaq.github.io/very-upset/"
