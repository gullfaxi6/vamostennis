(function(){
'use strict';
const {QUESTIONS,TIMELINES,MAP_QUESTIONS,MISSIONS,TOPICS,KEY_DATES,GLOSSARY,SOURCE}=window.HISTORY_DATA;
const KEY='missionPrehistoireDiane_v1';
const root=document.querySelector('#app');
const topXP=document.querySelector('#xpTop');
const homeBtn=document.querySelector('#homeBtn');
const dialogs=document.querySelector('#installDialog');
let parentUnlocked=false,session=null,activeScreen='home',deferredInstall=null;
const blank=()=>({xp:0,total:0,good:0,missions:0,best:0,questionStats:{},history:[]});
let progress;
try{
 progress={...blank(),...JSON.parse(localStorage.getItem(KEY)||'{}')};
 if(!progress.questionStats||typeof progress.questionStats!=='object')progress.questionStats={};
 if(!Array.isArray(progress.history))progress.history=[];
}catch(_){progress=blank();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(progress));}catch(_){/* stockage optionnel */}}
function h(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function shuffle(array){const out=[...array];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
function info(q){const z=progress.questionStats[q.id]||{good:0,bad:0};return (z.bad*2-z.good*.4)+Math.random()*3;}
function selected(pool,n){return [...pool].sort((a,b)=>info(b)-info(a)).slice(0,n);}
function $ (sel){return root.querySelector(sel);}
function formatDate(iso){try{return new Date(iso).toLocaleDateString('fr-FR');}catch(_){return '';}}
function setScreen(name){activeScreen=name;topXP.textContent=`✦ ${progress.xp} XP`;homeBtn.style.display=name==='home'?'none':'inline-block';window.scrollTo({top:0,behavior:'instant'});}
function statCards(){return `<div class="stats"><div class="stat"><b>${progress.missions}</b><span>Missions accomplies</span></div><div class="stat"><b>${progress.good}</b><span>Bonnes réponses</span></div><div class="stat"><b>${progress.xp}</b><span>Étoiles XP</span></div></div>`;}
function goHome(){parentUnlocked=false;session=null;setScreen('home');
 const last=progress.history.at(-1);
 const missions=MISSIONS.map(m=>`<button class="mission ${m.gold?'gold':''}" type="button" data-mission="${m.id}"><span class="emoji">${m.emoji}</span><span class="name">${h(m.name)}</span><span class="desc">${h(m.desc)}</span><span class="meta"><span>${h(m.tag)}</span><span class="arrow">→</span></span></button>`).join('');
 root.innerHTML=`<div class="hero"><div><div class="eyebrow">Histoire · 6e · Le chapitre de Diane</div><h1>Voyage dans la <em>Préhistoire.</em></h1><p class="hero-text">Prête pour l’aventure, Diane ? Remets les dates dans l’ordre, enquête comme une archéologue et retrouve la route des premiers humains. Ici, tu progresses <strong>sans chronomètre</strong> et sans pression.</p><div class="tag-list"><span class="tag">⏳ Chronologies interactives</span><span class="tag">🌍 Carte à explorer</span><span class="tag">💛 Droit à l’erreur</span></div></div><div class="hero-art" aria-label="Illustration de la Préhistoire"><div class="hero-sun"></div><div class="earth">🌍</div><div class="mammoth">🦣</div><div class="footprints">🐾</div><span class="art-label">Il y a très, très longtemps…</span></div></div>
 ${statCards()}
 <div class="section-heading"><div><h2>Choisis ta mission</h2><p>Quelques minutes suffisent pour apprendre un peu chaque jour.</p></div><div class="icon" aria-hidden="true">🧭</div></div>
 <div class="missions">${missions}</div>
 <div class="bottom-grid"><div class="callout"><h3>📖 Ton carnet de révision</h3><p>Retrouve les dates, les espèces, les migrations et les mots-clés à connaître pour l’évaluation.</p><button class="btn alt" data-action="notes">Ouvrir le carnet →</button></div><div class="callout"><h3>🔒 Espace Parents</h3><p>Tableau de bord, notions à renforcer et conseils d’accompagnement. Code à quatre chiffres requis.</p><button class="btn alt" data-action="parents">Entrer dans l’espace Parents →</button></div></div>
 <div class="bottom-grid"><div class="callout"><h3>📱 Emporte ton jeu avec toi</h3><p>Ajoute l’application à l’écran d’accueil du téléphone et révise même hors connexion.</p><button class="text-button" data-action="install">Comment l’installer ? →</button></div><div class="callout"><h3>🎯 ${last?'Ta dernière expédition':'Premier objectif'}</h3><p>${last?`Tu as obtenu <strong>${last.score}/${last.max}</strong> sur « ${h(last.title)} ». Tu peux refaire une mission pour consolider tes acquis.`:'Commence par « La frise du temps » ou « Premiers humains », puis lance le grand défi quand tu es prête.'}</p><button class="text-button" data-action="revision">${progress.total?'Réviser mes erreurs':'Faire mes premières révisions'} →</button></div></div>`;
 root.querySelectorAll('[data-mission]').forEach(el=>el.addEventListener('click',()=>start(el.dataset.mission)));
 root.querySelectorAll('[data-action]').forEach(el=>el.addEventListener('click',()=>action(el.dataset.action)));
}
function action(a){if(a==='notes')return notes();if(a==='parents')return parentGate();if(a==='install')return installHelp();if(a==='revision')return start('revision');}
function playSet(id){
 const mission=MISSIONS.find(x=>x.id===id);
 if(id==='frise')return{title:'La frise du temps',emoji:'⏳',questions:selected(TIMELINES,6)};
 if(id==='migration')return{title:mission.name,emoji:mission.emoji,questions:shuffle([...selected(MAP_QUESTIONS.filter(x=>x.answer!=='Antarctique'),4),...selected(QUESTIONS.filter(x=>x.topic==='migrations'),4)])};
 if(id==='controle'){
  const qs=[];
  for(const topic of ['repères','espèces','migrations','vie','arts','documents'])qs.push(...selected(QUESTIONS.filter(q=>q.topic===topic),1));
  qs.push(...selected(TIMELINES,2),...selected(MAP_QUESTIONS.filter(x=>x.answer!=='Antarctique'),2));
  const other=selected(QUESTIONS.filter(q=>!qs.includes(q)),2);
  qs.push(...other);
  return{title:mission.name,emoji:mission.emoji,questions:shuffle(qs)};
 }
 if(id==='revision'){
  let weak=QUESTIONS.concat(TIMELINES,MAP_QUESTIONS).filter(q=>(progress.questionStats[q.id]?.bad||0)>0);
  if(weak.length<8)weak=[...weak,...selected(QUESTIONS.filter(q=>!weak.includes(q)),8-weak.length)];
  return{title:'Révision personnalisée',emoji:'🎯',questions:selected(weak,Math.min(10,weak.length))};
 }
 return{title:mission.name,emoji:mission.emoji,questions:selected(QUESTIONS.filter(q=>mission.topics.includes(q.topic)),mission.count)};
}
function start(id){const set=playSet(id);session={id,title:set.title,emoji:set.emoji,questions:set.questions,index:0,score:0,correct:0,wrong:[],hint:false,done:false,choiceOrder:null,picks:[],review:[]};prepare();}
function prepare(){if(!session)return;if(session.index>=session.questions.length)return finish();session.hint=false;session.done=false;session.picks=[];session.choiceOrder=null;const q=session.questions[session.index];if(q.type==='choice')session.choiceOrder=shuffle(q.options);if(q.type==='timeline')session.choiceOrder=shuffle(q.events);renderQuestion();}
function questionCount(){return session.questions.length;}
function renderQuestion(){if(!session)return;setScreen('game');const q=session.questions[session.index];const pct=Math.round(100*session.index/questionCount());
 let extra='';
 if(q.type==='choice')extra=`<div class="choices">${session.choiceOrder.map((option,i)=>`<button type="button" class="choice ${session.done?(option===q.answer?'correct':session.chosen===option?'wrong':''):''}" ${session.done?'disabled':''} data-answer="${i}">${h(option)}</button>`).join('')}</div>`;
 if(q.type==='timeline'){
  const picks=session.picks.map(id=>q.events.find(e=>e[0]===id)).filter(Boolean);
  const rest=session.choiceOrder.filter(e=>!session.picks.includes(e[0]));
  extra=`<div class="steps"><strong>Du plus ancien au plus récent :</strong> touche les quatre événements dans l’ordre, de 1 à 4. Plusieurs espèces ont pu vivre en même temps.</div><div class="picked" aria-label="Événements sélectionnés">${picks.length?picks.map((e,i)=>`<span class="picked-chip">${i+1}. ${h(e[1])}</span>`).join(''):'<span class="tiny">Ta frise commence ici…</span>'}</div><div class="stack">${rest.map(e=>`<button type="button" data-pick="${h(e[0])}" ${session.done?'disabled':''}>${h(e[1])}</button>`).join('')}</div>${!session.done?'<button type="button" class="text-button" id="undoPick" style="margin-top:14px">↶ Recommencer cette frise</button>':''}`;
 }
 if(q.type==='map')extra=mapMarkup(q);
 let reply='';if(session.done){reply=`<div class="reply ${session.wasCorrect?'':'wrong'}" role="status"><h3>${session.wasCorrect?'🌟 Bien joué !':'💛 Tu viens d’apprendre quelque chose !'}</h3><p>${h(q.explanation)}</p>${q.type==='timeline'?`<p style="margin-top:10px"><strong>Le bon ordre :</strong><br>${q.events.map((e,i)=>`${i+1}. ${h(e[1])}`).join('<br>')}</p>`:''}<span class="source">Repère tiré du cours de Diane${q.answer==='Antarctique'?' (complément de géographie)':''}.</span></div><div class="nextline"><button class="btn primary" id="nextQ">${session.index+1===session.questions.length?'Voir mes étoiles ✨':'Question suivante →'}</button></div>`;}
 root.innerHTML=`<div class="page-wrap"><button type="button" class="back" id="exitGame">← Quitter la mission</button><div class="game-header"><span class="game-name">${session.emoji} ${h(session.title)}</span><span class="counter">Question ${session.index+1} / ${questionCount()}</span></div><div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:${pct}%"></div></div><section class="panel"><div class="context">${q.type==='timeline'?'⏳ Ordonner les événements':q.type==='map'?'🗺️ Se repérer dans l’espace':`🧠 ${h(TOPICS[q.topic])}`}</div><h1 class="question-head">${h(q.question)}</h1>${!session.done?`<button class="hint-trigger" id="hintBtn">💡 ${session.hint?'Masquer l’indice':'Besoin d’un indice ?'}</button>${session.hint?`<div class="hint">${h(q.hint)}</div>`:''}`:''}${extra}${reply}</section><p class="tiny" style="text-align:center;margin-top:18px">Tu peux te tromper, c’est comme ça qu’on apprend. 🌿</p></div>`;
 $('#exitGame').onclick=goHome;
 if(session.done){$('#nextQ').onclick=()=>{session.index++;prepare()};return;}
 $('#hintBtn').onclick=()=>{session.hint=!session.hint;renderQuestion()};
 if(q.type==='choice')root.querySelectorAll('[data-answer]').forEach(button=>button.onclick=()=>answer(session.choiceOrder[Number(button.dataset.answer)]));
 if(q.type==='map')root.querySelectorAll('[data-continent]').forEach(b=>{b.onclick=()=>answer(b.dataset.continent);if(b.tagName.toLowerCase()==='g')b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();answer(b.dataset.continent);}};});
 if(q.type==='timeline'){
  root.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{session.picks.push(b.dataset.pick);if(session.picks.length>=q.events.length)answer(session.picks.join('|'));else renderQuestion()});
  $('#undoPick').onclick=()=>{session.picks=[];renderQuestion()};
 }
}
function answer(value){if(!session||session.done)return;const q=session.questions[session.index];const right=q.type==='timeline'?q.events.map(e=>e[0]).join('|'):q.answer;const correct=value===right;
 session.done=true;session.wasCorrect=correct;session.chosen=value;
 session.correct+=correct?1:0;
 const earned=correct?(session.hint?7:10):0;session.score+=earned;progress.xp+=earned;progress.total++;if(correct)progress.good++;
 const stats=progress.questionStats[q.id]||{good:0,bad:0};stats[correct?'good':'bad']++;progress.questionStats[q.id]=stats;
 if(!correct)session.wrong.push(q);
 save();renderQuestion();
}
function finish(){if(!session)return;const finished=session;const questions=finished.questions.length;const max=questions*10;progress.missions++;progress.best=Math.max(progress.best,finished.score);
 progress.history.push({date:new Date().toISOString(),id:finished.id,title:finished.title,score:finished.score,max,good:finished.correct,total:questions});progress.history=progress.history.slice(-90);save();
 const pct=finished.correct/questions*100;setScreen('result');const award=pct===100?'Chrono-championne':pct>=75?'Grande exploratrice':pct>=45?'Apprentie archéologue':'Exploratrice courageuse';const unique=[...new Map(finished.wrong.map(q=>[q.id,q])).values()];
 root.innerHTML=`<div class="page-wrap"><section class="panel result"><div class="big">${pct===100?'🏆':pct>=75?'🌟':'🦣'}</div><div class="eyebrow">Mission accomplie</div><h1>${award} !</h1><p>Bravo Diane, tu es allée au bout de l’expédition. Ce qui compte, c’est de comprendre et de progresser.</p><div class="score">${finished.score} <span style="font-size:22px;color:#bed4dc">/ ${max} XP</span></div><p>${finished.correct} bonne${finished.correct>1?'s':''} réponse${finished.correct>1?'s':''} sur ${questions}. ${unique.length?'Ces notions seront proposées plus souvent lors de tes prochaines révisions.':'Tout est réussi sur cette mission !'}</p>${unique.length?`<h3 style="margin:22px 0 10px">À revoir tranquillement :</h3><div class="weak-tags">${unique.slice(0,4).map(q=>`<span>${h(TOPICS[q.topic])}</span>`).join('')}</div>`:''}<div class="result-actions"><button class="btn primary" id="playAgain">↻ Rejouer</button><button class="btn alt" id="backToHome">⌂ Autres missions</button></div></section></div>`;
 $('#playAgain').onclick=()=>start(finished.id);$('#backToHome').onclick=goHome;session=null;
}
function mapMarkup(q){const buttons=['Afrique','Europe','Asie','Amérique','Océanie','Antarctique'];return `<div class="map-wrap"><svg viewBox="0 0 700 280" role="img" aria-label="Carte du monde schématique : Amérique à l’ouest, Europe, Afrique, Asie et Océanie vers l’est, Antarctique au sud"><defs><pattern id="water" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0 18L18 0" stroke="#77b5c4" stroke-width=".5" opacity=".11"/></pattern></defs><rect width="700" height="280" rx="14" fill="#183e54"/><rect width="700" height="280" rx="14" fill="url(#water)"/><g fill="#79b98b" stroke="#bee2ac" stroke-width="2" opacity=".95"><path d="M52 49 L98 28 157 31 188 64 178 93 150 107 152 129 132 142 115 124 87 132 58 95Z"/><path d="M139 137L177 122 204 150 201 194 185 227 165 255 157 216 139 175Z"/><path d="M300 70L347 52 382 61 390 78 373 94 353 101 321 93Z"/><path d="M334 112L383 108 412 143 406 184 388 211 357 203 334 169 324 137Z"/><path d="M374 54L449 31 561 36 638 70 617 118 562 139 518 115 493 149 470 127 427 130 402 97Z"/><path d="M547 186L593 180 623 196 616 227 580 235 556 216Z"/><path d="M91 260L213 255 390 258 513 254 629 262 638 273 87 274Z"/></g><g fill="#e6eff2" font-size="12" font-weight="800" text-anchor="middle"><text x="123" y="68">Amérique</text><text x="358" y="77">Europe</text><text x="370" y="158">Afrique</text><text x="513" y="79">Asie</text><text x="585" y="209">Océanie</text><text x="364" y="269">Antarctique</text></g><path d="M398 155Q443 125 506 113" stroke="#ffd488" stroke-width="4" stroke-dasharray="9 9" fill="none" opacity=".75"/><text x="478" y="161" fill="#ffe3aa" font-size="11" font-weight="bold">migrations</text></svg><p class="map-note">Carte schématique pour apprendre à situer les continents. Ce n’est pas un tracé précis des routes anciennes.</p></div><div class="map-countries">${buttons.map(name=>`<button type="button" class="map-country ${session.done?(name===q.answer?'correct':session.chosen===name?'wrong':''):''}" data-continent="${h(name)}" ${session.done?'disabled':''}>${h(name)}</button>`).join('')}</div>`;}
const originNotes=[
 ['🌍 L’Afrique, berceau de l’humanité','Les plus anciens fossiles cités dans ton cours sont retrouvés en Afrique centrale et orientale. Toumaï est daté d’environ 7 MA et les australopithèques d’environ 3,2 MA.'],
 ['🧬 Une histoire en branches','Le document A montre plusieurs espèces : certaines ont vécu au même moment. Homo habilis fabrique des outils, Homo erectus est associé aux premières sorties d’Afrique, et nous sommes des Homo sapiens.'],
 ['🧭 Le lent peuplement du monde','Premières grandes sorties d’Afrique vers 2 MA. Homo sapiens quitte l’Afrique vers 70 000 ans selon le cours, puis atteint d’autres continents au fil du temps. Le climat influence les déplacements.'],
 ['🔥 La vie au Paléolithique','Petits groupes nomades, chasse, pêche et cueillette. Abris provisoires, pierre taillée, os et bois. Le feu sert à cuire, éclairer, se chauffer et protéger le groupe.'],
 ['🎨 L’art des premiers humains','Peintures pariétales sur les parois des grottes, gravures, statuettes. Le cours situe les débuts de l’art vers 35 000 av. J.-C.'],
 ['📄 Enquête sur les documents','Pour réussir : repérer le titre et la nature, lire la légende, relever les dates et répondre avec un indice exact du document.']
];
function notes(){parentUnlocked=false;session=null;setScreen('notes');const definitions=GLOSSARY.map(([key,text])=>`<li><b>${h(key)} :</b> ${h(text)}</li>`).join('');
 root.innerHTML=`<button class="back" id="backHome">← Retour aux missions</button><div class="eyebrow">Carnet de Diane · Histoire 6e</div><h1 class="page-title">Les grandes <em>découvertes</em></h1><p class="notes-intro">Voici l’essentiel de <strong>« La longue histoire de l’humanité et des migrations »</strong>, reformulé à partir de ton cahier et de ta fiche de compétences. Tu peux lire une rubrique puis tester tes connaissances.</p><div class="tabs"><button class="tab active" data-tab="basics">Leçon</button><button class="tab" data-tab="dates">Dates</button><button class="tab" data-tab="words">Définitions</button><button class="tab" data-tab="skills">Pour le contrôle</button></div><div id="tabContent"></div><div style="margin:23px 0"><button class="btn primary" id="practiceNotes">🎯 Je suis prête à m’entraîner</button></div>`;
 const content=$('#tabContent');const fill=(id)=>{root.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));if(id==='basics')content.innerHTML=`<div class="note-grid">${originNotes.map(([title,text])=>`<article class="note"><h3>${h(title)}</h3><p>${h(text)}</p></article>`).join('')}</div>`;
 if(id==='dates')content.innerHTML=`<section class="note"><h3>⏳ Mes repères à mémoriser</h3><div class="timeline-lessons">${KEY_DATES.map(([date,label])=>`<div class="date-chip"><strong>${h(date)}</strong><span>${h(label)}</span></div>`).join('')}</div><p class="tiny">MA = millions d’années. Les dates sont des repères approximatifs repris du cours, notamment du document A.</p></section>`;
 if(id==='words')content.innerHTML=`<div class="note-grid"><article class="note full"><h3>📚 Les mots-clés du chapitre</h3><ul>${definitions}</ul></article></div>`;
 if(id==='skills')content.innerHTML=`<div class="note-grid"><article class="note"><h3>⏳ Se repérer dans le temps</h3><ul><li>Ordonner les événements.</li><li>Associer chaque date à son événement.</li><li>Reconnaître les pré-humains et les humains.</li></ul></article><article class="note"><h3>🌍 Se repérer dans l’espace</h3><ul><li>Situer les continents sur une carte.</li><li>Expliquer que l’Afrique est le berceau de l’humanité.</li><li>Retracer les grandes migrations.</li></ul></article><article class="note"><h3>📄 Comprendre un document</h3><ul><li>Présenter la nature et le sujet du document.</li><li>Identifier une information utile et justifier sa réponse.</li><li>Lire la légende et les dates.</li></ul></article><article class="note"><h3>✍️ Pratiquer les langages de l’histoire</h3><ul><li>Définir les mots-clés.</li><li>Compléter une carte mentale des premiers humains.</li><li>Résumer la vie au Paléolithique.</li></ul></article></div>`;};
 fill('basics');root.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>fill(b.dataset.tab));$('#backHome').onclick=goHome;$('#practiceNotes').onclick=()=>start('controle');
}
function parentGate(){parentUnlocked=false;setScreen('lock');root.innerHTML=`<button class="back" id="backHome">← Retour aux missions</button><section class="panel parent-lock"><div class="lock-icon">🔒</div><h1 class="question-head" style="margin-top:15px">Espace Parents</h1><p class="notes-intro" style="font-size:14px">Le suivi des révisions est réservé aux parents.</p><form id="pinForm"><label for="parentPin" style="display:block;text-align:left;font-weight:800;margin:15px 0 9px">Code à 4 chiffres</label><input id="parentPin" class="lock-field" inputmode="numeric" type="password" pattern="[0-9]{4}" maxlength="4" autocomplete="off" required placeholder="••••"><p id="pinError" class="lock-message" role="status" aria-live="polite"></p><button class="btn primary wide" type="submit">Déverrouiller 🔓</button></form><p class="tiny" style="margin-top:17px">Contrôle parental léger : le code est vérifié sur cet appareil.</p></section>`;
 $('#backHome').onclick=goHome;$('#pinForm').onsubmit=e=>{e.preventDefault();if($('#parentPin').value==='2207'){parentUnlocked=true;parents();}else{$('#pinError').textContent='Code incorrect. Réessaie.';$('#parentPin').value='';$('#parentPin').focus();}};
}
function parents(){if(!parentUnlocked)return parentGate();setScreen('parents');const keys=Object.keys(TOPICS),topicStats={};keys.forEach(key=>topicStats[key]={n:0,good:0});const all=QUESTIONS.concat(TIMELINES,MAP_QUESTIONS);
 for(const q of all){const s=progress.questionStats[q.id]||{good:0,bad:0},v=topicStats[q.topic];v.n+=s.good+s.bad;v.good+=s.good;}
 const weakness=all.filter(q=>(progress.questionStats[q.id]?.bad||0)>0).sort((a,b)=>{const x=progress.questionStats[a.id],y=progress.questionStats[b.id];return (y.bad-y.good)-(x.bad-x.good)}).slice(0,6);
 const last=progress.history.slice(-6).reverse();
 root.innerHTML=`<button class="back" id="backHome">← Retour aux jeux</button><div class="eyebrow">Espace Parents · Bilan local</div><h1 class="page-title" style="font-size:clamp(32px,5vw,46px)">Comprendre ses <em>progrès.</em></h1><p class="notes-intro">Ce tableau de bord est enregistré <strong>uniquement dans le navigateur de cet appareil</strong>. Aucune donnée de Diane n’est envoyée à un serveur.</p>${statCards()}<div class="parent-columns"><section class="panel"><h2 style="margin:0">📊 Maîtrise par thème</h2><div class="bars">${keys.map(key=>{const v=topicStats[key],pct=v.n?Math.round(v.good/v.n*100):0;return `<div><div class="bar-label"><strong>${h(TOPICS[key])}</strong><span>${v.n?`${pct}% · ${v.n} essais`:'Non travaillé'}</span></div><div class="bar-bg"><div class="bar-fill" style="width:${pct}%"></div></div></div>`;}).join('')}</div><p class="tiny">Les pourcentages reflètent les réponses à cette application, pas une note scolaire.</p></section><section class="panel"><h2 style="margin:0">🎯 Priorités de révision</h2><div class="parent-note">${weakness.length?`<p>Quelques notions sur lesquelles Diane a hésité :</p><ul>${weakness.map(q=>`<li>${h(q.question)}</li>`).join('')}</ul>`:'<p>Aucune erreur enregistrée pour le moment. Commencez par la frise du temps et les définitions du chapitre.</p>'}<p>Privilégiez <strong>5 à 10 minutes</strong> sans chrono, puis demandez-lui d’expliquer à voix haute comment elle a trouvé sa réponse.</p></div><button class="btn alt" id="retryWeak">Faire une révision ciblée</button></section></div><div class="parent-columns"><section class="panel"><h2>🗓️ Dernières missions</h2>${last.length?last.map(x=>`<p class="parent-note"><strong>${h(formatDate(x.date))}</strong> · ${h(x.title)} : ${x.score}/${x.max} XP (${x.good}/${x.total} correctes)</p>`).join(''):'<p class="parent-note">Aucune mission terminée pour le moment.</p>'}</section><section class="panel"><h2>🧭 Conseils pour son contrôle</h2><p class="parent-note">Le cahier attend en priorité : <strong>les repères historiques</strong>, les noms et périodes des espèces, les <strong>continents</strong>, la lecture du document A, les définitions et une carte mentale sur le Paléolithique.</p><p class="parent-note">Les dates de l’application sont celles du cours photographié ; certaines datations évoluent avec les découvertes.</p><button class="danger" id="clearProgress">Effacer la progression de cet appareil</button></section></div>`;
 $('#backHome').onclick=goHome;$('#retryWeak').onclick=()=>start('revision');$('#clearProgress').onclick=()=>{if(confirm('Effacer définitivement les résultats, étoiles et missions enregistrés sur cet appareil ?')){progress=blank();save();parents();}};
}
async function installHelp(){const iOS=/iPhone|iPad|iPod/i.test(navigator.userAgent),isAndroid=/Android/i.test(navigator.userAgent);
 const info=document.querySelector('#installInfo');if(deferredInstall&&!iOS){deferredInstall.prompt();try{await deferredInstall.userChoice;}catch(_){ }deferredInstall=null;return;}
 info.innerHTML=iOS?'<p>Dans <strong>Safari</strong>, touche le bouton <strong>Partager</strong> (carré avec flèche), puis <strong>Sur l’écran d’accueil</strong> et <strong>Ajouter</strong>.</p>':isAndroid?'<p>Dans <strong>Chrome</strong>, ouvre le menu <strong>⋮</strong>, puis touche <strong>Installer l’application</strong> ou <strong>Ajouter à l’écran d’accueil</strong>.</p>':'<p>Ouvre ce site dans Safari sur iPhone ou Chrome sur Android, puis choisis l’ajout à l’écran d’accueil. Sur ordinateur, ton navigateur peut aussi proposer « Installer ».</p>';
 if(typeof dialogs.showModal==='function')dialogs.showModal();else alert(info.textContent);
}
function onGoHome(){goHome()}
document.querySelector('#logoBtn').onclick=onGoHome;homeBtn.onclick=onGoHome;
document.querySelector('#closeInstall').onclick=()=>dialogs.close();
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&activeScreen==='game'){onGoHome();}});
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))navigator.serviceWorker.register('./sw.js').catch(()=>{});
goHome();
})();
