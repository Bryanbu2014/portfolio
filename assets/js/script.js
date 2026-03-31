// ========================== 
// FOOTER SCROLL LINK
// ========================== 
document.getElementById('scrollToTop').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

// ========================== 
// COPY EMAIL TO CLIPBOARD 
// ========================== 
document.addEventListener("DOMContentLoaded", function() {
    const emailBtn = document.getElementById("copyEmailBtn");
    const notification = document.getElementById("copyNotification");
    const myEmail = "bubryanwb@gmail.com";

    // Only run this if the button actually exists on the page
    if (emailBtn && notification) {
        emailBtn.addEventListener("click", function(event) {
            // Stop the link from jumping to the top of the page
            event.preventDefault(); 

            // Use the modern clipboard API to copy the text
            navigator.clipboard.writeText(myEmail).then(function() {
                
                // 1. Show the notification
                notification.classList.add("show");

                // 2. Hide the notification after 3 seconds (3000 milliseconds)
                setTimeout(function() {
                    notification.classList.remove("show");
                }, 3000);
                
            }).catch(function(err) {
                // Just in case their browser blocks clipboard access
                console.error('Could not copy text: ', err);
                alert("Failed to copy email automatically. My email is: " + myEmail);
            });
        });
    }
});