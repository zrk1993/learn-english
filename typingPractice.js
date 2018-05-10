/**
 * 盲打练习脚本
 *
 * author kun
 * create at 2018-5-10
 * update at 2018-5-10
 */

const readline = require('readline');
const fs = require('fs');


class TypingPractice {

	constructor({ words, practiceType }) {
		this.words = words;
		this.practiceType = practiceType;

		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		this.currentIndex = 0;
		this.correctTimes = 0;
		this.errorTimes = 0;
	}

	_createTopic() {
		let topic = null;
		const word = this.words[this.currentIndex];

		/**
		 * c - 中文
		 * e - 英文
		 * 0 - 练习模式 1记忆模式
		 */
		if (this.practiceType === '0-c-e') {
			topic = {
				question: `${word.cn} ${word.en} -> `,
				correctAnswer: `${word.en}`,
			};
		}

		return topic;
	}

	async practice() {
		console.clear();
		const topic = this._createTopic();

		const answer = await new Promise((resolve, reject) => {
			const ask = `${this.correctTimes}:${this.errorTimes} ${topic.question}`;
			this.rl.question(ask, (answer) => {
				resolve(answer);
			});
		});

		const isCorrect = topic.correctAnswer === answer.trim();
		if (isCorrect) {
			this.correctTimes += 1;

			this.currentIndex += 1;
			this.currentIndex = this.currentIndex % this.words.length;
		} else {
			this.errorTimes += 1;
		}

		this.practice();
	}

	start() {
		this.practice();
	}
}

async function generateWords(path) {
	const data = await new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
		  if (err) {
		  	console.log(err);
		  	resolve('');
		  } else {
		  	resolve(data.toString());
		  }
		});
	});

	const words = [];

	const rawWords = data.match(/-\s[\s\S]*?(\r)?\n/g);
	rawWords.forEach((w) => {
		const str = w.substring(1).split(/\s{2,4}/);
		words.push({
			en: str[0].trim(),
			cn: str[1].trim(),
		});
	});

	return words;
}

generateWords('README.md').then((words) => {
	new TypingPractice({
		words,
		practiceType: '0-c-e',
	})
	.start();
});