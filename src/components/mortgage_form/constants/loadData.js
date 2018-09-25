export default {
  APPLICANT_DATA: [
    {
      APPLICANT_TYPE: "APPLICANT",
      SSN: "121-11-5555",
      LAST_NAME: "D",
      FIRST_NAME: "CUONG",
      MIDDLE_NAME: "D",
      EMAIL: "cdang@aaaa.com",
      YEARS_IN_SCHOOL: "college",
      MARITAL_STATUS: "married",
      HOME_PHONE: "7148039443",
      AGE: "1993-06-26",
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
          ADDRESS_1: "ab address",
          ADDRESS_2: "",
          CITY: "irvine",
          STATE: "",
          ZIP_CODE: "",
          COUNTRY: "",
          START_DATE: "2018-06-26T20:34:10.615Z",
          END_DATE: "2018-06-26T20:34:10.615Z",
          EMPLOYMENT_POSITION_DESCRIPTION: "",
          PHONE_NUMBER: "",
          INCOME: "1000",
          EMPLOYER_NAME: "AB",
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
      SSN: "12-312-3453",
      LAST_NAME: "Dang",
      FIRST_NAME: "Mai",
      EMAIL: "da@gmail.com",
      YEARS_IN_SCHOOL: "college",
      MARITAL_STATUS: "married",
      HOME_PHONE: "7148039478",
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
          ADDRESS_1: "8613 El Rancho",
          ADDRESS_2: "",
          CITY: "Fountain Valley",
          STATE: "CA",
          ZIP_CODE: "92708",
          COUNTRY: "",
          START_DATE: "2018-06-26T20:34:10.630Z",
          END_DATE: "2018-06-26T20:34:10.630Z",
          EMPLOYMENT_POSITION_DESCRIPTION: "",
          PHONE_NUMBER: "7148039443",
          INCOME: "1000",
          EMPLOYER_NAME: "abc",
          employmentPresent: false,
          APPLICANT_TYPE: "",
          MONTHS_ON_JOB: "",
          STREET_ADDRESS: "",
          SELF_EMPLOYED: "",
          YEARS_ON_JOB: "",
          NUMBER_YEARS_IN_LINE_OF_WORK: ""
        }
      ],
      MIDDLE_NAME: "D"
    }
  ],
  ASSETS: {
    BANK: [
      {
        BANK_NAME: "boa",
        ACCOUNT_NUMBER: "111",
        ACCOUNT_BALANCE: "1111"
      },
      {
        BANK_NAME: "chase",
        ACCOUNT_NUMBER: "222",
        ACCOUNT_BALANCE: "2222"
      }
    ],
    AUTOMOBILES: [
      {
        MAKE: "honda",
        MONTHLY_PAYMENT: "1000",
        MARKET_VALUE: "30000",
        LOAN: "10000"
      }
    ],
    "401K_INVESTMENT_ACCOUNT": [],
    HOUSE: [
      {
        STREET_ADDRESS: "8613 El Rancho",
        STREET_ADDRESS2: "",
        CITY: "Fountain Valley",
        ZIP_CODE: "92708",
        STATE: "CA",
        MONTHLY_MORTGAGE_PAYMENT: "3000",
        MARKET_VALUE: "3000",
        LOAN_BALANCE: "5454",
        PROPERTY_TYPE: "Primary Residence",
        MONTHLY_INSURANCE: ""
      }
    ],
    RENTAL_PROPERTIES: [
      {
        STREET_ADDRESS: "8613 El Rancho",
        MONTHLY_INSURANCE: "",
        STREET_ADDRESS2: "",
        CITY: "Fountain Valley",
        ZIP_CODE: "92708",
        STATE: "CA",
        MONTHLY_MORTGAGE_PAYMENT: "11212",
        MARKET_VALUE: "999999",
        LOAN_BALANCE: "1000",
        PROPERTY_TYPE: "Primary Residence",
        LOAN: "9999999"
      }
    ]
  },
  PROPERTY_INFORMATION: {
    STREET_ADDRESS: "8613 El Rancho",
    STREET_ADDRESS2: "",
    CITY: "Fountain Valley",
    STATE: "CA",
    ZIP_CODE: "92708",
    loanType: "New Purchase"
  },
  MORTGATE_TYPE_AND_TERMS: {
    otherTerm: false,
    otherMortgage: false,
    otherAmortization: false,
    MORTGATE_TYPE: "conventional",
    AMORTIZATION_TYPE: "fixedRate",
    INTEREST_RATE: "3.0",
    NUMBER_OF_MONTHS: "",
    LOAN_AMOUNT: ""
  },
  DOWN_PAYMENT: {
    DOWN_PAYMENT_AMOUNT: "30000",
    DOWN_PAYMENT_TYPE_CODE: ""
  },
  DETAILS_OF_TRANSACTION: {
    PURCHASE_PRICE: "940000"
  },
  DECLARATIONS: {
    holdingPropertyTitle: "Solely",
    propertyAsPrimary: "Yes",
    hadOwnershipInterest: "Yes",
    typeOfPropertyYouOwn: "Principle Residence",
    howDidYouHold: "Solely",
    addNotes: ""
  }
  // ADDITIONAL_PROPERTIES: {
  //   RENTAL_PROPERTIES: [
  //     {
  //       STREET_ADDRESS: "8613 El Rancho",
  //       STREET_ADDRESS2: "",
  //       CITY: "Fountain Valley",
  //       ZIP_CODE: "92708",
  //       STATE: "CA",
  //       MONTHLY_MORTGAGE_PAYMENT: "11212",
  //       MARKET_VALUE: "999999",
  //       LOAN_BALANCE: "",
  //       PROPERTY_TYPE: "Single Family",
  //       LOAN: "9999999"
  //     }
  //   ],
  //   HOUSE: [
  //     {
  //       STREET_ADDRESS: "8613 El Rancho",
  //       STREET_ADDRESS2: "",
  //       CITY: "Fountain Valley",
  //       ZIP_CODE: "92708",
  //       STATE: "CA",
  //       MONTHLY_MORTGAGE_PAYMENT: "3000",
  //       MARKET_VALUE: "3000",
  //       LOAN_BALANCE: "",
  //       PROPERTY_TYPE: "Single Family",
  //       LOAN: "3000"
  //     }
  //   ]
  // }
};
