#!/bin/bash
set -e

# الانتقال إلى دليل المشروع
cd ~/Badworld.app/Badworld.app || { echo "❌ خطأ في الدخول إلى الدليل"; exit 1; }

# ------ حذف الملفات غير الضرورية ------ #
echo "🗑️ بدء عملية التنظيف..."
rm -rf \
    node_modules \
    .next \
    dist \
    tsconfig.tsbuildinfo \
    *.log \
    *.tmp \
    *.bak

find . -type d \( -name "tmp" -o -name "cache" \) -exec rm -rf {} +

# ------ استبدال الروابط القديمة ------ #
declare -a old_urls=(
    "https://very-upset-5smnxk2hk-welv61a8s-projects.vercel.app/"
    "https://very-upset-ayg4-4k465ol1y-welv61a8s-projects.vercel.app/"
    "https://omanaq.github.io/Badworld.app/"
)

new_url="https://omanaq.github.io/Badworld.app/"

echo "🔗 تحديث الروابط..."
find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.json" -o -name "*.ts" \) \
    ! -path "./.git/*" \
    -exec sed -i \
    -e "s|https://very-upset-5smnxk2hk-welv61a8s-projects.vercel.app/|$new_url|g" \
    -e "s|https://very-upset-ayg4-4k465ol1y-welv61a8s-projects.vercel.app/|$new_url|g" \
    -e "s|https://omanaq.github.io/Badworld.app/|$new_url|g" {} +

# ------ إدارة git ------ #
echo "🔄 تحديث مستودع git..."
git remote set-url origin https://github.com/omanaq/Badworld.app.git
git checkout main
git pull origin main
git add .
git commit -m "تحديث الروابط وحذف الملفات غير الضرورية"
git push origin main

echo -e "\n✅ تم الانتهاء بنجاح!"
echo "📦 الملفات المتبقية:"
ls -lh --group-directories-first
