import { FormFooterButton } from "components/shared/FormFooterButton";
import { DatePicker, FormContainer, FormItem } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { Item, Form as DxForm } from "devextreme-react/form";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  subject: Yup.string().required("Subject Required"),
  date: Yup.string().required("Date Required"),
});

export const LeaveForm = () => {
  const onNext = (values, setSubmitting) => {
    console.log(values, "personalInformation", setSubmitting);
  };

  return (
    <Formik
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
          <DxForm>
            <Form>
              <FormContainer>
                <Item>
                  <FormItem
                    label={"Date"}
                    invalid={errors.date && touched.date}
                    errorMessage={errors.date}
                    asterisk={true}
                  >
                    <Field name={"date"} placeholder="Date">
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
                </Item>
                <FormFooterButton
                  positiveButtonLabel={labelManager.submit}
                  loading={isSubmitting}
                />
              </FormContainer>
            </Form>
          </DxForm>
        );
      }}
    </Formik>
  );
};
