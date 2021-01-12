(function () {
  if (window.hasRun) return;
  window.hasRun = true;
  console.log(`"Spotify Ads Muter" succussfully injected to Spotify`);

  class Site {
    constructor(props) {
      this.speakerSelector = props.speakerSelector;
      this.musicLengthSelector = props.musicLengthSelector;
    }
    get speaker() {
      return document.querySelector(this.speakerSelector);
    }
    get isMuted() {
      return this.speaker.getAttribute("aria-label") != "Mute";
    }
    mute() {
      if (!this.isMuted) this.speaker.click();
    }
    unMute() {
      if (this.isMuted) this.speaker.click();
    }
    get musicLength() {
      let length = 0;
      try {
        length = document
          .querySelector(this.musicLengthSelector)
          .innerText.split(":")
          .map((n) => Number(n))
          .reduce((a, v, i, arr) => {
            const acc = i == 1 ? a * 60 ** (arr.length - i) : a;
            return acc + v * 60 ** (arr.length - i - 1);
          });
      } catch (err) {
        return length;
      }
      return length;
    }
    adIsPlaying() {
      return this.musicLength <= 62;
    }
  }
  var site = new Site({
    speakerSelector:
      "#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__right > div > div.volume-bar > button",
    musicLengthSelector:
      "#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__center > div > div.playback-bar > div:nth-child(3)",
  });
  setInterval(() => (site.adIsPlaying() ? site.mute() : site.unMute()), 3e3);
})();
