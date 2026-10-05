(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const warning=$('#warning'), login=$('#login'), loading=$('#loading'), world=$('#world'), panel=$('#panel'), content=$('#panel-content');
  let idleTimer, warningTimer, finaleTimer, lastFocused;
  let vickyClicks=0, venom=false;
  const CONFIG=window.VENOM_CONFIG;

  function show(el){el.classList.remove('hidden');}
  function hide(el){el.classList.add('hidden');}
  function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove('show'),2200); }
  function openPanel(type){
    const panels={
      memory:`<span class="eyebrow">MEMORY ARCHIVE</span><h2>FRAGMENTS WORTH KEEPING</h2><p>Little moments can become the safest places to return to.</p><div class="memory-grid"><div><b>03 SEP</b><p>The first conversation — the first spark.</p></div><div><b>24 SEP</b><p>The connection became official.</p></div><div><b>NOW</b><p>The archive keeps growing, just like this feeling.</p></div></div>`,
      story:`<span class="eyebrow">TIMELINE // 001</span><h2>THE SIGNAL</h2><p>Every love story has a first hello. This one has a place to keep it safe.</p><div class="timeline"><div><b>03 SEPTEMBER</b><p>First conversation — the archive begins.</p></div><div><b>24 SEPTEMBER</b><p>The relationship becomes official.</p></div><div><b>∞</b><p>Everything after that belongs to us.</p></div></div><button id="dateSecret" class="primary-btn">VERIFY OUR DATE</button>`,
      her:`<span class="eyebrow">IDENTITY PROFILE</span><h2>VICKY</h2><p class="big-copy">Kindness. Care. Personality. Eyes. Presence. The kind of person who makes a whole room feel softer.</p><div class="qualities">${CONFIG.qualities.map((q,i)=>`<span style="--i:${i}">${q}</span>`).join('')}</div><div class="eye-visual"><div class="iris"><i></i></div><div class="iris"><i></i></div></div>`,
      music:`<span class="eyebrow">AUDIO ARCHIVE</span><h2>THE SOUND LAYER</h2><p>For the moments when words are not enough: <b>EYES OFF YOU</b> for softness, <b>COLD BLOODED — SPED UP</b> for a little fire.</p><button id="ambientBtn" class="primary-btn">PLAY THE SOFT VERSION</button><button id="coldBtn" class="ghost-btn">BRING BACK THE FIRE</button><div class="equalizer">${Array.from({length:28},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div>`,
      secret:`<span class="eyebrow">RESTRICTED AREA</span><h2>SECRET LAYER</h2><p>There are ten signals hidden across the archive. Take your time — this place is meant to be explored, not rushed.</p><button id="secretPulse" class="primary-btn">SEARCH FOR A SIGNAL</button>`
    };
    lastFocused=document.activeElement; content.innerHTML=panels[type] || panels.memory; show(panel); panel.setAttribute('aria-hidden','false'); $('.panel-close').focus();
    if(type==='story') $('#dateSecret').onclick=()=>window.VenomSecrets.dates();
    if(type==='music'){ $('#ambientBtn').onclick=()=>window.VenomAudio.setAmbient(); $('#coldBtn').onclick=()=>window.VenomAudio.setCold(); window.VenomSecrets.music(); }
    if(type==='secret') $('#secretPulse').onclick=()=>{window.VenomSecrets.portal(); toast('A deeper layer is listening.');};
  }
  function closePanel(){hide(panel);panel.setAttribute('aria-hidden','true');lastFocused?.focus();}
  function startWarning(){ warningTimer=setTimeout(()=>{hide(warning);show(login);$('#password').focus();},8000); $('#warningContinue').onclick=()=>{clearTimeout(warningTimer);hide(warning);show(login);$('#password').focus();}; }
  $('#showPassword').onclick=()=>{const input=$('#password');const visible=input.type==='text';input.type=visible?'password':'text';$('#showPassword').textContent=visible?'SHOW':'HIDE';$('#showPassword').setAttribute('aria-label',visible?'Show archive key':'Hide archive key');};
  $('#loginForm').addEventListener('submit',e=>{e.preventDefault(); if($('#password').value===CONFIG.password){hide(login);show(loading);let p=0;const bar=$('#loadingBar');const statuses=['Gathering every soft little memory...','Following the signal back to the first hello...','Making room for something beautiful...'];const iv=setInterval(()=>{p+=5;bar.style.width=p+'%';$('#loadingStatus').textContent=statuses[Math.min(statuses.length-1,Math.floor(p/35))];if(p>=100){clearInterval(iv);hide(loading);show(world);window.VenomAudio.setAmbient();setTimeout(()=>window.VenomAudio.setCold(),1800);}},70);}else{$('#loginError').textContent='That key missed the signal — try myvicky.';$('#password').focus();$('#password').select();}});
  $$('.portal,[data-panel]').forEach(el=>el.addEventListener('click',()=>openPanel(el.dataset.panel)));
  $('.panel-close').onclick=closePanel; $('.panel-backdrop').onclick=closePanel;
  $('#core').addEventListener('click',()=>{window.VenomSecrets.clickCore();toast('VENOM CORE // SIGNAL RESPONDED');});
  $('#pinkStar').addEventListener('click',()=>window.VenomSecrets.hiddenStar());
  $('#vickyTrigger').addEventListener('click',()=>{vickyClicks++;window.VenomSecrets.vicky();toast(`VICKY SIGNAL ${vickyClicks}`);if(vickyClicks>=3)openPanel('her');});
  $('#venomButton').onclick=()=>{venom=!venom;world.classList.toggle('venom-mode',venom);$('#statusText').textContent=venom?'VENOM OVERRIDE ACTIVE':'CONNECTION STABLE';window.VenomSecrets.venom();toast(venom?'VENOM MODE // ONLINE':'VENOM MODE // OFFLINE');};
  $('#soundToggle').onclick=()=>{document.getElementById('musicMute').click();const muted=document.getElementById('musicMute').textContent==='🔇';$('#soundToggle').textContent=muted?'SOUND OFF':'SOUND ON';$('#soundToggle').setAttribute('aria-pressed',String(muted));};
  $('#archiveLogo').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
  document.addEventListener('pointermove',()=>{clearTimeout(idleTimer);idleTimer=setTimeout(()=>window.VenomSecrets.stillness(),10000);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closePanel();});
  function finale(){ if($('#finale').classList.contains('hidden')){show($('#finale')); let phase=$('#finalePhase'), name=$('#finaleName'), nick=$('#finaleNickname'), msg=$('#finaleMessage'); phase.textContent='SIGNAL LOST…'; setTimeout(()=>phase.textContent='SIGNAL FOUND.',1400); setTimeout(()=>name.classList.add('visible'),2300);setTimeout(()=>nick.classList.add('visible'),3100);setTimeout(()=>{msg.textContent=CONFIG.finalMessage;msg.classList.add('visible');},3900);}}
  $('#replay').onclick=()=>location.reload();
  window.VenomMain={toast,finale}; startWarning();
})();
