export class Auth {
  static validateBorrowerForm(borrowerForm) {
    let applicantType = "Co Borrower";
    if (borrowerForm.APPLICANT_TYPE === "borrower") {
      applicantType = "Borrower";
    }
    if (!borrowerForm.FIRST_NAME) {
      return `${applicantType}: First Name is required.`;
    } else if (!borrowerForm.MIDDLE_NAME) {
      return `${applicantType}: Middle Name is required.`;
    } else if (!borrowerForm.LAST_NAME) {
      return `${applicantType}: Last Name is required.`;
    } else if (!borrowerForm.AGE) {
      return `${applicantType}: Date of Birth is required.`;
    } else if (!borrowerForm.SSN) {
      return `${applicantType}: SSN is required.`;
    } else if (!borrowerForm.MARITAL_STATUS) {
      return `${applicantType}: Marriage Status is required.`;
    } else if (!borrowerForm.EMAIL) {
      return `${applicantType}: Email is required.`;
    } else if (
      borrowerForm.EMAIL &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(borrowerForm.EMAIL)
    ) {
      return `${applicantType}: Invalid Email Address.`;
    } else if (!borrowerForm.HOME_PHONE) {
      return `${applicantType}: Telephone is required.`;
    } else if (!borrowerForm.YEARS_IN_SCHOOL) {
      return `${applicantType}: Education is required.`;
    } else {
      return false;
    }
  }

  static validateResidenceForm(residenceForm) {
    let applicantType = "Co Borrower";
    if (
      residenceForm.RESIDENCE_TYPE === "borrower" ||
      residenceForm.RESIDENCE_APPLICANT_TYPE === "basicBorrower"
    ) {
      applicantType = "Borrower";
    }
    if (!residenceForm.ADDRESS_1) {
      return `${applicantType}: Address 1 is required.`;
    } else if (!residenceForm.CITY) {
      return `${applicantType}: City is required.`;
    } else if (!residenceForm.STATE) {
      return `${applicantType}: State is required.`;
    } else if (!residenceForm.ZIP_CODE) {
      return `${applicantType}: Zip Code is required.`;
    } else if (!residenceForm.COUNTRY) {
      return `${applicantType}: Country is required.`;
    } else if (!residenceForm.START_DATE) {
      return `${
        residenceForm.RESIDENCE_TYPE
      }: Enter start date for the residence`;
    } else if (!residenceForm.addressCurrent && !residenceForm.END_DATE) {
      return `${applicantType}: Enter end date for the residence`;
    } else {
      return false;
    }
  }

  static validateEmployerForm(employerForm) {
    let applicantType = "Co Borrower";
    if (
      employerForm.APPLICANT_TYPE === "borrower" ||
      employerForm.EMPLOYMENT_APPLICANT_TYPE === "employmentBorrower"
    ) {
      applicantType = "Borrower";
    }
    if (!employerForm.EMPLOYER_NAME) {
      return `${applicantType}: Company Name is required.`;
    } else if (!employerForm.ADDRESS_1) {
      return `${applicantType}: Address 1 is required.`;
    } else if (!employerForm.CITY) {
      return `${applicantType}: City is required.`;
    } else if (!employerForm.STATE) {
      return `${applicantType}: State is required.`;
    } else if (!employerForm.ZIP_CODE) {
      return `${applicantType}: Zip Code is required.`;
    } else if (!employerForm.COUNTRY) {
      return `${applicantType}: Country is required.`;
    } else if (!employerForm.EMPLOYMENT_POSITION_DESCRIPTION) {
      return `${applicantType}: Title is required`;
    } else if (!employerForm.PHONE_NUMBER) {
      return `${applicantType}: Phone is required`;
    } else if (!employerForm.INCOME) {
      return `${applicantType}: Monthly Income is required`;
    } else if (!employerForm.START_DATE) {
      return `${applicantType}: Enter start date for the residence`;
    } else if (!employerForm.addressCurrent && !employerForm.END_DATE) {
      return `${applicantType}: Enter end date for the residence`;
    } else {
      return false;
    }
  }

