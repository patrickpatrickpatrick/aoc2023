var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day4input.txt')
});

let answer1 = 0;
let wins = [];

lineReader.on('line', function (line) {
	const winningNumbers = line.match(/(?<=\:\s+)(\d+.*)(?= \|)/g)[0];
	const yourNumbers = line.match(/(?<=\|\s+)(\d+.*)/g)[0];

	const winningRegex = new RegExp(
		`(${winningNumbers.replace(/(?<=\d)(\s+)/g, "|").replace(/\d+/g, "(?<!\\d+)$&(?!\\d+)") })`, 'g'
	)
	const howManyWins = [...yourNumbers.matchAll(winningRegex)].length;

	wins.push(howManyWins);

  answer1 += howManyWins > 0 ? Math.pow(2, howManyWins - 1) : 0;
});

lineReader.on('close', function (line) {
	let cards = Array(wins.length).fill(1);
	let total = cards.length;

	for (let i = 0; i < cards.length; i++) {
		cards.splice(
			i + 1,
			wins[i],
			...cards.slice(i + 1, i + wins[i] + 1).map(x => x + 1*cards[i])
		);

		total += cardsWon*cards[i]
	}	

	console.log(total)
});