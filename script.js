let highestZ = 20;

const windows = [
    "computer",
    "documents",
    "browser",
    "notepad",
    "email",
    "floppy",
    "minesweeper"
];

function openWindow(id) {

    const win = document.getElementById(id);

    win.style.display = "block";

    highestZ++;

    win.style.zIndex = highestZ;

    document.getElementById("start-menu").style.display = "none";

    updateTaskbar();
}

function closeWindow(id) {

    document.getElementById(id).style.display = "none";

    updateTaskbar();
}

function toggleStart() {

    const menu =
        document.getElementById("start-menu");

    menu.style.display =
        menu.style.display === "block"
        ? "none"
        : "block";
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

/* TASKBAR */

function updateTaskbar() {

    const bar =
        document.getElementById("taskbar-apps");

    bar.innerHTML = "";

    windows.forEach(id => {

        const win =
            document.getElementById(id);

        if (win.style.display === "block") {

            const button =
                document.createElement("button");

            button.className = "task-button";

            button.textContent =
                id.charAt(0).toUpperCase() + id.slice(1);

            button.onclick = () =>
                openWindow(id);

            bar.appendChild(button);
        }
    });
}

/* NOTEPAD */

function saveNote() {

    const text =
        document.getElementById("notepadText").value;

    localStorage.setItem(
        "oldpc_note",
        text
    );

    alert("File saved.");
}

function loadNote() {

    const saved =
        localStorage.getItem("oldpc_note");

    if (saved !== null) {

        document.getElementById(
            "notepadText"
        ).value = saved;
    }
}

function clearNote() {

    document.getElementById(
        "notepadText"
    ).value = "";
}

loadNote();

/* INTERNET */

function visitWebsite() {

    const address =
        document.getElementById("address").value.toLowerCase();

    const page =
        document.getElementById("webpage");

    if (address.includes("google")) {

        page.innerHTML = `
            <h1>Google</h1>
            <p>Search the web.</p>
            <input placeholder="Search...">
            <button>Search</button>
        `;

    } else if (address.includes("yahoo")) {

        page.innerHTML = `
            <h1>Yahoo!</h1>
            <p>News • Sports • Mail • Finance</p>
            <hr>
            <p>Welcome to Yahoo!</p>
        `;

    } else if (address.includes("myspace")) {

        page.innerHTML = `
            <h1>MySpace</h1>
            <p>Welcome to your profile.</p>
            <p>Tom is your friend.</p>
        `;

    } else {

        page.innerHTML = `
            <h1>404</h1>
            <p>Website not found.</p>
        `;
    }
}

/* EMAIL */

function readEmail() {

    alert(
        "Microsoft Security Update\n\n" +
        "Please download the latest security patch."
    );
}

function readEmail2() {

    alert(
        "CONGRATULATIONS!!!\n\n" +
        "You have won $10,000!!!\n\n" +
        "Send your bank details immediately."
    );
}

/* FLOPPY */

function openFloppy() {

    alert(
        "Reading floppy disk...\n\n" +
        "3 files found."
    );
}

/* MINESWEEPER */

function createMinesweeper() {

    const board =
        document.getElementById("mineboard");

    board.innerHTML = "";

    for (let i = 0; i < 64; i++) {

        const cell =
            document.createElement("button");

        cell.className = "mine-cell";

        cell.textContent = "";

        cell.onclick = function () {

            if (Math.random() < .15) {

                this.textContent = "💣";

                setTimeout(() => {

                    alert("💥 BOOM!");

                }, 100);

            } else {

                this.textContent =
                    Math.floor(
                        Math.random() * 8
                    ) + 1;
            }
        };

        board.appendChild(cell);
    }
}

createMinesweeper();

/* DRAGGING */

document.querySelectorAll(".window").forEach(win => {

    const bar =
        win.querySelector(".titlebar");

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    bar.addEventListener("mousedown", e => {

        dragging = true;

        highestZ++;

        win.style.zIndex = highestZ;

        offsetX =
            e.clientX - win.offsetLeft;

        offsetY =
            e.clientY - win.offsetTop;
    });

    document.addEventListener("mousemove", e => {

        if (!dragging) return;

        win.style.left =
            e.clientX - offsetX + "px";

        win.style.top =
            e.clientY - offsetY + "px";
    });

    document.addEventListener("mouseup", () => {

        dragging = false;

    });

});

/* SHUTDOWN */

function shutdown() {

    document.body.innerHTML = `
        <div style="
            background:black;
            color:white;
            width:100vw;
            height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            font-family:Arial;
            font-size:22px;
        ">
            It is now safe to turn off your computer.
        </div>
    `;
}

/* BOOT SCREEN */

setTimeout(() => {

    document.getElementById("boot").style.display =
        "none";

}, 1800);
