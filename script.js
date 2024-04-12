const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eye');
const eyeSlashIcon = document.getElementById('eyeslash');

eyeIcon?.addEventListener("click", ()=>{
    passwordInput.type = "password";
    eyeIcon.classList.add("hidden");
    eyeSlashIcon.classList.remove("hidden");
})
eyeSlashIcon?.addEventListener("click", ()=>{
    passwordInput.type = "text";
    eyeIcon.classList.remove("hidden");
    eyeSlashIcon.classList.add("hidden");
})



const dateContainer = document.getElementById("date-container");
const dayContainer = document.getElementById("day-container");
const timeContainer = document.getElementById("time-container");

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const dayContClass = "rounded-xl flex flex-col justify-start items-center px-4 py-2 w-full";
const currDayClass = " text-white bg-gradient-to-r from-blue-100 to-blue-400 "
const dayContDayClass = " text-sm ";
const dayContNumClass = " text-2xl font-bold ";
const timeContClass = " border-b-2 border-zinc-300 w-full text-base font-semibold capitalize flex gap-x-2 py-2 overflow-auto";


window?.addEventListener("load", ()=>{
    const date = new Date();
    dateContainer.innerText = date.toLocaleString("default", { month: "long", year: "numeric" });


    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

    console.log(firstDayOfMonth, daysInMonth)

    for(var i=1; i<=daysInMonth; i++,  firstDayOfMonth = (firstDayOfMonth+1)%7){
        // console.log(i, daysOfWeek[firstDayOfMonth]);
    
        const dayCont = document.createElement("div");
        
        dayCont.innerHTML = `<p class=${dayContDayClass}>${daysOfWeek[firstDayOfMonth]}</p>
        <p class=${dayContNumClass}>${i}</p>`;
        dayCont.className = dayContClass;
        if(i === date.getDate()) {
            dayCont.className += currDayClass;
            dayCont.setAttribute('id','curr-day');
        }
        dayContainer.appendChild(dayCont);

    }
    
    for (let hour = 0; hour < 24; hour++) {
        const formattedHour = hour.toString().padStart(2, '0');
        const displayHour = formattedHour > 12 ? formattedHour - 12 : formattedHour;
        const period = hour >= 12 ? 'pm' : 'am';
        
        const hourString = `${displayHour}:${'00'} ${period}`;
        
        const timeCont = document.createElement("p");
        timeCont.innerHTML = `<span>${hourString}</span>`;
        timeCont.className = timeContClass;
        timeCont.setAttribute('id', `time-${formattedHour}`);

        timeContainer.appendChild(timeCont);
      }



    document?.getElementById('curr-day')?.scrollIntoView({
        behavior: "smooth", block: "center", inline: "center"
    });
    
})


document?.getElementById("day-refresh-btn")?.addEventListener("click", ()=>{
    document?.getElementById('curr-day')?.scrollIntoView({
        behavior: "smooth", block: "center", inline: "center"
    });
})


const createWorkOutFrom = document.getElementById("create-workout-form");
const newWorkoutClass = " bg-rose-300 rounded-xl px-4 py-1 flex items-center justify-center gap-x-2 ";

createWorkOutFrom?.addEventListener("submit", (eve) => {
    eve.preventDefault();

    const requireTimeContainer = document?.getElementById(`time-${eve.target.time.value.split(':')[0]}`);

    const newWorkout = document.createElement('div');
    newWorkout.innerHTML = `
        <span class="text-sm font-semi-bold">${eve.target.name.value}</span>
        <span class="text-xs text-zinc-700">${eve.target.time.value}</span>`
    newWorkout.className = newWorkoutClass;
    requireTimeContainer?.appendChild(newWorkout);

    eve.target.name.value = '';
    eve.target.time.value = '00:00';


    createWorkoutContianer?.classList.add("hidden");
})

const createWorkoutContianer = document.getElementById("create-workout");

const openWorkoutBtn = document.getElementById("open-workout-btn");
const closeWorkoutBtn = document.getElementById("close-workout-btn");

openWorkoutBtn?.addEventListener("click", ()=>{
    console.log("lick open")
    createWorkoutContianer?.classList.remove("hidden");
})

closeWorkoutBtn?.addEventListener("click", ()=>{
    console.log("lick close")
    createWorkoutContianer?.classList.add("hidden");
})


//ChartJs Setup
const ctx = document?.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['12:00', '6:00', '12:00', '6:00', '12:00', '6:00','12:00', '6:00', '12:00'],
      datasets: [{
        // label: 'Calories Burnt',
        data: [12, 19, 3, 5, 9, 3, 7, 0, 11],
        borderWidth: 0,
        backgroundColor : "#FF00006B",
      }, {
        // label: 'Daily',
        data: [ 7, 0, 11, 12, 19, 8, 5, 9, 3],
        borderWidth: 0,
        backgroundColor : "#8099FF",
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      barThickness : 2 ,
      
    }
  });