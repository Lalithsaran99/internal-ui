import { PhoneNumberInput } from "components/shared/PhoneNumber";
import { Button, FormContainer, FormItem, Input } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Please Enter First Name"),
  lastName: Yup.string().required("Please Enter First Name"),
  email: Yup.string().email("Invalid email").required("Email Required"),
});
export const ApplicantForm = (props) => {
  const {
    data,
    positiveButtonIcon,
    positiveButtonLabel,
    negativeButtonLabel,
    onNegativeClick,
    onPositiveClick,
  } = props;

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={data}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setTimeout(() => {
          onSubmit(values, setSubmitting);
        }, 1000);
      }}
    >
      {({ values, touched, errors, isSubmitting }) => {
        return (
          <Form>
            <FormContainer>
              <div className="md:grid grid-cols-2 gap-4">
                <FormItem
                  label={labelManager.firstNameLabel}
                  invalid={errors.firstName && touched.firstName}
                  errorMessage={errors.firstName}
                  asterisk={true}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name={labelManager.firstNameValue}
                    placeholder={labelManager.firstNameLabel}
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label={labelManager.lastNameLabel}
                  invalid={errors.lastName && touched.lastName}
                  errorMessage={errors.lastName}
                  asterisk={true}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name={labelManager.lastNameValue}
                    placeholder={labelManager.lastNameLabel}
                    component={Input}
                  />
                </FormItem>
              </div>
              <FormItem
                label={labelManager.emailLabel}
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
                asterisk={true}
              >
                <Field
                  type="email"
                  autoComplete="off"
                  name={labelManager.emailValue}
                  placeholder={labelManager.emailLabel}
                  component={Input}
                />
              </FormItem>
              {/* <PhoneNumberInput
                errors={errors}
                touched={touched}
                dialCodeValue={labelManager.dialCodeValue}
                dialCodeLabel={labelManager.dialCodeLabel}
                values={values}
                phoneNumberLabel={labelManager.mobileNoLabel}
                phoneNumberValue={labelManager.mobileNoValue}
              /> */}
              <div className="text-right mt-6">
                <Button
                  className="ltr:mr-2 rtl:ml-2"
                  variant="plain"
                  onClick={onNegativeClick}
                >
                  {negativeButtonLabel}
                </Button>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  icon={positiveButtonIcon}
                  variant="solid"
                  onClick={() => onPositiveClick()}
                >
                  {positiveButtonLabel}
                </Button>
              </div>
            </FormContainer>
          </Form>
        );
      }}
    </Formik>
  );
};
