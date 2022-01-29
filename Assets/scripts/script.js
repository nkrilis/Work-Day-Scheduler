// setting the current date and time using moment.js
let currentTime = moment();
// My array of events made by user
let eventList = [];
// Function for creating new objects for each event saved
function calEvents(index, desc)
{
    this.index = index;
    this.desc = desc;
}
// Setting the current day at the top of the page
$("#currentDay").text(currentTime.format("MMM Do, YYYY"));
// Function that sets the colors based of each time block 
// based on the time of day
function setColors ()
{
    let hours = currentTime.format("H");
    let calTime = $("[data-time]");

    // Loop through each time block and change color 
    // and change it depending if its the past, present, or future
    for(let i = 0; i < calTime.length; i++)
    {
        let calHour = $("[data-time]").eq(i).attr("data-time");

        if(calHour < hours)
        {
            $("textarea").eq(i).addClass("past");
        }
        
        if(calHour === hours)
        {
            $("textarea").eq(i).addClass("present");
        }

        if(calHour > hours)
        {
            $("textarea").eq(i).addClass("future");
        }
    }
    
}

// Sets the events by retrieving them from local storage
function setEvents() 
{  
    let calanderSetEvents = JSON.parse(localStorage.getItem("Event"));

    for(let i = 0; i < calanderSetEvents.length; i++)
    {
        let area = $("textarea").eq(calanderSetEvents[i].index);
        area.val(calanderSetEvents[i].desc);
    }
}

// create a listener function for each save button
$(".saveBtn").each(function () 
{
    // This function will save the input from the user on click
    this.addEventListener("click" , function(event)
    {
        event.preventDefault();
        let btn = $(".saveBtn").index(this);
        let calEvent = $("textarea").eq(btn).val();
        eventList.push(new calEvents(btn, calEvent));
        localStorage.setItem("Event", JSON.stringify(eventList));

        console.log(calEvent);
    })
});

// Call my functions
setColors();
setEvents();