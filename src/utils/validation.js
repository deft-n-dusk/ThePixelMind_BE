const validator = require("validator");

const validateSignUpData = (req) => {

    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Please enter the name");
    }
    else if(firstName.length < 3 || firstName.length > 20){
        throw new Error("First name should be 2-20 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email id is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }
}

const validateProductAddData = (req) => {
  const { title, price, description, category, imageURL } = req.body;

  if (!title || title.trim().length === 0) {
    throw new Error("Product title is required");
  } else if (title.length < 3 || title.length > 100) {
    throw new Error("Title must be 3-100 characters long");
  }

  if (!price || isNaN(price) || Number(price) < 1) {
    throw new Error("Price must be a number greater than 0");
  }

  if (!description || description.trim().length === 0) {
    throw new Error("Product description is required");
  } else if (description.length < 10) {
    throw new Error("Description should be at least 10 characters long");
  }

  if (!category || category.trim().length === 0) {
    throw new Error("Product category is required");
  }

  if (imageURL && !validator.isURL(imageURL, { protocols: ["http", "https"], require_protocol: true })) {
    throw new Error("Image URL is not valid");
  }
};

module.exports = {
  validateSignUpData,
  validateProductAddData,
};