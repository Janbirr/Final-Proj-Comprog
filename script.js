
let queues = JSON.parse(localStorage.getItem("queues")) || [];

let counters = JSON.parse(localStorage.getItem("counters")) || {
    ML: 1,
    CD: 1,
    PB: 1,
    HK: 1
};

let selectedService = "";

function showServices() {
    document.getElementById("ticketPage").classList.add("hidden");
    document.getElementById("servicePage").classList.remove("hidden");
    selectedService = "";
}

document.querySelectorAll(".service-btn").forEach(function(button) {
    button.addEventListener("click", function() {

        document.querySelectorAll(".service-btn").forEach(function(btn) {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");
        selectedService = button.dataset.service;

        document.getElementById("errorMessage").textContent = "";
    });
});

function getNumber() {

    if (selectedService === "") {
        document.getElementById("errorMessage").textContent =
            "Please select a game first!";
        return;
    }

    let prefixes = {
        "Mobile Legends: Bang Bang": "ML",
        "Call of Duty: Mobile": "CD",
        "PUBG Mobile": "PB",
        "Honor of Kings": "HK"
    };

    let prefix = prefixes[selectedService];

    let number = prefix + "-" + String(counters[prefix]).padStart(3, "0");

    let newQueue = {
        number: number,
        service: selectedService
    };

    queues.push(newQueue);

    counters[prefix]++;

    localStorage.setItem("queues", JSON.stringify(queues));
    localStorage.setItem("counters", JSON.stringify(counters));

    document.getElementById("myNumber").textContent = number;
    document.getElementById("myService").textContent = selectedService;

    document.getElementById("servicePage").classList.add("hidden");
    document.getElementById("ticketPage").classList.remove("hidden");
}   