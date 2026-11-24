(() => {
'use strict';
const APP_KEY='miroir_magique_diane_v1';
const PIN='2207'; // Contrôle parental léger sur appareil : code visible dans le code source
const LEVELS=[
 {id:'point',name:'Le point miroir',icon:'🪞',description:'Place A′ exactement de l’autre côté de l’axe.',count:5},
 {id:'invariant',name:'La chasse aux invariants',icon:'🎯',description:'Retrouve les points qui ne bougent pas.',count:5},
 {id:'segment',name:'Le pont symétrique',icon:'📏',description:'Construis A′ et B′ sans changer la longueur.',count:5},
 {id:'circle',name:'La planète miroir',icon:'🪐',description:'Déplace le centre sans changer le rayon.',count:5},
 {id:'line',name:'Les droites jumelles',icon:'📐',description:'Trouve les deux points d’une droite réfléchie.',count:5},
 {id:'shape',name:'L’artiste des figures',icon:'🎨',description:'Reproduis une figure à trois sommets.',count:5},
 {id:'mix',name:'Le grand défi',icon:'🏆',description:'Un mélange de toutes les constructions !',count:10}
];
const MODES=['point','invariant','segment','circle','line','shape'];
const KEY_DAYS=45;
const defaultData=()=>({stars:0,sessions:0,solved:0,attempts:0,history:[],stats:{}});
let data=defaultData();try{const saved=JSON.parse(localStorage.getItem(APP_KEY)||'null');if(saved&&typeof saved==='object')data={...defaultData(),...saved,stats:saved.stats&&typeof saved.stats==='object'?saved.stats:{},history:Array.isArray(saved.history)?saved.history:[]}}catch{}
let screen='home',session=null,board=null,unlocked=false,feedback=null,help=false,dragging=null;
const $=s=>document.querySelector(s);
const app=$('#app');
const save=()=>{try{localStorage.setItem(APP_KEY,JSON.stringify(data));}catch{}};
const escapeHTML=x=>String(x).replace(/[&<>"']/g,k=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[k]));
const rnd=(a,b)=>a+Math.random()*(b-a);
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const fmt=v=>Number(v).toFixed(1);
const loc=(p)=>`${fmt(p.x)},${fmt(p.y)}`;
const statsFor=mode=>data.stats[mode]||{success:0,misses:0};
function showHeader(){ $('#starsBadge').textContent='⭐ '+data.stars;$('#homeButton').hidden=screen==='home'; }
function goHome(){unlocked=false;screen='home';session=null;board=null;feedback=null;showHeader();renderHome();}
function start(mode){unlocked=false;screen='game';session={mode,index:0,total:LEVELS.find(x=>x.id===mode).count,correctFirst:0,earned:0,questionErrors:0,done:false,types:[]};loadQuestion();}
function typeForQuestion(){if(session.mode==='mix')return MODES[(session.index*5+Math.floor(session.index/6))%6];return session.mode;}
function getTypeName(type){return LEVELS.find(x=>x.id===type)?.name||type}
function makeBoard(type){
 const angle=[0,Math.PI/2,Math.PI/4,-Math.PI/4][Math.floor(Math.random()*4)];
 const origin={x:180,y:158};const t={x:Math.cos(angle),y:Math.sin(angle)},n={x:-Math.sin(angle),y:Math.cos(angle)};
 const P=(u,v)=>({x:origin.x+t.x*u+n.x*v,y:origin.y+t.y*u+n.y*v});
 let src=[],targets=[],radius=26,choices=[];
 if(type==='point'){src=[P(rnd(-44,44),rnd(48,75))];}
 if(type==='segment'){const u=rnd(-42,-26),v=rnd(47,62);src=[P(u,v),P(u+57,v+rnd(8,22))];}
 if(type==='line'){const u=rnd(-57,-45),v=rnd(38,55);src=[P(u,v),P(u+108,v+rnd(14,28))];}
 if(type==='circle'){radius=Math.floor(rnd(24,34));src=[P(rnd(-22,22),rnd(64,74))];}
 if(type==='shape'){const u=rnd(-36,-22),v=rnd(51,65);src=[P(u,v),P(u+54,v+4),P(u+31,v+47)];}
 if(type==='invariant'){
   const win=Math.floor(rnd(0,3));
   choices=Array.from({length:3},(_,i)=>P([-54,7,56][i],i===win?0:i%2===0?rnd(42,61):-rnd(42,61)));
   return{type,angle,origin,t,n,src:choices,choices,correctChoice:win,handles:[],targets:[],radius,completed:false};
 }
 targets=src.map(p=>{
  const dx=p.x-origin.x,dy=p.y-origin.y;
  const dot=dx*n.x+dy*n.y;
  return {x:p.x-2*dot*n.x,y:p.y-2*dot*n.y};
 });
 const handles=targets.map((q,i)=>{
  const offsetU= 31; // Évite que les poignées mobiles se superposent au départ
  const offsetV= i%3===2 ? 24 : -25;
  return{x:clamp(q.x+t.x*offsetU+n.x*offsetV,17,343),y:clamp(q.y+t.y*offsetU+n.y*offsetV,17,303)};
 });
 return{type,angle,origin,t,n,src,targets,handles,choices,radius,completed:false};
}
function loadQuestion(){
 const type=typeForQuestion();board=makeBoard(type);session.questionErrors=0;session.done=false;session.types.push(type);help=false;feedback=null;screen='game';showHeader();renderGame();
}
function renderHome(){
 const missions=LEVELS.map(x=>`<button class="missionCard" data-mode="${x.id}"><span class="missionEmoji">${x.icon}</span><strong>${escapeHTML(x.name)}</strong><p>${escapeHTML(x.description)}</p><small>${x.count} DÉFIS · CONSTRUCTION</small></button>`).join('');
 app.innerHTML=`<div class="hero"><div><div class="eyebrow">L'aventure de Diane · Géométrie 6e</div><h1>Deviens une <em>magicienne des miroirs !</em> ✨</h1><p class="lead">Un axe, une figure, et tes doigts pour construire le reflet ! À chaque défi, tu apprends où placer les points, pourquoi ils sont symétriques et comment vérifier ta construction.</p><div class="chips"><span class="chip">🫶 Sans chronomètre</span><span class="chip">👆 À faire glisser</span><span class="chip">💡 Guides si besoin</span></div></div><div class="heroArt" aria-label="Une figure et son reflet dans un miroir"><svg viewBox="0 0 320 260" aria-hidden="true"><defs><linearGradient id="hg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#81f1d3"/><stop offset="1" stop-color="#bea6ff"/></linearGradient></defs><line x1="160" y1="20" x2="160" y2="238" stroke="#fee3a0" stroke-width="5" stroke-dasharray="9 8"/><polygon points="66,88 118,74 103,174" fill="#7ce9d0" stroke="#fff" stroke-width="3"/><polygon points="254,88 202,74 217,174" fill="#bdadff" stroke="#fff" stroke-width="3"/><circle cx="86" cy="111" r="11" fill="#fff4cb"/><circle cx="234" cy="111" r="11" fill="#fff4cb"/><text x="37" y="207" fill="#fff" font-size="19" font-weight="900">A</text><text x="268" y="207" fill="#fff" font-size="19" font-weight="900">A′</text><path d="M143 32 L160 16 L177 32" fill="none" stroke="#ffeca9" stroke-width="3"/></svg><div class="floatword">Axe de symétrie ✦ même distance</div></div></div>
 <div class="numbers"><div class="stat"><strong>${data.sessions}</strong><small>Missions terminées</small></div><div class="stat"><strong>${data.solved}</strong><small>Figures construites</small></div><div class="stat"><strong>${data.stars} ⭐</strong><small>Étoiles gagnées</small></div></div>
 <div class="sectionHead"><h2>Choisis ta mission</h2><p>Déplace les points dans le dessin, puis appuie sur « Vérifier ».</p></div><div class="missionGrid">${missions}</div>
 <div class="strip"><div><strong>📱 Apprends aussi hors connexion</strong><p>Ajoute ce jeu à l'écran d'accueil du téléphone pour y accéder comme une application.</p></div><button class="outlineButton" id="installGuide">Comment installer ?</button></div>
 <div class="notes"><div class="mini"><h3>📖 Le petit carnet de géométrie</h3><p>Les quatre règles de la symétrie axiale et les constructions du cours.</p><button class="linkBtn" id="seeLessons">Je révise les règles →</button></div><div class="mini"><h3>🔒 Espace Parents</h3><p>Résultats et points à revoir, avec le code parents.</p><button class="linkBtn" id="openParents">Ouvrir l'espace Parents →</button></div></div>`;
 app.querySelectorAll('[data-mode]').forEach(el=>el.onclick=()=>start(el.dataset.mode));
 $('#seeLessons').onclick=renderLessons;$('#openParents').onclick=parentGate;$('#installGuide').onclick=()=>{alert(/iPad|iPhone|iPod/.test(navigator.userAgent)?'Sur iPhone : ouvre l’application dans Safari, touche Partager, puis « Sur l’écran d’accueil » et « Ajouter ».':'Sur Android : ouvre cette page dans Chrome, touche ⋮ puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».');};
}
function pointIcon(p,label,fill='#293e7e',r=7){return `<circle cx="${fmt(p.x)}" cy="${fmt(p.y)}" r="${r}" stroke="#fff" stroke-width="2.5" fill="${fill}"/><text x="${fmt(p.x+10)}" y="${fmt(p.y-10)}" fill="#1b2b51" font-size="14" font-weight="900" style="paint-order:stroke;stroke:#fff;stroke-width:4px">${label}</text>`}
function guideSvg(b){
 if(!help&&!feedback?.showGuide)return'';
 let s='';
 b.src.forEach((p,i)=>{
  const q=b.targets[i],m={x:(p.x+q.x)/2,y:(p.y+q.y)/2};
  s+=`<line x1="${fmt(p.x)}" y1="${fmt(p.y)}" x2="${fmt(q.x)}" y2="${fmt(q.y)}" stroke="#d57591" stroke-width="1.9" stroke-dasharray="5 5"/><path d="M ${fmt(m.x)} ${fmt(m.y)} l ${fmt(b.t.x*8+b.n.x*2)} ${fmt(b.t.y*8+b.n.y*2)} l ${fmt(b.n.x*8)} ${fmt(b.n.y*8)}" fill="none" stroke="#bc4d71" stroke-width="2"/>`;
  if(help||feedback?.showGuide)s+=`<circle cx="${fmt(q.x)}" cy="${fmt(q.y)}" r="11" fill="#ffe9b8" fill-opacity=".45" stroke="#ca5984" stroke-width="2.4" stroke-dasharray="4 4"/>`;
 });
 return s;
}
function srcSvg(b){
 const labels=b.type==='circle'?['O']:['A','B','C'];
 let s='';
 if(b.type==='circle')s+=`<circle cx="${fmt(b.src[0].x)}" cy="${fmt(b.src[0].y)}" r="${b.radius}" fill="#86a9ff24" stroke="#36569f" stroke-width="3"/>`;
 if(b.type==='segment'||b.type==='line')s+=`<line x1="${fmt(b.src[0].x)}" y1="${fmt(b.src[0].y)}" x2="${fmt(b.src[1].x)}" y2="${fmt(b.src[1].y)}" stroke="#27478e" stroke-width="${b.type==='line'?4:5}" stroke-linecap="round"/>`;
 if(b.type==='shape')s+=`<polygon points="${b.src.map(loc).join(' ')}" fill="#87abe780" stroke="#315cad" stroke-width="3" stroke-linejoin="round"/>`;
 b.src.forEach((p,i)=>s+=pointIcon(p,labels[i]));
 return s;
}
function previewSvg(b){
 if(b.type==='circle'){const p=b.handles[0];return `<circle cx="${fmt(p.x)}" cy="${fmt(p.y)}" r="${b.radius}" stroke="#ad6bdb" stroke-width="3" fill="#bbabff33" stroke-dasharray="7 4"/>`;}
 if(b.type==='segment'||b.type==='line')return `<line x1="${fmt(b.handles[0].x)}" y1="${fmt(b.handles[0].y)}" x2="${fmt(b.handles[1].x)}" y2="${fmt(b.handles[1].y)}" stroke="#8c69d6" stroke-width="${b.type==='line'?4:4}" stroke-dasharray="7 5" stroke-linecap="round"/>`;
 if(b.type==='shape')return `<polygon points="${b.handles.map(loc).join(' ')}" fill="#cbb1f749" stroke="#8e65c3" stroke-width="3" stroke-dasharray="7 5"/>`;
 return'';
}
function boardSvg(b){
 const p=b.origin,t=b.t;
 const x1=p.x-360*t.x,y1=p.y-360*t.y,x2=p.x+360*t.x,y2=p.y+360*t.y;
 let s=`<svg id="geoSvg" viewBox="0 0 360 320" xmlns="http://www.w3.org/2000/svg" aria-label="Zone de construction géométrique interactive" role="group">
 <defs><pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e3e7f5" stroke-width="1"/></pattern></defs>
 <rect width="360" height="320" fill="#fbfcff"/><rect width="360" height="320" fill="url(#gridPattern)"/>
 <line x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}" stroke="#4f498c" stroke-width="4" stroke-linecap="round"/>
 <text x="${fmt(clamp(p.x+100*t.x,25,321))}" y="${fmt(clamp(p.y+100*t.y-12,19,301))}" fill="#574c8d" font-weight="900" font-size="15" style="paint-order:stroke;stroke:white;stroke-width:4px">(d)</text>
 <g id="guideLayer">${guideSvg(b)}</g>`;
 if(b.type==='invariant'){
  b.choices.forEach((pt,i)=>{s+=`<g class="tapChoice" data-choice="${i}" role="button" tabindex="0" aria-label="Choisir le point ${['A','B','C'][i]}"><circle cx="${fmt(pt.x)}" cy="${fmt(pt.y)}" r="21" fill="#efdefd88" stroke="#9773ce" stroke-width="2"/>${pointIcon(pt,['A','B','C'][i],'#42477c',8)}</g>`});
 }else{
  s+=`<g id="sourceLayer">${srcSvg(b)}</g><g id="previewLayer">${previewSvg(b)}</g><g id="handleLayer">`;
  b.handles.forEach((q,i)=>{const label=b.type==='circle'?'O′':(['A′','B′','C′'][i]);s+=`<g><circle class="dragCircle" data-handle="${i}" cx="${fmt(q.x)}" cy="${fmt(q.y)}" r="18" stroke="#7d4dd0" stroke-width="3.5" fill="${b.completed?'#71e2c5':'#d6c4ff'}" tabindex="0" role="button" aria-label="Déplacer ${label} au doigt ou avec les flèches"/><circle cx="${fmt(q.x)}" cy="${fmt(q.y)}" r="4" fill="#483075" pointer-events="none" data-center="${i}"/><text data-label="${i}" x="${fmt(q.x+17)}" y="${fmt(q.y-16)}" fill="#7144b7" font-size="15" font-weight="950" pointer-events="none" style="paint-order:stroke;stroke:#fff;stroke-width:4px">${label}</text></g>`;});
  s+='</g>';
 }
 return s+'</svg>';
}
function statement(type){
 return({point:{title:'Place le point A′',instruction:'Fais glisser le rond violet pour qu’il soit le reflet exact de A par rapport à la droite (d).'},invariant:{title:'Quel point reste immobile ?',instruction:'Un point situé sur l’axe ne change pas de place. Touche A, B ou C sur le dessin (ou choisis ci-dessous).'},segment:{title:'Construis le segment [A′B′]',instruction:'Déplace séparément A′ et B′. Le segment symétrique doit avoir la même longueur.'},circle:{title:'Déplace la planète O′',instruction:'Fais glisser le centre O′. Le cercle miroir garde exactement le même rayon.'},line:{title:'Construis la droite miroir',instruction:'Place les points A′ et B′ pour obtenir la droite symétrique de (AB).'},shape:{title:'Complète la figure miroir',instruction:'Déplace A′, B′ et C′ pour dessiner l’image exacte du triangle.'}})[type];
}
function explanation(type){return({point:'La droite (d) est la médiatrice du segment [AA′] : elle est perpendiculaire à [AA′] et passe par son milieu.',invariant:'Tous les points de l’axe de symétrie sont invariants : ils sont leur propre symétrique.',segment:'Le symétrique d’un segment est un segment de même longueur. On construit les images de ses extrémités.',circle:'Le symétrique d’un cercle est un cercle de même rayon. Son centre est l’image du centre initial.',line:'Pour construire le symétrique d’une droite, on construit les images de deux points de cette droite, puis on les relie.',shape:'Chaque sommet doit être de l’autre côté de l’axe, à la même distance perpendiculaire. La forme et les longueurs sont conservées.'})[type]}
function renderGame(){
 if(!session||!board)return;
 const lvl=session.index+1,statementText=statement(board.type);
 app.innerHTML=`<div class="missionShell"><div class="missionTop"><button class="backBtn" id="exitMission">← Quitter la mission</button><span class="smallPill">${lvl} / ${session.total} défis</span><span class="smallPill">⭐ +${session.earned}</span></div>
 <div class="progress"><b style="width:${Math.round((session.index/session.total)*100)}%"></b></div>
 <div class="gameCard"><div class="eyebrow">${escapeHTML(getTypeName(board.type))}</div><h1>${statementText.title}</h1><p class="instruction">${statementText.instruction}</p>
 <div class="figureWrap">${boardSvg(board)}</div><div class="figureLabel">${board.type==='invariant'?'Touche le point qui reste sur la droite (d)':'Les points violets sont à déplacer au doigt, au stylet ou avec les flèches du clavier.'}</div>
 <div class="guideLegend"><span><i class="dotLegend"></i> Figure de départ</span><span><i class="dotLegend mint"></i> Axe (d)</span><span>🟣 Tes points mobiles</span></div>
 ${board.type==='invariant'?`<div class="choiceButtons">${['A','B','C'].map((x,i)=>`<button class="choiceButton" data-option="${i}" ${session.done?'disabled':''}>Point ${x}</button>`).join('')}</div>`:''}
 <div class="gameControls"><button class="helpBtn" id="toggleHint">${help?'🙈 Masquer l’aide':'💡 Voir un indice'}</button>${board.type==='invariant'?'':`<button class="primaryBtn" id="checkAnswer" ${session.done?'disabled':''}>✓ Vérifier ma construction</button>`}</div>
 ${help?`<p class="statusNote">💡 Imagine un segment perpendiculaire à (d) qui relie chaque point à son reflet : l’axe coupe ce segment en son milieu. Le point cible est entouré en pointillés.</p>`:''}
 ${feedback?`<div class="feedback ${feedback.ok?'':'mistake'}" role="status"><strong>${feedback.ok?'🌟 Bravo, une vraie construction !':'🌱 Tu es sur la bonne voie !'}</strong><p>${feedback.message}</p></div>`:''}
 ${session.done?`<div class="gameControls"><button class="primaryBtn" id="nextChallenge">${lvl===session.total?'Voir mon résultat 🏆':'Défi suivant →'}</button></div>`:''}
 </div></div>`;
 $('#exitMission').onclick=()=>{goHome()};
 $('#toggleHint').onclick=()=>{help=!help;renderGame()};
 if(board.type==='invariant'){
  app.querySelectorAll('[data-option]').forEach(x=>x.onclick=()=>chooseInvariant(+x.dataset.option));
  app.querySelectorAll('[data-choice]').forEach(x=>{x.onclick=()=>chooseInvariant(+x.dataset.choice);x.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();chooseInvariant(+x.dataset.choice)}}});
 }else{
  bindBoardEvents();
  const check=$('#checkAnswer');if(check)check.onclick=checkConstruction;
 }
 if(session.done)$('#nextChallenge').onclick=advance;
}
function svgCoordinates(svg,e){
 const pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;
 const m=svg.getScreenCTM();if(!m)return null;return pt.matrixTransform(m.inverse());
}
function moveHandle(idx,x,y){
 if(session.done)return;
 const h=board.handles[idx];h.x=clamp(x,18,342);h.y=clamp(y,18,302);
 const circ=$(`[data-handle="${idx}"]`),center=$(`[data-center="${idx}"]`),label=$(`[data-label="${idx}"]`);
 for(const node of [circ,center]){if(node){node.setAttribute('cx',h.x);node.setAttribute('cy',h.y)}}
 if(label){label.setAttribute('x',h.x+16);label.setAttribute('y',h.y-15)}
 const preview=$('#previewLayer');if(preview)preview.innerHTML=previewSvg(board);
}
function bindBoardEvents(){
 const svg=$('#geoSvg');
 svg.addEventListener('pointerdown',e=>{
  const target=e.target.closest('[data-handle]');if(!target||session.done)return;
  dragging=+target.dataset.handle;
  try{svg.setPointerCapture(e.pointerId)}catch{}
  const p=svgCoordinates(svg,e);if(p)moveHandle(dragging,p.x,p.y);
  e.preventDefault();
 });
 svg.addEventListener('pointermove',e=>{if(dragging===null)return;const p=svgCoordinates(svg,e);if(p)moveHandle(dragging,p.x,p.y);e.preventDefault();});
 const finish=(e)=>{if(dragging===null)return;const idx=dragging;dragging=null;try{svg.releasePointerCapture(e.pointerId)}catch{};const h=board.handles[idx],q=board.targets[idx];if(distance(h,q)<17)moveHandle(idx,q.x,q.y);};
 svg.addEventListener('pointerup',finish);svg.addEventListener('pointercancel',finish);
 svg.querySelectorAll('[data-handle]').forEach(c=>c.addEventListener('keydown',e=>{
  const idx=+c.dataset.handle,step=e.shiftKey?1:6;
  let dx=0,dy=0;if(e.key==='ArrowUp')dy=-step;else if(e.key==='ArrowDown')dy=step;else if(e.key==='ArrowLeft')dx=-step;else if(e.key==='ArrowRight')dx=step;else return;
  e.preventDefault();moveHandle(idx,board.handles[idx].x+dx,board.handles[idx].y+dy);
 }));
}
function chooseInvariant(i){
 if(session.done)return;
 data.attempts++;
 if(i===board.correctChoice){answerCorrect();}
 else{session.questionErrors++;incrementBad(board.type);feedback={ok:false,message:'Ce point se déplace quand on le réfléchit. Regarde lequel est exactement sur la droite (d).'};renderGame();}
}
function checkConstruction(){
 if(session.done)return;
 data.attempts++;
 const errors=board.handles.map((h,i)=>distance(h,board.targets[i]));
 const max=Math.max(...errors);
 if(max<=18){board.handles=board.targets.map(p=>({...p}));answerCorrect();}
 else{
  session.questionErrors++;incrementBad(board.type);
  const more=session.questionErrors>=2;
  if(more)help=true;
  feedback={ok:false,showGuide:more,message:`Il reste ${errors.filter(x=>x>18).length} point${errors.filter(x=>x>18).length>1?'s':''} à ajuster. Chaque point et son reflet sont alignés sur une perpendiculaire à (d), à égale distance de l’axe.${more?' Les petits cercles en pointillés indiquent où placer les points.':' Essaie encore ou demande un indice.'}`};
  save();renderGame();
 }
}
function incrementBad(type){data.stats[type]||={success:0,misses:0};data.stats[type].misses++;save();}
function answerCorrect(){
 if(session.done)return;
 session.done=true;board.completed=true;session.correctFirst+=session.questionErrors===0?1:0;
 const gained=session.questionErrors===0?3:session.questionErrors===1?2:1;
 session.earned+=gained;data.stars+=gained;data.solved++;
 data.stats[board.type]||={success:0,misses:0};data.stats[board.type].success++;
 feedback={ok:true,message:explanation(board.type)+` ⭐ +${gained} étoile${gained>1?'s':''} !`};
 save();showHeader();renderGame();
}
function advance(){
 if(!session.done)return;
 session.index++;if(session.index>=session.total){endMission();return}loadQuestion();
}
function endMission(){
 const result={date:new Date().toISOString(),mode:session.mode,total:session.total,first:session.correctFirst,earned:session.earned};
 data.history.push(result);data.history=data.history.slice(-KEY_DAYS);data.sessions++;save();screen='result';showHeader();
 const title=session.correctFirst>=session.total-1?'Grande magicienne des miroirs !':session.correctFirst>=session.total/2?'Exploratrice de la symétrie !':'Super apprentie géomètre !';
 const mode=session.mode;
 app.innerHTML=`<section class="resultPanel"><div class="trophy">${session.correctFirst>=session.total-1?'🏆':'🪞'}</div><div class="eyebrow">Mission terminée</div><h1>${title}</h1><p>Tu as terminé tes ${session.total} constructions. Même quand on hésite, chaque essai nous apprend quelque chose.</p><div class="bigScore">+${session.earned} ⭐</div><p>${session.correctFirst} défi${session.correctFirst>1?'s':''} réussi${session.correctFirst>1?'s':''} du premier coup.</p><div class="resultActions"><button class="primaryBtn" id="again">🔁 Rejouer</button><button class="outlineButton" id="resultHome">Retour à l’accueil</button></div></section>`;
 $('#again').onclick=()=>start(mode);$('#resultHome').onclick=goHome;
}
function renderLessons(){screen='lessons';showHeader();app.innerHTML=`<div class="lessonPage"><button class="backBtn" id="backLessons">← Retour aux missions</button><div class="eyebrow">Le carnet de Diane · Chapitre 5</div><h1>📖 La symétrie axiale</h1><p class="lead">Une figure et son reflet peuvent se superposer si on plie la feuille le long d’une droite appelée <strong>axe de symétrie</strong>.</p><div class="lessonGrid">
 <div class="lessonTile"><h3>🪞 1. Deux points symétriques</h3><p>Dire que A et A′ sont symétriques par rapport à (d), c’est dire que <strong>(d) est la médiatrice du segment [AA′]</strong>. L’axe coupe [AA′] en son milieu et lui est perpendiculaire.</p></div>
 <div class="lessonTile"><h3>📍 2. Les points invariants</h3><p>Un point placé <strong>sur l’axe</strong> est son propre symétrique. On dit que ce point est <strong>invariant</strong>.</p></div>
 <div class="lessonTile"><h3>📏 3. Segment et droite</h3><p>Le symétrique d’un segment est un segment de <strong>même longueur</strong>. Pour construire l’image d’une droite, on réfléchit deux de ses points et on trace la droite passant par leurs images.</p></div>
 <div class="lessonTile"><h3>🪐 4. Cercle</h3><p>Le symétrique d’un cercle est un cercle de <strong>même rayon</strong>. Le nouveau centre O′ est le symétrique du centre O.</p></div>
 <div class="lessonTile"><h3>🧰 5. Au compas</h3><p>Pour construire A′, on peut utiliser le compas. On trace deux arcs de <strong>même rayon</strong> depuis deux points différents de l’axe (d), choisis de façon que les cercles se coupent en A et en A′.</p></div>
 <div class="lessonTile"><h3>🧠 6. La méthode magique</h3><p>Pour chaque sommet : <span class="math">1.</span> imagine la perpendiculaire à l’axe, <span class="math">2.</span> repère la distance du point à l’axe, <span class="math">3.</span> reporte cette distance de l’autre côté.</p></div>
 </div><p class="safety">Les exercices reprennent les notions visibles sur les cinq photos de la leçon envoyées : symétrie par pliage, médiatrice, invariants, points, segments, cercles, droites, figures et constructions au compas.</p></div>`;$('#backLessons').onclick=goHome;}
function parentGate(){screen='pin';showHeader();unlocked=false;app.innerHTML=`<div class="pinPage"><div class="pinBox"><div style="font-size:44px">🔒</div><h1>Espace Parents</h1><p class="lead" style="font-size:14px">Le tableau des progrès est protégé par un code à quatre chiffres.</p><form id="pinForm"><label for="codePin">Code parents</label><input id="codePin" type="password" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" autocomplete="off" required aria-describedby="pinError"><p class="pinError" id="pinError" role="status"></p><button class="primaryBtn" type="submit">Déverrouiller</button></form><button class="linkBtn" id="cancelPin" style="margin-top:19px">← Revenir aux jeux</button></div></div>`;
 $('#cancelPin').onclick=goHome;
 $('#pinForm').onsubmit=e=>{e.preventDefault();if($('#codePin').value===PIN){unlocked=true;renderParents();}else{$('#pinError').textContent='Ce code ne correspond pas. Réessaie.';$('#codePin').value='';$('#codePin').focus();}};
}
function renderParents(){if(!unlocked){parentGate();return}screen='parents';showHeader();
 const statsRows=MODES.map(type=>{const obj=statsFor(type),n=obj.success+obj.misses,pct=n?Math.round(obj.success/n*100):0;return `<div class="barItem"><div><strong>${escapeHTML(getTypeName(type))}</strong><span>${n?`${obj.success} constructions validées · ${obj.misses} essais à corriger`:'Pas encore travaillé'}</span></div><div class="barBack"><div class="barFill" style="width:${pct}%"></div></div></div>`}).join('');
 const poor=MODES.map(type=>({type,...statsFor(type)})).filter(x=>x.misses>=2).sort((a,b)=>b.misses-a.misses).slice(0,2);
 app.innerHTML=`<div class="parentPage"><button class="backBtn" id="parentBack">← Retour aux jeux</button><div class="eyebrow">Espace Parents · Résultats enregistrés sur cet appareil</div><h1>📊 Les progrès de Diane</h1><div class="numbers"><div class="stat"><strong>${data.sessions}</strong><small>Missions terminées</small></div><div class="stat"><strong>${data.solved}</strong><small>Constructions validées</small></div><div class="stat"><strong>${data.stars}</strong><small>Étoiles obtenues</small></div></div>
 <div class="parentGrid"><section class="lessonTile"><h3>🎯 Difficultés par activité</h3><p>Une tentative ratée n’est pas un échec : elle signale qu’un concept mérite d’être retravaillé.</p>${statsRows}</section>
 <section class="lessonTile"><h3>💜 Comment l’accompagner</h3><p>Fais 5 à 10 minutes de géométrie par jour. Demande-lui : « Où est le milieu ? », « La ligne entre les deux points est-elle perpendiculaire à l’axe ? » et « Est-ce que les distances sont égales ? ».</p><p style="margin-top:12px">${poor.length?`À reprendre doucement : <strong>${poor.map(x=>getTypeName(x.type)).join(' et ')}</strong>.`:'Commence par « Le point miroir », puis « La chasse aux invariants ».'}</p><h3 style="margin-top:26px">🧭 Historique des missions</h3><div class="miniStats">${data.history.length?data.history.slice(-7).reverse().map(h=>`<p>${new Date(h.date).toLocaleDateString('fr-FR')} · ${escapeHTML(getTypeName(h.mode))} · +${h.earned} ⭐ · ${h.first}/${h.total} du premier coup</p>`).join(''):'Pas encore de mission terminée.'}</div><button class="dangerBtn" id="eraseData" style="margin-top:21px">Effacer les progrès sur cet appareil</button></section></div><p class="safety">Protection légère par code local : ce n’est pas une authentification sécurisée. Les résultats ne sont pas synchronisés entre téléphones et ne sont pas envoyés sur un serveur.</p></div>`;
 $('#parentBack').onclick=goHome;
 $('#eraseData').onclick=()=>{if(confirm('Effacer définitivement les étoiles, missions et résultats enregistrés sur cet appareil ?')){data=defaultData();save();renderParents()}};
}
$('#homeButton').onclick=goHome;$('#logoHome').onclick=goHome;
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))navigator.serviceWorker.register('./sw.js').catch(()=>{});
goHome();
})();
