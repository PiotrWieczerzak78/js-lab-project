const colors = ["lightblue", "red", "lightgreen", "pink", "grey", "green"];
var box = document.getElementById("game-field")
var startButton = document.getElementById("startButton")
var stopButton = document.getElementById("stopButton")
var asidePanel = document.getElementById("stats-panel")
var minTimeField = document.getElementById("minTime")
var maxTimeField = document.getElementById("maxTime")
var averageTimeField = document.getElementById("averageTime")
var input = document.getElementById("numberOfRound")
var now;
var startTimestampInMilliseconds, reactTimestampInMilliseconds;
var retryNumber;
var counter=0;
timeTable = [];
let colorChangeFlag=false;

function start(){
    box.innerText='Pole Gry';
    if(input.value===''){
        input.value=5;
        retryNumber=5;
        startButton.style.visibility = 'hidden';
        stopButton.style.display = 'block';
        setTimeout(() => changeColor(counter), getTimeOut());
        asidePanel.style.display ='none';
    }else if(!isNaN(input.value)){
        retryNumber=input.value;
        startButton.style.visibility = 'hidden';
        stopButton.style.display = 'block';
        setTimeout(() => changeColor(counter), getTimeOut());
        asidePanel.style.display ='none';
    }else{
        alert("Ilość rund powinna być liczbą - spróbuj jeszcze raz");
    }
}

function stop(){
    startButton.style.visibility = 'visible';
    stopButton.style.display = 'none';
    counter=0;
    startTimestampInMilliseconds='';
    reactTimestampInMilliseconds='';
    timeTable = [];
    box.style.backgroundColor = "blue";
    colorChangeFlag=false;
}

function beFaster(){
    now = new Date();
    reactTimestampInMilliseconds = now.getTime();
    let tableLength = timeTable.length;
    if(colorChangeFlag){
        colorChangeFlag=false;
        timeTable[tableLength]=(reactTimestampInMilliseconds - startTimestampInMilliseconds)/1000;
        maxMinAvgTable=maxMinAvg(timeTable);
        minTimeField.innerText = 'Najkrótszy czas: '+ maxMinAvgTable[1];
        maxTimeField.innerText = 'Najdłuższy czas: '+ maxMinAvgTable[0];
        averageTimeField.innerText = 'średni czas: '+ maxMinAvgTable[2];
        asidePanel.style.display ='block';
        counter++;
        startTimestampInMilliseconds='';
        if (counter<retryNumber){
            setTimeout(() => changeColor(counter), getTimeOut());
        }else{
            box.innerText='Koniec Gry';
        }
    }


}

function maxMinAvg(arr) {
    var max = arr[0];
    var min = arr[0];
    var sum = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
        sum = sum + arr[i];
    }
    var avg = sum / arr.length;
    return [max, min, avg];
}

function getTimeOut(){
    const randomNumberBetween0And1 = Math.random();
    return 10000*randomNumberBetween0And1;
}

function changeColor(number){
    let modulo = number%colors.length;
    box.style.backgroundColor = colors[modulo];
    let tempNumber= number+1;
    box.innerText='Pole Gry. Runda '+tempNumber;
    now = new Date();
    startTimestampInMilliseconds = now.getTime();
    colorChangeFlag=true;
}