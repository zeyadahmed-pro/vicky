(() => {
  const ambient = document.getElementById('ambientAudio');
  const cold = document.getElementById('coldAudio');
  const toggle = document.getElementById('musicToggle');
  const mute = document.getElementById('musicMute');
  const volume = document.getElementById('musicVolume');
  const progress = document.getElementById('audioProgress');
  const name = document.getElementById('trackName');
  let active = cold;
  let muted = false;
  ambient.volume = .18; cold.volume = .45;

  function setActive(audio, label) {
    if (active !== audio) { active.pause(); active.currentTime = 0; active = audio; name.textContent = label; }
  }
  async function play() {
    try { await active.play(); toggle.textContent='❚❚'; } catch { toggle.textContent='▶'; }
  }
  function pause() { active.pause(); toggle.textContent='▶'; }
  toggle.addEventListener('click', () => active.paused ? play() : pause());
  mute.addEventListener('click', () => { muted=!muted; ambient.muted=muted; cold.muted=muted; mute.textContent=muted?'🔇':'🔊'; });
  volume.addEventListener('input', () => { cold.volume=Number(volume.value); ambient.volume=Math.min(.35,Number(volume.value)*.45); });
  active.addEventListener('timeupdate', () => { progress.style.width = active.duration ? `${active.currentTime/active.duration*100}%` : '0%'; });
  document.addEventListener('click', e => {
    const music = e.target.closest('[data-panel="music"]');
    if (!music) return;
    setActive(cold, 'COLD BLOODED — SPED UP');
  });
  window.VenomAudio = {
    play, pause,
    setAmbient() { setActive(ambient,'EYES OFF YOU — AMBIENT'); play(); },
    setCold() { setActive(cold,'COLD BLOODED — SPED UP'); play(); }
  };
})();
