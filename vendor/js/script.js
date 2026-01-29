/*Global variables*/
let words = "random skid hello test leet lol hello what are you saying gg wp gl hf".split(' '),
    limit = 15,
    timeLimit = 30,
    list = [],
    pos = 0,
    hits = 0,
    total = 0,
    clock,
    start;

/*UI elements*/
const gameui = document.getElementById('word-field'),
      box = document.getElementById('typingArea'),
      speed = document.getElementById('speedVal'),
      accDisp = document.getElementById('acc-display'),
      time = document.getElementById('time-display');

function startGame() /*Reset and start*/
{
    clearInterval(clock);
    box.value = ""; 
    box.disabled = false; 
    pos = hits = total = 0; 
    start = null; 
    list = [];
    
    for (let i = 0; i < limit; i++) 
    {
        list.push(words[Math.floor(Math.random() * words.length)]);
    }
    
    accDisp.innerText = "100%";
    render();
}

function render() /*Render words to UI*/
{
    gameui.innerHTML = list.map((w, i) => 
        `<div class="word-box" id="w-${i}" 
            style="display:inline-block; margin:10px; position:relative; opacity:${i === 0 ? 1 : 0.4}; font-weight:bold; font-size:1.4rem">
            <span style="color:#666">${w}</span>
            <span id="p-${i}" style="position:absolute; left:0; top:0; color:#22d3ee; text-shadow:0 0 5px #22d3ee"></span>
        </div>`
    ).join('');
}

box.oninput = function() /*Handle typing*/
{
    if (!start) 
    { 
        start = Date.now(); 
        tick(); 
    }
    
    let val = box.value;
    let ov = document.getElementById(`p-${pos}`);
    
    if (ov) 
    { 
        ov.innerText = val.trim(); 
    }
    
    if (val.endsWith(' ')) 
    { 
        submit(val.trim()); 
    }
};

function submit(typed) /*Validate current word*/
{
    let el = document.getElementById(`w-${pos}`);
    total++;
    
    if (typed === list[pos]) 
    { 
        el.style.color = "#22d3ee"; 
        hits++; 
    } 
    else 
    { 
        el.style.color = "red"; 
    }
    
    /*Update Accuracy Display*/
    let currentAcc = Math.round((hits / total) * 100);
    accDisp.innerText = currentAcc + "%";
    
    pos++; 
    box.value = "";
    
    if (pos >= list.length) 
    {
        return end();
    }
    
    /*Update opacitiy for focus*/
    let children = [...gameui.children];
    for (let i = 0; i < children.length; i++) 
    {
        children[i].style.opacity = (i === pos) ? 1 : 0.4;
    }
}

function tick() /*Timer logic*/
{
    clock = setInterval(function() 
    {
        let passed = (Date.now() - start) / 1000;
        let left = Math.max(0, timeLimit - passed);
        
        time.innerText = left.toFixed(1);
        speed.innerText = Math.round(hits / (passed / 60)) || 0;
        
        if (left <= 0) 
        {
            end();
        }
    }, 100);
}

function end() /*Game over screen*/
{
    clearInterval(clock); 
    box.disabled = true;
    gameui.innerHTML = `<h1 style="font-size:3rem; color:#22d3ee">SCORE: ${speed.innerText} WPM</h1>`;
}

function restart()
{
    startGame();
}

window.onclick = function() {
    box.focus();
};
startGame();