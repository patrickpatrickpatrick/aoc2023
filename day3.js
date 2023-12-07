var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day3input.txt')
});

let answer1 = 0;

const regex = /^[^.|\d](\d+)|\.*(\d+)[^.|\d]|[^.|\d](\d+)\.|[^.|\d](\d+)/g
const relevantSymbols = [];
const rows = []

const allNumbers = [[], []];

lineReader.on('line', function (line) {
	if (!rows.length) {
		rows.push(Array(line.length + 2).fill(".").join(''));
		rows.push(Array(line.length + 2).fill(".").join(''));
	}

	line = "." + line + "."

	while (true) {
		const adjacentNumbers = [ ...line.matchAll(regex) ];
		adjacentNumbers.forEach((match) => {
			const number = match.slice(1, 5).filter(x => x != undefined)[0]
			const { index } = line.match(number);
			const split = line.split("");
			split.splice(index, number.length, ...Array(number.length).fill("."));
			line = split.join("");
			console.log(number)
			answer1 += parseInt(number)
		});

		if (!adjacentNumbers.length) {
			break;
		}
	}

	rows.splice(rows.length - 1, 0, line);

	let numbersInRow = [];
	[ ...line.matchAll(/(\d+)/g) ].forEach((number) => {
		numbersInRow.push({
			number: number[0],
			index: number.index,
			length: number[0].length,
		})
	});

	allNumbers.splice(allNumbers.length - 1, 0, numbersInRow);	
});

lineReader.on('close', function () {
	let currentX = 0;

	rows.forEach((line) => {
		const allSymbols = [ ...line.matchAll(/[^\.|\d]/g) ];
		allSymbols.forEach((symb) => {
			const symbol = symb[0];
			const column = symb.index;

			const matrix = [
				rows[currentX - 1].substring(column - 1, column + 2),
				rows[currentX].substring(column - 1, column + 2),
				rows[currentX + 1].substring(column - 1, column + 2),
			]

			const transformedMatrix = matrix.join("");
			const matches = [ ...transformedMatrix.matchAll(/(\d+)/g) ];

			console.log(matches)

			matches.forEach((match) => {
				const { index } = match;

				const row = [ currentX - 1, currentX, currentX + 1 ][Math.floor(index / 3)];

				console.log(allNumbers[row])

				const findNumber = allNumbers[row].findIndex((number) => {
					return (
						((number.index - column) == 1) ||
						((number.index + number.length - column == 1)) ||
						(number.index == column) ||
						((number.index < column && number.index + number.length >= column))
				  )
				})

				if (findNumber >= 0) {
					console.log(allNumbers[row][findNumber].number)
					answer1 += parseInt(allNumbers[row][findNumber].number)
					allNumbers[row].splice(findNumber, 1);
				}
			})
		})

		currentX += 1;
	});

	console.log(answer1)
});