var portfolio = [
    "https://vrushankpatel.000webhostapp.com/"
]
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
document.getElementById("mainframe").src = portfolio[getRandomInt(3)];
