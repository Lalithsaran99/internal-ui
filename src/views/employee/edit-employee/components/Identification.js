import { DriversLicenseSvg, NationalIdSvg, PassportSvg } from "assets/svg";
import classNames from "classnames";
import {
  DoubleSidedImage,
  SegmentItemOption,
  SvgIcon,
} from "components/shared";
import { Badge, Button, FormContainer, FormItem, Segment } from "components/ui";
import { Field, Form, Formik } from "formik";
import useThemeClass from "utils/hooks/useThemeClass";

import { DocumentUploadField } from "components/shared/DocumentUploadField";
import labelManager from "configs/label.config/label-manager";
import * as Yup from "yup";

import { CollapseTopToBottom } from "components/shared/CollapseTopToBottom";
import { useState } from "react";

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

const DocumentTypeIcon = ({ type }) => {
  switch (type) {
    case "passport":
      return <PassportSvg />;
    case "nationalId":
      return <NationalIdSvg />;
    case "driversLicense":
      return <DriversLicenseSvg />;
    default:
      return null;
  }
};

const Identification = ({
  data = {
    documentType: "passport",
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
}) => {
  const { textTheme, bgTheme } = useThemeClass();

  const [passportCollapse, setPassPortCollapse] = useState(false);
  const [passportDataCoverCollapse, setPassportDataCoverCollapse] =
    useState(false);

  const onNext = (values, setSubmitting) => {
    onNextChange?.(values, "identification", setSubmitting);
  };

  const onBack = () => {
    onBackChange?.();
  };

  const onPassportCollapse = () => {
    setPassPortCollapse(!passportCollapse);
  };

  const onPassportDataCoverCollapse = () => {
    setPassportDataCoverCollapse(!passportDataCoverCollapse);
  };

  const beforeUpload = (files) => {
    let valid = true;

    const allowedFileType = ["image/jpeg", "image/png"];
    if (files) {
      for (const file of files) {
        if (!allowedFileType.includes(file.type)) {
          valid = "Please upload a .jpeg or .png file!";
        }
      }
    }

    return valid;
  };

  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">Identification</h3>
        <p>Upload relavant document to verify your identity.</p>
      </div>
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
                      <Segment
                        className="flex xl:items-center flex-col xl:flex-row gap-4"
                        value={[field.value]}
                        onChange={(val) =>
                          form.setFieldValue(field.name, val[0])
                        }
                      >
                        <>
                          {labelManager.identityInfo.documentTypes.map(
                            (item, index) => (
                              <Segment.Item
                                value={item.value}
                                key={item.value}
                                disabled={item.disabled}
                              >
                                {({
                                  ref,
                                  active,
                                  value,
                                  onSegmentItemClick,
                                  disabled,
                                }) => {
                                  return (
                                    <SegmentItemOption
                                      ref={ref}
                                      active={active}
                                      disabled={disabled}
                                      className="w-full xl:w-[260px]"
                                      onSegmentItemClick={onSegmentItemClick}
                                    >
                                      <div className="flex items-center">
                                        <SvgIcon
                                          className={classNames(
                                            "text-4xl ltr:mr-3 rtl:ml-3",
                                            active && textTheme
                                          )}
                                        >
                                          <DocumentTypeIcon type={value} />
                                        </SvgIcon>
                                        <h6>{item.label}</h6>
                                      </div>
                                    </SegmentItemOption>
                                  );
                                }}
                              </Segment.Item>
                            )
                          )}
                        </>
                      </Segment>
                    )}
                  </Field>
                </FormItem>
                <div className="mb-6">
                  <h6>
                    In order to complete upload and avoid delays when verifying
                    account, Please make sure below:
                  </h6>
                  <ul className="mt-4">
                    {labelManager.identityInfo.documentUploadDescription[
                      values.documentType
                    ].map((desc, index) => (
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
                  {values.documentType === "passport" && (
                    <>
                      <CollapseTopToBottom
                        collapse={passportCollapse}
                        title={"Passport Cover"}
                        onCollapse={onPassportCollapse}
                      >
                        <DocumentUploadField
                          name="passportCover"
                          label="Passport Cover"
                          beforeUpload={beforeUpload}
                          {...validatedProps}
                        >
                          <DoubleSidedImage
                            className="mx-auto mb-3"
                            src="/img/thumbs/passport.png"
                            darkModeSrc="/img/thumbs/passport-dark.png"
                            alt=""
                          />
                        </DocumentUploadField>
                      </CollapseTopToBottom>
                      <CollapseTopToBottom
                        collapse={passportDataCoverCollapse}
                        title={"Passport Data Cover"}
                        onCollapse={onPassportDataCoverCollapse}
                      >
                        <DocumentUploadField
                          name="passportDataPage"
                          label="Passport Data Page"
                          beforeUpload={beforeUpload}
                          {...validatedProps}
                        >
                          <DoubleSidedImage
                            className="mx-auto mb-3"
                            src="/img/thumbs/passport-data.png"
                            darkModeSrc="/img/thumbs/passport-data-dark.png"
                            alt=""
                          />
                        </DocumentUploadField>
                      </CollapseTopToBottom>
                    </>
                  )}
                  {values.documentType === "nationalId" && (
                    <>
                      <CollapseTopToBottom
                        collapse={passportCollapse}
                        title={"National Id Front"}
                        onCollapse={onPassportCollapse}
                      >
                        <DocumentUploadField
                          name="nationalIdFront"
                          label="National Id Front"
                          beforeUpload={beforeUpload}
                          {...validatedProps}
                        >
                          <DoubleSidedImage
                            className="mx-auto mb-3"
                            src="/img/thumbs/id-card-front.png"
                            darkModeSrc="/img/thumbs/id-card-front-dark.png"
                            alt=""
                          />
                        </DocumentUploadField>
                      </CollapseTopToBottom>
                      <CollapseTopToBottom
                        collapse={passportCollapse}
                        title={"National Id Back"}
                        onCollapse={onPassportCollapse}
                      >
                        <DocumentUploadField
                          name="nationalIdBack"
                          label="National Id Back"
                          beforeUpload={beforeUpload}
                          {...validatedProps}
                        >
                          <DoubleSidedImage
                            className="mx-auto mb-3"
                            src="/img/thumbs/id-card-back.png"
                            darkModeSrc="/img/thumbs/id-card-back-dark.png"
                            alt=""
                          />
                        </DocumentUploadField>
                      </CollapseTopToBottom>
                    </>
                  )}
                  {values.documentType === "driversLicense" && (
                    <>
                      <CollapseTopToBottom
                        collapse={passportCollapse}
                        title={"Drivers License Front"}
                        onCollapse={onPassportCollapse}
                      >
                        <DocumentUploadField
                          name="driversLicenseFront"
                          label="Drivers License Front"
                          beforeUpload={beforeUpload}
                          {...validatedProps}
                        >
                          <DoubleSidedImage
                            className="mx-auto mb-3"
                            src="/img/thumbs/drivers-license-front.png"
                            darkModeSrc="/img/thumbs/drivers-license-front-dark.png"
                            alt=""
                          />
                        </DocumentUploadField>
                      </CollapseTopToBottom>
                      <CollapseTopToBottom
                        collapse={passportCollapse}
                        title={"Drivers License Back"}
                        onCollapse={onPassportCollapse}
                      >
                        <DocumentUploadField
                          name="driversLicenseBack"
                          label="Drivers License Back"
                          beforeUpload={beforeUpload}
                          {...validatedProps}
                        >
                          <DoubleSidedImage
                            className="mx-auto mb-3"
                            src="/img/thumbs/drivers-license-back.png"
                            darkModeSrc="/img/thumbs/drivers-license-back-dark.png"
                            alt=""
                          />
                        </DocumentUploadField>
                      </CollapseTopToBottom>
                    </>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" onClick={onBack}>
                    {labelManager.back}
                  </Button>
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

export default Identification;
