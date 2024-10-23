const productNameInput = document.querySelector("#ProductName");
const productQuantityInput = document.querySelector("#ProductQuantity");
const productPriceInput = document.querySelector("#Number");
const addProductButton = document.querySelector("#addProductButton");
const productTable = document.querySelector("#table tbody");
const totalSumElement = document.querySelector("#totalSum");
const generatePdfButton = document.querySelector("#generatePdfButton");

const totalSum = 0;

// Add Event Listener for Add Product Button
addProductButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Create a new product object
  const newProduct = {
    name: productNameInput.value,
    quantity: parseInt(productQuantityInput.value),
    price: parseFloat(productPriceInput.value),
    totalPrice: function() { return this.quantity * this.price; }
  };

  // Validate the input fields
  if (validateProduct(newProduct)) {
    // Add the product to the table
    addProductToTable(newProduct);

    // Update total sum
    totalSum += newProduct.totalPrice();
    updateTotalSumDisplay();
    
    // Clear the input fields after adding the product
    clearForm();
  } else {
    alert("Please enter valid product details!");
  }
});

// Function to validate product input
function validateProduct(newProduct) {
  return (
    newProduct.name !== "" && newProduct.quantity > 0 && newProduct.price > 0
  );
}

// Function to add a product to the table
function addProductToTable(newProduct) {
  const newRow = productTable.insertRow();
  
  const nameCell = newRow.insertCell(0);
  const quantityCell = newRow.insertCell(1);
  const priceCell = newRow.insertCell(2);
  const totalPriceCell = newRow.insertCell(3);
  const actionsCell = newRow.insertCell(4);

  // Set product details in table cells
  nameCell.textContent = newProduct.name;
  quantityCell.textContent = newProduct.quantity.toString();
  priceCell.textContent = newProduct.price.toFixed(2);
  totalPriceCell.textContent = newProduct.totalPrice().toFixed(2);

  // Add a "Remove" button to each row
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-btn");
  removeButton.addEventListener("click", () => {
    // Update total sum when removing a product
    totalSum -= newProduct.totalPrice();
    updateTotalSumDisplay();
    newRow.remove();
  });
  actionsCell.appendChild(removeButton);

  // Apply styling for font-family
  nameCell.style.fontFamily = "fantasy";
  quantityCell.style.fontFamily = "fantasy";
  priceCell.style.fontFamily = "fantasy";
  totalPriceCell.style.fontFamily = "fantasy";
}

// Function to update the total sum display
function updateTotalSumDisplay() {
  totalSumElement.textContent = totalSum.toFixed(2);
}

// Clear form after submission
function clearForm() {
  productNameInput.value = "";
  productQuantityInput.value = "";
  productPriceInput.value = "";
}

// Generate PDF of the table
generatePdfButton.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add title to PDF
  doc.text("Inventory Management System", 10, 10);

  // Add table headers
  const headers = [["Product Name", "Quantity", "Price", "Total Price"]];
  const rows = [];

  // Iterate through table rows and collect data
  productTable.querySelectorAll("tr").forEach(row => {
    const rowData = [];
    row.querySelectorAll("td").forEach(cell => {
      rowData.push(cell.textContent);
    });
    if (rowData.length > 0) {
      rows.push(rowData);
    }
  });

  // Add table data to PDF
  doc.autoTable({
    head: headers,
    body: rows,
    startY: 20
  });

  // Add total sum at the bottom
  doc.text(`Total Sum: $${totalSum.toFixed(2)}`, 10, doc.autoTable.previous.finalY + 10);

  // Save the PDF
  doc.save("inventory.pdf");
});
