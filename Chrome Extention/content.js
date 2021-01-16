(function () {
  console.log(`"Spotify Ads Muter" succussfully injected to Spotify`);

  class Site {
    constructor(props) {
      this.speakerSelector = props.speakerSelector;
      this.musicLengthSelector = props.musicLengthSelector;
      this.maxAdsLength = props.maxAdsLength;
      this.shouldHideSelectors = props.shouldHideSelectors;
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
    hideElements() {
      document
        .querySelectorAll(this.shouldHideSelectors.join(","))
        .forEach((elem) => (elem.style.display = "none"));
    }
  }

  const init = {
    maxAdsLength: 62,
    speakerSelector:
      "#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__right > div > div.volume-bar > button",
    musicLengthSelector:
      "#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__center > div > div.playback-bar > div:nth-child(3)",
    shouldHideSelectors: [
      "#main > div > div.Root__top-container > div.Root__main-view > div:nth-child(3) > div",
      "#main > div > div.Root__top-container > nav > div:first-of-type > div:nth-child(4)",
      "#main > div > div.Root__top-container > div.Root__top-bar > header > button",
    ],
  };

  const site = new Site(init);

  const check = () => {
    site.adIsPlaying() ? site.mute() : site.unMute();
    site.hideElements();
  };

  setInterval(check, 3e3);
  check();
})();
