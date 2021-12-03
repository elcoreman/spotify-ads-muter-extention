console.log(`"Spotify Ads Muter" activated on page`)

class Spotify {
	constructor(props) {
		this.props = props
	}
	isMuted() {
		const speakerSvgPath = document.querySelector(this.props.selectors.speaker + " > svg > path")
		return speakerSvgPath?.getAttribute("d")?.includes("L12")
	}
	mute() {
		const speaker = document.querySelector(this.props.selectors.speaker)
		return !this.isMuted() && speaker?.click()
	}
	unMute() {
		const speaker = document.querySelector(this.props.selectors.speaker)
		return this.isMuted() && speaker?.click()
	}
	musicLength() {
		let length = 0
		try {
			length = document
				.querySelector(this.props.selectors.musicLength)
				.innerText.split(":")
				.map(v => Number(v)) // convert each string value to numbers
				.map((v, i, arr) => {
					const mul = 60 ** (arr.length - i - 1)
					return v * mul
				}) // convert each value to seconds
				.reduce((a, c) => a + c) // Sum up seconds
		} catch (err) {
			return length
		}
		return length
	}
	isAdPlaying() {
		return this.musicLength() <= this.props.ads.maxLength && this.musicLength() !== 0
	}
	hideElements() {
		return document
			.querySelectorAll(this.props.selectors.shouldHide.join(","))
			.forEach(elem => (elem.style.display = "none"))
	}
}

const config = {
	ads: {
		maxLength: 60,
	},
	selectors: {
		speaker: "div[data-testid=volume-bar] > button",
		musicLength: "div[data-testid=playback-duration]",
		shouldHide: [
			"#main > div > div.Root__top-container > div.Root__main-view > div:nth-child(3) > div",
			"#main > div > div.Root__top-container > nav > div:first-of-type > div:last-of-type > div:first-of-type",
			"#main > div > div.Root__top-container > div.Root__top-bar > header > button",
		],
	},
}

const spotify = new Spotify(config)

const check = () => {
	// console.log({
	// 	musicLength: spotify.musicLength(),
	// 	isAdPlaying: spotify.isAdPlaying(),
	// 	isMuted: spotify.isMuted(),
	// })
	spotify.isAdPlaying() ? spotify.mute() : spotify.unMute()
	spotify.hideElements()
}

check()
setInterval(check, 3e3)
