let game = {
    month: 1,

    companyName: "My Company",
    industry: "Technology",

    cash: 10000,
    revenue: 0,
    expenses: 0,
    valuation: 10000,

    reputation: 10,
    marketShare: 1,

    employees: {
        worker: 0,
        developer: 0,
        manager: 0
    },

    marketing: 0,
    products: [],
    loans: 0,

    competitors: [
        { name: "NovaCorp", strength: 20 },
        { name: "Vertex Labs", strength: 35 },
        { name: "Titan Industries", strength: 55 }
    ],

    achievements: []
};

const employeeCosts = {
    worker: 2000,
    developer: 4000,
    manager: 6000
};

function money(n) {
    return "$" + Math.round(n).toLocaleString();
}

function addNews(text) {
    document.getElementById("news").innerHTML =
        `<div class="news-item">${text}</div>` +
        document.getElementById("news").innerHTML;
}

function updateUI() {

    document.getElementById("month").textContent = game.month;
    document.getElementById("companyName").textContent = game.companyName;
    document.getElementById("industry").textContent = game.industry;

    document.getElementById("cash").textContent = money(game.cash);
    document.getElementById("revenue").textContent = money(game.revenue);
    document.getElementById("expenses").textContent = money(game.expenses);
    document.getElementById("valuation").textContent = money(game.valuation);

    let totalEmployees =
        game.employees.worker +
        game.employees.developer +
        game.employees.manager;

    document.getElementById("employees").textContent = totalEmployees;
    document.getElementById("reputation").textContent = game.reputation;

    document.getElementById("revenueBar").style.width =
        Math.min(game.revenue / 100000 * 100, 100) + "%";

    document.getElementById("repBar").style.width =
        game.reputation + "%";

    document.getElementById("marketBar").style.width =
        Math.min(game.marketShare, 100) + "%";

    renderProducts();
    renderCompetitors();
    renderAchievements();
}

function hire(type) {

    let cost = employeeCosts[type];

    if (game.cash < cost) {
        addNews("❌ You don't have enough cash.");
        return;
    }

    game.cash -= cost;
    game.employees[type]++;

    let names = {
        worker: "worker",
        developer: "developer",
        manager: "manager"
    };

    addNews(`👥 You hired a ${names[type]}.`);

    updateUI();
}

function marketing() {

    if (game.cash < 2000) {
        addNews("❌ Not enough money for marketing.");
        return;
    }

    game.cash -= 2000;
    game.marketing++;

    game.reputation += 2;

    addNews("📢 Your marketing campaign reached thousands of people.");

    updateUI();
}

function developProduct() {

    if (game.cash < 7500) {
        addNews("❌ You need $7,500 to develop a product.");
        return;
    }

    game.cash -= 7500;

    let productNumber = game.products.length + 1;

    game.products.push({
        name: "Product " + productNumber,
        quality: Math.floor(Math.random() * 40) + 60,
        sales: 0
    });

    game.reputation += 3;

    addNews(`🛠️ Product ${productNumber} has launched!`);

    updateUI();
}

function takeLoan() {

    game.cash += 25000;
    game.loans += 25000;

    addNews("🏦 You received a $25,000 business loan.");

    updateUI();
}

function endMonth() {

    let workers = game.employees.worker;
    let developers = game.employees.developer;
    let managers = game.employees.manager;

    let customers =
        100 +
        workers * 25 +
        developers * 40 +
        managers * 70 +
        game.marketing * 120 +
        game.reputation * 5;

    let productPower = 0;

    game.products.forEach(product => {
        product.sales = Math.floor(
            customers * (product.quality / 100)
        );

        productPower += product.sales * 20;
    });

    game.revenue =
        customers * 20 +
        productPower;

    let salaries =
        workers * 2000 +
        developers * 4000 +
        managers * 6000;

    let loanInterest = game.loans * 0.01;

    game.expenses =
        salaries +
        game.marketing * 500 +
        loanInterest;

    let profit = game.revenue - game.expenses;

    game.cash += profit;

    game.marketShare +=
        (game.reputation / 100) +
        (game.marketing * .2);

    game.reputation +=
        Math.floor(Math.random() * 5) - 1;

    game.reputation =
        Math.max(0, Math.min(100, game.reputation));

    game.valuation =
        Math.max(
            0,
            game.cash +
            game.revenue * 12 +
            game.reputation * 1000
        );

    game.month++;

    addNews(
        `📊 Month ${game.month - 1}: ` +
        `${profit >= 0 ? "🟢 +" : "🔴 "}${money(profit)} profit.`
    );

    randomEvent();

    competitorUpdate();

    checkAchievements();

    if (game.cash < 0) {
        addNews("💀 Your company is bankrupt.");
        game.cash = 0;
    }

    updateUI();
}

