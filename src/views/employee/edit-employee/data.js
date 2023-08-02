import { NationalIdSvg } from "assets/svg";

export const documentUploadDetails = [
  {
    value: "aadharId",
    label: "Aadhar Id",
    allowedFileType: ["image/jpeg", "image/png"],
    icon: <NationalIdSvg />,
    uploadDescription: [
      "Uploaded aadhar image must be clearly visible & complete",
      "Passport must in valid period",
      "Provided aadhar data page must included your full name, date of birth & your photo",
    ],
    disabled: false,
    allowedFileTypeError: "Please upload a .jpeg or .png file!",
  },
  {
    value: "educationalDocuments",
    label: "Educational Documents",
    allowedFileType: ["image/jpeg", "image/png"],
    disabled: false,
    uploadDescription: [
      "Uploaded Educational Documents image must be clearly visible & complete",
      "Passport must in valid period",
      "Provided Educational Documents data page must included your full name, date of birth & your photo",
    ],
    allowedFileTypeError: "Please upload a .jpeg or .png file!",
  },
  {
    value: "panCard",
    label: "Pan Card",
    allowedFileType: ["image/jpeg", "image/png"],
    disabled: true,
    uploadDescription: [
      "Uploaded Pan Card image must be clearly visible & complete",
      "Passport must in valid period",
      "Provided Pan Card data page must included your full name, date of birth & your photo",
    ],
    allowedFileTypeError: "Please upload a .jpeg or .png file!",
  },
];
