import {mkdir,copyFile,readFile,writeFile,readdir} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of await readdir('src'))await copyFile(`src/${file}`,`dist/${file}`);
let html=await readFile('dist/index.html','utf8');
html=html.replace('<main id="app">','<p class="development-banner" role="status">Development preview — not the public release</p><main id="app">');
await writeFile('dist/index.html',html);
await writeFile('dist/.nojekyll','');
console.log('Built dist/. This does not publish or replace the live site.');
