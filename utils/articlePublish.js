const { send, getTransactionHistory } = require("./safePublish");
var lzstring = require("lz-string");
const articleAddress = "0xB69d024d1DCc50d3019Fd939746b565873009AEC";
var data;
function parseArticle(article) {
  var output = [];
  for (var x = 0; x < article.length; x++) {
    output.push(article[x].split("^"));
  }
  return output;
}

function pushArticle(topic, header, author, bio, body) {
  var articleNumber = 1;
  let transactionHistory = getTransactionHistory(articleAddress);
  transactionHistory.then(function (result) {
    data = parseArticle(result);
    for (var x = 0; x < data.length; x++) {
      if (data[x][0] == topic) {
        articleNumber = parseInt(data[x][1]) + 1;
        break;
      }
    }
    send(
      topic +
        "^" +
        articleNumber +
        "^" +
        header +
        "^" +
        author +
        "^" +
        bio +
        "^" +
        body,
      articleAddress
    );
  });
  return;
}

//pushArticle("Psychiatry","Anxiety Disorders","Dr. Park Jun Seo","Bachelor of Medicine, Bachelor of Surgery, Master of Medicine, Fellow of the Royal Australasian College of Physicians, Fellow of the Royal College of Physicians,  Fellow of the Academy of Medicine","Anxiety disorders, such as general anxiety disorder, panic disorder, obsessive compulsive disorder, and social anxiety, are characterised by instrusive thoughts that cause sustained and inprompted distress, and can be accompanied by a host of psychosomatic and physiological symptoms.\n\nIn general, anxiety disorder differ from normal, neutrotypical bouts of anxiety when it is persistant, uncontrollable, severe. and incessant to an abnormal degree, such that it is unmanageable and overwhelming, which can hamper one's daily function and day-to-day activities. While normal anxiety can sometimes be a good thing, anxiety disorders are oftentimes detrimental to one's mental and physical health.\n\nIf you find yourself in a constant and prolonged state of anxiety, unable to sleep or rest at night, exceptionally irritable, or having periods of panic, it is recommended that you pay your doctor or a psychiatrist a visit to consider your options.");

str = getTransactionHistory(articleAddress);

str.then(function (result) {
  console.log(result);
});
