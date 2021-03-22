let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
let data = [];

function datagenrated(url) {
  request(url, cb);

  function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let tables = chSelector(".table.batsman");

    for (let i = 0; i < tables.length; i++) {
      let teamBowlers = chSelector(tables[i]).find("tr");

      for (let j = 0; j < teamBowlers.length; j++) {
        // let bolHtml = chSelector(teamBowlers[j]).text();
        let eachbowlcol = chSelector(teamBowlers[j]).find("td");

        if (eachbowlcol.length == 8) {
          let playerobject = {
            playerName: chSelector(eachbowlcol[0]).text(),
            runs: chSelector(eachbowlcol[2]).text(),
            balles: chSelector(eachbowlcol[3]).text(),
            run4: chSelector(eachbowlcol[4]).text(),
            run6: chSelector(eachbowlcol[5]).text(),
          };

          let playerName = chSelector(eachbowlcol[0]).text();
          let filename = "./Ipl2020/" + playerName + ".json";
          console.log(playerName);
          if (fs.existsSync(filename)) {
            let content = fs.readFileSync(filename);
            let arr = JSON.parse(content);
            arr.push(playerobject);

            let contentdata = JSON.stringify(arr);
            fs.writeFileSync(filename, contentdata);
          } else {
            let arr = [];
            arr.push(playerobject);

            let contentdata = JSON.stringify(arr);

            fs.writeFileSync(filename, contentdata);
          }
        }
      }
    }
  }
}

module.exports = {
  datagenrated,
};
