const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Youtube",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Styling",
    "Working",
    "Task",
    "Roles",
    "Test",
    "Playing"
  ];

  const lvls = {
    "easy": 6,
    "normal": 4,
    "hard":3
  };

  let defaultLevel = "normal"
  let defaultLevelSeconds = lvls[defaultLevel]

  if(localStorage.defaultLevel) {
      defaultLevel = localStorage.defaultLevel
      defaultLevelSeconds = lvls[defaultLevel]
      document.getElementById(defaultLevel).checked = true;
    }else {
        localStorage.defaultLevel = defaultLevel
        document.getElementById(defaultLevel).checked = true;
  }
  let startButton = document.querySelector(".start")
  let lvlNameSpan = document.querySelector(".message .lvl")
  let secondsSpan = document.querySelector(".message .seconds")
  let theWord = document.querySelector(".the-word")
  let upcomingWords = document.querySelector(".upcoming-words")
  let input = document.querySelector(".input")
  let timeLeftSpan = document.querySelector(".time span")
  let scoreGot = document.querySelector(".score .got")
  let scoreTotal = document.querySelector(".score .total")
  let finishMessage = document.querySelector(".finish")
  let selection = document.querySelectorAll('input[type="radio"]')

  lvlNameSpan.innerHTML = defaultLevel
  secondsSpan.innerHTML = defaultLevelSeconds
  timeLeftSpan.innerHTML =defaultLevelSeconds;
  scoreTotal.innerHTML = words.length

  input.onpaste = () => false

  startButton.onclick = function() {
    this.remove();
    input.focus();
    genWords()
  }
 selection.forEach((select) => {
     select.onchange = function() {
        defaultLevel = select.value
        defaultLevelSeconds = lvls[select.value]
        lvlNameSpan.innerHTML = defaultLevel
  secondsSpan.innerHTML = defaultLevelSeconds
  timeLeftSpan.innerHTML =defaultLevelSeconds;
  localStorage.defaultLevel = defaultLevel
    }
 })

  function genWords() {
    let randomWord = words[Math.floor(Math.random()* words.length)]
    let wordIndex = words.indexOf(randomWord);
    words.splice(wordIndex,1);
    theWord.innerHTML = randomWord
    upcomingWords.innerHTML ="";
    for (let i=0;i<words.length;i++) {
        let div = document.createElement("div")
        let txt = document.createTextNode(words[i])
        div.appendChild(txt)
        upcomingWords.appendChild(div)
    }
    startPlay();
  }

  function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds
      let start = setInterval(()=>{
          timeLeftSpan.innerHTML = timeLeftSpan.innerHTML -1;
          if(timeLeftSpan.innerHTML === "0") {
            clearInterval(start)
            if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value="";
                scoreGot.innerHTML++
                if(words.length >0){
                    genWords()
                } else {
                    let span = document.createElement("span")
                span.className = "good";
                let txt = document.createTextNode("Congratulation");
                span.appendChild(txt)
                finishMessage.appendChild(span)
                upcomingWords.remove()
                }
            } else {
                let span = document.createElement("span")
                span.className = "bad";
                let txt = document.createTextNode("game Over");
                span.appendChild(txt)
                finishMessage.appendChild(span)
            }
          }
    },1000)
  }