function randomEvent() {

    let roll = Math.random();

    if (roll < .10) {

        let bonus = Math.floor(Math.random() * 10000) + 5000;

        game.cash += bonus;

        addNews(
            `🔥 VIRAL MOMENT! Your company went viral and earned ${money(bonus)}.`
        );
    }

    else if (roll < .17) {

        let loss = Math.floor(Math.random() * 7000) + 2000;

        game.cash -= loss;

        game.reputation = Math.max(0, game.reputation - 5);

        addNews(
            `🚨 PR CRISIS! You lost ${money(loss)}.`
        );
    }

    else if (roll < .22) {

        game.reputation += 10;

        addNews(
            "🏆 A major influencer praised your company!"
        );
    }

    else if (roll < .27) {

        game.marketShare += 3;

        addNews(
            "📈 Your biggest competitor had a disastrous month. You gained market share."
        );
    }
}

function competitorUpdate() {

    game.competitors.forEach(c => {

        c.strength += Math.floor(Math.random() * 5) - 2;

        c.strength = Math.max(1, c.strength);

        if (c.strength > 80) {

            addNews(
                `⚠️ ${c.name} is becoming a major threat.`
            );
        }
    });
}

function renderProducts() {

    let container = document.getElementById("products");

    if (game.products.length === 0) {
        container.innerHTML =
            `<p class="empty">No products yet.</p>`;
        return;
    }

    container.innerHTML = game.products.map(product => `
        <div class="product">
            <strong>📦 ${product.name}</strong>
            <small>
                Quality: ${product.quality}/100
                • Monthly sales: ${product.sales}
            </small>
        </div>
    `).join("");
}

function renderCompetitors() {

    let container = document.getElementById("competitors");

    container.innerHTML = game.competitors.map(c => {

        let status =
            c.strength < 30 ? "🟢 Weak" :
            c.strength < 60 ? "🟡 Growing" :
            "🔴 Dangerous";

        return `
            <div class="competitor">
                <strong>🏢 ${c.name}</strong>
                <small>
                    Strength: ${c.strength}/100 • ${status}
                </small>
            </div>
        `;
    }).join("");
}

function checkAchievements() {

    let totalEmployees =
        game.employees.worker +
        game.employees.developer +
        game.employees.manager;

    if (
        game.cash >= 100000 &&
        !game.achievements.includes("100K")
    ) {
        game.achievements.push("100K");
        addNews("🏆 Achievement unlocked: $100K CASH!");
    }

    if (
        game.valuation >= 1000000 &&
        !game.achievements.includes("MILLION")
    ) {
        game.achievements.push("MILLION");
        addNews("🏆 Achievement unlocked: MILLION-DOLLAR COMPANY!");
    }

    if (
        totalEmployees >= 50 &&
        !game.achievements.includes("EMPLOYEES")
    ) {
        game.achievements.push("EMPLOYEES");
        addNews("🏆 Achievement unlocked: 50 EMPLOYEES!");
    }

    if (
        game.products.length >= 5 &&
        !game.achievements.includes("PRODUCTS")
    ) {
        game.achievements.push("PRODUCTS");
        addNews("🏆 Achievement unlocked: 5 PRODUCTS!");
    }
}

function renderAchievements() {

    let container = document.getElementById("achievements");

    if (game.achievements.length === 0) {
        container.innerHTML =
            `<p class="empty">No achievements yet.</p>`;
        return;
    }

    container.innerHTML =
        game.achievements.map(a => `
            <div class="achievement">
                🏆 ${a}
            </div>
        `).join("");
}

function changeCompany() {

    let name = prompt(
        "What do you want to call your company?"
    );

    if (name && name.trim()) {
        game.companyName = name.trim();
        updateUI();
    }
}

function saveGame() {

    localStorage.setItem(
        "companySimulator",
        JSON.stringify(game)
    );

    addNews("💾 Game saved.");
}

function loadGame() {

    let saved =
        localStorage.getItem("companySimulator");

    if (!saved) {
        addNews("❌ No saved game found.");
        return;
    }

    game = JSON.parse(saved);

    addNews("↩️ Game loaded.");

    updateUI();
}

updateUI();
