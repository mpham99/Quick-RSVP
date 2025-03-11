// Handle delete events
document.addEventListener("DOMContentLoaded", function () {
    // Select all delete buttons
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const rsvpId = this.getAttribute("data-rsvp-id");
            const rsvpName = this.getAttribute("data-rsvp-name");
            const eventId = this.getAttribute("data-event-id");

            // Update the modal content
            document.getElementById("rsvpNameModal").textContent = rsvpName;

            // Update the delete confirmation button with the correct event link
            const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
            confirmDeleteBtn.setAttribute("href", `/rsvps/delete/${rsvpId}?eventId=${eventId}`);
        });
    });
});
