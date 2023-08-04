import { FormItem, Input, InputGroup, Select } from "components/ui";
import { countryList } from "constants/countries.constant";
import { Field } from "formik";
import { components } from "react-select";

import NumberFormat from "react-number-format";
const { SingleValue } = components;

export const PhoneNumberInput = (props) => {
  const {
    dialCodeValue,
    values,
    phoneNumberValue,
    dialCodeLabel,
    phoneNumberLabel,
    errors,
    touched,
  } = props;
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

  return (
    <FormItem
      label={phoneNumberLabel}
      invalid={
        (errors.dialCode && touched.dialCode) ||
        (errors.mobileNo && touched.mobileNo)
      }
      errorMessage="Please enter your mobile number"
      asterisk={true}
    >
      <InputGroup>
        <Field name={dialCodeValue}>
          {({ field, form }) => (
            <Select
              className="min-w-[120px]"
              placeholder={dialCodeLabel}
              components={{
                Option: PhoneSelectOption,
                SingleValue: PhoneControl,
              }}
              field={field}
              form={form}
              options={countryList}
              value={countryList.filter(
                (country) => country.value === values?.dialCode
              )}
              onChange={(country) =>
                form.setFieldValue(field.name, country.value)
              }
            />
          )}
        </Field>
        <Field name={phoneNumberValue}>
          {({ field, form }) => {
            console.log(form);
            return (
              <NumberFormatInput
                form={form}
                field={field}
                className="z-0"
                customInput={NumberInput}
                placeholder={phoneNumberLabel}
                onValueChange={(e) => {
                  form.setFieldValue(field.name, e.value);
                }}
              />
            );
          }}
        </Field>
      </InputGroup>
    </FormItem>
  );
};
