(function () {
	console.log(`"Spotify ads muter" succussfully injected to Page`)

	class Site {
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
			return this.musicLength() <= this.props.ads.maxLength
		}
		hideElements() {
			return document
				.querySelectorAll(this.props.selectors.shouldHide.join(","))
				.forEach(elem => (elem.style.display = "none"))
		}
	}

	const config = {
		ads: {
			maxLength: 1.1 * 60,
		},
		selectors: {
			speaker:
				"#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__right > div > div.volume-bar > button",
			musicLength:
				"#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__center > div > div.playback-bar > div:nth-child(3)",
			shouldHide: [
				"#main > div > div.Root__top-container > div.Root__main-view > div:nth-child(3) > div",
				"#main > div > div.Root__top-container > nav > div:first-of-type > div:last-of-type > div:first-of-type",
				"#main > div > div.Root__top-container > div.Root__top-bar > header > button",
			],
		},
	}

	const site = new Site(config)

	const check = () => {
		site.isAdPlaying() ? site.mute() : site.unMute()
		site.hideElements()
	}

	setInterval(check, 3e3)
	check()
})()
