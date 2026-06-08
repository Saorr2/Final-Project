/* make sure to properly link JavaScript file to HTMl file when I complete my HTML and CSS */

/* "use strict"; , globally as a function to catch any common coding errors as well as prevent the use of undeclared variables, which results in more secure and maintainable code, which also helps avoid spending time on debugging code */
"use strict";


/* implement dark mode to allow users to browse with ease based on their preference of a light or dark display */

/* create a function to toggle dark mode on and off when the user clicks the sun or moon icons  */
const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

/* properly load saved preference */
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
}

/* add an event listener to toggle theme to listen when the user clicks to change the modes depending on their preference */
toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

/* implement form validation for contact form to ensure that users provide necessary information before submitting the form */
/* add a feature allowing the user to remove items from their cart before checking out and display the total cost of all the items 
in their cart, including the updated total when each item(s) is removed or added. */

/* create a function to validate the form fields and display a success message after the user successfully submits the form */
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

/* regex email and phone validations for users to enter a valid email and phone number */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const comments = document.getElementById("comments").value.trim();
    const contactMethod = document.querySelector("input[name='contactMethod']:checked");

/* name validation to display error message */
    if (name === "") {
        showError("nameError", "Please enter your full name.");
        isValid = false;
    }

/* comments validation to display comments error message*/
    if (comments === "") {
        showError("commentsError", "Comments are required.");
        isValid = false;
    }

/* contact method validation, after user selects a radio for their preferred contact method */
    if (!contactMethod) {
        showError("contactMethodError", "Please select a preferred contact method.");
        isValid = false;
    } else {
        if (contactMethod.value === "phone") {
            if (!phoneRegex.test(phone)) {
                showError("phoneError", "Please enter a valid phone number (e.g. 555-555-5555).");
                isValid = false;
            }
        }

        if (contactMethod.value === "email") {
            if (!emailRegex.test(email)) {
                showError("emailError", "Please enter a valid email address.");
                isValid = false;
            }
        }
    }

/* if the form is valid, no errors will be displayed to the user, resulting in a successful submit */
    if (isValid) {
        const customer = {
            name: name,
            phone: phone || "N/A",
            email: email || "N/A",
            comments: comments,
            preferredContact: contactMethod.value
        };

/* reset the form after the user submits and display a thank you message including their name and confirms that the user successfully submitted the form */
        displaySuccess(customer);
        form.reset();
    }
});

/* additional functions that help with form validation and displaying the error messages, clearing the error messages after the form is submitted, and displaying a success // thank you message to the user after a successful form submission */
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(error => error.textContent = "");
    successMessage.style.display = "none";
}

function displaySuccess(customer) {
    successMessage.innerHTML = `
        <h3>Thank you for contacting us ${customer.name}!</h3>
    `;
    successMessage.style.display = "block";
}

/* cost calculator displaying the items they have added to their cart and allow them checkout, right after displays 
the users total and a thank you message */

/* created and initialized variables that will select elements for the cost calculator feature which are, the add to cart buttons, subtotal, tax, shipping, total, checkout button, and error // success messages  */
const addButtons = document.querySelectorAll(".btn-add");
const subTotal = document.getElementById("subtotal");
const taxPer = document.getElementById("tax");
const shippingAmt = document.getElementById("shipping");
const totalAmt = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartMessage = document.getElementById("cartMessage");

let cart = [];
const TAX_RATE = 0.08;
const SHIPPING_COST = 5.00;

/* add event listener to each add to cart button so when the user clicks each one to add a product the total will update as each product is added to the cart */
addButtons.forEach(button => {
    button.addEventListener("click", function () {
        const product = button.closest(".products-item");
        const priceText = product.querySelector(".product-price").textContent;
        const price = parseFloat(priceText.replace("$", ""));

        cart.push(price);
        updateTotals();
    });
});

/* updating the users subtotal, tax, shipping cost, and total for each time the user adds an item to their cart, before they check out */
function updateTotals() {
    const subtotal = cart.reduce((sum, price) => sum + price, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + (cart.length > 0 ? SHIPPING_COST : 0);

    subTotal.textContent = `$${subtotal.toFixed(2)}`;
    taxPer.textContent = `$${tax.toFixed(2)}`;
    shippingAmt.textContent = cart.length > 0 ? `$${SHIPPING_COST.toFixed(2)}` : `$0.00`;
    totalAmt.textContent = `$${total.toFixed(2)}`;
}

/* when the user checks out and if their cart is empty, the message will display to the user to add something to their cart before they check out */
checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) {
        cartMessage.textContent = "Your cart is empty. Please add an item before checking out";
        return;
    }

    /* display the users final total after they check out */
    const finalTotal = totalAmt.textContent;

    /* a thank you message is displayed along with the final total after the user clicks the check out button */
    cartMessage.innerHTML = `
        Thank you for your order! Your total was <strong>${finalTotal}</strong>!
    `;

    /* clear the cart immediately after the user checks out */
    cart = [];
    updateTotals();
});