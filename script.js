// https://es.lipsum.com/feed/html

var input = "";
var totalWords;
var paragraphs;

function getData() {
  input = document.getElementById("textInput").value;
  getTotalWords();
  getTotalChars();
  getCharsSpaces()
  getParagraphs();
  getReadingTime();
  getLongestWord();
  getcharsSymbolsDigits();
  getMostFrequentWord();
  getLines();
  getLongestParagraph();
}

function getTotalWords() {
  totalWords = input.replace(/  +/g," ").split(" ").filter(l => l !== "" && l !== ":" && l !== ";" && l !== "..." && l !== "." && l !== "\"" && l !== ",").length;
  document.getElementById("totalWords").innerHTML = totalWords;
}

function getTotalChars() { //without spaces
  var totalChars = input.replace(/ +/g,"").replace(/\s+/g,"").length; //.replace(/\H+/g,"")
  document.getElementById("totalChars").innerHTML = totalChars;
}

function getCharsSpaces() { //with spaces
  var charsSpaces = input.replace(/\n+/g,"").length;
  document.getElementById("charsSpaces").innerHTML = charsSpaces;
}

function getParagraphs() {
  paragraphs = "0";
  if (input.match(/\n.+$/gm) === null && input !== "") {paragraphs = "1"}
  else if (input.match(/\n.+$/gm) !== null) { paragraphs = input.match(/\n.+$/gm).length + 1 }
  if (paragraphs !== undefined) document.getElementById("paragraphs").innerHTML = paragraphs;
}
/*
function getReadingTime() {
  var readingTime = totalWords / 250;
  if (readingTime < 3) {
    document.getElementById("time").innerHTML = (readingTime * 60).toFixed(2);
    document.getElementById("timeUnits").innerHTML = "seconds";
  } else if (readingTime >= 3) {
    document.getElementById("time").innerHTML = readingTime.toFixed(2);
    document.getElementById("timeUnits").innerHTML = "minutes";
  }
}
*/
function getReadingTime() {
  var readingTimeMinutes = totalWords / 250;
  var readingTimeSeconds = (readingTimeMinutes * 60);
  var readingTimeHours = (readingTimeMinutes / 60);
  var readingTimeDays = (readingTimeMinutes / 1440);
  var readingTimeMin = Math.floor(readingTimeMinutes);
  var readingTimeSec = Math.floor((readingTimeMinutes % 1) * 60);

  var readingTimeHo = Math.floor(readingTimeHours);
  var readingTimeMi = Math.floor((readingTimeHours % 1) * 60);
  var readingTimeSe = Math.floor((readingTimeMinutes % 1) * 60);

  var readingTimeD = Math.floor(readingTimeDays);
  var readingTimeH = Math.floor((readingTimeDays % 1) * 24);
  var readingTimeM = Math.floor((readingTimeHours % 1) * 60);
  var readingTimeS = Math.floor((readingTimeMinutes % 1) * 60);
  if (readingTimeSeconds < 1) {
    document.getElementById("time").innerHTML = readingTimeSeconds.toFixed(2) + " seconds";
  } else if (readingTimeSeconds < 5) {
    (readingTimeSeconds.toFixed(1) === 1) ? document.getElementById("time").innerHTML = readingTimeSeconds.toFixed(1) + " second" : document.getElementById("time").innerHTML = readingTimeSeconds.toFixed(1) + " seconds";
  } else if (readingTimeMinutes < 1) {
    document.getElementById("time").innerHTML = Math.floor(readingTimeSeconds) + " seconds";
  } else if (readingTimeMinutes < 60) {
    document.getElementById("time").innerHTML = readingTimeMin + "min " + readingTimeSec + "sec";
  } else if (readingTimeMinutes < 1440) {
    (readingTimeHo === 1) ? document.getElementById("time").innerHTML = readingTimeHo + "hour " + readingTimeMi + "min " + readingTimeSe + "sec" : document.getElementById("time").innerHTML = readingTimeHo + "hours " + readingTimeMi + "min " + readingTimeSe + "sec";
  } else if (readingTimeMinutes >= 1440) {
    if (readingTimeD === 1 && readingTimeH === 1) {
      document.getElementById("time").innerHTML = readingTimeD + "day " + readingTimeH + "hour " + readingTimeM + "min " + readingTimeS + "sec";
    } else if (readingTimeD === 1 && readingTimeH !== 1) {
      document.getElementById("time").innerHTML = readingTimeD + "day " + readingTimeH + "hours " + readingTimeM + "min " + readingTimeS + "sec";
    } else if (readingTimeD !== 1 && readingTimeH === 1) {
      document.getElementById("time").innerHTML = readingTimeD + "days " + readingTimeH + "hour " + readingTimeM + "min " + readingTimeS + "sec";
    }
  }
}

