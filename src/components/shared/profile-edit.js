import { Button, FormContainer, FormItem, Input } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  age: Yup.number()
    .min(18, "You must be at least 18 years old")
    .required("Age is required"),
  city: Yup.string().required("City is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
});

export const ProfileEdit = ({ data, setEdit }) => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here (e.g., API calls, etc.)
    console.log(values);
    setEdit(false);
    setSubmitting(false);
  };
  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img src={data?.imageUrl} alt="" className="rounded-full" />
            </div>
          </div>
        </div>
        <div className="p-20 mt-20 text-center border-b pb-12">
          <Formik
            initialValues={{
              username: data?.name,
              age: data?.age,
              city: data?.city,
              email: data?.email,
              role: data?.role,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <FormContainer>
                  <FormItem
                    label={labelManager.profile.username}
                    invalid={errors.username && touched.username}
                    errorMessage={errors.username}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name={labelManager.profileLowerCase.username}
                      placeholder={labelManager.profile.username}
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label={labelManager.profile.age}
                    invalid={errors.age && touched.age}
                    errorMessage={errors.age}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name={labelManager.profileLowerCase.age}
                      placeholder={labelManager.profile.age}
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label={labelManager.profile.city}
                    invalid={errors.city && touched.city}
                    errorMessage={errors.city}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name={labelManager.profileLowerCase.city}
                      placeholder={labelManager.profile.city}
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label={labelManager.profile.email}
                    invalid={errors.email && touched.email}
                    errorMessage={errors.email}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name={labelManager.profileLowerCase.email}
                      placeholder={labelManager.profile.email}
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label={labelManager.profile.role}
                    invalid={errors.role && touched.role}
                    errorMessage={errors.role}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name={labelManager.profileLowerCase.role}
                      placeholder={labelManager.profile.role}
                      component={Input}
                    />
                  </FormItem>
                  <Button variant="solid" type="submit" disabled={isSubmitting}>
                    {labelManager.submit}
                  </Button>
                </FormContainer>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
