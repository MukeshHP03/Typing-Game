let typingText = document.querySelector(".typing-text p");
let input = document.querySelector(".input-field");
let time = document.querySelector(".time span b");
let mistake = document.querySelector(".mistake span");
let wpm = document.querySelector(".wpm span");
let cpm = document.querySelector(".cpm span");
let btn = document.querySelector(".content button");

//set Timer
let timer;//for setInterval
let maxTime = 60;
let remainingTime = maxTime;
let charIndex = 0;//current typing index
let mistakes = 0;//number of Mistakes
let isTyping = false;
const paragraph= ["Avoid daydreaming about the years to come.","You are the most important person in your whole life.","Always be true to who you are, and ignore what other people have to say about you.","Always be true to who you are, and ignore what other people have to say about you.","Only demonstrate your strength when it is really required.","Subscribe to My Channel","Hare Krishna, Hare Krishna Krishna Krishna, Hare Hare Hare Rama, Hare Rama,Rama Rama, Hare Hare"];


function loadParagraph(){
    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML = "";
    for(const char of paragraph[randomIndex]){
        // console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',() => input.focus());
    typingText.addEventListener('click', () => input.focus());
}
function initializeTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && remainingTime > 0){
        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(char[charIndex].innerHTML == typedChar){
            char[charIndex].classList.add('correct');
            // console.log('correct');
        }
        else{
            mistakes++;
            char[charIndex].classList.add('incorrect');
            // console.log('Wrong');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        cpm.innerHTML = charIndex - mistakes
        mistake.innerHTML = mistakes;
    }
    else{
        clearInterval(timer);
        isTyping = false;
        input.value = '';
        
    }
    
}

function initTimer(){
    if(remainingTime > 0) {
        remainingTime--;
        time.innerHTML = remainingTime;
        let wpmVal = Math.round(((charIndex - mistakes) * 60 / 5) / ((maxTime - remainingTime)));
        // console.log(wpmVal)
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}
function reset (){
    loadParagraph();
    clearInterval(timer);
    input.value = '';
    remainingTime = maxTime;
    charIndex = 0;//current typing index
    mistakes = 0;//number of Mistakes
    isTyping = false; 
    time.innerHTML = remainingTime;
    mistake.innerHTML = '0';
    wpm.innerHTML = '0';
    cpm.innerHTML = '0';
}
input.addEventListener('input', initializeTyping)
loadParagraph();
btn.addEventListener('click', reset)
