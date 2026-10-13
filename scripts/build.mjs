import { readFile, writeFile, mkdir, cp, rm, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
export function validate(data) {
 if(!data.site || !Array.isArray(data.posts) || !Array.isArray(data.stops)) throw new Error('Ugyldig innholdsstruktur');
 const ids=new Set();
 for(const post of data.posts){if(!/^[a-z0-9-]{1,80}$/.test(post.id)||ids.has(post.id))throw new Error('Innlegg må ha unik ID med små bokstaver, tall og bindestrek');ids.add(post.id);if(!post.title||typeof post.body!=='string')throw new Error('Innlegg mangler tittel eller tekst');}
 for(const stop of data.stops){if(!Number.isFinite(stop.lat)||Math.abs(stop.lat)>90||!Number.isFinite(stop.lng)||Math.abs(stop.lng)>180)throw new Error('Ugyldige kartkoordinater');if(!['visited','planned'].includes(stop.status))throw new Error('Ugyldig stoppstatus');if(stop.post_id&&!ids.has(stop.post_id))throw new Error('Kartstopp viser til ukjent innlegg');}
 return data;
}
export async function build(root=process.cwd()) {
 const data=validate(JSON.parse(await readFile(path.join(root,'content/site.json'),'utf8')));
 const out=path.join(root,'dist');await rm(out,{recursive:true,force:true});await mkdir(path.join(out,'content'),{recursive:true});await mkdir(path.join(out,'media'),{recursive:true});
 for(const name of await readdir(root)){if(name.endsWith('.html')||name==='robots.txt')await cp(path.join(root,name),path.join(out,name));}
 await cp(path.join(root,'assets'),path.join(out,'assets'),{recursive:true});await cp(path.join(root,'admin'),path.join(out,'admin'),{recursive:true});
 // Keep the editor unavailable until a verified OAuth provider is configured.
 await cp(path.join(root,'admin/index.html'),path.join(out,'admin/editor.html'));
 const processed=new Map();
 async function image(ref){if(!ref)return '';if(typeof ref!=='string'||!ref.startsWith('/uploads/'))throw new Error('Bilder må lastes opp i /uploads');const relative=ref.slice(1);const input=path.resolve(root,relative);const allowed=path.resolve(root,'uploads')+path.sep;if(!input.startsWith(allowed))throw new Error('Ugyldig bildesti');if(!/\.(jpe?g|png|webp|avif)$/i.test(input))throw new Error('Kun JPEG, PNG, WebP og AVIF er tillatt');if(processed.has(ref))return processed.get(ref);const {stat}=await import('node:fs/promises');if((await stat(input)).size>20*1024*1024)throw new Error('Bilder må være mindre enn 20 MB');const name='bilde-'+(processed.size+1)+'.webp';await sharp(input,{limitInputPixels:40000000}).rotate().resize({width:1920,height:1920,fit:'inside',withoutEnlargement:true}).webp({quality:80}).toFile(path.join(out,'media',name));const url='/media/'+name;processed.set(ref,url);return url;}
 data.site.hero_image=await image(data.site.hero_image);data.site.about_image=await image(data.site.about_image);
 // Drafts and their images must never be shipped to the public site.
 data.posts=data.posts.filter(p=>p.published===true);
 for(const post of data.posts){for(const item of post.images||[]){item.image=await image(item.image);}}
 const publishedIds=new Set(data.posts.map(p=>p.id));data.stops=data.stops.map(s=>({...s,post_id:publishedIds.has(s.post_id)?s.post_id:''}));
 await writeFile(path.join(out,'content/site.json'),JSON.stringify(data));
 console.log('Bygget Abela Sailing: '+data.posts.length+' publiserte innlegg, '+processed.size+' behandlede bilder.');
}
if(process.argv[1]===new URL(import.meta.url).pathname) await build();
