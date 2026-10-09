// Custom video player: butterfly play button, butterfly loading screen, simple controls
(() => {
  const vp = document.querySelector(".vp");
  if (!vp) return;
  const v = vp.querySelector("video");
  const playBtn = vp.querySelector(".vp-play");
  const toggle = vp.querySelector(".vp-toggle");
  const seek = vp.querySelector(".vp-seek");
  const mute = vp.querySelector(".vp-mute");
  const fs = vp.querySelector(".vp-fs");
  const msg = vp.querySelector(".vp-msg");
  let hideTimer;

  // Switch off the browser's own controls and turn on ours
  v.controls = false;
  vp.classList.add("js");

  const setState = (s) => {
    vp.dataset.state = s;
  };
  const wake = () => {
    vp.classList.remove("idle");
    clearTimeout(hideTimer);
    if (vp.dataset.state === "playing") {
      hideTimer = setTimeout(() => vp.classList.add("idle"), 2500);
    }
  };

  const play = () => {
    if (v.ended) v.currentTime = 0;
    if (v.readyState < 3) setState("loading");
    const p = v.play();
    if (p && p.catch) {
      p.catch(() => setState(v.paused ? "paused" : "playing"));
    }
  };
  const pause = () => v.pause();

  playBtn.addEventListener("click", play);
  toggle.addEventListener("click", () => (v.paused ? play() : pause()));
  v.addEventListener("click", () => {
    wake();
    if (vp.dataset.state === "idle" || vp.dataset.state === "ended") return;
    v.paused ? play() : pause();
  });

  v.addEventListener("waiting", () => {
    if (!v.paused) setState("loading");
  });
  v.addEventListener("playing", () => {
    setState("playing");
    wake();
  });
  v.addEventListener("pause", () => {
    if (!v.ended && vp.dataset.state !== "idle") setState("paused");
    wake();
  });
  v.addEventListener("ended", () => {
    setState("ended");
    wake();
  });
  v.addEventListener("error", () => {
    msg.textContent = "Sorry, the video couldn't load.";
    setState("error");
  });

  v.addEventListener("timeupdate", () => {
    if (!v.duration) return;
    const p = (v.currentTime / v.duration) * 1000;
    seek.value = p;
    seek.style.setProperty("--p", p / 10 + "%");
  });
  seek.addEventListener("input", () => {
    if (!v.duration) return;
    v.currentTime = (seek.value / 1000) * v.duration;
    seek.style.setProperty("--p", seek.value / 10 + "%");
  });

  const syncMute = () => (vp.dataset.muted = v.muted || v.volume === 0);
  mute.addEventListener("click", () => {
    v.muted = !v.muted;
  });
  v.addEventListener("volumechange", syncMute);
  syncMute();

  fs.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (vp.requestFullscreen) {
      vp.requestFullscreen();
    } else if (v.webkitEnterFullscreen) {
      v.webkitEnterFullscreen();
    }
  });

  ["pointermove", "touchstart", "focusin"].forEach((e) =>
    vp.addEventListener(e, wake, { passive: true }),
  );

  setState("idle");
})();
