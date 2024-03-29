import { FormFooterButton } from "components/shared/FormFooterButton";
import {
  DatePicker,
  FormContainer,
  FormItem,
  Input,
  InputGroup,
  Select,
} from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { countryList } from "constants/countries.constant";
import { Field, Form, Formik } from "formik";
import { AiOutlineSave } from "react-icons/ai";
import NumberFormat from "react-number-format";
import { components } from "react-select";
import * as Yup from "yup";
import { statusOptions } from "../constants";
import { ProfileFormHeader } from "../utils/FormHeader";
import "./styles.css";

const { SingleValue } = components;

const genderOptions = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
  { label: "Others", value: "O" },
];

const NumberInput = (props) => {
  return <Input {...props} value={props.field.value} />;
};

const NumberFormatInput = ({ onValueChange, ...rest }) => {
  return (
    <NumberFormat
      customInput={Input}
      type="text"
      onValueChange={onValueChange}
      autoComplete="off"
      {...rest}
    />
  );
};

const PhoneSelectOption = ({ innerProps, data, isSelected }) => {
  return (
    <div
      className={`cursor-pointer flex items-center justify-between p-2 ${
        isSelected
          ? "bg-gray-100 dark:bg-gray-500"
          : "hover:bg-gray-50 dark:hover:bg-gray-600"
      }`}
      {...innerProps}
    >
      <div className="flex items-center gap-2">
        <span>
          ({data.value}) {data.dialCode}
        </span>
      </div>
    </div>
  );
};

const PhoneControl = ({ children, ...props }) => {
  const selected = props.getValue()[0];
  return (
    <SingleValue {...props}>
      {selected && <span>{selected.dialCode}</span>}
    </SingleValue>
  );
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name Required"),
  lastName: Yup.string().required("Last Name Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  nationality: Yup.string().required("Please select your nationality"),
  phoneNumber: Yup.string().required("Please enter your phone number"),
  dob: Yup.string().required("Please enter your date of birth"),
  gender: Yup.string().required("Please enter your gender"),
  maritalStatus: Yup.string().required("Please enter your marital status"),
  dialCode: Yup.string().required("Please select dial code"),
});

