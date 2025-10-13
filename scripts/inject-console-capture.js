const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScriptIntoHTML(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes('dashboard-console-capture.js')) {
    return;
  }
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `${scriptTag}\n</head>`);
  } else if (content.includes('<body')) {
    content = content.replace('<body', `${scriptTag}\n<body`);
  } else {
    return;
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Injected console capture script into: ${filePath}`);
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScriptIntoHTML(filePath);
    }
  });
}

const outDir = path.join(process.cwd(), '.next/server/app');
if (fs.existsSync(outDir)) {
  processDirectory(outDir);
  console.log('Console capture script injection complete!');
} else {
  console.log('Build output directory not found. Skipping injection.');
}