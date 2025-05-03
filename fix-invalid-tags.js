#!/usr/bin/env node

const glob = require('glob');
const fs = require('fs');
const path = require('path');

// نمط يُطابق أي وسم مغلق (</...>) في الكود
const invalidClosingTag = /<\/[A-Za-z][A-Za-z0-9_.]*>/g;

glob('**/*.{ts,tsx}', { ignore: 'node_modules/**' }, (err, files) => {
  if (err) {
    console.error('خطأ في البحث عن الملفات:', err);
    process.exit(1);
  }
  files.forEach(file => {
    const filePath = path.resolve(process.cwd(), file);
    let content = fs.readFileSync(filePath, 'utf8');
    const fixed = content.replace(invalidClosingTag, '');
    if (fixed !== content) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`✔️  تمّ إصلاح ${file}`);
    }
  });
  console.log('✅ انتهى السكربت.');
});
