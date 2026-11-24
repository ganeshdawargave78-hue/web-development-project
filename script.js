const form = document.getElementById("expenseForm");
const expensesList = document.getElementById("expenses");
const totalDisplay = document.getElementById("total");
const filter = document.getElementById("filter");

let expenses = [];

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (name === "" || amount <= 0) {
    return;
  }

  expenses.push({
    name: name,
    amount: amount,
    category: category
  });

  form.reset();
  showExpenses();
});

filter.addEventListener("change", showExpenses);

function showExpenses() {
  expensesList.innerHTML = "";

  const selectedCategory = filter.value;

  const visibleExpenses = expenses.filter(function(expense) {
    return selectedCategory === "All" || expense.category === selectedCategory;
  });

  visibleExpenses.forEach(function(expense) {
    const item = document.createElement("li");
    const text = document.createElement("span");
    const deleteButton = document.createElement("button");

    text.textContent = expense.name + " - " + expense.category + " - ₹" + expense.amount;
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function() {
      expenses = expenses.filter(function(item) {
        return item !== expense;
      });
      showExpenses();
    });

    item.append(text, deleteButton);
    expensesList.appendChild(item);
  });

  const total = expenses.reduce(function(sum, expense) {
    return sum + expense.amount;
  }, 0);

  totalDisplay.textContent = total.toFixed(2);
}

showExpenses();