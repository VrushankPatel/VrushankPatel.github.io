var portfolio = [
    "https://vapsquare.000webhostapp.com/Portfolio-1/index.html",    
    "https://vapsquare.000webhostapp.com/Portfolio-2/index.html",
    "https://vapsquare.000webhostapp.com/Portfolio-3/profile.html"
]
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
document.getElementById("mainframe").src = portfolio[getRandomInt(3)];