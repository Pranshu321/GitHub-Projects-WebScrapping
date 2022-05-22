const url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const pdfDoc = require("pdfkit");
const getrepoPageHtml = require("./repospagehtml");
const getIssuesPageHtml = require("./issues");
// const getReposPage = require("./getReposPage");
request(url, cb);

function cb(err, response, html) {
	if (err) console.log(err);
	else extractHtml(html);
}

function extractHtml(html) {
	let $ = cheerio.load(html);

	let linksArr = $(
		".topic-box.position-relative.hover-grow.height-full.text-center.border.color-border-muted.rounded.color-bg-default.p-5 a"
	);
	for (let i = 0; i < linksArr.length; i++) {
		let href = $(linksArr[i]).attr("href");
		let topic = href.split("/").pop();
		let FullLinkPath = "https://github.com" + href;
		getrepoPageHtml(FullLinkPath, topic);
	}
}
