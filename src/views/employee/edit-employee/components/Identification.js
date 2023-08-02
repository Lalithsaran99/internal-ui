import { Badge, FormContainer, FormItem, Select } from "components/ui";
import { Field, Form, Formik } from "formik";
import useThemeClass from "utils/hooks/useThemeClass";

import labelManager from "configs/label.config/label-manager";
import * as Yup from "yup";

import { FormFooterButton } from "components/shared/FormFooterButton";
import { ProfileFormHeader } from "../utils/FormHeader";

import { AiOutlineSave } from "react-icons/ai";
import { documentUploadDetails } from "../data";
import { DocumentSegmenter } from "../utils/DocumentSegmenter";
import { DocumentUploadWithCollapse } from "../utils/DocumentUploadWithCollapse";

const validationSchema = Yup.object().shape({
  documentType: Yup.string().required("Please select your document type"),
  passportCover: Yup.string().when("documentType", {
    is: "passport",
    then: Yup.string().required("Please upload passport cover"),
    otherwise: (schema) => schema,
  }),
  passportDataPage: Yup.string().when("documentType", {
    is: "passport",
    then: Yup.string().required("Please upload passport data page"),
    otherwise: (schema) => schema,
  }),
  nationalIdFront: Yup.string().when("documentType", {
    is: "nationalId",
    then: Yup.string().required("Please upload your front National ID"),
    otherwise: (schema) => schema,
  }),
  nationalIdBack: Yup.string().when("documentType", {
    is: "nationalId",
    then: Yup.string().required("Please upload your back National ID"),
    otherwise: (schema) => schema,
  }),
  driversLicenseFront: Yup.string().when("documentType", {
    is: "driversLicense",
    then: Yup.string().required("Please upload your front Drivers license"),
    otherwise: (schema) => schema,
  }),
  driversLicenseBack: Yup.string().when("documentType", {
    is: "driversLicense",
    then: Yup.string().required("Please upload your back Drivers license"),
    otherwise: (schema) => schema,
  }),
});

const Identification = ({
  data = {
    documentType: "",
    passportCover: "",
    passportDataPage: "",
    nationalIdFront: "",
    nationalIdBack: "",
    driversLicenseFront: "",
    driversLicenseBack: "",
  },
  onNextChange,
  onBackChange,
  currentStepStatus,
  toggleMenu,
  isOpen,
  employeeName,
}) => {
  const { bgTheme } = useThemeClass();

  const onNext = (values, setSubmitting) => {
    onNextChange?.(values, "identification", setSubmitting);
  };

  const onBack = () => {
    onBackChange?.();
  };

  return (
    <>
      <ProfileFormHeader
        toggleMenu={toggleMenu}
        isOpen={isOpen}
        employeeName={employeeName}
        title={"Identification"}
        desc={"Upload relavant document to verify your identity."}
      />

      <Formik
        initialValues={data}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setTimeout(() => {
            onNext(values, setSubmitting);
          }, 1000);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => {
          const validatedProps = { touched, errors };
          console.log(values.documentType);
          const documentTypes = documentUploadDetails.find(
            (value) => value.value === values.documentType
          );
          const documentTypesForSelect = documentUploadDetails?.map((data) => ({
            value: data?.value,
            label: data?.label,
          }));
          return (
            <Form>
              <FormContainer>
                <FormItem
                  label={labelManager.identityInfo.documentTypeHeader}
                  invalid={errors.documentType && touched.documentType}
                  errorMessage={errors.documentType}
                  asterisk={true}
                >
                  <Field name={labelManager.identityInfo.documentTypeLowerCase}>
                    {({ field, form }) => (
                      <Select
                        placeholder={
                          labelManager.identityInfo.documentTypeHeader
                        }
                        field={field}
                        form={form}
                        options={documentTypesForSelect}
                        value={documentTypesForSelect.filter(
                          (document) => document.value === values.documentType
                        )}
                        onChange={(document) =>
                          form.setFieldValue(field.name, document.value)
                        }
                      />
                    )}
                  </Field>
                </FormItem>
                <div className="mb-6">
                  <h6>{labelManager.documentUploadInstructions}</h6>
                  <ul className="mt-4">
                    {documentTypes?.uploadDescription?.map((desc, index) => (
                      <li className="mb-2 flex items-center" key={desc + index}>
                        <Badge
                          className="rtl:ml-3 ltr:mr-3"
                          innerClass={bgTheme}
                        />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <DocumentUploadWithCollapse
                    validatedProps={validatedProps}
                    value={documentTypes?.value}
                    label={documentTypes?.label}
                    allowedFileType={documentTypes?.allowedFileType}
                    allowedFileTypeError={documentTypes?.allowedFileTypeError}
                  />
                </div>
                <FormFooterButton
                  negativeButtonLabel={labelManager.back}
                  isNegativeButtonVisible={true}
                  positiveButtonLabel={
                    currentStepStatus === labelManager.complete
                      ? labelManager.save
                      : labelManager.next
                  }
                  positiveButtonIcon={
                    currentStepStatus === labelManager.complete ? (
                      <AiOutlineSave />
                    ) : null
                  }
                  loading={isSubmitting}
                  onNegativeClick={onBack}
                />
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Identification;
