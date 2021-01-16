(function () {
  console.log(`"Spotify Ads Muter" succussfully injected to Spotify`);

  class Site {
    constructor(props) {
      this.speakerSelector = props.speakerSelector;
      this.musicLengthSelector = props.musicLengthSelector;
      this.maxAdsLength = props.maxAdsLength;
    }
    get isMuted() {
      const speaker = document.querySelector(this.speakerSelector);
      return (
        speaker?.getAttribute("aria-label") &&
        speaker.getAttribute("aria-label") != "Mute"
      );
    }
    mute() {
      const speaker = document.querySelector(this.speakerSelector);
      if (!this.isMuted) return speaker?.click();
      return false;
    }
    unMute() {
      const speaker = document.querySelector(this.speakerSelector);
      if (this.isMuted) return speaker?.click();
      return false;
    }
    get musicLength() {
      let length = 0;
      try {
        length = document
          .querySelector(this.musicLengthSelector)
          .innerText.split(":")
          .map((v) => Number(v)) // convert each string value to numbers
          .map((v, i, arr) => {
            const mul = 60 ** (arr.length - i - 1);
            return v * mul;
          }) // convert each value to seconds
          .reduce((a, c) => a + c); // Sum up seconds
      } catch (err) {
        return length;
      }
      return length;
    }
    adIsPlaying() {
      return this.musicLength <= this.maxAdsLength;
    }
  }

  const site = new Site({
    speakerSelector:
      "#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__right > div > div.volume-bar > button",
    musicLengthSelector:
      "#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__center > div > div.playback-bar > div:nth-child(3)",
    maxAdsLength: 62,
  });

  setInterval(() => (site.adIsPlaying() ? site.mute() : site.unMute()), 3e3);
})();
