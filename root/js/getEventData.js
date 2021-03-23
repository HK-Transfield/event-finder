/**
 * Harmon Transfield
 * 1317381
 * 
 * COMPX322, Assignment 1
 */

/* global variables */
var currentlyViewedData = '';


/**
 * Stores the value of what events are currently displayed on the page.
 * 
 * @param {string} column 
 * @param {string} cell 
 * @returns The string of data to send to the server
 */
function setCurrentData(column, cell) {

    currentlyViewedData = column + '=' + cell;
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
function ajaxRequest(method, url, data) {

    let request = new XMLHttpRequest();
    request.open(method, url);

    if (method == "POST") {
        request.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    }

    request.onreadystatechange = function() {
        if(request.readyState == 4) {

            if(request.status == 200) {

                var response = request.responseText;
                
                processEvents(response); // callback function

            } else if (request.status == 404 || request.status == 500) {
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

    let eventDisplay = document.getElementById("eventDisplay");
    eventDisplay.innerHTML = response; 

    let categoryArray = [
        'Craft',  
        'Educational', 
        'Entertainment', 
        'Shopping', 
        'Sport'
    ];

    let colorArray = [
        '#CC9999',
        '#a6c1ee', 
        '#fbc2eb', 
        '#00c9ff',
        '#92fe9d'
    ];

    // set colour of elements
    categoryArray.map((category, i) => {
        setCategoryColor(category, colorArray[i]);
    });
}


/**
 * Changes the background colour of each entry in the response, depending on category.
 * 
 * @param {*} category Category of elements being displayed.
 * @param {*} color  The color that corresponding to the category.
 */
function setCategoryColor(category, color) {
    var categoryElements = document.getElementsByClassName(category);

    // set background color of each event
    for (var i = 0; i < categoryElements.length; i++) 
        categoryElements[i].style.backgroundColor = color; 
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

    let p = document.getElementById('currently-viewing');
    p.innerHTML = 'Currently viewing: Events in <span class="emphasize">' + currentMonth + '</span>';

    setCurrentData('month', currentMonth);
    ajaxRequest('GET', `getEventData.php?${dataMonth}`, '');
}


/**
 * Requests events in a specific category or month and displays it.
 * 
 * @param {string} type The type of event being requested
 * @param {string} value Specifies what kind of type
 */
function filterEvents(column, cell) {
    var p = document.getElementById('currently-viewing');

    // if no values entered, request all events
    if (column === '' && cell === '') {

        p.innerHTML = 'Currently viewing <span class="emphasize">all</span> events'
        currentlyViewedData = '';

        ajaxRequest('POST', 'getEventData.php', '');
    } else {

        var data = setCurrentData(column, cell);

        // display text informing users what they are viewing
        switch(column) {
            case 'month':
                p.innerHTML = 'Currently viewing: Events in <span class="emphasize">' + cell + '</span>';
                break;
            case 'category':
                p.innerHTML = 'Currently viewing: <span class="emphasize">' + cell + '</span> events';
                break;
            case 'tagged':
                p.innerHTML = 'Currently viewing your <span class="emphasize">tagged</span> events';
                break;
        }
    
        ajaxRequest('GET', `getEventData.php?${data}`, '');
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

    ajaxRequest('POST', 'getEventData.php?', data);
}
