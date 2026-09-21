<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Tracker</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <h1>💰 Expense Tracker</h1>

        <div class="summary">
            <h2>Total Expenses</h2>
            <p id="total">₹0.00</p>
        </div>

        <form id="expenseForm">
            <input
                type="text"
                id="description"
                placeholder="Expense description"
                required
            >

            <input
                type="number"
                id="amount"
                placeholder="Amount"
                min="0"
                step="0.01"
                required
            >

            <select id="category" required>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
            </select>

            <input
                type="date"
                id="date"
                required
            >

            <button type="submit">Add Expense</button>
        </form>

        <div class="filter">
            <label for="filterCategory">Filter:</label>

            <select id="filterCategory">
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
            </select>
        </div>

        <div class="expense-list">
            <h2>Expenses</h2>
            <div id="expenseContainer"></div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
