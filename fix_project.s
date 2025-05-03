#!/bin/bash
# سكربت إصلاح أخطاء مشروع Badworld.app المتكامل
# إصدار 1.2.0 - تاريخ التحديث: 2024-04-15

# تمكين وضع التصحيح وإدارة الأخطاء
set -eo pipefail

# تهيئة الألوان للرسائل
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# دالة لعرض الرسائل التحذيرية
warn() {
  echo -e "${YELLOW}[!] $1${NC}"
}

# دالة لعرض رسائل النجاح
success() {
  echo -e "${GREEN}[✓] $1${NC}"
}

# دالة لعرض رسائل الخطأ
fail() {
  echo -e "${RED}[✗] $1${NC}"
  exit 1
}

# ------ الخطوة 1: تثبيت التبعيات المفقودة ------
install_deps() {
  echo "⏳ جاري تثبيت التبعيات..."
  pnpm add uuid@9.0.1 @types/uuid@9.0.7 react-day-picker@9.6.7 || {
    fail "فشل في تثبيت التبعيات"
  }
  success "تم تثبيت الحزم بنجاح"
}

# ------ الخطوة 2: إصلاح مكون التقويم ------
fix_calendar() {
  local file="components/ui/calendar.tsx"
  echo "⏳ جاري إصلاح ملف $file..."
  
  # إنشاء نسخة احتياطية
  cp "$file" "${file}.bak"
  
  # إجراء التعديلات
  sed -i '
    s/IconLeft/IconPrevious/g;
    s/IconRight/IconNext/g;
    s/dropdown-buttons/dropdown/g
  ' "$file"
  
  success "تم تحديث مكون التقويم"
}

# ------ الخطوة 3: تصحيح استيرادات UUID ------
fix_uuid_import() {
  local file="lib/story-generator.ts"
  echo "⏳ جاري تصحيح الاستيرادات في $file..."
  
  if sed -i.bak "s/from 'uuid'/from 'uuid\/web'/g" "$file"; then
    success "تم تصحيح استيرادات UUID"
  else
    fail "فشل في تحديث الاستيرادات"
  fi
}

# ------ الخطوة 4: إنشاء الهوك المفقود ------
create_hook() {
  local dir="hooks"
  local file="${dir}/useReadingProgress.ts"
  
  echo "⏳ جاري إنشاء ملف الهوك..."
  mkdir -p "$dir"
  
  if [ ! -f "$file" ]; then
    cat > "$file" <<'EOT'
import { useState, useEffect } from 'react';

export const useReadingProgress = (): number => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const { scrollY } = window;
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollPercent = (scrollY / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, Math.round(scrollPercent)));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
};
EOT
    success "تم إنشاء ملف الهوك"
  else
    warn "ملف الهوك موجود مسبقًا، تم تخطي الإنشاء"
  fi
}

# ------ الخطوة 5: تصحيح استيرادات القصة ------
fix_story_imports() {
  local file="app/story/[id]/page.tsx"
  echo "⏳ جاري تصحيح استيرادات القصة في $file..."
  
  if sed -i.bak 's/generateStoryContent/generateStory/g' "$file"; then
    success "تم تحديث استيرادات القصة"
  else
    fail "فشل في تحديث الاستيرادات"
  fi
}

# ------ الخطوة 6: إضافة الدوال المساعدة ------
add_helpers() {
  local file="lib/story-generator.ts"
  echo "⏳ جاري إضافة الدوال المساعدة..."
  
  if ! grep -q "function getPerspective" "$file"; then
    cat >> "$file" <<'EOT'

// ======== الدوال المساعدة ======== //
type PerspectiveConfig = {
  pronoun: string;
  possessive: string;
  suffix: string;
};

const getPerspective = (type?: string): PerspectiveConfig => {
  switch (type) {
    case 'second':
      return { pronoun: 'أنت', possessive: 'ك', suffix: '' };
    case 'third':
      return { pronoun: 'هو', possessive: 'ه', suffix: '' };
    default:
      return { pronoun: 'أنا', possessive: 'ي', suffix: 'ت' };
  }
};

const getLengthModifier = (length?: string): number => {
  const lengths: Record<string, number> = {
    short: 1,
    medium: 2,
    long: 3
  };
  return lengths[length?.toLowerCase() || 'medium'] || 2;
};

const calculateWordCount = (content: string): number => {
  return content.trim().split(/\s+/g).filter(word => word.length > 0).length;
};

const calculateReadingTime = (content: string): number => {
  return Math.ceil(calculateWordCount(content) / 200);
};

const generateStorySummary = (content: string, theme: StoryTheme): string => {
  const sentences = content.split(/[.!؟]/g)
    .map(s => s.trim())
    .filter(s => s.length > 0 && theme.keywords.some(kw => s.includes(kw)))
    .slice(0, 3);
  
  return sentences.length > 0 ? `${sentences.join('. ')}...` : '';
};
EOT
    success "تم إضافة الدوال المساعدة"
  else
    warn "الدوال موجودة مسبقًا، تم تخطي الإضافة"
  fi
}

# ------ الخطوة 7: إعادة بناء المشروع ------
rebuild_project() {
  echo "⏳ جاري إعادة بناء المشروع..."
  if pnpm build; then
    success "تم البناء بنجاح"
  else
    fail "فشل في عملية البناء - راجع الأخطاء أعلاه"
  fi
}

# ------ التنفيذ الرئيسي ------
main() {
  echo -e "\n${YELLOW}بدء عملية الإصلاح...${NC}"
  
  install_deps
  fix_calendar
  fix_uuid_import
  create_hook
  fix_story_imports
  add_helpers
  rebuild_project
  
  echo -e
