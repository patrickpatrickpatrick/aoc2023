var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day7input.txt')
});

let five = []
let four = []
let three = []
let house = []
let two = []
let one = []
let high = []

let cards = Array(7).fill([]);

let two_five = []
let two_four = []
let two_three = []
let two_house = []
let two_two = []
let two_one = []
let two_high = []

lineReader.on('line', function (line) {
	const { cards, bet } = [...line.matchAll(/(?<cards>\S+) (?<bet>\d+)/g)][0].groups;

	const uniqueCards = [ ...new Set(cards) ];
	const numberOfUniqueCards = uniqueCards.length;

	let cardThatAppearsMost = uniqueCards.filter(x => x != 'J')[0];
	let timesCardAppearsMost = 1;

	uniqueCards.filter(x => x != 'J').forEach((card) => {
		if ([...cards.matchAll(card)].length > timesCardAppearsMost) {
			cardThatAppearsMost = card;
			timesCardAppearsMost = [...card.matchAll(card)].length;
		}
	})

	let cards2 = cards.replaceAll('J', cardThatAppearsMost);
	const uniqueCards2 = [ ...new Set(cards2) ];
	const numberOfUniqueCards2 = uniqueCards2.length;

	switch (numberOfUniqueCards2) {
		case 1:
			two_five.push({
				cards,
				bet
			})
			break;
		case 2:
			let checkLength = [...cards2.matchAll(uniqueCards2[0])].length;
			if (checkLength == 2 || checkLength == 3) {
				two_house.push({
					cards,
					bet
				})
			} else {
				two_four.push({
					cards,
					bet
				})
			}
			break;
		case 3:
			for (let i = 0; i < cards.length; i++) {
				let checkLength = [...cards2.matchAll(uniqueCards2[i])].length;
				if (checkLength == 3) {
					two_three.push({
						cards,
						bet
					})

					break;
				}

				if (checkLength == 2) {
					two_two.push({
						cards,
						bet
					})

					break;
				}
			}
			break;
		case 4:
			two_one.push({
				cards,
				bet
			})
			break;
		case 5:
			two_high.push({
				cards,
				bet
			})
			break;

		default:
			two_five.push({
				cards,
				bet
			})
			break;
		}

	switch (numberOfUniqueCards) {
		case 1:
			five.push({
				cards,
				bet
			})
			break;
		case 2:
			let checkLength = [...cards.matchAll(uniqueCards[0])].length;
			if (checkLength == 2 || checkLength == 3) {
				house.push({
					cards,
					bet
				})
			} else {
				four.push({
					cards,
					bet
				})
			}
			break;
		case 3:
			for (let i = 0; i < cards.length; i++) {
				let checkLength = [...cards.matchAll(uniqueCards[i])].length;
				if (checkLength == 3) {
					three.push({
						cards,
						bet
					})

					break;
				}

				if (checkLength == 2) {
					two.push({
						cards,
						bet
					})

					break;
				}
			}
			break;
		case 4:
			one.push({
				cards,
				bet
			})
			break;
		case 5:
			high.push({
				cards,
				bet
			})
			break;
		}
});


lineReader.on('close', function (line) {
	const map = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse().reduce((acc, curr, index) => {
		acc[curr] = index;
		return acc;
	}, {});
	const map2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reverse().reduce((acc, curr, index) => {
		acc[curr] = index;
		return acc;
	}, {});	

	let x = [
		high,
		one,
		two,
		three,
		house,
		four,
		five,
	].map(x => x.sort((a, b) => {
		let x = 0;

		while (a.cards[x] == b.cards[x]) {
			x +=1;
		}

	  if (map[a.cards[x]] < map[b.cards[x]]){
	    return -1;
	  }
	  if (map[a.cards[x]] > map[b.cards[x]]){
	    return 1;
	  }

	  return 0;		
	})).reduce((acc, x) => {
		return [
			...acc,
			...x,
		]
	}, []).reduce((acc, curr, index) => {
		return acc += (index + 1)*parseInt(curr.bet)
	}, 0)

	let y = [
		two_high,
		two_one,
		two_two,
		two_three,
		two_house,
		two_four,
		two_five,
	].map(x => x.sort((a, b) => {
		let x = 0;

		while (a.cards[x] == b.cards[x]) {
			x +=1;
		}

	  if (map2[a.cards[x]] < map2[b.cards[x]]){
	    return -1;
	  }
	  if (map2[a.cards[x]] > map2[b.cards[x]]){
	    return 1;
	  }

	  return 0;		
	})).reduce((acc, x) => {
		return [
			...acc,
			...x,
		]
	}, []).reduce((acc, curr, index) => {
		return acc += (index + 1)*parseInt(curr.bet)
	}, 0)	

	console.log(x, y)
});