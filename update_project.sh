#!/usr/bin/env bash
# ==============================================================================
# مشروع تحديث الروابط وتنظيم المحتوى - الإصدار 2.1
# تم التطوير بواسطة: عبدالعزيز الحمداني
# ==============================================================================

set -eo pipefail
IFS=$'\n\t'

# ██████╗  التهيئة الأولية  ██████╗
declare -r PROJECT_DIR="$HOME/Badworld.app/Badworld.app"
declare -r NEW_BASE_URL="https://bad-world-a308wm0uf-sa6aas-projects.vercel.app"
declare -r GIT_REPO="https://github.com/omanaq/Badworld.app.git"
declare -r AUTHOR_NAME="عبدالعزيز الحمداني"
declare -r AUTHOR_EMAIL="sa6aa6116@gmail.com"

# ██████╗  قائمة الروابط القديمة  ██████╗
declare -ra OLD_URLS=(
    "https://very-upset-5smnxk2hk-welv61a8s-projects.vercel.app/"
    "https://very-upset-ayg4-4k465ol1y-welv61a8s-projects.vercel.app/"
    "https://omanaq.github.io/Badworld.app/"
    "https://github.com/openaziz/Bad-world-.git"
    "https://bad-world-a308wm0uf-sa6aas-projects.vercel.app"
)

# ██████╗  دوال مساعدة  ██████╗
function print_header() {
    echo -e "\n\033[1;36m$1\033[0m"
    printf '=%.0s' $(seq 1 $(tput cols))
    echo
}

function error_exit() {
    echo -e "\033[1;31mخطأ: $1\033[0m" >&2
    exit 1
}

# ██████╗  التحقق من المتطلبات  ██████╗
function check_requirements() {
    local required_tools=("git" "sed" "find" "jq" "tree")
    
    for tool in "${required_tools[@]}"; do
        if ! command -v "$tool" &> /dev/null; then
            error_exit "الأداة $tool غير مثبتة"
        fi
    done
}

# ██████╗  التنظيف الذكي  ██████╗
function clean_project() {
    print_header "مرحلة التنظيف"
    
    local -a dirs_to_remove=(
        "node_modules"
        ".next"
        "dist"
        "cache"
        "tmp"
    )

    local -a files_to_remove=(
        "*.log"
        "*.tmp"
        "*.bak"
        "tsconfig.tsbuildinfo"
        "pnpm-lock.yaml"
    )

    echo "🗑️  حذف المجلدات غير الضرورية..."
    for dir in "${dirs_to_remove[@]}"; do
        [ -d "$dir" ] && rm -rf "$dir" && echo "تم حذف $dir"
    done

    echo "🧹 تنظيف الملفات المؤقتة..."
    find . -type f \( -name "${files_to_remove[0]}" -o -name "${files_to_remove[1]}" \) -delete

    echo "✅ اكتمل التنظيف بنجاح"
}

# ██████╗  تحديث الروابط  ██████╗
function update_urls() {
    print_header "تحديث الروابط"
    
    local sed_pattern=""
    for url in "${OLD_URLS[@]}"; do
        sed_pattern+="s|${url}|${NEW_BASE_URL}|g;"
    done

    echo "🔗 معالجة الملفات النصية..."
    find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o \
                     -name "*.json" -o -name "*.ts" -o -name "*.md" \) \
                     ! -path "./.git/*" -exec sed -i "$sed_pattern" {} +

    echo "📝 تحديث ملف README.md..."
    jq --arg new_repo "$GIT_REPO" '.repository.url = $new_repo' package.json > tmp.json && mv tmp.json package.json

    echo "✅ اكتمل تحديث الروابط"
}

# ██████╗  إضافة قسم النهاية  ██████╗
function add_epilogue() {
    print_header "إضافة النهاية"
    
    local -r epilogue_content="# رواية \"لماذا كل هذا الضجيج؟\" - النسخة النهائية المنظمة\n\n"
    local -r target_files=("README.md" "docs/final-notes.md" "src/components/Epilogue.tsx")

    for file in "${target_files[@]}"; do
        if [ -f "$file" ]; then
            echo -e "\n$epilogue_content" >> "$file"
            echo "تم تحديث $file"
        fi
    done
}

# ██████╗  إدارة Git  ██████╗
function manage_git() {
    print_header "إدارة الإصدارات"
    
    git config user.name "$AUTHOR_NAME"
    git config user.email "$AUTHOR_EMAIL"
    
    echo "🔄 مزامنة مع المستودع البعيد..."
    git remote set-url origin "$GIT_REPO"
    git pull origin main --rebase
    
    echo "🚀 رفع التغييرات..."
    git add .
    git commit -m "تحديث شامل: روابط جديدة وتنظيم المحتوى"
    git push -u origin main
    
    echo "✅ تم الرفع بنجاح"
}

# ██████╗  التقرير النهائي  ██████╗
function generate_report() {
    print_header "التقرير النهائي"
    
    echo -e "\n📊 إحصائيات المشروع:"
    echo "---------------------"
    echo "عدد الملفات المحدثة: $(git diff --name-only HEAD^ | wc -l)"
    echo "المساحة المستخدمة: $(du -sh . | cut -f1)"
    echo "الملفات المتبقية:"
    tree -L 2 -d -h --gitignore
    
    echo -e "\n📧 معلومات الاتصال:"
    echo "---------------------"
    echo "البريد الإلكتروني: $AUTHOR_EMAIL"
    echo "المستودع: $GIT_REPO"
}

# ██████╗  التنفيذ الرئيسي  ██████╗
function main() {
    check_requirements
    cd "$PROJECT_DIR" || error_exit "الدليل غير موجود"
    
    clean_project
    update_urls
    add_epilogue
    manage_git
    generate_report
    
    echo -e "\n🎉 اكتملت جميع المهام بنجاح!"
}

# التنفيذ
main
