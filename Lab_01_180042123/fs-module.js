//Synchronous and Asynchronous Function

//readFile
//writeFile
//AppendFile
//Delete
//Rename

const fs = require('fs');

fs.writeFileSync('./contents/demoFile.txt', 'Mohammad Ratul Mahjabin'); //had to add an extra folder
fs.appendFileSync('./contents/demoFile.txt', ' 180042123');
console.log('done');
fs.rename('./contents/demoFile.txt', './contents/renamedDemoFile.txt', (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Rename Successfull');
	}
});

fs.readFile('./contents/renamedDemoFile.txt', 'utf-8', (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
});

console.log('before');

// fs.readFile('./contents/renamedDemoFile.txt', 'utf-8', (err, data) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		fs.appendFile('./contents/renamedDemoFile.txt', ' This is a test', (err) => {
// 			if (err) {
// 				console.log(err);
// 			}
// 		});

// 		fs.readFile('./contents/renamedDemoFile.txt', 'utf-8', (err, data) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				console.log(data);
// 			}
// 		});
// 	}
// });

console.log('after');
fs.unlink('./contents/renamedDemoFile.txt', (err) => {
	if (!err) {
		console.log('Successfully deleted');
	}
});
