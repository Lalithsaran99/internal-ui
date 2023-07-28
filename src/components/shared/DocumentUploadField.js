import { FormItem, Upload } from "components/ui";

import { Field } from "formik";

export const DocumentUploadField = (props) => {
  const { label, name, children, touched, errors, beforeUpload } = props;

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, URL.createObjectURL(file[0]));
  };

  const beforeUploadFile = (files) => {
    return beforeUpload?.(files);
  };

  return (
    <FormItem
      label={label}
      invalid={errors[name] && touched[name]}
      errorMessage={errors[name]}
    >
      <Field name={name}>
        {({ field, form }) => (
          <Upload
            draggable
            className="cursor-pointer h-[300px]"
            beforeUpload={beforeUploadFile}
            onChange={(files) => onSetFormFile(form, field, files)}
            onFileRemove={(files) => onSetFormFile(form, field, files)}
            showList={true}
            uploadLimit={1}
          >
            <div className="text-center">
              {children}
              <p className="font-semibold">
                <span className="text-gray-800 dark:text-white">
                  Drop your image here, or{" "}
                </span>
                <span className="text-blue-500">browse</span>
              </p>
              <p className="mt-1 opacity-60 dark:text-white">
                Support: jpeg, png
              </p>
            </div>
          </Upload>
        )}
      </Field>
    </FormItem>
  );
};
