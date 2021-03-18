/* global variables */
var currentlyViewedData = '';


/**
 * 
 * @param {*} type 
 * @param {*} value 
 * @returns The string of data to send to the server
 */
function setCurrentData(type, value) {

    currentlyViewedData = type + '=' + value;
    return currentlyViewedData;
}


/**
 * Creates a XHR request to send to server.
 * 
 * @param {string} method 
 * @param {string} url  The address of the server
 * @param {*} data Data that the client sends to the server
 * @param {method} callback Method to process response
 */
function ajaxRequest(method, url, data, callback) {

    let request = new XMLHttpRequest();
    request.open(method, url);

    if (method == "POST") {
        request.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    }

    request.onreadystatechange = function() {
        if(request.readyState == 4) {

            if(request.status == 200) {

                var response = request.responseText;
                
                processEvents(response);

            } else if (request.status == 404) {
                alert('Error ' + request.status + ': We could not find what you were looking for :(');
            }
        }
    }
    request.send(data);
}


/**
 * Displays the response from the server onto the HTML page.
 * 
 * @param {string} response The data from the server to be displayed.
 */
 function processEvents(response) {

    var eventDisplay = document.getElementById("eventDisplay");
    eventDisplay.innerHTML = response; 

    var categoryArray = [
        'Craft',  
        'Educational', 
        'Entertainment', 
        'Shopping', 
        'Sport'
    ];

    var colorArray = [
        '#CC9999',
        '#a6c1ee', 
        '#fbc2eb', 
        '#00c9ff',
        '#92fe9d'
    ];

    // set the color of every event, based on the category
    for (var i = 0; i < categoryArray.length; i++) 
        setCategoryColor(categoryArray[i], colorArray[i]);
}


/**
 * Changes the background colour of each entry in the response, depending on category.
 * 
 * @param {*} category 
 * @param {*} color 
 */
function setCategoryColor(category, color) {
    var categoryElement = document.getElementsByClassName(category);

    // set background color of each event
    for (var i = 0; i < categoryElement.length; i++) 
        categoryElement[i].style.backgroundColor = color; 
}


/**
 * Loads events for the current month of the year when users loads page.
 */
function getCurrentMonth() {

    let MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    
    let d = new Date();
    let currentMonth = MONTHS[d.getMonth()];
    let dataMonth = setCurrentData('month', currentMonth);

    var p = document.getElementById('currently-viewing');
    p.innerHTML = 'Currently viewing: Events in <span class="emphasize">' + currentMonth + '</span>';

    setCurrentData('month', currentMonth);
    ajaxRequest('GET', `../server/getEventData.php?${dataMonth}`, '', processEvents);
}


/**
 * Requests events in a specific category or month and displays it.
 * 
 * @param {string} type The type of event being requested
 * @param {string} value Specifies what kind of type
 */
function filterEvents(type, value) {
    var p = document.getElementById('currently-viewing');

    // if no values entered, request all events
    if (type === '' && value === '') {

        p.innerHTML = 'Currently viewing <span class="emphasize">all</span> events'
        currentlyViewedData = '';
        ajaxRequest('POST', '../server/getEventData.php', '', processEvents);
    } else {

        data = setCurrentData(type, value);

        switch(type) {
            case 'month':
                p.innerHTML = 'Currently viewing: Events in <span class="emphasize">' + value + '</span>';
                break;
            case 'category':
                p.innerHTML = 'Currently viewing: <span class="emphasize">' + value + '</span> events';
                break;
            case 'tagged':
                p.innerHTML = 'Currently viewing your <span class="emphasize">tagged</span> events';
                break;
        }
    
        ajaxRequest('GET', `../server/getEventData.php?${data}`, '', processEvents);
    }
}


/**
 * Allows users to either tag an event as their favourite, or remove it.
 * 
 * @param {int} id ID of the event to be tagged
 * @param {boolean} isTagged checks whether the event is already tagged
 */
function setTagged(id, isTagged) {

    let data =  currentlyViewedData +'&id=' + id + '&isTagged=' + isTagged;

    ajaxRequest('POST', '../server/getEventData.php?', data, processEvents);
}
