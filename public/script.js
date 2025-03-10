// Handle delete events
document.addEventListener("DOMContentLoaded", function () {
    // Select all delete buttons
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const eventId = this.getAttribute("data-event-id");
            const eventName = this.getAttribute("data-event-name");

            // Update the modal content
            document.getElementById("eventName").textContent = eventName;

            // Update the delete confirmation button with the correct event link
            const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
            confirmDeleteBtn.setAttribute("href", `/delete/${eventId}`);
        });
    });
});
