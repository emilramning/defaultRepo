/* =====================================================
   OLDPC SIMULATOR
   V3 - GAME SYSTEM
===================================================== */


/* =========================
   GAME DATA
========================= */

let game = {

    money: 50,

    year: 1998,

    ram: 32,

    storage: 2,

    pcHealth: 100,

    cpu: "Pentium",

    days: 1

};


/* =========================
   WINDOWS
========================= */

let highestZ = 20;

const windows = [

    "computer",

    "documents",

    "browser",

    "notepad",

    "email",

    "minesweeper"

];


/* =========================
   MONEY FORMAT
========================= */

function money(amount) {

    return "$" +
        Math.floor(amount)
        .toLocaleString();

}


/* =========================
   HUD
========================= */

function updateGameHUD() {

    document.getElementById("money")
        .textContent = money(game.money);

    document.getElementById("year")
        .textContent = game.year;

    document.getElementById("ram")
        .textContent = game.ram + " MB";

    document.getElementById("storage")
        .textContent = game.storage + " GB";

    document.getElementById("pcHealth")
        .textContent = game.pcHealth + "%";
}


/* =========================
   MESSAGE
========================= */

function message(text) {

    const box =
        document.getElementById(
            "game-message"
        );

    box.textContent = text;

    box.style.display = "block";

    setTimeout(() => {

        box.style.display = "none";

    }, 2500);
}


/* =========================
   SAVE GAME
========================= */

function saveGame() {

    localStorage.setItem(

        "oldPCGame",

        JSON.stringify(game)

    );

    message("💾 Game saved!");

}


/* =========================
   LOAD GAME
========================= */

function loadGame() {

    const saved =
        localStorage.getItem(
            "oldPCGame"
        );

    if (!saved) {

        message("❌ No save found.");

        return;
    }

    game =
        JSON.parse(saved);

    updateGameHUD();

    message("📂 Save loaded!");

}


/* =========================
   WORK
========================= */

function work() {

    const jobs = [

        {
            name: "Mowing lawns",
            reward: 15
        },

        {
            name: "Walking dogs",
            reward: 10
        },

        {
            name: "Helping a neighbor",
            reward: 20
        },

        {
            name: "Washing cars",
            reward: 25
        }

    ];

    const job =
        jobs[
            Math.floor(
                Math.random() *
                jobs.length
            )
        ];

    game.money += job.reward;

    message(

        `💼 ${job.name} → +${money(job.reward)}`

    );

    updateGameHUD();

    saveGame();

}


/* =========================
   RAM UPGRADE
========================= */

function upgradeRAM() {

    if (game.ram >= 128) {

        message(
            "🧠 RAM is already maxed!"
        );

        return;
    }

    if (game.money < 40) {

        message(
            "❌ You need $40."
        );

        return;
    }

    game.money -= 40;

    game.ram *= 2;

    message(

        `🧠 RAM upgraded to ${game.ram} MB!`

    );

    updateGameHUD();

    saveGame();

}


/* =========================
   STORAGE UPGRADE
========================= */

function upgradeStorage() {

    if (game.storage >= 20) {

        message(
            "💾 Storage is already maxed!"
        );

        return;
    }

    if (game.money < 60) {

        message(
            "❌ You need $60."
        );

        return;
    }

    game.money -= 60;

    game.storage *= 2;

    message(

        `💾 Storage upgraded to ${game.storage} GB!`

    );

    updateGameHUD();

    saveGame();

}


/* =========================
   UPGRADE MENU
========================= */

function upgradeMenu() {

    const choice = prompt(

        "PC UPGRADES\n\n" +

        "1 = Upgrade RAM ($40)\n" +

        "2 = Upgrade Storage ($60)\n\n" +

        "Enter 1 or 2:"

    );

    if (choice === "1") {

        upgradeRAM();

    }

    if (choice === "2") {

        upgradeStorage();

    }

}


/* =========================
   WINDOWS
========================= */

function openWindow(id) {

    const win =
        document.getElementById(id);

    win.style.display = "block";

    highestZ++;

    win.style.zIndex = highestZ;

    document.getElementById(
        "start-menu"
    ).style.display = "none";

    updateTaskbar();

}


function closeWindow(id) {

    document.getElementById(id)
        .style.display = "none";

    updateTaskbar();

}


/* =========================
   START MENU
========================= */

