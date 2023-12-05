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
setInterval(() => {
    updateCountdown()
}, 1000)



/*                      Title Name                     */

const titleCharactersList = document.querySelectorAll('.title-character');



/*                        FAQ                     */

const faqList = Array()

document.querySelectorAll('.faq-list li').forEach((it) => {
    faqList.push({item: it, isExpanded: false, div: it.querySelector('div')})
})

faqList.forEach((faqElement) => {
    faqElement.item.addEventListener('click', () => {
        if (faqElement.isExpanded){
            faqElement.div.style.maxHeight = '200px';
            faqElement.isExpanded = false;
        }
        else {
            faqElement.div.style.maxHeight = '0px';
            faqElement.isExpanded = true;
        }
    })
})
