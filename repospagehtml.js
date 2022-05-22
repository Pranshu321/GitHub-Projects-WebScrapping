const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtml = require("./issues");
function getReposPageHtml(link, topic) {
	request(link, cb);
	function cb(err, response, html) {
		if (err) {
			console.log(err);
		} else {
			getReposLink(html);
		}
	}

	function getReposLink(html) {
		//cheerio
		let $ = cheerio.load(html);
		let headingsArr = $(".text-bold.wb-break-word");
		console.log(topic);
		for (let i = 0; i < 8; i++) {
			let bothanchors = $(headingsArr[i]).attr("href");
			let fullLink = `https://github.com${bothanchors}/issues`;
			let repoName = fullLink.split("/").pop();
			getIssuesPageHtml(fullLink, topic, repoName);
		}

		console.log("``````````````````````````````````````````");
	}
}

module.exports = getReposPageHtml;
