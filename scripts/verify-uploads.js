#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('=== Upload Endpoints Verification ===\n');

// Define all upload directories that should exist
const uploadDirs = [
  'uploads/contents',
  'uploads/courses',
  'uploads/reservations',
  'uploads/users',
];

const endpoints = [
  {
    path: 'contents/upload',
    method: 'POST',
    field: 'content',
    dir: 'contents',
  },
  { path: 'courses/upload', method: 'POST', field: 'course', dir: 'courses' },
  {
    path: 'reservations/upload',
    method: 'POST',
    field: 'reservation',
    dir: 'reservations',
  },
  { path: 'user/upload-img', method: 'POST', field: 'user', dir: 'users' },
];

console.log('Checking upload directories...');
uploadDirs.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  const exists = fs.existsSync(fullPath);

  console.log(`📁 ${dir}: ${exists ? '✅ EXISTS' : '❌ MISSING'}`);

  if (exists) {
    try {
      const stats = fs.statSync(fullPath);
      const isWritable = fs.constants.W_OK;
      fs.accessSync(fullPath, isWritable);
      console.log(`   └─ Writable: ✅ YES`);
    } catch (err) {
      console.log(`   └─ Writable: ❌ NO (${err.message})`);
    }
  }
});

console.log('\nChecking controller files...');
const controllers = [
  'src/contents/contents.controller.ts',
  'src/courses/courses.controller.ts',
  'src/reservations/reservations.controller.ts',
  'src/users/users.controller.ts',
];

controllers.forEach((controllerPath) => {
  const exists = fs.existsSync(controllerPath);
  console.log(`📄 ${controllerPath}: ${exists ? '✅ EXISTS' : '❌ MISSING'}`);

  if (exists) {
    try {
      const content = fs.readFileSync(controllerPath, 'utf8');
      const hasUploadUtils = content.includes('UploadUtils');
      const hasDiskStorage = content.includes('diskStorage');
      const hasUploadEndpoint = content.includes('upload');

      console.log(`   ├─ Uses UploadUtils: ${hasUploadUtils ? '✅' : '❌'}`);
      console.log(`   ├─ Has diskStorage: ${hasDiskStorage ? '✅' : '❌'}`);
      console.log(
        `   └─ Has upload endpoint: ${hasUploadEndpoint ? '✅' : '❌'}`,
      );
    } catch (err) {
      console.log(`   └─ Error reading file: ${err.message}`);
    }
  }
});

console.log('\nChecking common utilities...');
const utilsPath = 'src/common/utils/upload.utils.ts';
const utilsExists = fs.existsSync(utilsPath);
console.log(`📄 ${utilsPath}: ${utilsExists ? '✅ EXISTS' : '❌ MISSING'}`);

if (utilsExists) {
  try {
    const content = fs.readFileSync(utilsPath, 'utf8');
    const hasCreateUploadStorage = content.includes('createUploadStorage');
    const hasCreateFileFilter = content.includes('createFileFilter');
    const hasHandleUploadError = content.includes('handleUploadError');

    console.log(
      `   ├─ createUploadStorage: ${hasCreateUploadStorage ? '✅' : '❌'}`,
    );
    console.log(`   ├─ createFileFilter: ${hasCreateFileFilter ? '✅' : '❌'}`);
    console.log(
      `   └─ handleUploadError: ${hasHandleUploadError ? '✅' : '❌'}`,
    );
  } catch (err) {
    console.log(`   └─ Error reading file: ${err.message}`);
  }
}

console.log('\n=== Summary ===');
console.log('✅ All upload endpoints should now use:');
console.log('   • Dynamic directory path resolution');
console.log('   • Automatic directory creation');
console.log('   • Comprehensive error handling');
console.log('   • Consistent file filtering');
console.log('   • Proper logging and debugging');

console.log('\n📋 Upload Endpoints:');
endpoints.forEach((endpoint) => {
  console.log(
    `   • ${endpoint.method} /${endpoint.path} (field: ${endpoint.field}) → uploads/${endpoint.dir}/`,
  );
});

console.log('\n⚠️  Remember to test each endpoint after deployment!');
