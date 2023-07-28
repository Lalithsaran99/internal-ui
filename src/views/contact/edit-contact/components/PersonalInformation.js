import {
  Input,
  InputGroup,
  Button,
  DatePicker,
  Select,
  FormItem,
  FormContainer,
} from "components/ui";
import { Field, Form, Formik } from "formik";
import NumberFormat from "react-number-format";
import { countryList } from "constants/countries.constant";
import { statusOptions } from "../constants";
import { components } from "react-select";
import * as Yup from "yup";
import labelManager from "configs/label.config/label-manager";

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
}) => {
  const onNext = (values, setSubmitting) => {
    onNextChange?.(values, "personalInformation", setSubmitting);
  };

  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">{labelManager.personalInformationText}</h3>
        <p>{labelManager.personalInfoDesc}</p>
      </div>
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
                <div className="flex justify-end gap-2">
                  <Button loading={isSubmitting} variant="solid" type="submit">
                    {currentStepStatus === "complete"
                      ? labelManager.save
                      : labelManager.next}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default personalInformation;
