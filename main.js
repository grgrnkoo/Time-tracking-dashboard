const backgrounds = document.querySelectorAll('.background');

// Apply colors for cards, using card class name

for(const card of backgrounds) {
    const name = card.childNodes[1].className;
    card.style.backgroundColor = `var(--${name})`;
    card.style.backgroundImage = `url(./images/icon-${name}.svg)`
}

// Get form data. Add event listener on change

const form = document.querySelector('form');

form.addEventListener('change', (event) => {
    const dailyData = document.querySelectorAll('.daily');
    const weeklyData = document.querySelectorAll('.weekly');
    const monthlyData = document.querySelectorAll('.monthly');

    switch (event.target.id) {
        case 'daily':
            changeTimeframe(dailyData, weeklyData, monthlyData);
            break;
        case 'weekly':
            changeTimeframe(weeklyData, dailyData, monthlyData);
            break;
        case 'monthly':
            changeTimeframe(monthlyData, dailyData, weeklyData);
            break;
    }
});

// Change timeframe for the event listener above

function changeTimeframe(timeframe1, timeframe2, timeframe3) {
    timeframe1.forEach((data) => data.classList.replace('hidden', 'active'));
            timeframe2.forEach((data) => {
                if (data.classList.contains('active')) {
                    data.classList.replace('active', 'hidden');
                }
            });
            timeframe3.forEach((data) => {
                if (data.classList.contains('active')) {
                data.classList.replace('active', 'hidden');
                }
            });
};

// JSON data fetching

fetch('./data.json').then((request) => {
    if(!request.ok) {
        console.log('Something is not right. Let\'s figure it out');
        return null;
    };
    return request.json();  
}).then((data) => {
    for(let i = 0; i < data.length; i++) {
        const className = data[i].title.toLowerCase().replace(' ', '-'); // some title editing, so now titles match my class names styling

        const classElement = document.querySelector(`.${className}`);
        const paragraphs = classElement.querySelectorAll('p');

        for(const paragraph of paragraphs) {
            //     Tried to make a separate function to DRY, but couldnt realize how to get "daily" and other data from JSON file;
            //     
            //     const dataChanger = (para, functionData) => {
            //     para.classList[0] === 'current' ?
            //         para.textContent = functionData[i].timeframes.daily.current > 1 ? `${data[i].timeframes.daily.current}hrs` : `${data[i].timeframes.daily.current}hr`:
            //         para.textContent = functionData[i].timeframes.daily.previous > 1 ? `Previous - ${data[i].timeframes.daily.previous}hrs` : `Previous - ${data[i].timeframes.daily.previous}hr`; 
            // }

            switch(paragraph.classList[1]) { // classlist[1] contains timeframe class
                case 'daily' :
                    paragraph.classList[0] === 'current' ? // classList[0] contains 'current/previous state'
                    paragraph.textContent = data[i].timeframes.daily.current !== 1 ? `${data[i].timeframes.daily.current}hrs` : `${data[i].timeframes.daily.current}hr`: // That's to have a clear looking hour counter. It shows a single 'hr' for value of 1 and multiple 'hrs' for more than 1
                    paragraph.textContent = data[i].timeframes.daily.previous !== 1 ? `Previous - ${data[i].timeframes.daily.previous}hrs` : `Previous - ${data[i].timeframes.daily.previous}hr`; 
                    break;
                case 'weekly' :
                    paragraph.classList[0] === 'current' ?
                    paragraph.textContent = data[i].timeframes.weekly.current !== 1 ? `${data[i].timeframes.weekly.current}hrs` : `${data[i].timeframes.weekly.current}hr`:
                    paragraph.textContent = data[i].timeframes.weekly.previous !== 1 ? `Previous - ${data[i].timeframes.weekly.previous}hrs` : `Previous - ${data[i].timeframes.weekly.previous}hr`; 
                    break;
                case 'monthly' :
                    paragraph.classList[0] === 'current' ?
                    paragraph.textContent = data[i].timeframes.monthly.current !== 1 ? `${data[i].timeframes.monthly.current}hrs` : `${data[i].timeframes.monthly.current}hr`:
                    paragraph.textContent = data[i].timeframes.monthly.previous !== 1 ? `Previous - ${data[i].timeframes.monthly.previous}hrs` : `Previous - ${data[i].timeframes.monthly.previous}hr`; 
                    break;
            };
        };
    }
});