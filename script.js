const expenseForm = document.getElementById("expenseForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

const totalElement = document.getElementById("total");
const expenseContainer = document.getElementById("expenseContainer");
const filterCategory = document.getElementById("filterCategory");

// Get expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Add expense
expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;

    if (!description || amount <= 0 || !category || !date) {
        alert("Please enter valid expense details.");
        return;
    }

    const expense = {
        id: Date.now(),
        description: description,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);

    saveExpenses();
    displayExpenses();

    expenseForm.reset();
});

// Save expenses
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Display expenses
function displayExpenses() {
    expenseContainer.innerHTML = "";

    const selectedCategory = filterCategory.value;

    const filteredExpenses =
        selectedCategory === "All"
            ? expenses
            : expenses.filter(
                expense => expense.category === selectedCategory
            );

    if (filteredExpenses.length === 0) {
        expenseContainer.innerHTML =
            '<p class="empty">No expenses found.</p>';
        updateTotal();
        return;
    }

    filteredExpenses.forEach(function (expense) {
        const expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";

        expenseItem.innerHTML = `
            <div class="expense-info">
                <h3>${escapeHTML(expense.description)}</h3>
                <p>${escapeHTML(expense.category)} • ${expense.date}</p>
            </div>

            <div>
                <span class="expense-amount">
                    ₹${expense.amount.toFixed(2)}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})"
                >
                    Delete
                </button>
            </div>
        `;

        expenseContainer.appendChild(expenseItem);
    });

    updateTotal();
}

// Calculate total
function updateTotal() {
    const selectedCategory = filterCategory.value;

    const filteredExpenses =
        selectedCategory === "All"
            ? expenses
            : expenses.filter(
                expense => expense.category === selectedCategory
            );

    const total = filteredExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    totalElement.textContent = `₹${total.toFixed(2)}`;
}

// Delete expense
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);

    saveExpenses();
    displayExpenses();
}

// Filter expenses
filterCategory.addEventListener("change", displayExpenses);

// Prevent HTML injection in descriptions
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Initial display
displayExpenses();
