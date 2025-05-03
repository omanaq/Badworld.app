import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { glob } = require('glob');

console.log('🛠️ بدء فحص وإصلاح المشروع بالكامل...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = process.cwd();

const fixContent = (filePath, content) => {
  let fixed = content;

  // إصلاح <p> المفتوحة
  fixed = fixed.replace(/<p>([^<]*)$/gm, (match, text) => {
    return `<p>${text.trim()}</p>`;
  });

  // إصلاح عناصر layout.tsx
  if (filePath.includes('layout.tsx')) {
    fixed = fixed.replace(/<html([^>]*)>/, '<html$1>');
    fixed = fixed.replace(/<\/html>/, '</html>');

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

// استخدم `glob.sync` بدلاً من `glob()`
const files = glob.sync('**/*.{ts,tsx}', { cwd: rootDir, ignore: ['node_modules/**', '.next/**'] });

if (files.length === 0) {
  console.log('✨ لا توجد ملفات تحتاج إلى إصلاح.');
  process.exit(0);
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

console.log(`🎉 تم إصلاح ${totalFixed} ملفًا. أعد التشغيل باستخدام: pnpm run build`);
