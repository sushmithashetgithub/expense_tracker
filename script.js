// Fetch existing expenses from localStorage on load
document.addEventListener('DOMContentLoaded', loadExpenses);

document.getElementById('expenseForm').addEventListener('submit', addExpense);

function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.forEach(expense => displayExpense(expense));
}

function addExpense(e) {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  const expense = { amount, description, category };

  // Save to localStorage
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  displayExpense(expense);

  // Reset form
  document.getElementById('expenseForm').reset();
}

function displayExpense(expense) {
  const expenseList = document.getElementById('expenseList');

  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.innerHTML = `
    ${expense.description} - ₹${expense.amount} [${expense.category}]
    <button class="btn btn-danger btn-sm delete">Delete</button>
  `;

  expenseList.appendChild(li);
}

// Event delegation for delete button
document.getElementById('expenseList').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete')) {
    const expenseItem = e.target.parentElement;
    const text = expenseItem.textContent;
    
    // Remove from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(exp => {
      const expText = `${exp.description} - ₹${exp.amount} [${exp.category}]`;
      return expText !== text.replace('Delete', '').trim();
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Remove from DOM
    expenseItem.remove();
  }
});