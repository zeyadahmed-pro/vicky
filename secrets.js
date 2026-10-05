(() => {
  const found = new Set();
  let clicks = 0;
  function discover(id, message) {
    if (found.has(id)) return false;
    found.add(id);
    document.getElementById('discoveryCount').textContent = `${found.size} / 10`;
    window.VenomMain?.toast(message || `SECRET ${id} DISCOVERED`);
    if (found.size >= 10) window.VenomMain?.finale();
    return true;
  }
  window.VenomSecrets = {
    discover,
    clickCore() { clicks++; if (clicks >= 5) discover('03','CORE RESPONSE DETECTED'); },
    hiddenStar() { discover('02','HIDDEN STAR FOUND'); },
    stillness() { discover('04','STILLNESS SIGNAL FOUND'); },
    music() { discover('05','AUDIO FREQUENCY MATCHED'); },
    sequence() { discover('06','CLICK SEQUENCE ACCEPTED'); },
    vicky() { discover('07','VICKY SIGNAL FOUND'); },
    dates() { discover('08','DATE SIGNAL VERIFIED'); },
    venom() { discover('09','VENOM OVERRIDE ACCEPTED'); },
    portal() { discover('10','HIDDEN PORTAL UNLOCKED'); }
  };
})();
