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
      {stepStatus === "complete" && (
        <div className={textTheme}>{navigationIcon[stepValue]}</div>
      )}
      {stepStatus === "current" && (
        <div className="text-gray-400">{navigationIcon[stepValue]}</div>
      )}
      {stepStatus === "pending" && (
        <div className="text-gray-400">{navigationIcon[stepValue]}</div>
      )}

      {stepStatus === "invalid" && (
        <div className="text-gray-400">{navigationIcon[stepValue]}</div>
      )}
    </>
  );
};
