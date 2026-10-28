import {mkdir,readFile,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const digest=data=>createHash('sha256').update(data).digest('hex').slice(0,12);
await mkdir('dist',{recursive:true});
const names=await readdir('src',{withFileTypes:true});
if(names.some(file=>!file.isFile()))throw Error('src must contain files only.');
const assets=[],renames=new Map();
for(const file of names){
 if(file.name==='index.html')continue;
 const body=await readFile('src/'+file.name);
 const target=/\.(js|css)$/.test(file.name)?file.name.replace(/\.(js|css)$/,'.'+digest(body)+'.$1'):file.name;
 await writeFile('dist/'+target,body);assets.push(target);renames.set(file.name,target);
}
let html=await readFile('src/index.html','utf8');
for(const [name,target] of renames)html=html.replaceAll(new RegExp('(["\\\'])'+name.replaceAll('.','\\.')+'(?:\\?[^"\\\']*)?(["\\\'])','g'),'$1'+target+'$2');
html=html.replace('<main id="app">','<p class="development-banner" role="status">Installable development preview — not the public release</p><main id="app">');
await writeFile('dist/index.html',html);
const files=['index.html',...assets];
const version=digest(Buffer.concat(await Promise.all([...files].sort().map(file=>readFile('dist/'+file)))));
const template=await readFile('scripts/sw-template.js','utf8');
await writeFile('dist/sw.js',template.replace('__CACHE_NAME__',JSON.stringify(version)).replace('__FILES__',JSON.stringify(files)));
await writeFile('dist/.nojekyll','');
console.log('Built installable preview '+version+'. Public app is unchanged.');
