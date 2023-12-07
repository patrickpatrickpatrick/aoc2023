var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day2input.txt')
});

let answer1 = 0
let answer2 = 0;

const answer1Cubes = {
	"red": 12,
	"green": 13,
	"blue": 14,
}

lineReader.on('line', function (line) {
	let valid_game = true;

	// first part
	const { groups: { id } }  = [ ...line.matchAll(/Game (?<id>\d+)\:/g)][0]
	const answer1Capture = [...line.matchAll(
		/(?:(\d+) (blue|red|green), )?(?:(\d+) (blue|red|green), )?(?:(\d+) (blue|red|green)(?:;|$))/g
	)];
	for (let i = 0; i < answer1Capture.length; i++) {
		const [
			input,
			firstNumber,
			firstColour,
			secondNumber,
			secondColour,
			thirdNumber,
			thirdColour,
			...dontneedthis
		] = answer1Capture[i];

		if (
			(firstColour ? +firstNumber > +answer1Cubes[firstColour] : false) ||
			(secondColour ? +secondNumber > +answer1Cubes[secondColour] : false) ||
			(thirdColour ? +thirdNumber > +answer1Cubes[thirdColour] : false)
		) {
			valid_game = false;
			break;
		}
	}

	//second part
	const regexForColours = (colour) => new RegExp(`(?:(\\d+) ${colour})`, 'g')
	const result = Object.keys(answer1Cubes).map(colour =>
		Math.max(
			...[
				...line.matchAll(regexForColours(colour)), [ undefined, 1 ]
			].map(x => parseInt(x[1]))
		)
	);

	answer1 += valid_game ? parseInt(id) : 0;
	answer2 += result.reduce((x, y) => x * y, 1);
});

lineReader.on('close', function (line) {
	console.log(answer1, answer2)
});