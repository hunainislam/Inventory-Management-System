// Selecting elements from the DOM
const productNameInput = document.querySelector("#ProductName");
// console.log(productNameInput);
const productQuantityInput = document.querySelector("#ProductQuantity");
// console.log(productQuantityInput);
const productPriceInput = document.querySelector("#Number");
// console.log(productPriceInput);

const addProductButton = document.querySelector("#addProductButton");
// console.log(addProductButton);

const productTable = document.querySelector("#table");
// console.log(productTable);

// // // Add Event Listener for Add Product Button
addProductButton.addEventListener("click", (event) => {
  event.preventDefault();

//   // Create a new product object
  const newProduct = {
    name: productNameInput.value,
    quantity: parseInt(productQuantityInput.value),
    price: parseFloat(productPriceInput.value),
  };
//   // Validate the input fields

  if (validateProduct(newProduct)) {
    // Add the product to the table

    addProductToTable(newProduct);

    // Clear the input fields after adding the product

    clearForm();
  } else {
    alert("Please enter valid product details!");
  }
});

// // Function to validate product input

function validateProduct(newProduct) {
  return (
    newProduct.name !== "" && newProduct.quantity > 0 && newProduct.price > 0
  );
}

// // Function to add a product to the table

function addProductToTable(newProduct) {
  const newRow = productTable.insertRow();
  const nameCell = newRow.insertCell(0);
  const quantityCell = newRow.insertCell(1);
  const priceCell = newRow.insertCell(2);
  nameCell.textContent = newProduct.name;
  quantityCell.textContent = newProduct.quantity.toString();
  priceCell.textContent = newProduct.price.toString();

//   // Set font-family CSS property

  nameCell.style.fontFamily = "fantasy";
  quantityCell.style.fontFamily = "fantasy";
  priceCell.style.fontFamily = "fantasy";
}

// // Clear form Submission

function clearForm() {
  productNameInput.value = "";
  productQuantityInput.value = "";
  productPriceInput.value = "";
}
