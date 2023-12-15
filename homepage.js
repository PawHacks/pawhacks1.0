/*             sliding countdown timer            */

const eventTime = new Date('2024-03-16T18:00:00') // march 16 2024 6 pm
const countdownTimerList =  document.querySelectorAll('.countdown-timer .countdown');

function updateCountdown(){
    const currTime = new Date();
    const timeDifference = eventTime.getTime() - currTime.getTime() // in millis
    const prevMillis = timeDifference + 1000;

    const days = Math.floor(timeDifference / 86400000);
    const hours = Math.floor((timeDifference % 86400000) / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor(((timeDifference % 3600000) % 60000) / 1000);

    const prevDays = Math.floor(prevMillis / 86400000);
    const prevHours = Math.floor((prevMillis % 86400000) / 3600000);
    const prevMinutes = Math.floor((prevMillis % 3600000) / 60000);
    const prevSeconds = Math.floor(((prevMillis % 3600000) % 60000) / 1000);

    const newTimeList = [days, hours, minutes, seconds];
    const prevTimeList = [prevDays, prevHours, prevMinutes, prevSeconds];

    for (let i = 0; i < 4; i++) {
        if (newTimeList[i] !== prevTimeList[i]) {
            const prevElement = countdownTimerList[i].querySelector('.previous-digit');
            const newElement = countdownTimerList[i].querySelector('.current-digit');
            prevElement.textContent = prevTimeList[i].toString();
            newElement.textContent = newTimeList[i].toString();

            prevElement.style.transitionDuration = '0s'
            newElement.style.transitionDuration = '0s'
            prevElement.style.transform = 'translateY(calc(var(--countdownHeight) * -1))';
            newElement.style.transform = 'translateY(calc(var(--countdownHeight) * -1))';
            prevElement.style.opacity = '1';

            setTimeout(() => {
                prevElement.style.transition = 'transform 0.6s, opacity 0.25s'
                newElement.style.transition = 'transform 0.6s'
                prevElement.style.transform = 'translateY(0)';
                newElement.style.transform = 'translateY(0)';
                prevElement.style.opacity = '0';
            }, 100)
        }
        else{
            countdownTimerList[i].querySelector('.previous-digit').textContent = prevTimeList[i].toString();
        }
    }
}


// Updates countdown timer every second
setInterval(updateCountdown, 1000)



/*                      Title Name and Year                    */

const titleCharacters = document.querySelectorAll('.title-character');
const titleContainer = document.querySelector('.title-name')
let titleIsRotated = false;

const yearCharacters = document.querySelectorAll('.year-character');
const yearContainer = document.querySelector('.title-year')
let yearIsRotated = false;

const nameTranslateXValues = [0, 0, -20, -10, 0, 0, 0, 10];
const nameTranslateYValues = [-50, 20, -50, 30, -10, -70, 30, -20];
const nameRotateValues = [-10, 35, 15, -5, 10, 10, 20, -5];

const yearTranslateXValues = [-50, -15, 15, 50];
const yearTranslateYValues = [0,10,15,0];
const yearRotateValues = [-10, 35, 15, -5];

const titleObjectsList = Array()
const yearObjectsList = Array()


// for some reason this stuff will run before arrays are initialized, so need to delay it a bit to give time for arrays to initialize first
setTimeout(() => {
    for (let i = 0; i < titleCharacters.length; i++) {
        titleObjectsList.push(new rotatingObject(titleCharacters[i], (2 * Math.PI) / (i + 1), 5, 0, 1, 1, (2.0 + (i * 0.5)) * ( (i % 2 === 0) ? -1 : 1) )); // randomizes the rotation direction and speed

        // rotatingObject class sets width and height so we gotta change it back :(
        titleCharacters[i].style.width = 'fit-content'
        titleCharacters[i].style.height = 'fit-content'
    }

    for (let i = 0; i < yearCharacters.length; i++) {
        yearObjectsList.push(new rotatingObject(yearCharacters[i], (2 * Math.PI) / (i + 1), 5, 0, 1, 1, (2.0 + (i * 0.5)) * ( (i % 2 === 0) ? -1 : 1) ));

        yearCharacters[i].style.width = 'fit-content'
        yearCharacters[i].style.height = 'fit-content'
    }
}, 100)

titleContainer.addEventListener('click', ()=>{
    for (let i = 0; i < titleCharacters.length; i++) {
        titleCharacters[i].style.transition = `transform ${titleIsRotated ? 0.4 : 0.4}s, color 0.8s`;

        titleCharacters[i].style.color = 'var(--blue)'
        setTimeout(()=>{
            titleCharacters[i].style.color = 'var(--green)'
        }, 600)
    }
    titleIsRotated = !titleIsRotated;
})

yearContainer.addEventListener('click', ()=>{
    for (let i = 0; i < yearCharacters.length; i++) {
        yearCharacters[i].style.transition = `transform ${yearIsRotated ? 0.4 : 0.4}s, color 0.8s`;

        yearCharacters[i].style.color = 'var(--blue)'
        setTimeout(()=>{
            yearCharacters[i].style.color = 'var(--green)'
        }, 600)
    }
    yearIsRotated = !yearIsRotated;
})

setInterval( ()=> {
    // rotates characters in a circle
    for (let i = 0; i < titleObjectsList.length; i++) {
        titleObjectsList[i].angle += (-titleObjectsList[i].omega * Math.PI / 180);
        titleObjectsList[i].targx = titleObjectsList[i].magnitude * Math.cos(titleObjectsList[i].angle);
        titleObjectsList[i].targy = titleObjectsList[i].magnitude * Math.sin(titleObjectsList[i].angle);
        if (titleIsRotated){
            titleObjectsList[i].domElement.style.transform = `translate(${titleObjectsList[i].targx + nameTranslateXValues[i]}px, ${titleObjectsList[i].targy + nameTranslateYValues[i]}px) rotate(${nameRotateValues[i]}deg)`;
        }
        else {
            titleObjectsList[i].domElement.style.transform = `translate(${titleObjectsList[i].targx}px, ${titleObjectsList[i].targy}px) rotate(0)`;
        }
    }

    for (let i = 0; i < yearObjectsList.length; i++) {
        yearObjectsList[i].angle += (-yearObjectsList[i].omega * Math.PI / 180);
        yearObjectsList[i].targx = yearObjectsList[i].magnitude * Math.cos(yearObjectsList[i].angle);
        yearObjectsList[i].targy = yearObjectsList[i].magnitude * Math.sin(yearObjectsList[i].angle);
        if (yearIsRotated){
            yearObjectsList[i].domElement.style.transform = `translate(${yearObjectsList[i].targx + yearTranslateXValues[i]}px, ${yearObjectsList[i].targy + yearTranslateYValues[i]}px) rotate(${yearRotateValues[i]}deg)`;
        }
        else {
            yearObjectsList[i].domElement.style.transform = `translate(${yearObjectsList[i].targx}px, ${yearObjectsList[i].targy}px) rotate(0)`;
        }
    }
}, 50)



/*                            FAQ                            */

const faqList = Array()

document.querySelectorAll('.faq-list li').forEach((it) => {
    faqList.push({item: it, isExpanded: false, div: it.querySelector('div')})
})


faqList.forEach((faqElement) => {
    faqElement.item.addEventListener('click', () => {
        if (faqElement.isExpanded){
            faqElement.div.style.maxHeight = '0px';
            faqElement.item.style.setProperty('--list-content', '"▸"') //▸ ▾
        }
        else {
            faqElement.div.style.maxHeight = '250px';
            faqElement.item.style.setProperty('--list-content', '"▾"')
        }
        faqElement.isExpanded = !faqElement.isExpanded;
    })
})


/*                            Scroll animations                          */

const headersList = document.querySelectorAll('.page-header');
const headerObserver = new IntersectionObserver((headers)=> {
    headers.forEach((element)=> {
        if (element.isIntersecting){
            element.target.classList.remove('hidden-header');
            element.target.classList.add('visible-header');
        }
        else{
            element.target.classList.remove('visible-header');
            element.target.classList.add('hidden-header');
        }
    })
})

headersList.forEach( (header)=> {
    headerObserver.observe(header)
} )

const contentList = document.querySelectorAll('.content');
const contentObserver = new IntersectionObserver((contents)=> {
    contents.forEach((element)=> {
        if (element.isIntersecting){
            element.target.classList.remove('hidden-content');
            element.target.classList.add('visible-content');
        }
        else{
            element.target.classList.remove('visible-content');
            element.target.classList.add('hidden-content');
        }
    })
})

contentList.forEach( (content)=> {
    contentObserver.observe(content);
} )



/*                            Cursor animation                          */

const dt = 5; // update time in ms

const cursorElement = document.getElementById('cursor');
const cursorSatelliteElementList = document.querySelectorAll('.cursor-satellite')

class rotatingObject {
    ypos = 0; xpos = 0; xvel = 0; yvel = 0; xaccel = 0; yaccel = 0;
    targx = 0; targy = 0;

    constructor(_domElement, _initialAngle, _Magnitude, _radius, _kA, _kV, _omega) {
        this.domElement = _domElement;
        this.angle = _initialAngle;
        this.magnitude = _Magnitude;
        this.radius = _radius
        this.kA = _kA
        this.kV = _kV
        this.omega = _omega;

        _domElement.style.width = `${_radius}px`
        _domElement.style.height = `${_radius}px`
        _domElement.style.borderRadius = `${_radius / 2}px`
    }
}

const mainCursor = new rotatingObject(cursorElement, 0, 0, 0, 20, 0.7, 0);
const helperCursor1 = new rotatingObject(cursorSatelliteElementList[0], 0, 50, 35, 75, 0.8, 0.14); // mag 25 omeg 0.5
const helperCursor2 = new rotatingObject(cursorSatelliteElementList[1], 1, 60, 45, 25, 0.8, -0.10); // mag 100 omeg 0.85
const helperCursor3 = new rotatingObject(cursorSatelliteElementList[2], 2, 70, 40, 50, 0.8, 0.2); // mag 75 omeg -0.35
const helperCursor4 = new rotatingObject(cursorSatelliteElementList[3], 3, 25, 30, 100, 0.8, 0.17); // mag 25 omeg 0.5
const helperCursor5 = new rotatingObject(cursorSatelliteElementList[4], 4, 80, 25, 125, 0.8, -0.27); // mag 100 omeg 0.85

const helperCursorList = [helperCursor1, helperCursor2, helperCursor3, helperCursor4, helperCursor5]

document.addEventListener("mousemove", function(event) {
    mainCursor.targx = event.clientX;
    mainCursor.targy = event.clientY;
});

function updateSatelliteTarget(cursorSatellite, cursor, isStationary){

    if (isStationary){
        cursorSatellite.targx = cursor.xpos + cursorSatellite.magnitude * Math.cos(cursorSatellite.angle) - window.scrollX;
        cursorSatellite.targy = cursor.ypos + cursorSatellite.magnitude * Math.sin(cursorSatellite.angle) - window.scrollY;
    }
    else {
        cursorSatellite.targx = cursor.targx
        cursorSatellite.targy = cursor.targy
    }

    cursorSatellite.angle += (-cursorSatellite.omega * Math.PI / 180);
}

function updateCursor(cursorObj){
    const xdist = cursorObj.targx - cursorObj.xpos + window.scrollX;
    const ydist = cursorObj.targy - cursorObj.ypos + window.scrollY;

    // sets & dampens acceleration (bigger kA = slower accel)
    cursorObj.xaccel = xdist / cursorObj.kA;
    cursorObj.yaccel = ydist / cursorObj.kA;

    cursorObj.xvel += cursorObj.xaccel;
    cursorObj.yvel += cursorObj.yaccel;

    // Dampens velocity (kV should be from 0 to 1; bigger kV = more responsive)
    cursorObj.xvel = cursorObj.xvel * cursorObj.kV
    cursorObj.yvel = cursorObj.yvel * cursorObj.kV

    cursorObj.xpos += cursorObj.xvel;
    cursorObj.ypos += cursorObj.yvel;

    cursorObj.domElement.style.left = `${cursorObj.xpos - cursorObj.radius / 2}px`
    cursorObj.domElement.style.top = `${cursorObj.ypos - cursorObj.radius / 2}px`
}


let stationaryTime = 0;
function cursorIsStationary(cursorList) {
    const stationaryThreshold = 200; // time in ms to be considered stationary

    if (Math.abs(mainCursor.xvel) < 0.1 || Math.abs(mainCursor.yvel) < 0.1){
        stationaryTime += dt;
    }
    else{
        stationaryTime = 0;
    }

    console.log(stationaryTime)

    return stationaryTime > stationaryThreshold;
}

setInterval(() => {
    const isStationary = cursorIsStationary(helperCursorList);
    helperCursorList.forEach((it)=>{updateSatelliteTarget(it, mainCursor, isStationary)})
    updateCursor(mainCursor)
    helperCursorList.forEach(updateCursor)
}, dt)