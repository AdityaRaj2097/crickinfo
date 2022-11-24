// npm -> play store
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let datagenrated = require("./print_wepage_data");

request(
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results",
  cb
);
//  donme my wokr
let webaiteurl = "https://www.espncricinfo.com";
// response is superset -> body
function cb(error, response, html) {
  // console.log(response);
  // console.log("error",error);
  //  i hajhajhdahdakh
  let cheerioSelector = cheerio.load(html);
  // element select
  let element = cheerioSelector(".match-info-link-FIXTURES");

  if (!fs.existsSync("./Ipl2020")) {
    // fs.mkdirSync(dir, 0744);
    //  I have done my wokr
    fs.mkdir("./Ipl2020", function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("New directory successfully created.");
      }
    });
  }

  //   console.log(element.length);
  for (i = 0; i < element.length; i++) {
    // let data = element[i].attr("href");
    let isLossing = cheerioSelector(element[i]).attr("href");
    isLossing = webaiteurl + isLossing;
    // console.log(i + "   " + isLossing);
    datagenrated.datagenrated(isLossing);
  }
}
// match-info-link-FIXTURES