const personalInformation = ({
  data = {
    firstName: "",
    lastName: "",
    email: "",
    residentCountry: "",
    nationality: "",
    dialCode: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    maritalStatus: "",
  },
  onNextChange,
  currentStepStatus,
  toggleMenu,
  isOpen,
  employeeName,
}) => {
  const onNext = (values, setSubmitting) => {
    onNextChange?.(values, "personalInformation", setSubmitting);
  };

  return (
    <>
      <ProfileFormHeader
        toggleMenu={toggleMenu}
        isOpen={isOpen}
        employeeName={employeeName}
        title={labelManager.personalInformationText}
        desc={labelManager.personalInfoDesc}
      />
      <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setTimeout(() => {
            onNext(values, setSubmitting);
          }, 1000);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => {
          return (
            <Form>
              <FormContainer>
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem
                    label={labelManager.personalInformation.firstName}
                    invalid={errors.firstName && touched.firstName}
                    errorMessage={errors.firstName}
                    asterisk={true}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name={labelManager.personalInformationLowerCase.firstName}
                      placeholder={labelManager.personalInformation.firstName}
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label={labelManager.personalInformation.lastName}
                    invalid={errors.lastName && touched.lastName}
                    errorMessage={errors.lastName}
                    asterisk={true}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name={labelManager.personalInformationLowerCase.lastName}
                      placeholder={labelManager.personalInformation.lastName}
                      component={Input}
                    />
                  </FormItem>
                </div>
                <FormItem
                  label={labelManager.personalInformation.email}
                  invalid={errors.email && touched.email}
                  errorMessage={errors.email}
                  asterisk={true}
                >
                  <Field
                    type="email"
                    autoComplete="off"
                    name={labelManager.personalInformationLowerCase.email}
                    placeholder={labelManager.personalInformation.email}
                    component={Input}
                  />
                </FormItem>
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem
                    label={labelManager.personalInformation.gender}
                    invalid={errors.gender && touched.gender}
                    errorMessage={errors.gender}
                    asterisk={true}
                  >
                    <Field
                      name={labelManager.personalInformationLowerCase.gender}
                    >
                      {({ field, form }) => (
                        <Select
                          placeholder={labelManager.personalInformation.gender}
                          field={field}
                          form={form}
                          options={genderOptions}
                          value={genderOptions.filter(
                            (gender) => gender.value === values.gender
                          )}
                          onChange={(gender) =>
                            form.setFieldValue(field.name, gender.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                  <FormItem
                    label={labelManager.personalInformation.maritalStatus}
                    invalid={errors.maritalStatus && touched.maritalStatus}
                    errorMessage={errors.maritalStatus}
                    asterisk={true}
                  >
                    <Field
                      name={
                        labelManager.personalInformationLowerCase.maritalStatus
                      }
                    >
                      {({ field, form }) => (
                        <Select
                          placeholder={
                            labelManager.personalInformation.maritalStatus
                          }
                          field={field}
                          form={form}
                          options={statusOptions}
                          value={statusOptions.filter(
                            (status) => status.value === values.maritalStatus
                          )}
                          onChange={(status) =>
                            form.setFieldValue(field.name, status.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                </div>
                <FormItem
                  label={labelManager.personalInformation.nationality}
                  invalid={errors.nationality && touched.nationality}
                  errorMessage={errors.nationality}
                  asterisk={true}
                >
                  <Field
                    name={labelManager.personalInformationLowerCase.nationality}
                  >
                    {({ field, form }) => (
                      <Select
                        placeholder={
                          labelManager.personalInformation.nationality
                        }
                        field={field}
                        form={form}
                        options={countryList}
                        value={countryList.filter(
                          (country) => country.value === values.nationality
                        )}
                        onChange={(country) =>
                          form.setFieldValue(field.name, country.value)
                        }
                      />
                    )}
                  </Field>
                </FormItem>
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem
                    label={labelManager.personalInformation.phoneNumber}
                    invalid={
                      (errors.dialCode && touched.dialCode) ||
                      (errors.phoneNumber && touched.phoneNumber)
                    }
                    errorMessage="Please enter your phone number"
                    asterisk={true}
                  >
                    <InputGroup>
                      <Field
                        name={
                          labelManager.personalInformationLowerCase.dialCode
                        }
                      >
                        {({ field, form }) => (
                          <Select
                            className="min-w-[120px]"
                            placeholder={
                              labelManager.personalInformation.dialCode
                            }
                            components={{
                              Option: PhoneSelectOption,
                              SingleValue: PhoneControl,
                            }}
                            field={field}
                            form={form}
                            options={countryList}
                            value={countryList.filter(
                              (country) => country.value === values.dialCode
                            )}
                            onChange={(country) =>
                              form.setFieldValue(field.name, country.value)
                            }
                          />
                        )}
                      </Field>
                      <Field
                        name={
                          labelManager.personalInformationLowerCase.phoneNumber
                        }
                      >
                        {({ field, form }) => {
                          return (
                            <NumberFormatInput
                              form={form}
                              field={field}
                              className="z-0"
                              customInput={NumberInput}
                              placeholder={
                                labelManager.personalInformation.phoneNumber
                              }
                              onValueChange={(e) => {
                                form.setFieldValue(field.name, e.value);
                              }}
                            />
                          );
                        }}
                      </Field>
                    </InputGroup>
                  </FormItem>
                  <FormItem
                    label={labelManager.personalInformation.dob}
                    invalid={errors.dob && touched.dob}
                    errorMessage={errors.dob}
                    asterisk={true}
                  >
                    <Field
                      name={labelManager.personalInformationLowerCase.dob}
                      placeholder="Date"
                    >
                      {({ field, form }) => (
                        <DatePicker
                          field={field}
                          form={form}
                          value={field.value}
                          onChange={(date) => {
                            form.setFieldValue(field.name, date);
                          }}
                        />
                      )}
                    </Field>
                  </FormItem>
                </div>
                <FormFooterButton
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
                />
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default personalInformation;