function getLongestWord() {
  var longestWord = "";
  var longestWordLetters = 0;
  var longest = input.replace(/\n+/g, " ").replace(/\t+/gm, " ").replace(/\W+/g, " ").replace(/-/g, " - ").replace(/\//g, " / ").replace(/\H/g, " ").replace(/º/g, " ").replace(/\./g, " . ").replace(/\:/g, " : ").replace(/\.\.\./g, " ... ").replace(/"/g, " \" ").replace(/'/g, " ' ").replace(/,/g, " , ").replace(/ +/gm," ").split(" ").filter(l => l !== "" && l.includes(" ") === false).map(w => {
    if (w.length > longestWord.length) {
      longestWord = w;
      longestWordLetters = w.length;
    } 
  })
  if (longestWord !== "") {
    document.getElementById("longestWord").style.fontStyle = "normal";
    document.getElementById("longestWord").innerHTML = longestWord + " " + "(" + longestWordLetters + " " + "letters)";
  } else {
    document.getElementById("longestWord").style.fontStyle = "italic";
    document.getElementById("longestWord").innerHTML = "none";
  }
}

function getcharsSymbolsDigits() {
  var charsSymbolsDigits = input.split("").filter((l,i,arr) => l !== " " && arr.indexOf(l) === i && l !== "\n");
  if (charsSymbolsDigits.join("") !== "") {
    document.getElementById("charsSymbolsDigits").style.fontStyle = "normal";
    document.getElementById("charsSymbolsDigits").innerHTML = " ┋ " + charsSymbolsDigits.join(" ┋ ") + " ┋ " + " &nbsp (" + charsSymbolsDigits.length + " characters/symbols/digits)"; // https://coolsymbol.com/ -> ┋ ┇ ┃
  } else {
    document.getElementById("charsSymbolsDigits").style.fontStyle = "italic";
    document.getElementById("charsSymbolsDigits").innerHTML = "none";
  }
}

function getMostFrequentWord() {
  var mostFrequentWord = "";
  var wordObject = {}
  var words = input.replace(/  +/g," ").replace(/\./g, " . ").replace(/\:/g, " : ").replace(/\.\.\./g, " ... ").replace(/"/g, " \" ").replace(/'/g, " ' ").replace(/,/g, " , ").replace(/\n+/g, " ").split(" ").filter(l => l !== "" && l !== ":" && l !== ";" && l !== "..." && l !== "." && l !== "\"" && l !== ",");
  words.map((w,i,arr) => {
    if (arr.indexOf(w) === i) {
      wordObject[w] = 1;
    } else if (arr.indexOf(w) !== i && arr.indexOf(w) !== -1) {
      wordObject[w] += 1;
    }
  })
  if (input !== "") { mostFrequentWord = Object.keys(wordObject).reduce(function(a, b){ return wordObject[a] > wordObject[b] ? a : b }) }
  if (mostFrequentWord !== "") {
    document.getElementById("mostFrequentWord").style.fontStyle = "normal";
    document.getElementById("mostFrequentWord").innerHTML = mostFrequentWord + " (" + wordObject[mostFrequentWord] + " times)";
  }
  else {
    document.getElementById("mostFrequentWord").style.fontStyle = "italic";
    document.getElementById("mostFrequentWord").innerHTML = "none";
  }
}

/*
function getLines() {
  var chars = input.replace(/  +/g,"").replace(/\n+/g, "").split("").length;
  var pars = 0;
  for (i = 0; i <= paragraphs; i++) {pars += Math.random()}
  document.getElementById("lines").innerHTML = Math.floor(chars / 78.0239 + pars) + " lines";
}
*/

function getLines() {
  var pars = input.replace(/  +/g," ").split("\n");
  var lines = 0;
  var n1;
  (input !== "") ? n1 = 1 : n1 = 0;
  pars.map(p => { lines += Math.floor(n1 + p.length/94.22999785714285) })
  document.getElementById("lines").innerHTML = lines + " lines";
}

function getLongestParagraph() {
  var longestParagraph = "";
  var longestParagraphChars = 0;
  var longestParagraphIndex = 0;
  var theParagraphs = input.split("\n").filter(p => p !== "");
  var longest = theParagraphs.map((a,i) => {
    if (a.length > longestParagraph.length) {
      longestParagraph = a;
      longestParagraphChars = a.length;
      longestParagraphIndex = i + 1;
    }
  });
  if (input !== "") {
    document.getElementById("longestParagraph").style.fontStyle = "normal";
    document.getElementById("infoParagraph").style.fontSize = "10px";
    document.getElementById("longestParagraph").innerHTML = "Paragraph number " + longestParagraphIndex + " (" + longestParagraphChars + " characters)" + " :";
    document.getElementById("infoParagraph").innerHTML = longestParagraph;
  }
  else {
    document.getElementById("longestParagraph").style.fontStyle = "italic";
    document.getElementById("longestParagraph").innerHTML = "none";
    document.getElementById("infoParagraph").innerHTML = "";
  }
}