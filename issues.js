const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");
function getIssuesPageHtml(url, topic, repoName) {
	request(url, cb);
	function cb(err, response, html) {
		if (err) console.log(err);
		else getIssues(html);
	}

	function getIssues(html) {
		let $ = cheerio.load(html);
		let anchorsArr = $('[data-hovercard-type="issue"]');
		let arr = [];
		for (let i = 0; i < anchorsArr.length; i++) {
			let link = $(anchorsArr[i]).attr("href");
			// console.log(link);
			arr.push(link);
		}
		let folderpath = path.join(__dirname, topic);
		dirCreator(folderpath);
		let filePath = path.join(folderpath, repoName + ".pdf");
		let text = JSON.stringify(arr);
		let pdfDoc = new pdfkit();
		pdfDoc.pipe(fs.createWriteStream(filePath));
		pdfDoc.text(text);
		pdfDoc.end();
	}
}
module.exports = getIssuesPageHtml;
function dirCreator(folderpath) {
	if (fs.existsSync(folderpath) == false) {
		fs.mkdirSync(folderpath);
	}
}
