import { Button } from "components/ui";

export const FormFooterButton = (props) => {
  const {
    onNegativeClick,
    isNegativeButtonVisible,
    negativeButtonLabel,
    positiveButtonLabel,
    loading,
  } = props;

  return (
    <div className="flex justify-end gap-2">
      {isNegativeButtonVisible && (
        <Button type="button" onClick={() => onNegativeClick()}>
          {negativeButtonLabel}
        </Button>
      )}
      <Button loading={loading} variant="solid" type="submit">
        {positiveButtonLabel}
      </Button>
    </div>
  );
};
