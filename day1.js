var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day1input.txt')
});

const input = []
let answer1 = 0
let answer2 = 0

const lookUp = {
	"one": 1,
	"two": 2,
	"three": 3,
	"four": 4,
	"five": 5,
	"six": 6,
	"seven": 7,
	"eight": 8,
	"nine": 9
}

const lookUpNumber = number => lookUp[number] ? lookUp[number] : number;

const regexGen = (chars) => {
	const individual = char => `\\w*${char}\\w*`;
	const group = chars.join("|")
	const lookahead = chars.map(char => individual(char)).join("|");

	return `((?<!${lookahead})(?<first>${group})\\w*(?<last>${group})(?!${lookahead}))|((?<!${lookahead})(?<only>${group})(?!${lookahead}))`
}

const sumCapture = (sum, capture) => {
	const { first, last, only } = capture;

	return sum + parseInt(only ? `${lookUpNumber(only)}${lookUpNumber(only)}` : ((first && last) && `${lookUpNumber(first)}${lookUpNumber(last)}`) || "0")
}

lineReader.on('line', function (line) {
	const re = new RegExp(regexGen(["\\d"]))
	answer1 = sumCapture(answer1, line.match(re)?.groups || {})

	const re2 = new RegExp(regexGen(["\\d", ...Object.keys(lookUp)]));
	answer2 = sumCapture(answer2, line.match(re2)?.groups || {})
});

lineReader.on('close', function (line) {
	console.log(answer1);
	console.log(answer2);
});