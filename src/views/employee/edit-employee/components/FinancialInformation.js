import { FormFooterButton } from "components/shared/FormFooterButton";
import { Button, FormContainer, FormItem, Input } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { Field, Form, Formik } from "formik";
import NumberFormat from "react-number-format";
import * as Yup from "yup";
import { ProfileFormHeader } from "../utils/FormHeader";
import { AiOutlineSave } from "react-icons/ai";

const excludedOccupation = ["unemployed", "student", "retired"];

const validationSchema = Yup.object().shape({
  accountNo: Yup.string().required("Please Enter your Account number"),
  ifsc: Yup.string().required("Please enter your IFSC"),
  accountType: Yup.string().required("Please choose your account type"),
  bankName: Yup.string().required("Please Enter Bank name"),
  accountHolderName: Yup.string().required("Please Enter Account Holder Name"),
});

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

const FinancialInformation = ({
  data = {
    accountNo: "",
    ifsc: "",
    accountType: "",
    bankName: "",
    accountHolderName: "",
  },
  onComplete,
  onBackChange,
  currentStepStatus,
  toggleMenu,
  isOpen,
  employeeName
}) => {
  const onSubmit = (values, setSubmitting) => {
    onComplete?.(values, "financialInformation", setSubmitting);
  };

  const onBack = () => {
    onBackChange?.();
  };

  return (
    <>
      <ProfileFormHeader
        toggleMenu={toggleMenu}
        employeeName={employeeName}
        isOpen={isOpen}
        title={labelManager.financialInfo.title}
        desc={labelManager.financialInfo.desc}
      />
      <Formik
        initialValues={data}
        enableReinitialize
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
                <div>
                  <h5 className="mb-4">
                    {labelManager.financialInfo.accountDetails}
                  </h5>
                  <div className="md:grid grid-cols-2 gap-4">
                    <FormItem
                      label={labelManager.financialInfo.accountNo}
                      invalid={errors.accountNo && touched.accountNo}
                      errorMessage={errors.accountNo}
                      asterisk={true}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name={labelManager.financialInfoLowerCase.accountNo}
                        placeholder={labelManager.financialInfo.accountNo}
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      label={labelManager.financialInfo.ifsc}
                      invalid={errors.ifsc && touched.ifsc}
                      errorMessage={errors.ifsc}
                      asterisk={true}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name={labelManager.financialInfoLowerCase.ifsc}
                        placeholder={labelManager.financialInfo.ifsc}
                        component={Input}
                      />
                    </FormItem>
                  </div>
                </div>
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem
                    label={labelManager.financialInfo.accountType}
                    invalid={errors.accountType && touched.accountType}
                    errorMessage={errors.accountType}
                    asterisk={true}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name={labelManager.financialInfoLowerCase.accountType}
                      placeholder={labelManager.financialInfo.accountType}
                      component={Input}
                    />
                  </FormItem>
                  <div className="md:grid grid-cols-2 gap-4">
                    <FormItem
                      label={labelManager.financialInfo.accountHolderName}
                      invalid={
                        errors.accountHolderName && touched.accountHolderName
                      }
                      errorMessage={errors.accountHolderName}
                      asterisk={true}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name={
                          labelManager.financialInfoLowerCase.accountHolderName
                        }
                        placeholder={
                          labelManager.financialInfo.accountHolderName
                        }
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label={labelManager.financialInfo.bankName}
                      invalid={errors.bankName && touched.bankName}
                      errorMessage={errors.bankName}
                      asterisk={true}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name={labelManager.financialInfoLowerCase.bankName}
                        placeholder={labelManager.financialInfo.bankName}
                        component={Input}
                      />
                    </FormItem>
                  </div>
                </div>
                <FormFooterButton
                  positiveButtonLabel={labelManager.submit}
                  negativeButtonLabel={labelManager.back}
                  isNegativeButtonVisible={true}
                  positiveButtonIcon={<AiOutlineSave />}
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

export default FinancialInformation;
