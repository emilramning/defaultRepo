let game = {
    month: 1,
    cash: 10000,
    revenue: 0,
    expenses: 0,
    employees: 0,
    reputation: 10,
    valuation: 10000,

    marketing: 0,
    products: 0
};

function money(number) {
    return "$" + Math.round(number).toLocaleString();
}

function updateUI() {
    document.getElementById("month").textContent = game.month;
    document.getElementById("cash").textContent = money(game.cash);
    document.getElementById("revenue").textContent = money(game.revenue);
    document.getElementById("expenses").textContent = money(game.expenses);
    document.getElementById("valuation").textContent = money(game.valuation);
    document.getElementById("employees").textContent = game.employees;
    document.getElementById("reputation").textContent = game.reputation;
}

function addNews(text) {
    const news = document.getElementById("news");

    news.innerHTML = `<p>${text}</p>` + news.innerHTML;
}

function hireEmployee() {

    if (game.cash < 3000) {
        addNews("❌ Not enough cash to hire an employee.");
        return;
    }

    game.cash -= 3000;
    game.employees++;

    addNews("👨‍💻 You hired a new employee.");
    updateUI();
}

function marketing() {

    if (game.cash < 1000) {
        addNews("❌ Not enough cash for marketing.");
        return;
    }

    game.cash -= 1000;
    game.marketing += 1;

    addNews("📢 Your marketing campaign is running.");
    updateUI();
}

function developProduct() {

    if (game.cash < 5000) {
        addNews("❌ Not enough cash to develop a product.");
        return;
    }

    game.cash -= 5000;
    game.products++;

    addNews("🛠️ You developed a new product!");
    updateUI();
}

function endMonth() {

    let baseRevenue = 2000;

    let employeeRevenue = game.employees * 800;
    let marketingRevenue = game.marketing * 1500;
    let productRevenue = game.products * 2500;

    game.revenue =
        baseRevenue +
        employeeRevenue +
        marketingRevenue +
        productRevenue;

    let salaries = game.employees * 3000;

    game.expenses = salaries;

    let profit = game.revenue - game.expenses;

    game.cash += profit;

    game.reputation += Math.floor(Math.random() * 4);

    if (game.reputation > 100) {
        game.reputation = 100;
    }

    game.valuation =
        Math.max(
            10000,
            game.cash + game.revenue * 12
        );

    game.month++;

    addNews(
        `📊 Month ${game.month - 1}: ${profit >= 0 ? "+" : ""}${money(profit)} profit.`
    );

    updateUI();
}

function changeCompany() {

    let name = prompt("Enter your company name:");

    if (name && name.trim() !== "") {
        document.getElementById("companyName").textContent = name;
    }
}

updateUI();
