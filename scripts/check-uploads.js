#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function checkDirectory(dirPath, label) {
  console.log(`\n=== Checking ${label} ===`);
  console.log(`Path: ${dirPath}`);

  try {
    const exists = fs.existsSync(dirPath);
    console.log(`Exists: ${exists}`);

    if (exists) {
      const stats = fs.statSync(dirPath);
      console.log(`Is Directory: ${stats.isDirectory()}`);
      console.log(`Mode: ${stats.mode.toString(8)}`);
      console.log(`Owner: ${stats.uid}:${stats.gid}`);

      if (stats.isDirectory()) {
        try {
          const files = fs.readdirSync(dirPath);
          console.log(`Files count: ${files.length}`);
          console.log(
            `Files: ${files.slice(0, 5).join(', ')}${files.length > 5 ? '...' : ''}`,
          );
        } catch (readErr) {
          console.log(`Cannot read directory: ${readErr.message}`);
        }
      }
    } else {
      console.log('Directory does not exist');
    }
  } catch (err) {
    console.log(`Error checking directory: ${err.message}`);
  }
}

console.log('=== Upload Directory Diagnostics ===');
console.log(`Working Directory: ${process.cwd()}`);
console.log(`Node Environment: ${process.env.NODE_ENV || 'not set'}`);
console.log(`User ID: ${process.getuid ? process.getuid() : 'N/A'}`);
console.log(`Group ID: ${process.getgid ? process.getgid() : 'N/A'}`);

// Check various possible upload paths
const possiblePaths = [
  path.join(process.cwd(), 'uploads'),
  path.join(process.cwd(), 'uploads', 'contents'),
  path.join(process.cwd(), 'uploads', 'reservations'),
  path.join(__dirname, '..', 'uploads'),
  path.join(__dirname, '..', 'uploads', 'contents'),
  '/app/uploads',
  '/app/uploads/contents',
  './uploads',
  './uploads/contents',
];

possiblePaths.forEach((p, index) => {
  checkDirectory(p, `Path ${index + 1}`);
});

// Test write permissions
console.log('\n=== Testing Write Permissions ===');
const testDirs = [
  path.join(process.cwd(), 'uploads', 'contents'),
  '/app/uploads/contents',
];

testDirs.forEach((dir) => {
  try {
    if (fs.existsSync(dir)) {
      const testFile = path.join(dir, 'test-write-' + Date.now() + '.txt');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      console.log(`Write test PASSED for: ${dir}`);
    } else {
      console.log(`Write test SKIPPED (dir not exists): ${dir}`);
    }
  } catch (err) {
    console.log(`Write test FAILED for ${dir}: ${err.message}`);
  }
});

console.log('\n=== Diagnostics Complete ===');
