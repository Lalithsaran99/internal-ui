import { CollapseTopToBottom } from "components/shared/CollapseTopToBottom";
import { DocumentUploadField } from "components/shared/DocumentUploadField";
import { useState } from "react";
import { HiUpload } from "react-icons/hi";

export const DocumentUploadWithCollapse = (props) => {
  const {
    validatedProps,
    value,
    label,
    allowedFileType,
    allowedFileTypeError,
  } = props;

  const [collapse, setCollapse] = useState();

  const onPassportCollapse = () => {
    setCollapse(!collapse);
  };
  const beforeUpload = (files) => {
    let valid = true;
    if (files) {
      for (const file of files) {
        if (!allowedFileType.includes(file.type)) {
          valid = allowedFileTypeError;
        }
      }
    }

    return valid;
  };
  return (
    <CollapseTopToBottom
      collapse={collapse}
      title={label}
      onCollapse={onPassportCollapse}
    >
      <DocumentUploadField
        name={value}
        beforeUpload={beforeUpload}
        {...validatedProps}
      >
        <div className="text-6xl mb-4 flex justify-center">
          <HiUpload className="text-6xl" />
        </div>
      </DocumentUploadField>
    </CollapseTopToBottom>
  );
};
