/**
 * Harmon Transfield
 * 1317381
 * 
 * COMPX322, Assignment 1
 */

/**
 * Opens a modal, which displays extra information about the event
 * 
 * @param {int} id ID number of event within the database
 */
 function openModal(id) {

    var modal = document.getElementById(id);
    var closeID = document.getElementById(id +'-close');
    
    modal.style.display = "block";

    // closes modal when pressing 'x' button
    closeID.onclick = function() {
        console.log('clicked');
        modal.style.display = "none";
    }
  
    // close modal when clicked outside modal
    window.onclick = function(event) {
        if (event.target == modal) {
             modal.style.display = "none";
        }
    } 

    // close modal when pressing the 'esc' key
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          modal.style.display = 'none';
        }
    });
}