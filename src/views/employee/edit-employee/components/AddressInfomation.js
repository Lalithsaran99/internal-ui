import { FormFooterButton } from "components/shared/FormFooterButton";
import { FormContainer } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { Form, Formik } from "formik";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import { ProfileFormHeader } from "../utils/FormHeader";
import { AddressForm } from "../utils/address-form";

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Please select country"),
  addressLine1: Yup.string().required("Please enter your address"),
  addressLine2: Yup.string(),
  city: Yup.string().required("Please enter your city"),
  state: Yup.string().required("Please enter your state"),
  zipCode: Yup.string().required("Please enter zip code"),
});

const AddressInfomation = ({
  data = {
    country: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    sameCorrespondenceAddress: true,
    correspondenceAddress: {
      country: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
    },
  },
  onNextChange,
  onFinish,
  onBackChange,
  currentStepStatus,
  toggleMenu,
  isOpen,
  employeeName,
}) => {
  const onNext = (values, setSubmitting) => {
    onNextChange?.(values, "addressInformation", setSubmitting);
  };

  const onSubmit = (values, setSubmitting) => {
    onFinish?.(values, "addressInformation", setSubmitting);
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
        title={labelManager.addressInfo.title}
        desc={labelManager.addressInfo.desc}
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
        {({ values, touched, errors, setFieldValue, isSubmitting }) => {
          const formProps = { values, touched, errors };
          return (
            <Form>
              <FormContainer>
                <h5 className="mb-4">
                  {labelManager.addressInfo.permanentAddress}
                </h5>
                <AddressForm
                  countryName={labelManager.addressInfoLowerCase.country}
                  addressLine1Name={
                    labelManager.addressInfoLowerCase.addressLine1
                  }
                  addressLine2Name={
                    labelManager.addressInfoLowerCase.addressLine2
                  }
                  cityName={labelManager.addressInfoLowerCase.city}
                  stateName={labelManager.addressInfoLowerCase.state}
                  zipCodeName={labelManager.addressInfoLowerCase.zipCode}
                  {...formProps}
                />
                <FormFooterButton
                  isNegativeButtonVisible={true}
                  negativeButtonLabel={labelManager.back}
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

export default AddressInfomation;
