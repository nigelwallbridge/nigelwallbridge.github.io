import {mkdir,readFile,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const production=process.argv.includes('--production');
const out=production?'dist-public':'dist';
const digest=data=>createHash('sha256').update(data).digest('hex').slice(0,12);
await mkdir(out,{recursive:true});
const names=await readdir('src',{withFileTypes:true});
if(names.some(file=>!file.isFile()))throw Error('src must contain files only.');
const assets=[],renames=new Map();
for(const file of names){
 if(file.name==='index.html')continue;
 let body=await readFile('src/'+file.name);
 if(file.name==='manifest.webmanifest'&&!production){const manifest=JSON.parse(body.toString('utf8'));manifest.name='The Decider — development';manifest.short_name='Decider Test';manifest.description+=' Development preview.';body=Buffer.from(JSON.stringify(manifest,null,2)+'\n');}
 const target=/\.(js|css)$/.test(file.name)?file.name.replace(/\.(js|css)$/,'.'+digest(body)+'.$1'):file.name;
 await writeFile(out+'/'+target,body);assets.push(target);renames.set(file.name,target);
}
let html=await readFile('src/index.html','utf8');
for(const [name,target] of renames)html=html.replaceAll(new RegExp('(["\\\'])'+name.replaceAll('.','\\.')+'(?:\\?[^"\\\']*)?(["\\\'])','g'),'$1'+target+'$2');
if(!production)html=html.replace('<main id="app">','<p class="development-banner" role="status">Development preview — not the public release</p><main id="app">');
await writeFile(out+'/index.html',html);
const files=['index.html',...assets];
const version=digest(Buffer.concat(await Promise.all([...files].sort().map(file=>readFile(out+'/'+file)))));
const template=await readFile('scripts/sw-template.js','utf8');
await writeFile(out+'/sw.js',template.replace('__CACHE_NAME__',JSON.stringify(version)).replace('__FILES__',JSON.stringify(files)));
await writeFile(out+'/.nojekyll','');
console.log('Built '+(production?'public release':'development preview')+' '+version+' in '+out+'/');
