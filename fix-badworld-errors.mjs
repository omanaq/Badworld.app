import fs from 'fs';
import path from 'path';
import glob from 'glob';

console.log('🛠️ بدء فحص وإصلاح المشروع بالكامل...');

const rootDir = process.cwd();

// الإصلاحات الذكية حسب السياق
const fixContent = (filePath, content) => {
  let fixed = content;

  // إصلاح <p> المفتوحة غير المغلقة
  fixed = fixed.replace(/<p>([^<]*)$/gm, (match, text) => {
    return `<p>${text.trim()}</p>`;
  });

  // إصلاح html/head/body داخل layout.tsx
  if (filePath.includes('layout.tsx')) {
    fixed = fixed.replace(/<div([^>]*)>/, '<html$1>');
    fixed = fixed.replace(/<\/div>/, '</html>');

    // تأكد من وجود body بداخل html
    if (!fixed.includes('<body')) {
      fixed = fixed.replace(
        /<html([^>]*)>/,
        `<html$1>\n  <body className="min-h-screen bg-black text-white font-cairo flex flex-col">`
      );
      fixed += `\n  </body>\n</html>`;
    }
  }

  return fixed;
};

// تنفيذ الفحص على جميع ملفات ts و tsx
glob('**/*.{ts,tsx}', { cwd: rootDir, ignore: ['node_modules/**', '.next/**'] }, (err, files) => {
  if (err) {
    console.error('حدث خطأ أثناء القراءة:', err);
    return;
  }

  let totalFixed = 0;

  files.forEach((file) => {
    const fullPath = path.join(rootDir, file);
    const original = fs.readFileSync(fullPath, 'utf-8');
    const fixed = fixContent(file, original);

    if (fixed !== original) {
      fs.writeFileSync(fullPath, fixed, 'utf-8');
      console.log(`✅ تم إصلاح: ${file}`);
      totalFixed++;
    }
  });

  if (totalFixed === 0) {
    console.log('✨ لا توجد أخطاء تحتاج إلى إصلاح.');
  } else {
    console.log(`🎉 تم إصلاح ${totalFixed} ملفًا. أعد تشغيل: pnpm run build`);
  }
});
