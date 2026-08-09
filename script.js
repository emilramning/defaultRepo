let highestZ = 10;

function openWindow(id) {

    const win = document.getElementById(id);

    win.style.display = "block";

    highestZ++;

    win.style.zIndex = highestZ;

    document.getElementById("start-menu").style.display = "none";
}

function closeWindow(id) {

    document.getElementById(id).style.display = "none";
}

function toggleStart() {

    const menu = document.getElementById("start-menu");

    menu.style.display =
        menu.style.display === "block"
        ? "none"
        : "block";
}

function visitWebsite() {

    const address =
        document.getElementById("address").value;

    const page =
        document.getElementById("webpage");

    if (address.includes("google")) {

        page.innerHTML = `
            <h1>Google</h1>
            <p>Google Search</p>
            <input placeholder="Search the web...">
            <button>Search</button>
        `;

    } else if (address.includes("yahoo")) {

        page.innerHTML = `
            <h1>Yahoo!</h1>
            <p>Welcome to Yahoo!</p>
            <hr>
            <p>News • Sports • Mail • Finance</p>
        `;

    } else {

        page.innerHTML = `
            <h1>404 - Page Not Found</h1>
            <p>The website could not be found.</p>
            <p>Check the address and try again.</p>
        `;
    }
}

function mineClick(button) {

    const bomb = Math.random() < 0.25;

    if (bomb) {

        button.textContent = "💣";

        setTimeout(() => {

            alert("💥 BOOM! Game over.");

        }, 100);

    } else {

        button.textContent =
            Math.floor(Math.random() * 8) + 1;
    }
}

function shutdown() {

    document.getElementById("desktop").innerHTML = `
        <div style="
            width:100%;
            height:100%;
            background:#000;
            color:white;
            display:flex;
            align-items:center;
            justify-content:center;
            font-family:Arial;
            font-size:24px;
        ">
            It is now safe to turn off your computer.
        </div>
    `;
}

/* CLOCK */

function updateClock() {

    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
}

setInterval(updateClock, 1000);

updateClock();
