document.addEventListener("DOMContentLoaded", function () {
    const clientForm = document.getElementById("clientForm");
    const clientList = document.getElementById("clientList");
    const addAddressBtn = document.getElementById("addAddressBtn");
    const addressesDiv = document.getElementById("addresses");

    function createAddressFields() {
        const addressDiv = document.createElement("div");
        addressDiv.classList.add("address");

        addressDiv.innerHTML = `
            <label for="street">Street:</label>
            <input type="text" id="street" name="street" required>

            <label for="city">City:</label>
            <input type="text" id="city" name="city" required>

            <label for="state">State:</label>
            <input type="text" id="state" name="state" required>

            <label for="zipCode">Zip Code:</label>
            <input type="text" id="zipCode" name="zipCode" required>
        `;

        addressesDiv.appendChild(addressDiv);
    }

    addAddressBtn.addEventListener("click", function () {
        createAddressFields();
    });

    clientForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(clientForm);
        const client = {
            name: formData.get("name"),
            addresses: []
        };

        const addressElements = document.querySelectorAll(".address");
        addressElements.forEach(addressDiv => {
            const address = {
                street: addressDiv.querySelector('input[name="street"]').value,
                city: addressDiv.querySelector('input[name="city"]').value,
                state: addressDiv.querySelector('input[name="state"]').value,
                zipCode: addressDiv.querySelector('input[name="zipCode"]').value
            };
            client.addresses.push(address);
        });

        fetch("/clients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        })
        .then(response => response.json())
        .then(data => {
            alert("Client saved successfully!");
            fetchClients();
        })
        .catch(error => console.error("Error:", error));
    });

    function fetchClients() {
        fetch("/clients")
            .then(response => response.json())
            .then(data => {
                clientList.innerHTML = "";
                data.forEach(client => {
                    const clientItem = document.createElement("li");
                    clientItem.textContent = `${client.name} - ${client.addresses.length} addresses`;
                    clientList.appendChild(clientItem);
                });
            })
            .catch(error => console.error("Error:", error));
    }

    fetchClients();
});
