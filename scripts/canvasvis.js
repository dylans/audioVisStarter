console.clear();
// import framework
import Vis from '/modules/Vis.js';

// setup
const visEl = document.querySelector('#visual');
const rate = document.querySelector('#rate');
// setup 2D canvas plus resize
// set up dpr for  vis
const dpr = window.devicePixelRatio;
// get window dimensions & set canvas to fill window
function Dimensions() {
	this.width = (window.innerWidth)*dpr;
	this.height = (window.innerHeight)*dpr;
	this.centerX = this.width/2;
	this.centerY = this.height/2;

	this.setFullscreen = function(el) {
		el.width = this.width;
		el.height = this.height;
	}

	this.update = function() {
		this.width = (window.innerWidth)*dpr;
		this.height = (window.innerHeight)*dpr;
	}
}

let screenDim = new Dimensions();
screenDim.setFullscreen(visEl);
window.addEventListener("resize", function(e) {
	screenDim.update();
	screenDim.setFullscreen(visEl);
	//init();
}, false);
const ctx = visEl.getContext('2d');
// set up canvas defaults
ctx.lineWidth = 0.0;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

const binSize = 128;
const elAmount = Math.floor(binSize/3); // Returned frequncies is a third
let colorOverride = 0;
let songOverride = 0;
let colorLookup = {
	53: 'red',
	54: 'green',
	55: 'blue',
	56: 'white'
}

// create a new vis
//const vis = new Vis(binSize, '/beast.mp3');
const vis = new Vis(binSize, '397798341'); // funny light saber
const vis2 = new Vis(binSize, '56005581'); // star trek TNG
const vis3 = new Vis(binSize, '40347410'); // emperial march
const vis4 = new Vis(binSize, '91346944'); // into darkness

//const vis4 = new Vis(binSize, '237022458');

let btnOn = false;

navigator.requestMIDIAccess({ sysex: false })
	.then(function(access) {
		// Get lists of available MIDI controllers
		const inputs = Array.from(access.inputs.values());
		//const outputs = Array.from(access.outputs.values());

		if(inputs.length) {
			inputs[0].onmidimessage = function (message) {
				const data = message.data; // this gives us our [command/channel, note, velocity] data.
				console.log('MIDI data in', data); // MIDI data [144, 63, 73]

				if(data[0] === 144) {
					btnOn = true;
					switch (data[1]) {
						case 57:
							vis.start();
							break;
						case 58:
							vis2.start();
							break;
						case 59:
							vis3.start();
							break;
						case 60:
							vis4.start();
							break;
						default:
							colorOverride = data[1];
					}
				} else if (data[0] === 128) {
					btnOn = false;
					colorOverride = 0;
				} else if (data[0] === 176) {
					let playbackRate = (0.00101413)*(data[2]^2) + (0.0508419)*(data[2]) + (0.1);
					rate.innerHTML = playbackRate;
					vis.track.playbackRate = playbackRate;
					vis2.track.playbackRate = playbackRate;
					vis3.track.playbackRate = playbackRate;
					vis4.track.playbackRate = playbackRate;
				}
			}
	 	}
	})
	.catch((err) =>{
		console.log('error connecting to midi', err);
	});

// setup our draw loop: THIS IS WHERE THE MAGIC HAPPENS!!
vis.draw( () => {

	ctx.clearRect(0, 0, screenDim.width, screenDim.height);
	// loop over our frequencies and draw a shape for each one
	vis.frequencies.forEach((f, i) => {
		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.fillStyle = 'blue';
		switch (i % 5) {
			case 0:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'blue';
					}
					ctx.arc(i*80, (i*40)*(10-i/3), f*2, 0, 2*Math.PI);
				break;
			case 1:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'red';
					}
					ctx.arc(i*80, (i*40)*(8-i/4), f*2, 0, 2*Math.PI);
				break;
			case 2:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'yellow';
					}
					ctx.arc(i*80, (i*40)*(6-i/5), f, 0, 2*Math.PI);
				break;
			case 3:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'green';
					}
					ctx.arc(i*80, (i*40)*(4-i/8), f, 0, 2*Math.PI);
				break;
			case 4:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'white';
					}
					ctx.arc(i*80, (i*40)*(2-i/10), f, 0, 2*Math.PI);
				break;
		}
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	})

} )

