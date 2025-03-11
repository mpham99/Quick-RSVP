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
            confirmDeleteBtn.setAttribute("href", `event/delete/${eventId}`);
        });
    });
});

// Handle edit events
document.addEventListener("DOMContentLoaded", function () {
    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Get event details from data attributes
            const eventId = this.getAttribute("data-event-id");
            const eventName = this.getAttribute("data-event-name");
            const eventDate = this.getAttribute("data-event-date");
            const eventLocation = this.getAttribute("data-event-location");
            const eventDescription = this.getAttribute("data-event-description");
            const eventMaxAttendees = this.getAttribute("data-event-max-attendees");

            // Populate modal fields
            document.getElementById("editModalName").textContent = eventName;
            document.getElementById("editEventId").value = eventId;
            document.getElementById("editName").value = eventName;
            document.getElementById("editDate").value = eventDate;
            document.getElementById("editLocation").value = eventLocation;
            document.getElementById("editDescription").value = eventDescription;
            document.getElementById("editMaxAttendees").value = eventMaxAttendees;

            // Update form action to submit to the correct update endpoint
            document.getElementById("editEventForm").action = "/event/update/" + eventId;
        });
    });
});

// Handle search function
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const rows = document.querySelectorAll("tbody tr");

    searchInput.addEventListener("keyup", function () {
        const query = searchInput.value.toLowerCase();

        rows.forEach(row => {
            const eventName = row.querySelector("td:nth-child(1)").textContent.toLowerCase();

            if (eventName.includes(query)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});