  static validateBorrowerEmployerFormNames(names) {
    if (!names.borrowerFirstName) {
      return "Borrower: First Name is required.";
    } else if (!names.borrowerMiddleName) {
      return "Borrower: Middle Name is required.";
    } else if (!names.borrowerLastName) {
      return "Borrower: Last Name is required.";
    } else {
      return false;
    }
  }

  static validateCoBorrowerEmployerFormNames(names) {
    if (!names.coborrowerFirstName) {
      return "Co-Borrower: First Name is required.";
    } else if (!names.coborrowerMiddleName) {
      return "Co-Borrower: Middle Name is required.";
    } else if (!names.coborrowerLastName) {
      return "Co-Borrower: Last Name is required.";
    } else {
      return false;
    }
  }

  static validateDeclarationForm(data) {
    if (!data.STREET_ADDRESS) {
      return "Property Information: Address 1 Value is required";
    } else if (!data.CITY) {
      return "Property Information: City is required";
    } else if (!data.STATE) {
      return "Property Information: State is required";
    } else if (!data.ZIP_CODE) {
      return "Property Information: Zip Code is required";
    } else if (!data.loanType) {
      return "Property Information: Loan Type is required";
    } else if (!data.PURCHASE_PRICE) {
      return "Property Information: Purchase Price is required";
    } else if (isNaN(parseInt(data.PURCHASE_PRICE, 10))) {
      return "Property Information: Please enter a valid number for purchase price";
    } else if (!data.DOWN_PAYMENT_AMOUNT) {
      return "Property Information: Down Payment is required";
    } else if (isNaN(parseInt(data.DOWN_PAYMENT_AMOUNT, 10))) {
      return "Property Information: Please enter a valid number for Down Payment";
    } else if (!data.MORTGATE_TYPE) {
      return "Mortgage Type and Term: Mortgage Type is required";
    } else if (!data.AMORTIZATION_TYPE) {
      return "Mortgage Type and Term: Amortization Type is required";
    } else if (!data.INTEREST_RATE) {
      return "Mortgage Type and Term: Interest Rate is required";
    } else if (!data.NUMBER_OF_MONTHS) {
      return "Mortgage Type and Term: Terms is required";
    } else if (isNaN(parseInt(data.INTEREST_RATE, 10))) {
      return "Mortgage Type and Term: Interest Rate is required";
    } else {
      return false;
    }
  }

  static validateAssetModal(assetData, assetType) {
    if (assetType === "BANK" || assetType === "401K_INVESTMENT_ACCOUNT") {
      if (!assetData.BANK_NAME) {
        return "Bank Name is required.";
      } else if (!assetData.ACCOUNT_NUMBER) {
        return "Account Name is required.";
      } else if (!assetData.ACCOUNT_BALANCE) {
        return "Current Balance is required.";
      } else if (isNaN(parseInt(assetData.ACCOUNT_BALANCE, 10))) {
        return "Current Balance needs to be a number";
      } else {
        return false;
      }
    } else if (assetType === "RENTAL_PROPERTIES" || assetType === "HOUSE") {
      if (!assetData.STREET_ADDRESS) {
        return "Address 1 is required.";
      } else if (!assetData.CITY) {
        return "City is required.";
      } else if (!assetData.STATE) {
        return "State is required.";
      } else if (!assetData.ZIP_CODE) {
        return "Zip Code is required.";
      } else if (!assetData.MARKET_VALUE) {
        return "Market Value is required.";
      } else if (!assetData.MONTHLY_MORTGAGE_PAYMENT) {
        return "Monthly Payment is required.";
      } else if (!assetData.MONTHLY_INSURANCE) {
        return "Monthly Insurance is required";
      } else if (!assetData.LOAN_BALANCE) {
        return "Loan Balance is required";
      } else {
        return false;
      }
    } else if (assetType === "AUTOMOBILES") {
      if (!assetData.MAKE) {
        return "Year/Make is required.";
      } else if (!assetData.MARKET_VALUE) {
        return "Market Value is required.";
      } else if (!assetData.MONTHLY_PAYMENT) {
        return "Monthly Payment is required.";
      } else if (!assetData.LOAN) {
        return "Loan Balance is required";
      } else {
        return false;
      }
    }
  }
}
