(function() {
var timeStamp = new Date();
var pauseLengde = 10; //minimum pauselengde, i minutter
var teller=0;
var frekvens = 100;
var teller2 = 2;
startDampveivals();
var time = setInterval(tid,1000);
var interval = setInterval(bevegelseTrym,frekvens);

function bevegelseTrym() {
    var trym = document.querySelector('.animasjon #arm1');
    var trym2 = document.querySelector('.animasjon #arm2');
    var vridning=35;
    var hoyde=20;
    if ((teller % 2)===1) {
        trym.style.top = (parseInt(trym.style.top) - hoyde) + 'px';
        trym.style.transform = 'rotate(-'+vridning+'deg)';
        trym2.style.transform = 'rotate('+vridning+'deg)';
        trym2.style.top = (parseInt(trym2.style.top) + hoyde) + 'px';

    } else {
        trym.style.top = (parseInt(trym.style.top) + hoyde) + 'px';
        trym.style.transform = 'rotate('+vridning+'deg)'; 
        trym2.style.transform = 'rotate(-'+vridning+'deg)';
        trym2.style.top = (parseInt(trym2.style.top) - hoyde) + 'px';

    }
    teller++;
    if(teller===200){
        frekvens = Math.floor(frekvens * 1.5);
        clearInterval(interval);
        interval = setInterval(bevegelseTrym,frekvens)
        teller = 0;
    }
}

function taPause(e) {
    e.preventDefault();
    clearInterval(interval);
    clearInterval(time);
    timeStamp = new Date();
    var pauseTekst = document.createElement('H3');
    pauseTekst.append('PAUSE!!!');
    document.body.appendChild(pauseTekst);
    var koala = document.querySelector('#koala');
    if (koala) {
        koala.parentNode.removeChild(koala);
    }
    var dampveivals = document.querySelector('#dampveivals');
    if (dampveivals) {
        dampveivals.parentNode.removeChild(dampveivals);
    }
    interval = setInterval(function () {
        document.querySelector('h3').style.transform = 'rotate('+(Math.floor(Math.random()*360))+'deg)';
    },1000);
    teller2 = 1;
    time = setInterval(tid,1000);
    document.querySelector('.animasjon').style.left = '-307px';
    e.target.style.display='none';
    document.querySelector('#sluttAaMase').style.display='none';
    document.querySelector('#ferdigPause').style.display='inline';    
}

function sluttMase(e) {
    e.preventDefault();
    var nyTekst = document.createElement('H2');
    nyTekst.append('Nei, jeg slutter ikke å mase!');
    document.querySelector('.midlAnimasjon').appendChild(nyTekst);
    var midlTimeout = setTimeout(function() {
        var overskrifter = document.querySelectorAll('h2');
        for (var i = 0; i <= (overskrifter.length - 1); i++) {
            overskrifter[i].parentNode.removeChild(overskrifter[i]);
        }
        clearTimeout(midlTimeout);
    },4000);
}

function ferdigPause(e) {
    e.preventDefault();
    var naa = new Date();
    var tidIgjen = pauseLengde-((naa-timeStamp) / 60000);
    if(tidIgjen <= 0) {
        clearInterval(interval);
        clearInterval(time);
        var slett = document.querySelector('h3');
        slett.parentNode.removeChild(slett);
        timeStamp = new Date();
        e.target.style.display = 'none';
        document.querySelector('.animasjon').style.left = '';
        document.querySelector('#sluttAaMase').style.display='inline';
        document.querySelector('#pause').style.display='inline';
        teller = 0;
        frekvens = 100;
        teller2 = 2;
        startDampveivals();
        time = setInterval(tid,1000);
        interval = setInterval(bevegelseTrym,frekvens);
    } else {
        strengPekefinger('Nope! ' + convertToMin(tidIgjen) + 'min igjen av pausen');
        setTimeout(slettStrengPekefinger,4000);
    }
}

function slettStrengPekefinger() {
    var alleTags = document.querySelectorAll('.midl');
    for(var i = 0; i < alleTags.length; i++){
        alleTags[i].parentNode.removeChild(alleTags[i]);
    }
}

function strengPekefinger(advarsel) {
    var midlAnimasjon = document.querySelector('.midlAnimasjon');
    var bilde = document.createElement('img');
    bilde.src = 'Images/ikke_ferdig.png';
    bilde.className = 'midl';
    var nyTekst = document.createElement('p');
    nyTekst.append(advarsel);
    nyTekst.className = 'midl';
    bilde.addEventListener('load',function() {
        midlAnimasjon.appendChild(bilde);
        midlAnimasjon.appendChild(nyTekst);
    }, false);
}

function tid() {
    var midlSelection = document.querySelector('.tid p');
    var naa = new Date();
    if(teller2 === 1) {
        var tidIgjen = pauseLengde-((naa-timeStamp) / 60000);
        if (tidIgjen <= 0) {
            midlSelection.textContent = '-';
        } else {
            midlSelection.textContent = 'Tid til du får jobbe igjen: '+ convertToMin(tidIgjen);
        }
    } else {
        var tidIgjen = ((naa-timeStamp) / 60000);
        midlSelection.textContent = 'Tid foran skjermen: '+ convertToMin(tidIgjen);
    }
}

function convertToMin (input) {
    var min = Math.floor(Math.abs(input));
    min = min < 10 ? '0' + min : min;
    var sec = Math.floor(Math.abs(input)*60) % 60;
    sec = sec < 10 ? '0' + sec : sec;
    var hr = '';
    if (min > 60) {
        hr = Math.floor(min/60) + ':';
        min = min % 60;
    }
    return hr + min + ':' + sec;
}

function startDampveivals() {
    var placement = document.querySelector('.koalaTrap');
    var dampveivals = document.createElement('img');
    dampveivals.src='Images/dampveivals.png';
    dampveivals.style.left='-250px';
    dampveivals.id = 'dampveivals';
    var koala = document.createElement('img');
    koala.src = 'Images/coala.png';
    koala.height = '54';
    koala.width = '54';
    koala.style.left = "200px";
    koala.style.position = "relative";
    koala.id = 'koala';
    koala.style.zIndex = '3';
    dampveivals.addEventListener('load',function() {
        placement.appendChild(dampveivals);
        placement.appendChild(koala);
        setTimeout(function() {
            dampveivals.style.left = '290px';
        },500);

    },false);   
}

document.querySelector('#pause').addEventListener('click', taPause, false);
document.querySelector('#sluttAaMase').addEventListener('click', sluttMase, false);
document.querySelector('#ferdigPause').addEventListener('click', ferdigPause, false);
})();