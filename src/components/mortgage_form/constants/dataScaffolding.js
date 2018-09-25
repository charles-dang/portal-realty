export default {
  APPLICANT_DATA: [
    {
      APPLICANT_TYPE: "APPLICANT",
      SSN: "",
      LAST_NAME: "",
      FIRST_NAME: "",
      MIDDLE_NAME: "",
      EMAIL: "",
      YEARS_IN_SCHOOL: "",
      MARITAL_STATUS: "",
      HOME_PHONE: "",
      AGE: "",
      APPLICATION_ADDRESS: [
        {
          RESIDENCY_TYPE: "",
          STREET_ADDRESS: "",
          CITY: "",
          STATE: "",
          ZIP_CODE: "",
          DURATION_YEARS: "",
          DURATION_MONTHS: "",
          TYPE: ""
        }
      ],
      APPLICATION_EMPLOYER: [
        {
          ADDRESS_1: "",
          ADDRESS_2: "",
          CITY: "",
          STATE: "",
          ZIP_CODE: "",
          COUNTRY: "",
          START_DATE: "",
          END_DATE: "",
          EMPLOYMENT_POSITION_DESCRIPTION: "",
          PHONE_NUMBER: "",
          INCOME: "",
          EMPLOYER_NAME: "",
          employmentPresent: false,
          APPLICANT_TYPE: "",
          MONTHS_ON_JOB: "",
          STREET_ADDRESS: "",
          SELF_EMPLOYED: "",
          YEARS_ON_JOB: "",
          NUMBER_YEARS_IN_LINE_OF_WORK: ""
        }
      ]
    },
    {
      APPLICANT_TYPE: "CO-APPLICANT",
      SSN: "",
      LAST_NAME: "",
      FIRST_NAME: "",
      EMAIL: "",
      YEARS_IN_SCHOOL: "",
      MARITAL_STATUS: "",
      HOME_PHONE: "",
      AGE: "",
      APPLICATION_ADDRESS: [
        {
          RESIDENCY_TYPE: "",
          STREET_ADDRESS: "",
          CITY: "",
          STATE: "",
          ZIP_CODE: "",
          DURATION_YEARS: "",
          DURATION_MONTHS: "",
          TYPE: ""
        }
      ],
      APPLICATION_EMPLOYER: [
        {
          ADDRESS_1: "",
          ADDRESS_2: "",
          CITY: "",
          STATE: "",
          ZIP_CODE: "",
          COUNTRY: "",
          START_DATE: "",
          END_DATE: "",
          EMPLOYMENT_POSITION_DESCRIPTION: "",
          PHONE_NUMBER: "",
          INCOME: "",
          EMPLOYER_NAME: "",
          employmentPresent: false,
          APPLICANT_TYPE: "",
          MONTHS_ON_JOB: "",
          STREET_ADDRESS: "",
          SELF_EMPLOYED: "",
          YEARS_ON_JOB: "",
          NUMBER_YEARS_IN_LINE_OF_WORK: ""
        }
      ],
      MIDDLE_NAME: ""
    }
  ],
  ASSETS: {
    BANK: [],
    AUTOMOBILES: [],
    "401K_INVESTMENT_ACCOUNT": [],
    HOUSE: [],
    RENTAL_PROPERTIES: []
  },
  PROPERTY_INFORMATION: {
    STREET_ADDRESS: "",
    STREET_ADDRESS2: "",
    CITY: "",
    STATE: "",
    ZIP_CODE: "",
    loanType: ""
  },
  MORTGATE_TYPE_AND_TERMS: {
    otherTerm: false,
    otherMortgage: false,
    otherAmortization: false,
    MORTGATE_TYPE: "",
    AMORTIZATION_TYPE: "",
    INTEREST_RATE: "",
    NUMBER_OF_MONTHS: "",
    LOAN_AMOUNT: ""
  },
  DOWN_PAYMENT: {
    DOWN_PAYMENT_AMOUNT: "",
    DOWN_PAYMENT_TYPE_CODE: ""
  },
  DETAILS_OF_TRANSACTION: {
    PURCHASE_PRICE: ""
  },
  DECLARATIONS: {
    holdingPropertyTitle: "",
    propertyAsPrimary: "",
    hadOwnershipInterest: "",
    typeOfPropertyYouOwn: "",
    howDidYouHold: "",
    addNotes: ""
  }
};
