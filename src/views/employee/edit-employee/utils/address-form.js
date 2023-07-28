import { FormItem, Input, Select } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { countryList } from "constants/countries.constant";
import { Field } from "formik";
import get from "lodash/get";
import { useCallback } from "react";

export const AddressForm = (props) => {
  const {
    values,
    touched,
    errors,
    countryName,
    addressLine1Name,
    addressLine2Name,
    cityName,
    stateName,
    zipCodeName,
  } = props;

  const getError = useCallback(
    (name) => {
      return get(errors, name);
    },
    [errors]
  );

  const getTouched = useCallback(
    (name) => {
      return get(touched, name);
    },
    [touched]
  );

  return (
    <>
      <div className="md:grid grid-cols-2 gap-4">
        <FormItem
          label={labelManager.addressInfo.country}
          invalid={getError(countryName) && getTouched(countryName)}
          errorMessage={getError(countryName)}
          asterisk={true}
        >
          <Field name={countryName}>
            {({ field, form }) => (
              <Select
                placeholder={labelManager.addressInfo.country}
                field={field}
                form={form}
                options={countryList}
                value={countryList.filter(
                  (c) => c.value === get(values, countryName)
                )}
                onChange={(c) => form.setFieldValue(field.name, c.value)}
              />
            )}
          </Field>
        </FormItem>
        <FormItem
          label={labelManager.addressInfo.addressLine1}
          invalid={getError(addressLine1Name) && getTouched(addressLine1Name)}
          errorMessage={getError(addressLine1Name)}
          asterisk={true}
        >
          <Field
            type="text"
            autoComplete="off"
            name={addressLine1Name}
            placeholder={labelManager.addressInfo.addressLine1}
            component={Input}
          />
        </FormItem>
      </div>
      <div className="md:grid grid-cols-2 gap-4">
        <FormItem
          label={labelManager.addressInfo.addressLine2}
          invalid={getError(addressLine2Name) && getTouched(addressLine2Name)}
          errorMessage={getError(addressLine2Name)}
          asterisk={true}
        >
          <Field
            type="text"
            autoComplete="off"
            name={addressLine2Name}
            placeholder={labelManager.addressInfo.addressLine2}
            component={Input}
          />
        </FormItem>
        <FormItem
          label={labelManager.addressInfo.city}
          invalid={getError(cityName) && getTouched(cityName)}
          errorMessage={getError(cityName)}
          asterisk={true}
        >
          <Field
            type="text"
            autoComplete="off"
            name={cityName}
            placeholder={labelManager.addressInfo.city}
            component={Input}
          />
        </FormItem>
      </div>
      <div className="md:grid grid-cols-2 gap-4">
        <FormItem
          label={labelManager.addressInfo.state}
          invalid={getError(stateName) && getTouched(stateName)}
          errorMessage={getError(stateName)}
          asterisk={true}
        >
          <Field
            type="text"
            autoComplete="off"
            name={stateName}
            placeholder={labelManager.addressInfo.state}
            component={Input}
          />
        </FormItem>
        <FormItem
          label={labelManager.addressInfo.zipCode}
          invalid={getError(zipCodeName) && getTouched(zipCodeName)}
          errorMessage={getError(zipCodeName)}
          asterisk={true}
        >
          <Field
            type="text"
            autoComplete="off"
            name={zipCodeName}
            placeholder={labelManager.addressInfo.zipCode}
            component={Input}
          />
        </FormItem>
      </div>
    </>
  );
};
