import { Button } from "components/ui";

export const FormFooterButton = (props) => {
  const {
    onNegativeClick,
    onPositiveClick,
    isNegativeButtonVisible,
    negativeButtonLabel,
    positiveButtonLabel,
    positiveButtonIcon,
    loading,
  } = props;

  return (
    <div className="flex justify-end gap-2 sticky -bottom-1 -mx-8 px-8 py-4 border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      {isNegativeButtonVisible && (
        <Button type="button" onClick={() => onNegativeClick()}>
          {negativeButtonLabel}
        </Button>
      )}
      <Button
        loading={loading}
        variant="solid"
        type="submit"
        onClick={() => onPositiveClick?.()}
        icon={positiveButtonIcon ? positiveButtonIcon : null}
      >
        {positiveButtonLabel}
      </Button>
    </div>
  );
};