vis2.draw( () => {

	// loop over our frequencies and draw a shape for each one
	vis2.frequencies.forEach((f, i) => {
		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.fillStyle = 'blue';
		switch (i % 5) {
			case 0:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'blue';
					}
					ctx.arc(i*80, (i*40)*(10-i/3), f*2, 0, 2*Math.PI);
				break;
			case 1:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'red';
					}
					ctx.arc(i*80, (i*40)*(8-i/4), f*2, 0, 2*Math.PI);
				break;
			case 2:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'yellow';
					}
					ctx.arc(i*80, (i*40)*(6-i/5), f, 0, 2*Math.PI);
				break;
			case 3:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'green';
					}
					ctx.arc(i*80, (i*40)*(4-i/8), f, 0, 2*Math.PI);
				break;
			case 4:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'white';
					}
					ctx.arc(i*80, (i*40)*(2-i/10), f, 0, 2*Math.PI);
				break;
		}
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	})

} )


vis3.draw( () => {

	// loop over our frequencies and draw a shape for each one
	vis3.frequencies.forEach((f, i) => {
		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.fillStyle = 'blue';
		switch (i % 5) {
			case 0:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'blue';
					}
					ctx.arc(i*80, (i*40)*(10-i/3), f*2, 0, 2*Math.PI);
				break;
			case 1:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'red';
					}
					ctx.arc(i*80, (i*40)*(8-i/4), f*2, 0, 2*Math.PI);
				break;
			case 2:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'yellow';
					}
					ctx.arc(i*80, (i*40)*(6-i/5), f, 0, 2*Math.PI);
				break;
			case 3:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'green';
					}
					ctx.arc(i*80, (i*40)*(4-i/8), f, 0, 2*Math.PI);
				break;
			case 4:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'white';
					}
					ctx.arc(i*80, (i*40)*(2-i/10), f, 0, 2*Math.PI);
				break;
		}
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	})

} )

vis4.draw( () => {

	// loop over our frequencies and draw a shape for each one
	vis4.frequencies.forEach((f, i) => {
		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.fillStyle = 'blue';
		switch (i % 5) {
			case 0:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'blue';
					}
					ctx.arc(i*80, (i*40)*(10-i/3), f*2, 0, 2*Math.PI);
				break;
			case 1:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'red';
					}
					ctx.arc(i*80, (i*40)*(8-i/4), f*2, 0, 2*Math.PI);
				break;
			case 2:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'yellow';
					}
					ctx.arc(i*80, (i*40)*(6-i/5), f, 0, 2*Math.PI);
				break;
			case 3:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'green';
					}
					ctx.arc(i*80, (i*40)*(4-i/8), f, 0, 2*Math.PI);
				break;
			case 4:
					if (colorOverride) {
						ctx.fillStyle = colorLookup[colorOverride];
					} else {
						ctx.fillStyle = 'white';
					}
					ctx.arc(i*80, (i*40)*(2-i/10), f, 0, 2*Math.PI);
				break;
		}
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	})

} )

// ===================== CONTROLS edit here if you want to start/stop multiple vis
const controls = document.querySelector('#controls');

controls.querySelector('[data-control="play"]').addEventListener('click', function(e) {

	if (this.dataset.on === 'false') {
		this.dataset.on = "true";
    vis.start();
    vis2.start();
    vis3.start();
    vis4.start();
	} else {
    this.dataset.on = "false";
    vis.stop();
    vis2.stop();
    vis3.stop();
    vis4.stop();
	}

})
