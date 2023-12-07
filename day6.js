var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day7input.txt')
});

let race1 = {};
let race2 = {};

lineReader.on('line', function (line) {
	if (line.match("Time:")) {
		race1.times = [ ...line.matchAll(/(\d+)/g)].map((x) => parseInt(x[0]))
		race2.times = [ parseInt([...line.matchAll(/(\d+)/g)].map((x) => x[0]).join("")) ]
	}
	if (line.match("Distance:")) {
		race1.distances = [...line.matchAll(/(\d+)/g)].map((x) => parseInt(x[0]))
		race2.distances = [ parseInt([...line.matchAll(/(\d+)/g)].map((x) => x[0]).join("")) ]
	}
});

const productOfRaces = ({ distances, times }) => distances.reduce((acc, currentDistance, i) => {
		let x = 0;
		let counter = 0;

		while (!x) {
			let tempDistance = counter * (times[i] - counter)
			if (tempDistance > currentDistance) {

				console.log(counter, times[i] - counter, tempDistance, currentDistance)

				x =  (times[i] - 2 * counter) + 1
			}
			counter += 1;
		}

		return acc * x;		
	}, 1
)


lineReader.on('close', function (line) {
	console.log(productOfRaces(race1), productOfRaces(race2));
});