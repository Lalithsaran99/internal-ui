import { Button, FormContainer, FormItem, Input, Select } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { Field, Form, Formik } from "formik";
import CreatableSelect from "react-select/creatable";
import { fileTypes } from "views/employee/edit-employee/data";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  value: Yup.string().required("Please Enter Value"),
  label: Yup.string().required("Please Enter Label"),
  allowedFileType: Yup.array().min(1, "Select any one file type"),
  allowedFileTypeError: Yup.string().required(
    "Please Enter Allowed File Type Error"
  ),
});
export const DocumentEditForm = (props) => {
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
                  label={labelManager.value}
                  invalid={errors.value && touched.value}
                  errorMessage={errors.value}
                  asterisk={true}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name={labelManager.valueKey}
                    placeholder={labelManager.value}
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label={labelManager.label}
                  invalid={errors.label && touched.label}
                  errorMessage={errors.label}
                  asterisk={true}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name={labelManager.labelKey}
                    placeholder={labelManager.label}
                    component={Input}
                  />
                </FormItem>
              </div>
              <div className="md:grid grid-cols-2 gap-4">
                <FormItem
                  asterisk
                  label={labelManager.allowedFileType}
                  invalid={Boolean(
                    errors.allowedFileType && touched.allowedFileType
                  )}
                  errorMessage={errors.allowedFileType}
                >
                  <Field name={labelManager.allowedFileTypeKey}>
                    {({ field, form }) => (
                      <Select
                        isMulti
                        componentAs={CreatableSelect}
                        field={field}
                        form={form}
                        options={fileTypes}
                        value={values.allowedFileTypeKey}
                        onChange={(option) => {
                          form.setFieldValue(field.name, option);
                        }}
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem
                  label={labelManager.allowedFileTypeError}
                  invalid={
                    errors.allowedFileTypeError && touched.allowedFileTypeError
                  }
                  errorMessage={errors.allowedFileTypeError}
                  asterisk={true}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name={labelManager.allowedFileTypeErrorKey}
                    placeholder={labelManager.allowedFileTypeError}
                    component={Input}
                  />
                </FormItem>
              </div>
              <FormItem
                label={labelManager.uploadDescription}
                invalid={errors.uploadDescription && touched.uploadDescription}
                errorMessage={errors.uploadDescription}
              >
                <Field
                  textArea
                  autoComplete="off"
                  name={labelManager.uploadDescriptionKey}
                  placeholder={labelManager.uploadDescription}
                  component={Input}
                />
              </FormItem>
              <div className="flex items-center justify-end mt-6">
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
