var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day5input.txt')
});

let seeds;
let maps = [];

const workOutRange = () => {
	for (let i = 0; i < ranges.length; i++) {
		// const range = ranges[i];

		maps.forEach((map) => {
			const { start, range } = ranges[i];
			const [ dest, source, rangeMap ] = map;

			let rangeBefore = {};
			let rangeAfter = {};

			if (
				(start >= source) && 
				((start + range) =< (source + rangeMap))
			) {
				
			}

			// if ((start >= source && seed <= (start + range - 1))) {


				// if (source - start > 0) {
				// 	rangeBefore = {
				// 		start:
				// 	}
				// }

				if (source == start) {

				}
			}

			//

			// if start is larger
			// if end is smaller or less than

			// if ((start >= source)) {
			// 	if ((source + rangeMap) <= (start + range)) {
			// 		const offset = dest - source;

			// 		ranges[i].start += offset;
			// 	}
			// }

			// if in between
			// if ((start >= source && (start + range) <= (source + range - 1))) {

			// if start larger than
			// if (start)

			// if the start is greater than the start of the dest
			// if (source >= source) && () {
				// where does it start


				// do they all fit?
				// const remaining = (start + range) - (source + rangeMap)

				// work out offset (hope this works lmao)
				// const offset = dest - source;

				// if (remaining > 0) {
				// 	range[i].start = start + offset;
				// } else {
				// 	range[i].offset = range[i].offset - remaining;
				// 	rangeAfter = {
				// 		start: range[i].start + (range[i].offset - remaining) + 1;
				// 		offset: remaining,
				// 	}
				// }

				// // work out where start is in source
				// const newStart = source - start;
				// // work out how many fit into the source
				// const newEnd = (start + range) - (source + range)


	// 		}
		})
	}
}

const workOutMap = () => {
	for (let i = 0; i < seeds.length; i++) {
		const seed = seeds[i];
		let location = seed;

		maps.forEach((map) => {
			const [ dest, source, range ] = map;
			if ((seed >= source && seed <= (source + range - 1))) {
				location = (dest + (seed - source))
			}
		})

		seeds[i] = location
	}
	maps = [];
}

lineReader.on('line', function (line) {
	// actual working out bit
	if (!line.length && maps.length) {
		workOutMap();
	}
	// parsing zzzz...
	if (line.match("seeds")) {
		seeds = [
			...line.matchAll(/(\d+)/g)
		].map(seed => parseInt(seed[0]));
		ranges = [
			...line.matchAll(/((\d+) (\d+))/g)
		].map(seed => ({
			start: parseInt(seed[2]),
			range: parseInt(seed[3])
		}));
	} else {
		if ([...line.matchAll(/(\d+)/g)].length) {
			maps.push([
				...line.matchAll(/(\d+)/g)
			].map(number => parseInt(number[0])))
		}
	}
});

lineReader.on('close', function (line) {
	workOutMap();
	console.log(Math.min( ...seeds ))
});