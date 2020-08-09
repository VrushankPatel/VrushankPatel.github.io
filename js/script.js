var portfolio = [
    "vrushank.ml"
]
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
document.getElementById("mainframe").src = portfolio[getRandomInt(3)];
