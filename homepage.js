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
titleContainer.addEventListener('click', ()=>{
    if (titleIsRotated){
        titleIsRotated = false;
        for (let i = 0; i < titleCharacters.length; i++) {
            titleCharacters[i].classList.remove(`title-character-${i+1}`);
            titleCharacters[i].style.color = 'var(--blue)'
            setTimeout(()=>{
                titleCharacters[i].style.color = 'var(--green)'
            }, 600)
        }
    }
    else {
        titleIsRotated = true;
        for (let i = 0; i < titleCharacters.length; i++) {
            titleCharacters[i].classList.add(`title-character-${i+1}`);
            titleCharacters[i].style.color = 'var(--blue)'
            setTimeout(()=>{
                titleCharacters[i].style.color = 'var(--green)'
            }, 600)
        }
    }
})


const yearCharacters = document.querySelectorAll('.year-character');
const yearContainer = document.querySelector('.title-year')
let yearIsRotated = false;
yearContainer.addEventListener('click', ()=>{
    if (yearIsRotated){
        yearIsRotated = false;
        for (let i = 0; i < yearCharacters.length; i++) {
            yearCharacters[i].classList.remove(`year-character-${i+1}`);
            yearCharacters[i].style.color = 'var(--blue)'
            setTimeout(()=>{
                yearCharacters[i].style.color = 'var(--green)'
            }, 600)
        }
    }
    else {
        yearIsRotated = true;
        for (let i = 0; i < yearCharacters.length; i++) {
            yearCharacters[i].classList.add(`year-character-${i+1}`);
            yearCharacters[i].style.color = 'var(--blue)'
            setTimeout(()=>{
                yearCharacters[i].style.color = 'var(--green)'
            }, 600)
        }
    }
})



/*                        FAQ                     */

const faqList = Array()

document.querySelectorAll('.faq-list li').forEach((it) => {
    faqList.push({item: it, isExpanded: false, div: it.querySelector('div')})
})

faqList.forEach((faqElement) => {
    faqElement.item.addEventListener('click', () => {
        if (faqElement.isExpanded){
            faqElement.div.style.maxHeight = '0px';
            faqElement.isExpanded = false;
        }
        else {
            faqElement.div.style.maxHeight = '350px';
            faqElement.isExpanded = true;
        }
    })
})


/*                      Scroll animations                   */

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



/*                     Cursor animation                    */

const cursor = document.getElementById('cursor');

let xvel = 0, yvel = 0, ypos = 0, xpos = 0, xaccel = 0, yaccel = 0;

let currx = 0, curry = 0, prevx = 0, prevy = 0;
document.addEventListener("mousemove", function(event) {
    currx = event.clientX;
    curry = event.clientY;
});
function updateCursor(){
    const absdist = Math.sqrt(Math.pow(Math.abs(xpos - currx),2) + Math.pow(Math.abs(ypos - curry),2));
    const xdist = currx + window.scrollX - xpos;
    const ydist = curry + window.scrollY - ypos;

    xaccel = xdist / 50;
    yaccel = ydist / 50;

    xvel += xaccel;
    yvel += yaccel;

    if (Math.sign(xdist) !== prevx){
        xvel = xvel * 0.87
    }
    if (Math.sign(ydist) !== prevy){
        yvel = yvel * 0.87
    }

    xpos += xvel;
    ypos += yvel;

    cursor.style.left = `${xpos - 50}px`
    cursor.style.top = `${ypos - 50}px`

    prevx = xdist;
    prevy = ydist;
}

setInterval(updateCursor, 10)