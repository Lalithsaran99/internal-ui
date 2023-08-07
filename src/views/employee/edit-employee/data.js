export const employeeSteps = [
  { label: "Personal information", value: 0 },
  { label: "Identification", value: 1 },
  { label: "Address Information", value: 2 },
  { label: "Financial Information", value: 3 },
];

export const fileTypes = [
  { value: "image/jpeg", label: "image/jpeg" },
  { value: "image/png", label: "image/png" },
];

export const documentUploadDetails = [
  {
    value: "aadharId",
    label: "Aadhar Id",
    allowedFileType: ["image/jpeg", "image/png"],
    uploadDescription: [
      "Uploaded aadhar image must be clearly visible & complete",
      "Passport must in valid period",
      "Provided aadhar data page must included your full name, date of birth & your photo",
    ],
    allowedFileTypeError: "Please upload a .jpeg or .png file!",
  },
  {
    value: "educationalDocuments",
    label: "Educational Documents",
    allowedFileType: ["image/jpeg", "image/png"],

    uploadDescription: [
      "Uploaded Educational Documents image must be clearly visible & complete",
      "Passport must in valid period",
      "Provided Educational Documents data page must included your full name, date of birth & your photo",
    ],
    allowedFileTypeError: "Please upload a .jpeg or .png file!",
  },
  {
    value: "panCard",
    label: "Pan card",
    allowedFileType: ["image/jpeg", "image/png"],

    uploadDescription: [
      "Uploaded Pan Card image must be clearly visible & complete",
      "Passport must in valid period",
      "Provided Pan Card data page must included your full name, date of birth & your photo",
    ],
    allowedFileTypeError: "Please upload a .jpeg or .png file!",
  },

  {
    value: "payroll",
    label: "Payroll",
    allowedFileType: ["image/jpeg", "image/png"],

    uploadDescription: [
      "Uploaded Payroll must have company name and salary deductions",
    ],
    allowedFileTypeError: "Please upload a .jpeg or .png file!",
  },
];
