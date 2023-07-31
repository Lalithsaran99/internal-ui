import {
  HiArrowNarrowLeft,
  HiArrowNarrowRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

const NavToggleArrow = ({ toggled, className }) => {
  return (
    <div className={className}>
      {toggled ? <HiChevronLeft /> : <HiChevronRight />}
    </div>
  );
};

export default NavToggleArrow;
