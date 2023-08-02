import labelManager from "configs/label.config/label-manager";
import {
  HiOutlineCurrencyDollar,
  HiOutlineHome,
  HiOutlineUpload,
  HiOutlineUser,
} from "react-icons/hi";
import useThemeClass from "utils/hooks/useThemeClass";
const navigationIcon = {
  0: <HiOutlineUser />,
  1: <HiOutlineUpload />,
  2: <HiOutlineHome />,
  3: <HiOutlineCurrencyDollar />,
};

export const EmployeeMenuIcon = (props) => {
  const { stepStatus, stepValue } = props;
  const { textTheme } = useThemeClass();

  return (
    <>
      {stepStatus === labelManager.complete && (
        <div className={textTheme}>{navigationIcon[stepValue]}</div>
      )}
      {stepStatus === labelManager.current && (
        <div className="text-gray-400">{navigationIcon[stepValue]}</div>
      )}
      {stepStatus === labelManager.pending && (
        <div className="text-gray-400">{navigationIcon[stepValue]}</div>
      )}

      {stepStatus === labelManager.invalid && (
        <div className="text-gray-400">{navigationIcon[stepValue]}</div>
      )}
    </>
  );
};
