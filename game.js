// ============================================
// KAPSÜL v6 - Full Vanilla JS Professional
// ============================================
// --- SPLASH SCREEN SEQUENCE (Real Images) ---
(function(){
const sc=document.getElementById('splash-canvas');const sctx=sc.getContext('2d');const so=document.getElementById('splash-overlay');
function resizeSplash(){sc.width=window.innerWidth;sc.height=window.innerHeight}
resizeSplash();window.addEventListener('resize',resizeSplash);
// Preload splash images
const splashImages=[];const splashSrcs=['splash_yaz.jpg','splash_antigravity.jpg','splash_kapsul.jpg'];
let imagesLoaded=0;
splashSrcs.forEach((src,i)=>{const img=new Image();img.onload=()=>{imagesLoaded++;if(imagesLoaded===3)startSplash()};img.onerror=()=>{imagesLoaded++;if(imagesLoaded===3)startSplash()};img.src=src;splashImages[i]=img});
let splashPhase=0;let splashStart=0;
const phaseDurations=[2200,2200,2200];
const fadeTime=500;
function drawImageCover(ctx,img,w,h,alpha){
ctx.fillStyle='#0a0a1a';ctx.fillRect(0,0,w,h);
if(!img||!img.complete||!img.naturalWidth)return;
ctx.globalAlpha=alpha;
const iw=img.naturalWidth,ih=img.naturalHeight;
const scale=Math.max(w/iw,h/ih);
const dw=iw*scale,dh=ih*scale;
const dx=(w-dw)/2,dy=(h-dh)/2;
ctx.drawImage(img,dx,dy,dw,dh);
ctx.globalAlpha=1}
function splashLoop(t){
if(!splashStart)splashStart=t;
const w=sc.width,h=sc.height;const elapsed=t-splashStart;const dur=phaseDurations[splashPhase]||2200;
let alpha=1;
if(elapsed<fadeTime)alpha=elapsed/fadeTime;
else if(elapsed>dur-fadeTime)alpha=Math.max(0,(dur-elapsed)/fadeTime);
sctx.fillStyle='#0a0a1a';sctx.fillRect(0,0,w,h);
drawImageCover(sctx,splashImages[splashPhase],w,h,alpha);
if(elapsed>=dur){splashPhase++;splashStart=t;
if(splashPhase>=3){so.classList.add('fade-out');setTimeout(()=>{so.classList.add('hidden');showMainMenu()},600);return}}
requestAnimationFrame(splashLoop)}
function startSplash(){splashStart=0;requestAnimationFrame(splashLoop)}
// If images take too long, start anyway after 3s
setTimeout(()=>{if(!splashStart)startSplash()},3000);
// Click/tap to skip splash
so.addEventListener('click',()=>{splashPhase=3;so.classList.add('fade-out');setTimeout(()=>{so.classList.add('hidden');showMainMenu()},400)});
function showMainMenu(){const mm=document.getElementById('main-menu');mm.classList.remove('hidden');
const mc=document.getElementById('menu-bg-canvas');const mctx=mc.getContext('2d');mc.width=window.innerWidth;mc.height=window.innerHeight;
const menuParticles=[];for(let i=0;i<80;i++){menuParticles.push({x:Math.random()*mc.width,y:Math.random()*mc.height,vx:(Math.random()-.5)*.3,vy:-.2-Math.random()*.3,r:Math.random()*2+.5,color:['#00c6fb','#005bea','#7c3aed','#f472b6'][Math.floor(Math.random()*4)],a:Math.random()*.2+.05})}
function menuBgLoop(t){mctx.fillStyle='#0a0a1a';mctx.fillRect(0,0,mc.width,mc.height);
const rg=mctx.createRadialGradient(mc.width/2,mc.height*.6,0,mc.width/2,mc.height*.6,mc.width*.4);rg.addColorStop(0,'rgba(0,91,234,0.06)');rg.addColorStop(1,'transparent');mctx.fillStyle=rg;mctx.fillRect(0,0,mc.width,mc.height);
menuParticles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.y<-10){p.y=mc.height+10;p.x=Math.random()*mc.width}if(p.x<0)p.x=mc.width;if(p.x>mc.width)p.x=0;mctx.globalAlpha=p.a*(.5+Math.sin(t/600+p.x*.01)*.5);mctx.fillStyle=p.color;mctx.beginPath();mctx.arc(p.x,p.y,p.r,0,Math.PI*2);mctx.fill()});mctx.globalAlpha=1;
requestAnimationFrame(menuBgLoop)}
requestAnimationFrame(menuBgLoop);
const saved=localStorage.getItem('kapsul-v6');if(saved){try{const s=JSON.parse(saved);if(s.unlocked>1){document.getElementById('continue-btn').style.display='block'}}catch(e){}}
}
window.showMainMenu=showMainMenu;
document.getElementById('new-game-btn').addEventListener('click',()=>{startGameFromMenu()});
document.getElementById('continue-btn').addEventListener('click',()=>{startGameFromMenu()});
function startGameFromMenu(){const mm=document.getElementById('main-menu');mm.classList.add('fade-out');setTimeout(()=>{mm.classList.add('hidden');document.getElementById('app-container').classList.remove('hidden')},600)}
})();
// --- CONFIG ---
const LEVEL_CONFIGS = (()=>{const c=[];for(let i=1;i<=50;i++){let g,n,d;if(i<=5){g=4;n=4+Math.min(i-1,1);d='easy'}else if(i<=10){g=4;n=5+Math.floor((i-6)/2);d='easy'}else if(i<=18){g=5;n=5+Math.floor((i-11)/2);d='medium'}else if(i<=26){g=5;n=7+Math.floor((i-19)/3);d='medium'}else if(i<=35){g=6;n=7+Math.floor((i-27)/3);d='hard'}else if(i<=43){g=6;n=9+Math.floor((i-36)/3);d='expert'}else{g=7;n=10+Math.floor((i-44)/3);d='master'}n=Math.min(n,g===4?6:g===5?9:g===6?12:14);c.push({level:i,gridSize:g,numCount:n,diff:d})}return c})();
const ZONES=[{name:'🌸 Bahar Vadisi',cls:'meadow',range:[1,10]},{name:'☀️ Yaz Ormanı',cls:'forest',range:[11,20]},{name:'🍂 Sonbahar Tepeleri',cls:'mountain',range:[21,30]},{name:'❄️ Kış Diyarı',cls:'volcano',range:[31,40]},{name:'✨ Büyülü Bahçe',cls:'crystal',range:[41,50]}];
const MILESTONES=[{level:10,text:'🦋 Bahar Perisi'},{level:20,text:'🐟 Göl Ustası'},{level:30,text:'🍁 Sonbahar Lordu'},{level:40,text:'⛄ Kış Kahramanı'},{level:50,text:'🦄 Efsane'}];
// --- RNG ---
class RNG{constructor(s){this.s=s}next(){this.s=(this.s*1664525+1013904223)&0xFFFFFFFF;return(this.s>>>0)/0xFFFFFFFF}int(a,b){return a+Math.floor(this.next()*(b-a+1))}shuffle(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=this.int(0,i);[r[i],r[j]]=[r[j],r[i]]}return r}}
// --- PUZZLE GEN ---
function genPuzzle(li){const cfg=LEVEL_CONFIGS[li];const rng=new RNG(li*7919+42);const{gridSize:gs,numCount:nc}=cfg;const L='ABCDEFGHIJKLMNOPQRSTUVWXYZ';let att=0;while(att<200){att++;const grid=Array.from({length:gs},()=>Array(gs).fill(null));const caps=[];let pl=0;const cells=[];for(let r=0;r<gs;r++)for(let c=0;c<gs;c++)cells.push([r,c]);const sh=rng.shuffle(cells);for(const[r,c]of sh){if(pl>=nc)break;if(grid[r][c]!==null)continue;const dirs=rng.shuffle(['h','v']);for(const dir of dirs){const r2=dir==='v'?r+1:r;const c2=dir==='h'?c+1:c;if(r2<gs&&c2<gs&&grid[r2][c2]===null){const id=L[pl];grid[r][c]=id;grid[r2][c2]=id;caps.push([id,r,c,dir,2]);pl++;break}}}if(pl<nc)continue;const nums=[];for(let k=1;k<=nc;k++)nums.push(k);const sn=rng.shuffle(nums);const sol={};caps.forEach(([id],i)=>{sol[id]=sn[i]});const rc=Array(gs).fill(0);const cc=Array(gs).fill(0);caps.forEach(([id,row,col,dir])=>{const v=sol[id];if(dir==='h'){rc[row]+=v;cc[col]+=v;cc[col+1]+=v}else{rc[row]+=v;rc[row+1]+=v;cc[col]+=v}});return{level:cfg.level,diff:cfg.diff,gridRows:gs,gridCols:gs,numbers:nums,capsules:caps,rowClues:rc,colClues:cc,solution:sol}}return null}
// --- SAVE ---
let save=JSON.parse(localStorage.getItem('kapsul-v6')||'{}');if(!save.stars)save.stars={};if(!save.unlocked)save.unlocked=1;if(!save.best)save.best={};
function persist(){localStorage.setItem('kapsul-v6',JSON.stringify(save))}
// --- AUDIO ---
const AudioCtx=window.AudioContext||window.webkitAudioContext;let audioCtx;
function ensureAudio(){if(!audioCtx)audioCtx=new AudioCtx()}
function playTone(freq,dur=.12,type='sine',vol=.15){ensureAudio();const osc=audioCtx.createOscillator();const g=audioCtx.createGain();osc.type=type;osc.frequency.value=freq;g.gain.value=vol;g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+dur);osc.connect(g);g.connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+dur)}
function sndPlace(){playTone(523,.1);setTimeout(()=>playTone(659,.1),50)}
function sndRemove(){playTone(330,.08,'triangle')}
function sndHint(){playTone(880,.15);setTimeout(()=>playTone(1047,.15),80)}
function sndWin(){[0,100,200,300,400].forEach((d,i)=>setTimeout(()=>playTone([523,659,784,1047,1319][i],.25,'sine',.12),d))}
function sndErr(){playTone(200,.2,'sawtooth',.08);setTimeout(()=>playTone(180,.25,'sawtooth',.06),100)}
// --- CONFETTI ---
const confettiCanvas=document.getElementById('confetti-canvas');const confettiCtx=confettiCanvas.getContext('2d');let confettiParts=[];let confettiAnim=null;
function resizeConfetti(){confettiCanvas.width=window.innerWidth;confettiCanvas.height=window.innerHeight}
function launchConfetti(){resizeConfetti();confettiCanvas.style.display='block';confettiParts=[];const cols=['#00c6fb','#7c3aed','#f472b6','#ffd200','#34d399','#fb923c'];for(let i=0;i<120;i++){confettiParts.push({x:Math.random()*confettiCanvas.width,y:Math.random()*confettiCanvas.height-confettiCanvas.height,vx:(Math.random()-.5)*6,vy:Math.random()*4+3,r:Math.random()*6+3,rot:Math.random()*360,rotV:(Math.random()-.5)*12,c:cols[Math.floor(Math.random()*cols.length)],life:1})}animConfetti()}
function animConfetti(){confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);let alive=false;confettiParts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.12;p.rot+=p.rotV;p.life-=.004;if(p.life>0)alive=true;confettiCtx.save();confettiCtx.translate(p.x,p.y);confettiCtx.rotate(p.rot*Math.PI/180);confettiCtx.globalAlpha=Math.max(0,p.life);confettiCtx.fillStyle=p.c;confettiCtx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.5);confettiCtx.restore()});if(alive)confettiAnim=requestAnimationFrame(animConfetti);else{confettiCanvas.style.display='none';cancelAnimationFrame(confettiAnim)}}
// --- BG PARTICLES ---
const bgCanvas=document.getElementById('bg-canvas');const bgCtx=bgCanvas.getContext('2d');let bgParts=[];
function initBg(){bgCanvas.width=window.innerWidth;bgCanvas.height=window.innerHeight;bgParts=[];for(let i=0;i<50;i++){bgParts.push({x:Math.random()*bgCanvas.width,y:Math.random()*bgCanvas.height,r:Math.random()*2+.5,a:Math.random()*.4+.1,dx:(Math.random()-.5)*.3,dy:(Math.random()-.5)-.2,phase:Math.random()*Math.PI*2})}}
function animBg(t){bgCtx.clearRect(0,0,bgCanvas.width,bgCanvas.height);bgParts.forEach(p=>{p.x+=p.dx;p.y+=p.dy;if(p.y<-10)p.y=bgCanvas.height+10;if(p.x<-10)p.x=bgCanvas.width+10;if(p.x>bgCanvas.width+10)p.x=-10;const pulse=Math.sin(t/1000+p.phase)*.15+.85;bgCtx.beginPath();bgCtx.arc(p.x,p.y,p.r,0,Math.PI*2);bgCtx.fillStyle=`rgba(120,180,255,${p.a*pulse})`;bgCtx.fill()});requestAnimationFrame(animBg)}
window.addEventListener('resize',()=>{initBg();resizeConfetti()});initBg();requestAnimationFrame(animBg);
// --- ROADMAP SVG DECORATIONS ---
function drawTree(ctx,x,y,type,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);if(type==='pine'){ctx.fillStyle='#1f6b3e';ctx.beginPath();ctx.moveTo(0,-30);ctx.lineTo(14,0);ctx.lineTo(9,0);ctx.lineTo(17,14);ctx.lineTo(-17,14);ctx.lineTo(-9,0);ctx.lineTo(-14,0);ctx.closePath();ctx.fill();ctx.fillStyle='#2d8a50';ctx.beginPath();ctx.moveTo(0,-30);ctx.lineTo(8,-5);ctx.lineTo(-8,-5);ctx.closePath();ctx.fill();ctx.fillStyle='#5a3a1e';ctx.fillRect(-3,14,6,10);// Snow caps
ctx.fillStyle='rgba(255,255,255,0.25)';ctx.beginPath();ctx.moveTo(0,-30);ctx.lineTo(5,-22);ctx.lineTo(-5,-22);ctx.closePath();ctx.fill()}else if(type==='oak'){ctx.fillStyle='#5a3a1e';ctx.fillRect(-3,0,6,16);ctx.fillStyle='#1a6b3a';ctx.beginPath();ctx.arc(0,-6,16,0,Math.PI*2);ctx.fill();ctx.fillStyle='#24854a';ctx.beginPath();ctx.arc(-6,-10,9,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(6,-8,8,0,Math.PI*2);ctx.fill();// Apples
ctx.fillStyle='#e84040';ctx.beginPath();ctx.arc(8,-3,2.5,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(-5,0,2,0,Math.PI*2);ctx.fill()}else if(type==='cherry'){ctx.fillStyle='#8B4513';ctx.fillRect(-2,0,4,14);ctx.fillStyle='#ff69b4';ctx.beginPath();ctx.arc(0,-6,12,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ff8cc8';ctx.beginPath();ctx.arc(-4,-9,8,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(5,-7,7,0,Math.PI*2);ctx.fill();// Petals falling
ctx.fillStyle='rgba(255,182,210,0.5)';ctx.beginPath();ctx.arc(10,5,2,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(-8,8,1.5,0,Math.PI*2);ctx.fill()}else if(type==='bush'){ctx.fillStyle='#1d5e36';ctx.beginPath();ctx.arc(0,-4,10,0,Math.PI*2);ctx.fill();ctx.fillStyle='#28783f';ctx.beginPath();ctx.arc(-5,-2,7,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(5,-2,7,0,Math.PI*2);ctx.fill();// Berries
ctx.fillStyle='#e84060';ctx.beginPath();ctx.arc(3,2,2,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(-4,3,1.5,0,Math.PI*2);ctx.fill()}ctx.restore()}
function drawFlower(ctx,x,y,color,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);const petalColors={'pink':'#e879a0','blue':'#6bb5f0','yellow':'#f0d060','purple':'#b87de8','white':'#e8e8f0'};const pc=petalColors[color]||'#e879a0';ctx.fillStyle='#2a5e38';ctx.fillRect(-1,0,2,8);for(let i=0;i<5;i++){ctx.save();ctx.rotate(i*Math.PI*2/5);ctx.fillStyle=pc;ctx.beginPath();ctx.ellipse(0,-6,3,5,0,0,Math.PI*2);ctx.fill();ctx.restore()}ctx.fillStyle='#f0d060';ctx.beginPath();ctx.arc(0,0,3,0,Math.PI*2);ctx.fill();ctx.restore()}
function drawRock(ctx,x,y,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.fillStyle='#3a4a5e';ctx.beginPath();ctx.moveTo(-12,4);ctx.lineTo(-8,-8);ctx.lineTo(4,-10);ctx.lineTo(12,-4);ctx.lineTo(10,6);ctx.lineTo(-10,6);ctx.closePath();ctx.fill();ctx.fillStyle='#4a5a6e';ctx.beginPath();ctx.moveTo(-6,-6);ctx.lineTo(2,-8);ctx.lineTo(8,-2);ctx.lineTo(4,2);ctx.lineTo(-8,2);ctx.closePath();ctx.fill();ctx.restore()}
function drawWater(ctx,x,y,t,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.globalAlpha=.6;for(let i=0;i<3;i++){const waveOffset=Math.sin(t/600+i*1.2)*4;ctx.strokeStyle=i===0?'#3b82f6':'#60a5fa';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-14,i*5);ctx.quadraticCurveTo(-4+waveOffset,i*5-4,0,i*5);ctx.quadraticCurveTo(4-waveOffset,i*5+4,14,i*5);ctx.stroke()}ctx.globalAlpha=1;ctx.restore()}
function drawButterfly(ctx,x,y,t,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);const wingFlap=Math.sin(t/200)*0.4+0.6;ctx.fillStyle='rgba(244,114,182,0.7)';ctx.save();ctx.scale(wingFlap,1);ctx.beginPath();ctx.ellipse(-6,-2,7,5,-.3,0,Math.PI*2);ctx.fill();ctx.restore();ctx.save();ctx.scale(wingFlap,1);ctx.beginPath();ctx.ellipse(6,-2,7,5,.3,0,Math.PI*2);ctx.fill();ctx.restore();ctx.fillStyle='#222';ctx.fillRect(-1,-4,2,8);ctx.restore()}
function drawMushroom(ctx,x,y,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.fillStyle='#e8d8c0';ctx.fillRect(-3,0,6,10);ctx.fillStyle='#e04040';ctx.beginPath();ctx.ellipse(0,-2,12,10,0,Math.PI,0);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-5,-5,2.5,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(3,-7,2,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(0,-3,1.5,0,Math.PI*2);ctx.fill();ctx.restore()}
function drawCloud(ctx,x,y,t,scale=1){ctx.save();ctx.translate(x+Math.sin(t/2000+x)*5,y);ctx.scale(scale,scale);ctx.globalAlpha=0.15;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(0,0,14,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(-12,3,10,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(12,3,11,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(6,-4,9,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.restore()}
function drawFirefly(ctx,x,y,t,scale=1){ctx.save();const pulse=Math.sin(t/300+x+y)*.5+.5;const ox=Math.sin(t/800+y)*10;const oy=Math.cos(t/600+x)*6;ctx.translate(x+ox,y+oy);ctx.scale(scale,scale);ctx.globalAlpha=.3+pulse*.5;ctx.fillStyle='#fde68a';ctx.shadowColor='#fde68a';ctx.shadowBlur=8;ctx.beginPath();ctx.arc(0,0,2.5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.globalAlpha=1;ctx.restore()}
function drawStar(ctx,x,y,t,scale=1){ctx.save();const pulse=Math.sin(t/500+x)*.3+.7;ctx.translate(x,y);ctx.scale(scale*pulse,scale*pulse);ctx.globalAlpha=.2+pulse*.3;ctx.fillStyle='#fde68a';ctx.beginPath();for(let i=0;i<5;i++){ctx.lineTo(Math.cos((i*72-90)*Math.PI/180)*5,Math.sin((i*72-90)*Math.PI/180)*5);ctx.lineTo(Math.cos((i*72-54)*Math.PI/180)*2,Math.sin((i*72-54)*Math.PI/180)*2)}ctx.closePath();ctx.fill();ctx.globalAlpha=1;ctx.restore()}
function drawLantern(ctx,x,y,t,scale=1){ctx.save();const sway=Math.sin(t/600+x)*3;ctx.translate(x+sway,y);ctx.scale(scale,scale);ctx.strokeStyle='#666';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,-16);ctx.lineTo(0,-8);ctx.stroke();ctx.fillStyle='rgba(255,180,60,0.6)';ctx.beginPath();ctx.ellipse(0,0,6,8,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(255,220,100,0.4)';ctx.beginPath();ctx.ellipse(0,-2,3,5,0,0,Math.PI*2);ctx.fill();const glow=Math.sin(t/400+y)*.15+.2;ctx.globalAlpha=glow;ctx.fillStyle='#ffcc44';ctx.shadowColor='#ffaa00';ctx.shadowBlur=15;ctx.beginPath();ctx.arc(0,0,10,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.globalAlpha=1;ctx.restore()}
// --- SEASONAL DECORATIONS ---
function drawUnicorn(ctx,x,y,t,scale=1){ctx.save();ctx.translate(x,y+Math.sin(t/500)*3);ctx.scale(scale,scale);
// Body
ctx.fillStyle='#f0e6ff';ctx.beginPath();ctx.ellipse(0,0,22,14,0,0,Math.PI*2);ctx.fill();
// Legs
ctx.fillStyle='#e0d4f0';ctx.fillRect(-14,10,5,14);ctx.fillRect(-4,10,5,14);ctx.fillRect(5,10,5,14);ctx.fillRect(12,10,5,14);
// Hooves
ctx.fillStyle='#c0b0d8';ctx.fillRect(-14,22,5,3);ctx.fillRect(-4,22,5,3);ctx.fillRect(5,22,5,3);ctx.fillRect(12,22,5,3);
// Neck & head
ctx.fillStyle='#f0e6ff';ctx.beginPath();ctx.moveTo(-12,-10);ctx.quadraticCurveTo(-20,-28,-16,-35);ctx.quadraticCurveTo(-10,-38,-8,-22);ctx.closePath();ctx.fill();
ctx.beginPath();ctx.ellipse(-18,-34,8,6,-.3,0,Math.PI*2);ctx.fill();
// Horn (golden)
ctx.fillStyle='#ffd700';ctx.beginPath();ctx.moveTo(-20,-40);ctx.lineTo(-17,-58);ctx.lineTo(-14,-40);ctx.closePath();ctx.fill();
ctx.fillStyle='#ffec80';ctx.beginPath();ctx.moveTo(-19,-42);ctx.lineTo(-17,-52);ctx.lineTo(-15,-42);ctx.closePath();ctx.fill();
// Horn sparkle
const sp=Math.sin(t/200)*.5+.5;ctx.globalAlpha=sp;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-17,-55,2,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
// Eye
ctx.fillStyle='#6a3d9a';ctx.beginPath();ctx.arc(-20,-33,2,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-20.5,-33.5,.7,0,Math.PI*2);ctx.fill();
// Rainbow mane
const maneColors=['#e84060','#ff8c00','#ffd700','#4caf50','#2196f3','#9c27b0'];
for(let i=0;i<6;i++){ctx.strokeStyle=maneColors[i];ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-14+i*1.5,-20+i*2);ctx.quadraticCurveTo(-8+i*2,-30+i*3,0+i*2,-10+i*2);ctx.stroke()}
// Tail (rainbow)
for(let i=0;i<6;i++){ctx.strokeStyle=maneColors[i];ctx.lineWidth=1.5;ctx.beginPath();const wave=Math.sin(t/400+i)*4;ctx.moveTo(20,-2+i*1.5);ctx.quadraticCurveTo(28+wave,-8+i*2,32+wave,-2+i*2);ctx.stroke()}
ctx.restore()}
function drawLake(ctx,x,y,t,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
// Lake body
const grad=ctx.createRadialGradient(0,0,0,0,0,40);grad.addColorStop(0,'rgba(59,130,246,0.5)');grad.addColorStop(.6,'rgba(37,99,235,0.35)');grad.addColorStop(1,'rgba(30,58,138,0.15)');
ctx.fillStyle=grad;ctx.beginPath();ctx.ellipse(0,4,42,18,0,0,Math.PI*2);ctx.fill();
// Water ripples
ctx.strokeStyle='rgba(147,197,253,0.3)';ctx.lineWidth=1;for(let i=0;i<3;i++){const rr=12+i*10;const off=Math.sin(t/800+i)*3;ctx.beginPath();ctx.ellipse(off,4,rr,rr*.4,0,0,Math.PI*2);ctx.stroke()}
// Fish 1
const fx1=Math.sin(t/1200)*20;const fy1=Math.cos(t/900)*4+2;ctx.fillStyle='#f97316';ctx.beginPath();ctx.ellipse(fx1,fy1,6,3,Math.sin(t/1200)*.3,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fb923c';ctx.beginPath();ctx.moveTo(fx1+5,fy1);ctx.lineTo(fx1+10,fy1-3);ctx.lineTo(fx1+10,fy1+3);ctx.closePath();ctx.fill();
// Fish 2
const fx2=Math.sin(t/1500+2)*15-5;const fy2=Math.cos(t/1100+1)*3+5;ctx.fillStyle='#ec4899';ctx.beginPath();ctx.ellipse(fx2,fy2,5,2.5,-Math.sin(t/1500)*.3,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f472b6';ctx.beginPath();ctx.moveTo(fx2-4,fy2);ctx.lineTo(fx2-8,fy2-2.5);ctx.lineTo(fx2-8,fy2+2.5);ctx.closePath();ctx.fill();
// Lily pads
ctx.fillStyle='rgba(34,197,94,0.4)';ctx.beginPath();ctx.ellipse(-18,-3,7,4,-.2,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(74,222,128,0.3)';ctx.beginPath();ctx.ellipse(20,6,5,3,.3,0,Math.PI*2);ctx.fill();
// Lily flower
ctx.fillStyle='rgba(244,114,182,0.6)';ctx.beginPath();ctx.arc(-18,-4,2.5,0,Math.PI*2);ctx.fill();
ctx.restore()}
function drawAutumnTree(ctx,x,y,t,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
ctx.fillStyle='#5a3820';ctx.fillRect(-3,0,6,18);
// Branches
ctx.strokeStyle='#4a2f1a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-1,6);ctx.lineTo(-12,0);ctx.stroke();ctx.beginPath();ctx.moveTo(1,4);ctx.lineTo(10,-2);ctx.stroke();
// Foliage - autumn colors
const cols=['#e06030','#d4a020','#c84020','#e8a040','#b83020'];
cols.forEach((c,i)=>{ctx.fillStyle=c;const ox=(i-2)*5+Math.sin(i*2)*3;const oy=-12+Math.cos(i*3)*4;const r=8+Math.sin(i)*3;ctx.beginPath();ctx.arc(ox,oy,r,0,Math.PI*2);ctx.fill()});
ctx.restore()}
function drawFallingLeaf(ctx,x,y,t,scale=1){ctx.save();
const drift=Math.sin(t/600+x)*25;const fall=(t/8+y*3)%200-60;const spin=Math.sin(t/400+y)*.8;
ctx.translate(x+drift,y+fall);ctx.rotate(spin);ctx.scale(scale,scale);
const lc=['#e06030','#d4a020','#c84020','#e8a040'][Math.floor(Math.abs(x*y))%4];
ctx.fillStyle=lc;ctx.beginPath();ctx.moveTo(0,-6);ctx.quadraticCurveTo(5,-3,4,2);ctx.quadraticCurveTo(2,6,0,5);ctx.quadraticCurveTo(-2,6,-4,2);ctx.quadraticCurveTo(-5,-3,0,-6);ctx.closePath();ctx.fill();
ctx.strokeStyle='rgba(0,0,0,0.15)';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(0,-5);ctx.lineTo(0,4);ctx.stroke();
ctx.restore()}
function drawSnowflake(ctx,x,y,t,scale=1){ctx.save();
const drift=Math.sin(t/800+x*.5)*15;const fall=(t/6+y*4)%250-50;const spin=t/500+x;
ctx.translate(x+drift,y+fall);ctx.rotate(spin);ctx.scale(scale,scale);
ctx.strokeStyle='rgba(200,220,255,0.6)';ctx.lineWidth=1;
for(let i=0;i<6;i++){ctx.save();ctx.rotate(i*Math.PI/3);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-6);ctx.moveTo(0,-4);ctx.lineTo(2,-5.5);ctx.moveTo(0,-4);ctx.lineTo(-2,-5.5);ctx.stroke();ctx.restore()}
ctx.restore()}
function drawSnowGround(ctx,x,y,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
ctx.fillStyle='rgba(220,235,255,0.25)';ctx.beginPath();ctx.ellipse(0,0,30,8,0,0,Math.PI*2);ctx.fill();
ctx.fillStyle='rgba(240,248,255,0.15)';ctx.beginPath();ctx.ellipse(5,-2,18,5,0,0,Math.PI*2);ctx.fill();
ctx.restore()}
function drawFrozenTree(ctx,x,y,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
ctx.fillStyle='#5a4a3e';ctx.fillRect(-3,0,6,16);
// Icy foliage
ctx.fillStyle='rgba(180,210,240,0.6)';ctx.beginPath();ctx.moveTo(0,-28);ctx.lineTo(14,0);ctx.lineTo(9,0);ctx.lineTo(17,12);ctx.lineTo(-17,12);ctx.lineTo(-9,0);ctx.lineTo(-14,0);ctx.closePath();ctx.fill();
ctx.fillStyle='rgba(200,225,250,0.5)';ctx.beginPath();ctx.moveTo(0,-28);ctx.lineTo(8,-8);ctx.lineTo(-8,-8);ctx.closePath();ctx.fill();
// Ice crystals
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.beginPath();ctx.arc(-5,-10,2,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(6,-5,1.5,0,Math.PI*2);ctx.fill();
// Snow on branches
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.beginPath();ctx.ellipse(0,-26,6,3,0,0,Math.PI*2);ctx.fill();
ctx.beginPath();ctx.ellipse(-10,1,5,2,0,0,Math.PI*2);ctx.fill();
ctx.beginPath();ctx.ellipse(10,1,4,2,0,0,Math.PI*2);ctx.fill();
ctx.restore()}
function drawDeer(ctx,x,y,t,scale=1){ctx.save();ctx.translate(x,y+Math.sin(t/800)*2);ctx.scale(scale,scale);
// Body
ctx.fillStyle='#a06030';ctx.beginPath();ctx.ellipse(0,0,16,10,0,0,Math.PI*2);ctx.fill();
// Legs
ctx.fillStyle='#8b4f28';ctx.fillRect(-10,8,4,12);ctx.fillRect(-3,8,4,12);ctx.fillRect(4,8,4,12);ctx.fillRect(10,8,4,12);
// Hooves
ctx.fillStyle='#3a2a1a';ctx.fillRect(-10,18,4,3);ctx.fillRect(-3,18,4,3);ctx.fillRect(4,18,4,3);ctx.fillRect(10,18,4,3);
// Neck & Head
ctx.fillStyle='#a06030';ctx.beginPath();ctx.moveTo(-10,-8);ctx.quadraticCurveTo(-16,-25,-12,-28);ctx.quadraticCurveTo(-6,-30,-6,-18);ctx.closePath();ctx.fill();
ctx.beginPath();ctx.ellipse(-14,-28,7,5,-.2,0,Math.PI*2);ctx.fill();
// Antlers
ctx.strokeStyle='#6b4226';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-12,-33);ctx.lineTo(-16,-45);ctx.lineTo(-20,-42);ctx.moveTo(-16,-45);ctx.lineTo(-14,-50);ctx.stroke();
ctx.beginPath();ctx.moveTo(-10,-33);ctx.lineTo(-6,-45);ctx.lineTo(-2,-42);ctx.moveTo(-6,-45);ctx.lineTo(-8,-50);ctx.stroke();
// Eye
ctx.fillStyle='#222';ctx.beginPath();ctx.arc(-16,-27,1.5,0,Math.PI*2);ctx.fill();
// Nose
ctx.fillStyle='#333';ctx.beginPath();ctx.arc(-20,-27,1.5,0,Math.PI*2);ctx.fill();
// White belly
ctx.fillStyle='rgba(255,240,220,0.3)';ctx.beginPath();ctx.ellipse(0,4,10,5,0,0,Math.PI*2);ctx.fill();
// Tail
ctx.fillStyle='#e8d8c0';ctx.beginPath();ctx.ellipse(16,-4,4,3,0,0,Math.PI*2);ctx.fill();
ctx.restore()}
function drawRainbow(ctx,x,y,t,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
ctx.globalAlpha=.25+Math.sin(t/1000)*.08;
const cols=['#e84060','#ff8c00','#ffd700','#4caf50','#2196f3','#9c27b0'];
cols.forEach((c,i)=>{ctx.strokeStyle=c;ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,20,35+i*3,-Math.PI,0);ctx.stroke()});
ctx.globalAlpha=1;ctx.restore()}
function drawCrystal(ctx,x,y,t,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
const pulse=Math.sin(t/400+x)*.2+.8;ctx.globalAlpha=.4*pulse;
// Main crystal
ctx.fillStyle='#a78bfa';ctx.beginPath();ctx.moveTo(0,-22);ctx.lineTo(8,0);ctx.lineTo(4,10);ctx.lineTo(-4,10);ctx.lineTo(-8,0);ctx.closePath();ctx.fill();
// Highlight
ctx.fillStyle='rgba(196,181,253,0.5)';ctx.beginPath();ctx.moveTo(0,-22);ctx.lineTo(3,-5);ctx.lineTo(-3,-5);ctx.closePath();ctx.fill();
// Side crystal
ctx.fillStyle='#818cf8';ctx.beginPath();ctx.moveTo(10,-10);ctx.lineTo(16,0);ctx.lineTo(12,6);ctx.lineTo(8,0);ctx.closePath();ctx.fill();
// Glow
ctx.shadowColor='#a78bfa';ctx.shadowBlur=12*pulse;ctx.fillStyle='rgba(167,139,250,0.2)';ctx.beginPath();ctx.arc(0,-5,14,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.globalAlpha=1;
ctx.restore()}
function drawFrozenLake(ctx,x,y,t,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
// Ice surface
const grad=ctx.createRadialGradient(0,0,0,0,0,38);grad.addColorStop(0,'rgba(180,220,255,0.4)');grad.addColorStop(.7,'rgba(147,197,253,0.25)');grad.addColorStop(1,'rgba(100,160,230,0.1)');
ctx.fillStyle=grad;ctx.beginPath();ctx.ellipse(0,3,40,16,0,0,Math.PI*2);ctx.fill();
// Ice cracks
ctx.strokeStyle='rgba(255,255,255,0.25)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-15,-2);ctx.lineTo(-5,4);ctx.lineTo(8,1);ctx.lineTo(18,5);ctx.stroke();ctx.beginPath();ctx.moveTo(-5,4);ctx.lineTo(-2,9);ctx.stroke();
// Sparkles on ice
const s1=Math.sin(t/300)*.5+.5;ctx.globalAlpha=s1*.4;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-12,0,1.5,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(10,3,1,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
ctx.restore()}
// Zone background tints
function drawZoneBg(ctx,zone,y1,y2,w){ctx.save();
const tints=[
['rgba(144,238,144,0.04)','rgba(255,182,210,0.03)'],// Spring
['rgba(34,139,34,0.05)','rgba(0,100,0,0.03)'],// Summer
['rgba(210,140,60,0.06)','rgba(180,100,30,0.03)'],// Autumn
['rgba(180,210,240,0.06)','rgba(200,220,255,0.04)'],// Winter
['rgba(167,139,250,0.05)','rgba(236,72,153,0.03)']// Magic
];const c=tints[zone]||tints[0];
const grad=ctx.createLinearGradient(0,y1,0,y2);grad.addColorStop(0,c[0]);grad.addColorStop(1,c[1]);
ctx.fillStyle=grad;ctx.fillRect(0,y1,w,y2-y1);ctx.restore()}
function drawCharacter(ctx,x,y,t,walking=false){ctx.save();const bob=walking?Math.sin(t/150)*4:Math.sin(t/400)*3;ctx.translate(x,y+bob);// Hat
ctx.fillStyle='#1a3a5c';ctx.beginPath();ctx.moveTo(-12,0);ctx.lineTo(0,-20);ctx.lineTo(12,0);ctx.closePath();ctx.fill();ctx.fillStyle='#005bea';ctx.beginPath();ctx.moveTo(-10,0);ctx.lineTo(0,-16);ctx.lineTo(10,0);ctx.closePath();ctx.fill();// Face
ctx.fillStyle='#fdd8a0';ctx.beginPath();ctx.arc(0,6,8,0,Math.PI*2);ctx.fill();ctx.fillStyle='#222';ctx.beginPath();ctx.arc(-3,5,1.5,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(3,5,1.5,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#c08060';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(0,8,3,0.1*Math.PI,0.9*Math.PI);ctx.stroke();// Body
ctx.fillStyle='#3b68a8';ctx.fillRect(-9,14,18,14);// Legs with walk animation
const legSwing=walking?Math.sin(t/120)*8:0;ctx.fillStyle='#6b4226';ctx.save();ctx.translate(-4,28);ctx.rotate(legSwing*Math.PI/180);ctx.fillRect(-3,0,6,8);ctx.restore();ctx.save();ctx.translate(4,28);ctx.rotate(-legSwing*Math.PI/180);ctx.fillRect(-3,0,6,8);ctx.restore();// Walk dust particles
if(walking){ctx.globalAlpha=0.3;ctx.fillStyle='#aaa';for(let i=0;i<3;i++){const dx=(Math.random()-0.5)*12;const dy=32+Math.random()*6;ctx.beginPath();ctx.arc(dx,dy,1.5+Math.random(),0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1}ctx.restore()}
// --- ROADMAP CANVAS ---
let roadmapAnim=null;const roadmapCanvas=document.getElementById('roadmap-canvas');const rcCtx=roadmapCanvas.getContext('2d');
const charCanvas=document.getElementById('char-canvas');const charCtx=charCanvas.getContext('2d');
let nodePositions=[];let decorations=[];
// Character animation state
let charIsWalking=false,charWalkStart=0,charWalkDur=0,charFromX=0,charFromY=0,charToX=0,charToY=0,charWalkCallback=null,pendingNextLevel=-1,charStaticIdx=-1;
// ========== WORLD TERRAIN SYSTEM ==========
function getZoneBounds(){const zb=[];for(let z=0;z<5;z++){const f=nodePositions[z*10];const l=nodePositions[Math.min(z*10+9,49)];if(f&&l){const y1=Math.min(f.y,l.y)-100;const y2=Math.max(f.y,l.y)+100;zb.push({y1,y2})}else zb.push({y1:0,y2:0})}return zb}
function drawMountainRange(ctx,baseY,w,count,minH,maxH,baseColor,snowColor,rng){ctx.save();for(let layer=0;layer<2;layer++){const lo=layer*15;const alpha=layer===0?.6:.4;ctx.globalAlpha=alpha;for(let i=0;i<count;i++){const px=rng.next()*w;const ph=minH+rng.next()*(maxH-minH);const pw=40+rng.next()*60;ctx.fillStyle=baseColor;ctx.beginPath();ctx.moveTo(px-pw,baseY+lo);ctx.lineTo(px,baseY-ph+lo);ctx.lineTo(px+pw,baseY+lo);ctx.closePath();ctx.fill();if(snowColor){ctx.fillStyle=snowColor;ctx.beginPath();ctx.moveTo(px-pw*.2,baseY-ph*.65+lo);ctx.lineTo(px,baseY-ph+lo);ctx.lineTo(px+pw*.2,baseY-ph*.65+lo);ctx.closePath();ctx.fill()}}}ctx.globalAlpha=1;ctx.restore()}
function drawHillsLayer(ctx,y,w,c1,c2,count,rng){ctx.save();for(let i=0;i<count;i++){const hx=rng.next()*w;const hy=y+rng.next()*30-15;const hw=50+rng.next()*100;const hh=15+rng.next()*25;ctx.fillStyle=rng.next()>.5?c1:c2;ctx.globalAlpha=.35+rng.next()*.25;ctx.beginPath();ctx.ellipse(hx,hy,hw,hh,0,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;ctx.restore()}
function drawGrassClumps(ctx,y1,y2,w,color,count,rng){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.lineCap='round';for(let i=0;i<count;i++){const gx=rng.next()*w;const gy=y1+rng.next()*(y2-y1);for(let b=0;b<3;b++){ctx.globalAlpha=.15+rng.next()*.2;ctx.beginPath();ctx.moveTo(gx+b*3-3,gy);ctx.quadraticCurveTo(gx+b*3-3+(rng.next()-.5)*4,gy-6-rng.next()*6,gx+b*3-3+(rng.next()-.5)*6,gy-10-rng.next()*5);ctx.stroke()}}ctx.globalAlpha=1;ctx.restore()}
function drawRiverFlow(ctx,x,y1,y2,t,w){ctx.save();const rW=20+Math.sin(y1*.01)*8;for(let y=y1;y<y2;y+=2){const rx=x+Math.sin(y*.015+t/2000)*30;const alpha=.3+Math.sin(y*.02+t/800)*.08;ctx.fillStyle='rgba(59,130,246,'+alpha+')';ctx.fillRect(rx-rW/2,y,rW,3);ctx.fillStyle='rgba(147,197,253,'+(alpha*.5)+')';ctx.fillRect(rx-rW/2+3,y,2,3)}for(let i=0;i<8;i++){const sy=y1+(y2-y1)*Math.random();const sx=x+Math.sin(sy*.015+t/2000)*30+(Math.random()-.5)*rW;const sp=Math.sin(t/300+i)*.5+.5;ctx.globalAlpha=sp*.3;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(sx,sy,1,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;ctx.restore()}
function drawSnowCover(ctx,y1,y2,w,rng){ctx.save();for(let i=0;i<40;i++){const sx=rng.next()*w;const sy=y1+rng.next()*(y2-y1);const sw=20+rng.next()*50;const sh=5+rng.next()*10;ctx.fillStyle='rgba(230,240,255,'+(0.08+rng.next()*.12)+')';ctx.beginPath();ctx.ellipse(sx,sy,sw,sh,0,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;ctx.restore()}
function drawDirtTrail(ctx,positions,unlocked,t){ctx.save();if(positions.length<2){ctx.restore();return}
ctx.strokeStyle='rgba(0,0,0,0.12)';ctx.lineWidth=30;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(positions[0].x,positions[0].y+2);for(let i=1;i<positions.length;i++)ctx.lineTo(positions[i].x,positions[i].y+2);ctx.stroke();
const tg=ctx.createLinearGradient(0,positions[positions.length-1].y,0,positions[0].y);tg.addColorStop(0,'#8B7355');tg.addColorStop(.25,'#9B8365');tg.addColorStop(.5,'#7a6040');tg.addColorStop(.75,'#8a7050');tg.addColorStop(1,'#6a5535');ctx.strokeStyle=tg;ctx.lineWidth=24;ctx.beginPath();ctx.moveTo(positions[0].x,positions[0].y);for(let i=1;i<positions.length;i++)ctx.lineTo(positions[i].x,positions[i].y);ctx.stroke();
ctx.strokeStyle='rgba(60,40,20,0.25)';ctx.lineWidth=26;ctx.beginPath();ctx.moveTo(positions[0].x,positions[0].y);for(let i=1;i<positions.length;i++)ctx.lineTo(positions[i].x,positions[i].y);ctx.stroke();
ctx.strokeStyle='rgba(180,155,120,0.2)';ctx.lineWidth=14;ctx.beginPath();ctx.moveTo(positions[0].x,positions[0].y);for(let i=1;i<positions.length;i++)ctx.lineTo(positions[i].x,positions[i].y);ctx.stroke();
const rng2=new RNG(7777);for(let i=0;i<positions.length;i++){const p=positions[i];for(let j=0;j<4;j++){const ox=(rng2.next()-.5)*16;const oy=(rng2.next()-.5)*16;const r=1+rng2.next()*2;ctx.globalAlpha=.08+rng2.next()*.08;ctx.fillStyle=rng2.next()>.5?'#6a5a4a':'#8a7a6a';ctx.beginPath();ctx.arc(p.x+ox,p.y+oy,r,0,Math.PI*2);ctx.fill()}}ctx.globalAlpha=1;
for(let i=0;i<positions.length;i++){const p=positions[i];for(let s=-1;s<=1;s+=2){const gx=p.x+s*14+(rng2.next()-.5)*4;const gy=p.y+(rng2.next()-.5)*10;ctx.strokeStyle='rgba(80,140,60,0.2)';ctx.lineWidth=1;for(let b=0;b<2;b++){ctx.beginPath();ctx.moveTo(gx+b*2,gy);ctx.lineTo(gx+b*2+s*3,gy-5-rng2.next()*4);ctx.stroke()}}}
ctx.strokeStyle='rgba(0,198,251,0.06)';ctx.lineWidth=28;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(positions[0].x,positions[0].y);for(let i=1;i<Math.min(unlocked,positions.length);i++)ctx.lineTo(positions[i].x,positions[i].y);ctx.stroke();
ctx.strokeStyle='rgba(0,198,251,0.12)';ctx.lineWidth=6;ctx.setLineDash([8,6]);ctx.lineDashOffset=-t/40;ctx.beginPath();ctx.moveTo(positions[0].x,positions[0].y);for(let i=1;i<Math.min(unlocked,positions.length);i++)ctx.lineTo(positions[i].x,positions[i].y);ctx.stroke();ctx.setLineDash([]);ctx.restore()}
function drawCottage(ctx,x,y,t,rng){ctx.save();ctx.translate(x,y);ctx.fillStyle='#5a3a1e';ctx.fillRect(-12,0,24,18);ctx.fillStyle='#7a4a2e';ctx.fillRect(-10,4,8,14);ctx.fillStyle='#e8c84a';ctx.globalAlpha=.5+Math.sin(t/600)*.2;ctx.fillRect(-8,6,4,4);ctx.globalAlpha=1;ctx.fillStyle='#8B4513';ctx.beginPath();ctx.moveTo(-16,0);ctx.lineTo(0,-14);ctx.lineTo(16,0);ctx.closePath();ctx.fill();ctx.fillStyle='#a0522d';ctx.beginPath();ctx.moveTo(-14,0);ctx.lineTo(0,-12);ctx.lineTo(14,0);ctx.closePath();ctx.fill();ctx.fillStyle='#5a3a1e';ctx.fillRect(6,-10,5,10);ctx.globalAlpha=.15;ctx.fillStyle='#aaa';for(let i=0;i<3;i++){const sy=-14-i*8-Math.sin(t/400+i)*3;const sx=8+Math.sin(t/600+i*2)*4;ctx.beginPath();ctx.arc(sx,sy,2+i*1.5,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;ctx.restore()}
function drawWindmill(ctx,x,y,t){ctx.save();ctx.translate(x,y);ctx.fillStyle='#d4c4a8';ctx.fillRect(-6,0,12,28);ctx.fillStyle='#c4b498';ctx.fillRect(-4,2,8,24);ctx.translate(0,-2);const rot=t/1500;for(let i=0;i<4;i++){ctx.save();ctx.rotate(rot+i*Math.PI/2);ctx.fillStyle='#8a7a5a';ctx.beginPath();ctx.moveTo(-2,0);ctx.lineTo(-4,-22);ctx.lineTo(0,-24);ctx.lineTo(4,-22);ctx.lineTo(2,0);ctx.closePath();ctx.fill();ctx.fillStyle='rgba(255,255,255,0.15)';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-2,-18);ctx.lineTo(2,-18);ctx.closePath();ctx.fill();ctx.restore()}ctx.fillStyle='#5a4a3a';ctx.beginPath();ctx.arc(0,0,3,0,Math.PI*2);ctx.fill();ctx.restore()}
function drawBirds(ctx,x,y,t){ctx.save();ctx.translate(x+Math.sin(t/1200+y)*40,y+Math.cos(t/800+x)*8);ctx.strokeStyle='rgba(40,40,40,0.4)';ctx.lineWidth=1.5;for(let i=0;i<3;i++){const bx=i*12;const by=Math.sin(t/300+i*2)*3;ctx.beginPath();ctx.moveTo(bx-5,by);ctx.quadraticCurveTo(bx-2,by-4,bx,by);ctx.quadraticCurveTo(bx+2,by-4,bx+5,by);ctx.stroke()}ctx.restore()}
function drawCampfire(ctx,x,y,t){ctx.save();ctx.translate(x,y);ctx.fillStyle='#4a2a10';ctx.save();ctx.rotate(.3);ctx.fillRect(-8,2,16,3);ctx.restore();ctx.save();ctx.rotate(-.3);ctx.fillRect(-8,2,16,3);ctx.restore();for(let i=0;i<4;i++){const fl=Math.sin(t/150+i*1.5)*3;ctx.fillStyle=['#ff4500','#ff6a00','#ffa500','#ffcc00'][i];ctx.globalAlpha=.6+Math.sin(t/200+i)*.2;ctx.beginPath();ctx.ellipse((i-1.5)*3+fl,-4-i*3,4-i*.5,8-i,0,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=.08;ctx.fillStyle='#ff6a00';ctx.shadowColor='#ff4500';ctx.shadowBlur=20;ctx.beginPath();ctx.arc(0,-4,18,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.globalAlpha=1;ctx.restore()}
function genDecorations(){decorations=[];if(nodePositions.length<50)return;const rng=new RNG(12345);const zb=getZoneBounds();const w=roadmapCanvas.width;
for(let z=0;z<5;z++){const{y1,y2}=zb[z];const h=y2-y1;
if(z===0){for(let i=0;i<12;i++){const s=rng.next()>.5?-1:1;decorations.push({x:w/2+s*(60+rng.next()*120),y:y1+rng.next()*h,type:rng.next()>.6?'cherry':'oak',scale:.5+rng.next()*.5,zone:0})}
for(let i=0;i<20;i++){const fcs=['pink','blue','yellow','purple','white'];decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'flower',color:fcs[rng.int(0,4)],scale:.3+rng.next()*.5,zone:0})}
for(let i=0;i<5;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'butterfly',scale:.4+rng.next()*.4,zone:0});
decorations.push({x:w*.2,y:y1+h*.3,type:'unicorn',scale:.6,zone:0},{x:w*.82,y:y1+h*.6,type:'cottage',scale:1,zone:0},{x:w*.15,y:y1+h*.7,type:'rainbow',scale:.8,zone:0},{x:w*.6,y:y1+h*.9,type:'windmill',scale:1,zone:0});
for(let i=0;i<3;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h*.3,type:'cloud',scale:.6+rng.next()*.4,zone:0});
for(let i=0;i<4;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'bush',scale:.4+rng.next()*.4,zone:0});
}else if(z===1){for(let i=0;i<18;i++){const s=rng.next()>.5?-1:1;decorations.push({x:w/2+s*(50+rng.next()*130),y:y1+rng.next()*h,type:rng.next()>.5?'pine':'oak',scale:.5+rng.next()*.6,zone:1})}
for(let i=0;i<3;i++)decorations.push({x:w*(rng.next()>.5?.15:.85),y:y1+h*(.2+i*.3),type:'lake',scale:.7+rng.next()*.3,zone:1});
for(let i=0;i<10;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'firefly',scale:.3+rng.next()*.3,zone:1});
for(let i=0;i<4;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'lantern',scale:.5+rng.next()*.3,zone:1});
for(let i=0;i<6;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'mushroom',scale:.4+rng.next()*.4,zone:1});
decorations.push({x:w*.8,y:y1+h*.4,type:'cottage',scale:.8,zone:1},{x:w*.5,y:y1+h*.15,type:'birds',scale:1,zone:1},{x:w*.3,y:y1+h*.7,type:'birds',scale:.8,zone:1});
}else if(z===2){for(let i=0;i<16;i++){const s=rng.next()>.5?-1:1;decorations.push({x:w/2+s*(50+rng.next()*120),y:y1+rng.next()*h,type:'autumnTree',scale:.5+rng.next()*.6,zone:2})}
for(let i=0;i<25;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'fallingLeaf',scale:.3+rng.next()*.4,zone:2});
decorations.push({x:w*.2,y:y1+h*.4,type:'deer',scale:.6,zone:2},{x:w*.75,y:y1+h*.7,type:'deer',scale:.5,zone:2},{x:w*.85,y:y1+h*.3,type:'campfire',scale:1,zone:2},{x:w*.4,y:y1+h*.85,type:'cottage',scale:.7,zone:2},{x:w*.6,y:y1+h*.05,type:'birds',scale:.7,zone:2});
for(let i=0;i<5;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'mushroom',scale:.4+rng.next()*.3,zone:2});
for(let i=0;i<3;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'rock',scale:.5+rng.next()*.4,zone:2});
}else if(z===3){for(let i=0;i<14;i++){const s=rng.next()>.5?-1:1;decorations.push({x:w/2+s*(50+rng.next()*130),y:y1+rng.next()*h,type:'frozenTree',scale:.5+rng.next()*.5,zone:3})}
for(let i=0;i<30;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'snowflake',scale:.3+rng.next()*.5,zone:3});
decorations.push({x:w*.25,y:y1+h*.5,type:'frozenLake',scale:.8,zone:3},{x:w*.7,y:y1+h*.2,type:'frozenLake',scale:.6,zone:3},{x:w*.15,y:y1+h*.3,type:'deer',scale:.55,zone:3},{x:w*.8,y:y1+h*.75,type:'deer',scale:.5,zone:3},{x:w*.5,y:y1+h*.6,type:'cottage',scale:.85,zone:3});
for(let i=0;i<4;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'rock',scale:.4+rng.next()*.4,zone:3});
}else{for(let i=0;i<4;i++)decorations.push({x:w*(.15+rng.next()*.7),y:y1+rng.next()*h,type:'unicorn',scale:.5+rng.next()*.3,zone:4});
for(let i=0;i<10;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'crystal',scale:.4+rng.next()*.6,zone:4});
for(let i=0;i<15;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'star',scale:.3+rng.next()*.5,zone:4});
decorations.push({x:w*.3,y:y1+h*.3,type:'rainbow',scale:.9,zone:4},{x:w*.7,y:y1+h*.7,type:'rainbow',scale:.7,zone:4},{x:w*.55,y:y1+h*.5,type:'cottage',scale:.8,zone:4});
for(let i=0;i<6;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'cherry',scale:.4+rng.next()*.4,zone:4});
for(let i=0;i<8;i++)decorations.push({x:rng.next()*w,y:y1+rng.next()*h,type:'firefly',scale:.3+rng.next()*.3,zone:4});
}}}
function easeInOutCubic(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function walkCharacterTo(fromIdx,toIdx,callback){if(!nodePositions[fromIdx]||!nodePositions[toIdx])return callback&&callback();charFromX=nodePositions[fromIdx].x;charFromY=nodePositions[fromIdx].y-36;charToX=nodePositions[toIdx].x;charToY=nodePositions[toIdx].y-36;charIsWalking=true;charWalkStart=performance.now();charWalkDur=1400;charWalkCallback=callback;
const scroll=document.getElementById('roadmap-scroll');const midY=(charFromY+charToY)/2;scroll.scrollTo({top:midY-window.innerHeight/2,behavior:'smooth'})}
function drawRoadmapCanvas(t){rcCtx.clearRect(0,0,roadmapCanvas.width,roadmapCanvas.height);charCtx.clearRect(0,0,charCanvas.width,charCanvas.height);
if(nodePositions.length<50){roadmapAnim=requestAnimationFrame(drawRoadmapCanvas);return}
const W=roadmapCanvas.width,H=roadmapCanvas.height,zb=getZoneBounds();
const TC=[
{base:['#3a7a35','#4a8a42','#2d6a28'],hill:['#4a9040','#3d8035'],gr:'#5a9a4a'},
{base:['#1a5528','#246a30','#164a1e'],hill:['#1e5a25','#1a4a22'],gr:'#286a30'},
{base:['#8a6830','#9a7838','#6a5020'],hill:['#7a5a28','#8a6a30'],gr:'#9a8040'},
{base:['#a0b4c8','#b8cce0','#8aa0b8'],hill:['#b0c0d4','#96aac0'],gr:'#c0d0e0'},
{base:['#1a1040','#2a1a50','#140a30'],hill:['#2a1a4a','#201040'],gr:'#3a2860'}];
for(let z=0;z<5;z++){const{y1,y2}=zb[z];const tc=TC[z];const h=y2-y1;
const grad=rcCtx.createLinearGradient(0,y1,0,y2);grad.addColorStop(0,tc.base[0]);grad.addColorStop(.5,tc.base[1]);grad.addColorStop(1,tc.base[2]);rcCtx.fillStyle=grad;rcCtx.fillRect(0,y1,W,h);
if(z>0){const prev=TC[z-1];const bg=rcCtx.createLinearGradient(0,y2-60,0,y2);bg.addColorStop(0,tc.base[2]);bg.addColorStop(1,prev.base[0]+'80');rcCtx.fillStyle=bg;rcCtx.fillRect(0,y2-60,W,60)}
const hr=new RNG(z*1000+42);drawHillsLayer(rcCtx,y1+h*.3,W,tc.hill[0],tc.hill[1],6,hr);drawHillsLayer(rcCtx,y1+h*.6,W,tc.hill[1],tc.hill[0],5,hr);
drawGrassClumps(rcCtx,y1,y2,W,tc.gr,20+z*5,hr);
if(z>=2){const mc=[null,null,['#5a4020','rgba(200,180,140,0.3)'],['#607080','rgba(230,240,255,0.5)'],['#2a1848','rgba(167,139,250,0.3)']];drawMountainRange(rcCtx,y1+20,W,5+z,40,100,mc[z][0],mc[z][1],hr)}
if(z===1)drawRiverFlow(rcCtx,W*.35,y1+40,y2-40,t,W);
if(z===3){const sr=new RNG(3333);drawSnowCover(rcCtx,y1,y2,W,sr)}
if(z===4){rcCtx.save();rcCtx.globalAlpha=.06+Math.sin(t/2000)*.03;const ac=['#a78bfa','#ec4899','#06b6d4','#10b981'];for(let i=0;i<4;i++){const ay=y1+20+i*30;rcCtx.strokeStyle=ac[i];rcCtx.lineWidth=8;rcCtx.beginPath();rcCtx.moveTo(0,ay);for(let x=0;x<W;x+=10)rcCtx.lineTo(x,ay+Math.sin(x*.02+t/800+i)*15+Math.sin(t/1500+i)*40);rcCtx.stroke()}rcCtx.globalAlpha=1;rcCtx.restore()}}
drawDirtTrail(rcCtx,nodePositions,save.unlocked,t);
decorations.forEach(d=>{const c=rcCtx;const tp=d.type;
if(tp==='pine'||tp==='oak'||tp==='cherry'||tp==='bush')drawTree(c,d.x,d.y,tp,d.scale);
else if(tp==='flower')drawFlower(c,d.x,d.y,d.color,d.scale);
else if(tp==='rock')drawRock(c,d.x,d.y,d.scale);
else if(tp==='butterfly')drawButterfly(c,d.x+Math.sin(t/800+d.x)*8,d.y+Math.cos(t/600+d.y)*5,t,d.scale);
else if(tp==='mushroom')drawMushroom(c,d.x,d.y,d.scale);
else if(tp==='cloud')drawCloud(c,d.x,d.y,t,d.scale);
else if(tp==='firefly')drawFirefly(c,d.x,d.y,t,d.scale);
else if(tp==='star')drawStar(c,d.x,d.y,t,d.scale);
else if(tp==='lantern')drawLantern(c,d.x,d.y,t,d.scale);
else if(tp==='unicorn')drawUnicorn(c,d.x,d.y,t,d.scale);
else if(tp==='lake')drawLake(c,d.x,d.y,t,d.scale);
else if(tp==='autumnTree')drawAutumnTree(c,d.x,d.y,t,d.scale);
else if(tp==='fallingLeaf')drawFallingLeaf(c,d.x,d.y,t,d.scale);
else if(tp==='snowflake')drawSnowflake(c,d.x,d.y,t,d.scale);
else if(tp==='frozenTree')drawFrozenTree(c,d.x,d.y,d.scale);
else if(tp==='deer')drawDeer(c,d.x,d.y,t,d.scale);
else if(tp==='rainbow')drawRainbow(c,d.x,d.y,t,d.scale);
else if(tp==='crystal')drawCrystal(c,d.x,d.y,t,d.scale);
else if(tp==='frozenLake')drawFrozenLake(c,d.x,d.y,t,d.scale);
else if(tp==='cottage')drawCottage(c,d.x,d.y,t,new RNG(d.x));
else if(tp==='windmill')drawWindmill(c,d.x,d.y,t);
else if(tp==='birds')drawBirds(c,d.x,d.y,t);
else if(tp==='campfire')drawCampfire(c,d.x,d.y,t);
});
if(nodePositions.length>0){let cx,cy,walking=false;if(charIsWalking){const elapsed=performance.now()-charWalkStart;const progress=Math.min(elapsed/charWalkDur,1);const eased=easeInOutCubic(progress);cx=charFromX+(charToX-charFromX)*eased;cy=charFromY+(charToY-charFromY)*eased;walking=true;
const scroll=document.getElementById('roadmap-scroll');scroll.scrollTop=cy-window.innerHeight/2+50;if(progress>=1){charIsWalking=false;charStaticIdx=-1;if(charWalkCallback){const cb=charWalkCallback;charWalkCallback=null;setTimeout(cb,300)}}}else{const ci=charStaticIdx>=0?charStaticIdx:Math.max(0,save.unlocked-1);const cp=nodePositions[ci];if(cp){cx=cp.x;cy=cp.y-36}}if(cx!=null)drawCharacter(charCtx,cx,cy,t,walking)}
rcCtx.save();rcCtx.strokeStyle='rgba(255,255,255,0.03)';rcCtx.lineWidth=4;rcCtx.lineCap='round';rcCtx.beginPath();if(nodePositions.length>save.unlocked){rcCtx.moveTo(nodePositions[save.unlocked-1].x,nodePositions[save.unlocked-1].y);for(let i=save.unlocked;i<nodePositions.length;i++)rcCtx.lineTo(nodePositions[i].x,nodePositions[i].y)}rcCtx.stroke();rcCtx.restore();
roadmapAnim=requestAnimationFrame(drawRoadmapCanvas)}
// --- ROADMAP RENDER ---
function renderRoadmap(){const container=document.getElementById('roadmap-container');const nodesEl=document.getElementById('roadmap-nodes');nodesEl.innerHTML='';const w=Math.min(window.innerWidth,480);const topPad=140;const spacingY=90;const margin=70;const nodesPerRow=5;const totalRows=Math.ceil(50/nodesPerRow);const totalH=topPad+totalRows*nodesPerRow*spacingY+200;container.style.height=totalH+'px';roadmapCanvas.width=w;roadmapCanvas.height=totalH;roadmapCanvas.style.width=w+'px';roadmapCanvas.style.height=totalH+'px';charCanvas.width=w;charCanvas.height=totalH;charCanvas.style.width=w+'px';charCanvas.style.height=totalH+'px';nodePositions=[];for(let i=0;i<50;i++){const row=Math.floor(i/nodesPerRow);const posInRow=i%nodesPerRow;const goingRight=row%2===0;const t=posInRow/(nodesPerRow-1);let x;if(goingRight)x=margin+t*(w-margin*2);else x=(w-margin)-t*(w-margin*2);const rawY=topPad+(row*nodesPerRow+posInRow)*spacingY;const y=totalH-rawY;nodePositions.push({x,y})}
// Zone Labels
ZONES.forEach(z=>{const startNode=nodePositions[z.range[0]-1];if(!startNode)return;const lbl=document.createElement('div');lbl.className='zone-label '+z.cls;lbl.textContent=z.name;lbl.style.top=(startNode.y+40)+'px';nodesEl.appendChild(lbl)});
// Milestones
MILESTONES.forEach(m=>{const node=nodePositions[m.level-1];if(!node)return;const el=document.createElement('div');el.className='road-milestone';el.textContent=m.text;el.style.top=(node.y-50)+'px';nodesEl.appendChild(el)});
// Nodes
nodePositions.forEach((pos,i)=>{const isUnlocked=i<save.unlocked;const stars=save.stars[i]||0;const isCurrent=i===save.unlocked-1;const isCompleted=stars>0;const cfg=LEVEL_CONFIGS[i];const node=document.createElement('div');node.className='road-node'+(isUnlocked?'':' locked')+(isCurrent?' current':'')+(isCompleted?' completed':'');node.dataset.diff=cfg.diff;node.style.left=(pos.x-27)+'px';node.style.top=(pos.y-27)+'px';const circle=document.createElement('div');circle.className='node-circle';if(isUnlocked){circle.textContent=i+1;if(isCompleted){const starsEl=document.createElement('div');starsEl.className='node-stars';starsEl.textContent='⭐'.repeat(stars)+'☆'.repeat(3-stars);circle.appendChild(starsEl)}}else{const lock=document.createElement('div');lock.className='node-lock';lock.textContent='🔒';circle.appendChild(lock)}node.appendChild(circle);if(isUnlocked){node.addEventListener('click',()=>{startGame(i)})}nodesEl.appendChild(node)});
genDecorations();if(roadmapAnim)cancelAnimationFrame(roadmapAnim);drawRoadmapCanvas(0);
document.getElementById('total-stars').textContent=Object.values(save.stars).reduce((a,b)=>a+b,0);
// Scroll to current
setTimeout(()=>{const ci=Math.max(0,save.unlocked-1);const cp=nodePositions[ci];if(cp){const scroll=document.getElementById('roadmap-scroll');scroll.scrollTop=cp.y-window.innerHeight/2}},200)}
// --- GAME STATE ---
let currentPuzzle=null;let currentLevel=0;let assignments={};let selectedNum=null;let moveStack=[];let hintsUsed=0;let timerInterval=null;let seconds=0;
function formatTime(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function startTimer(){stopTimer();seconds=0;document.getElementById('timer-text').textContent='00:00';timerInterval=setInterval(()=>{seconds++;document.getElementById('timer-text').textContent=formatTime(seconds)},1000)}
function stopTimer(){if(timerInterval){clearInterval(timerInterval);timerInterval=null}}
// --- START GAME ---
function startGame(li){currentLevel=li;currentPuzzle=genPuzzle(li);if(!currentPuzzle)return;assignments={};selectedNum=null;moveStack=[];hintsUsed=0;document.getElementById('menu-screen').classList.remove('active');document.getElementById('game-screen').classList.add('active');document.getElementById('level-badge').textContent='Seviye '+(li+1);renderGrid();renderPalette();updateClues();startTimer()}
function goToMenu(){stopTimer();document.getElementById('game-screen').classList.remove('active');document.getElementById('win-modal').classList.remove('active');document.getElementById('menu-screen').classList.add('active');renderRoadmap()}
// --- GRID RENDER ---
function renderGrid(){const p=currentPuzzle;const gw=document.getElementById('grid-wrapper');const gc=document.getElementById('grid-container');gc.innerHTML='';gc.style.gridTemplateColumns=`repeat(${p.gridCols},var(--cell))`;gc.style.gridTemplateRows=`repeat(${p.gridRows},var(--cell))`;for(let r=0;r<p.gridRows;r++)for(let c=0;c<p.gridCols;c++){const cell=document.createElement('div');cell.className='grid-cell';cell.dataset.row=r;cell.dataset.col=c;gc.appendChild(cell)}const cs=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cell'));p.capsules.forEach(([id,r,c,dir,len])=>{const isH=dir==='h';const pad=4;const el=document.createElement('div');el.className='capsule '+(isH?'horizontal':'vertical');el.style.left=(c*cs+pad)+'px';el.style.top=(r*cs+pad)+'px';el.style.width=(isH?len*cs-pad*2:cs-pad*2)+'px';el.style.height=(isH?cs-pad*2:len*cs-pad*2)+'px';el.style.borderRadius=(isH?(cs-pad*2)/2:Math.min(cs-pad*2,(len*cs-pad*2))/2)+'px';const lbl=document.createElement('div');lbl.className='capsule-label';lbl.textContent=id;el.appendChild(lbl);const numEl=document.createElement('div');numEl.className='capsule-number';numEl.id='cap-num-'+id;el.appendChild(numEl);el.addEventListener('click',()=>onCapsuleClick(id));gc.appendChild(el)});// Clues
p.rowClues.forEach((val,r)=>{const el=document.createElement('div');el.className='clue clue-row';el.id='clue-row-'+r;el.style.position='absolute';el.style.left=(p.gridCols*cs+4)+'px';el.style.top=(r*cs)+'px';el.style.width=cs*.8+'px';el.style.height=cs+'px';el.innerHTML=`<div class="clue-target">${val}</div><div class="clue-current" id="rc-${r}"></div>`;gc.appendChild(el)});p.colClues.forEach((val,c)=>{const el=document.createElement('div');el.className='clue clue-col';el.id='clue-col-'+c;el.style.position='absolute';el.style.left=(c*cs)+'px';el.style.top=(p.gridRows*cs+4)+'px';el.style.width=cs+'px';el.style.height=cs*.7+'px';el.innerHTML=`<div class="clue-target">${val}</div><div class="clue-current" id="cc-${c}"></div>`;gc.appendChild(el)})}
function renderPalette(){const pal=document.getElementById('number-palette');pal.innerHTML='';const nums=[...currentPuzzle.numbers].sort((a,b)=>a-b);nums.forEach(n=>{const btn=document.createElement('div');btn.className='num-btn';btn.textContent=n;btn.dataset.num=n;btn.addEventListener('click',()=>onNumClick(n));pal.appendChild(btn)})}
// --- INTERACTION ---
function onNumClick(n){if(!currentPuzzle)return;const used=new Set(Object.values(assignments));if(used.has(n)&&selectedNum!==n)return;selectedNum=selectedNum===n?null:n;updatePalette();sndPlace()}
function onCapsuleClick(id){if(!currentPuzzle)return;if(assignments[id]!=null){moveStack.push({id,val:assignments[id]});delete assignments[id];sndRemove();updateAll();return}if(selectedNum!=null){for(const k in assignments)if(assignments[k]===selectedNum)delete assignments[k];moveStack.push({id,val:null});assignments[id]=selectedNum;const el=document.getElementById('cap-num-'+id);if(el)el.classList.add('pop-in');setTimeout(()=>{if(el)el.classList.remove('pop-in')},350);selectedNum=null;sndPlace();updateAll();checkWin()}}
function updateAll(){updateCapsules();updatePalette();updateClues()}
function updateCapsules(){currentPuzzle.capsules.forEach(([id])=>{const el=document.getElementById('cap-num-'+id);const capEl=el?.closest('.capsule');const val=assignments[id];if(el){el.textContent=val!=null?val:''}if(capEl){capEl.classList.toggle('filled',val!=null);capEl.classList.remove('hint-filled')}})}
function updatePalette(){const used=new Set(Object.values(assignments));document.querySelectorAll('.num-btn').forEach(btn=>{const n=parseInt(btn.dataset.num);btn.classList.toggle('selected',selectedNum===n);btn.classList.toggle('used',used.has(n)&&selectedNum!==n)})}
function updateClues(){const p=currentPuzzle;const rs=Array(p.gridRows).fill(0);const cs2=Array(p.gridCols).fill(0);const ri=Array(p.gridRows).fill(true);const ci=Array(p.gridCols).fill(true);p.capsules.forEach(([id,r,c,dir,len])=>{const v=assignments[id];if(v==null){for(let k=0;k<len;k++){if(dir==='h'){ri[r]=false;ci[c+k]=false}else{ri[r+k]=false;ci[c]=false}}}else{if(dir==='h'){rs[r]+=v;cs2[c]+=v;cs2[c+1]+=v}else{rs[r]+=v;rs[r+1]+=v;cs2[c]+=v}}});p.rowClues.forEach((target,r)=>{const el=document.getElementById('clue-row-'+r);const curEl=document.getElementById('rc-'+r);if(!el||!curEl)return;if(!ri[r]){curEl.textContent=rs[r]>0?rs[r]:'';el.className='clue clue-row'+(rs[r]>0?' partial':'')}else if(rs[r]===target){curEl.textContent='✓';el.className='clue clue-row correct'}else{curEl.textContent=rs[r];el.className='clue clue-row over'}});p.colClues.forEach((target,c)=>{const elc=document.getElementById('clue-col-'+c);const curEl=document.getElementById('cc-'+c);if(!elc||!curEl)return;if(!ci[c]){curEl.textContent=cs2[c]>0?cs2[c]:'';elc.className='clue clue-col'+(cs2[c]>0?' partial':'')}else if(cs2[c]===target){curEl.textContent='✓';elc.className='clue clue-col correct'}else{curEl.textContent=cs2[c];elc.className='clue clue-col over'}})}
function checkWin(){if(Object.keys(assignments).length!==currentPuzzle.capsules.length)return;for(const[id]of currentPuzzle.capsules){if(assignments[id]!==currentPuzzle.solution[id]){sndErr();document.getElementById('grid-container').classList.add('shake');setTimeout(()=>document.getElementById('grid-container').classList.remove('shake'),400);return}}stopTimer();sndWin();launchConfetti();document.querySelectorAll('.capsule').forEach((el,i)=>{setTimeout(()=>el.classList.add('win-flash'),i*60)});let stars=3;if(hintsUsed>=2)stars=1;else if(hintsUsed===1)stars=2;if(seconds>120&&stars>1)stars--;save.stars[currentLevel]=Math.max(save.stars[currentLevel]||0,stars);if(currentLevel+1>=save.unlocked)save.unlocked=currentLevel+2;save.best[currentLevel]=Math.min(save.best[currentLevel]||9999,seconds);persist();setTimeout(()=>{document.getElementById('win-stars').textContent='⭐'.repeat(stars)+'☆'.repeat(3-stars);document.getElementById('win-star-count').textContent=stars;document.getElementById('win-time').textContent=formatTime(seconds);document.getElementById('win-hints').textContent=hintsUsed;document.getElementById('win-subtitle').textContent=stars===3?'Mükemmel!':stars===2?'Harika!':'İyi!';document.getElementById('win-modal').classList.add('active')},800)}
// --- UNDO / HINT / CLEAR ---
function undo(){if(moveStack.length===0)return;const last=moveStack.pop();if(last.val===null)delete assignments[last.id];else assignments[last.id]=last.val;selectedNum=null;sndRemove();updateAll()}
function clearAll(){if(Object.keys(assignments).length===0)return;moveStack.push({type:'clear',state:{...assignments}});assignments={};selectedNum=null;sndRemove();updateAll()}
function giveHint(){if(!currentPuzzle)return;const empty=currentPuzzle.capsules.filter(([id])=>assignments[id]==null);if(empty.length===0)return;const pick=empty[Math.floor(Math.random()*empty.length)];const[id]=pick;assignments[id]=currentPuzzle.solution[id];hintsUsed++;const el=document.getElementById('cap-num-'+id);const capEl=el?.closest('.capsule');if(el){el.classList.add('pop-in');setTimeout(()=>el.classList.remove('pop-in'),350)}if(capEl)capEl.classList.add('hint-filled');sndHint();updateAll();checkWin()}
// --- EVENT LISTENERS ---
document.getElementById('back-btn').addEventListener('click',goToMenu);
document.getElementById('undo-btn').addEventListener('click',undo);
document.getElementById('clear-btn').addEventListener('click',clearAll);
document.getElementById('hint-btn').addEventListener('click',giveHint);
document.getElementById('next-level-btn').addEventListener('click',()=>{const fromLvl=currentLevel;const toLvl=currentLevel+1;// Hide all overlays first
document.getElementById('win-modal').classList.remove('active');document.getElementById('game-screen').classList.remove('active');if(fromLvl>=49){goToMenu();return}pendingNextLevel=toLvl;
// Set character to start from the completed level (NOT the new unlocked position)
charStaticIdx=fromLvl;
stopTimer();document.getElementById('menu-screen').classList.add('active');renderRoadmap();// Start walk animation after roadmap fully renders
setTimeout(()=>{walkCharacterTo(fromLvl,toLvl,()=>{// After walking done, highlight next node
charStaticIdx=toLvl;
const nextNode=document.querySelectorAll('.road-node')[toLvl];if(nextNode){nextNode.classList.add('current');const nc=nextNode.querySelector('.node-circle');if(nc)nc.style.boxShadow='0 0 40px rgba(0,198,251,0.6)'}// Auto-start the next level after a visible pause
setTimeout(()=>{if(pendingNextLevel>=0){startGame(pendingNextLevel);pendingNextLevel=-1;charStaticIdx=-1}},800)})},700)});
document.getElementById('menu-btn').addEventListener('click',goToMenu);
document.getElementById('how-to-play-btn').addEventListener('click',()=>{document.getElementById('tutorial-modal').classList.add('active')});
document.getElementById('close-tutorial-btn').addEventListener('click',()=>{document.getElementById('tutorial-modal').classList.remove('active')});
document.addEventListener('keydown',e=>{const k=parseInt(e.key);if(k>=1&&k<=9&&currentPuzzle){const nums=currentPuzzle.numbers;if(nums.includes(k))onNumClick(k)}if(e.key==='z'&&e.ctrlKey)undo()});
// INIT
renderRoadmap();