function toggleStart() {

    const menu =
        document.getElementById(
            "start-menu"
        );

    menu.style.display =

        menu.style.display === "block"

            ? "none"

            : "block";

}


/* =========================
   TASKBAR
========================= */

function updateTaskbar() {

    const bar =
        document.getElementById(
            "taskbar-apps"
        );

    bar.innerHTML = "";

    windows.forEach(id => {

        const win =
            document.getElementById(id);

        if (
            win.style.display === "block"
        ) {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "task-button";

            button.textContent =
                id
                    .charAt(0)
                    .toUpperCase() +
                id.slice(1);

            button.onclick = () =>
                openWindow(id);

            bar.appendChild(button);

        }

    });

}


/* =========================
   CLOCK
========================= */

function updateClock() {

    const now = new Date();

    document.getElementById(
        "clock"
    ).textContent =

        now.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });

}

setInterval(
    updateClock,
    1000
);

updateClock();


/* =========================
   NOTEPAD
========================= */

function saveNote() {

    const text =
        document.getElementById(
            "notepadText"
        ).value;

    localStorage.setItem(
        "oldpc_note",
        text
    );

    message("📝 Note saved!");

}


function loadNote() {

    const saved =
        localStorage.getItem(
            "oldpc_note"
        );

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


/* =========================
   INTERNET
========================= */

function visitWebsite() {

    const address =
        document.getElementById(
            "address"
        ).value.toLowerCase();

    const page =
        document.getElementById(
            "webpage"
        );


    if (
        address.includes("google")
    ) {

        page.innerHTML = `

            <h1>Google</h1>

            <p>
                Search the web.
            </p>

            <input
                placeholder="Search..."
            >

            <button>
                Search
            </button>

        `;

    }


    else if (
        address.includes("yahoo")
    ) {

        page.innerHTML = `

            <h1>Yahoo!</h1>

            <p>
                News • Sports • Mail • Finance
            </p>

            <hr>

            <p>
                Welcome to Yahoo!
            </p>

        `;

    }


    else if (
        address.includes("myspace")
    ) {

        page.innerHTML = `

            <h1>MySpace</h1>

            <p>
                Welcome to your profile.
            </p>

            <p>
                Tom is your friend.
            </p>

        `;

    }


    else {

        page.innerHTML = `

            <h1>404</h1>

            <p>
                Website not found.
            </p>

        `;

    }

}


/* =========================
   EMAIL
========================= */

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


/* =========================
   MINESWEEPER
========================= */

function createMinesweeper() {

    const board =
        document.getElementById(
            "mineboard"
        );

    board.innerHTML = "";

    for (
        let i = 0;
        i < 64;
        i++
    ) {

        const cell =
            document.createElement(
                "button"
            );

        cell.className =
            "mine-cell";

        cell.onclick = function () {

            if (
                Math.random() < 0.15
            ) {

                this.textContent =
                    "💣";

                setTimeout(() => {

                    alert(
                        "💥 BOOM!"
                    );

                }, 100);

            }

            else {

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


/* =========================
   DRAG WINDOWS
========================= */

document
    .querySelectorAll(".window")
    .forEach(win => {

        const bar =
            win.querySelector(
                ".titlebar"
            );

        let dragging = false;

        let offsetX = 0;

        let offsetY = 0;


        bar.addEventListener(
            "mousedown",
            e => {

                dragging = true;

                highestZ++;

                win.style.zIndex =
                    highestZ;

                offsetX =
                    e.clientX -
                    win.offsetLeft;

                offsetY =
                    e.clientY -
                    win.offsetTop;

            }
        );


        document.addEventListener(
            "mousemove",
            e => {

                if (!dragging)
                    return;

                win.style.left =

                    e.clientX -
                    offsetX +
                    "px";

                win.style.top =

                    e.clientY -
                    offsetY +
                    "px";

            }
        );


        document.addEventListener(
            "mouseup",
            () => {

                dragging = false;

            }
        );

    });


/* =========================
   SHUTDOWN
========================= */

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

            It is now safe to turn off
            your computer.

        </div>

    `;

}


/* =========================
   LOAD GAME
========================= */

loadNote();

const savedGame =
    localStorage.getItem(
        "oldPCGame"
    );

if (savedGame) {

    game =
        JSON.parse(savedGame);

}

updateGameHUD();


/* =========================
   BOOT
========================= */

setTimeout(() => {

    document.getElementById(
        "boot"
    ).style.display = "none";

}, 1800);
