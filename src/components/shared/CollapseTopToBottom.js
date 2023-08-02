import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

export const CollapseTopToBottom = (props) => {
  const { collapse, onCollapse, title, children } = props;
  console.log(collapse,'collapse', collapse ? 0 : 1)
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => onCollapse()}
        >
          <span className="text-lg">
            {collapse ? <HiChevronDown /> : <HiChevronRight />}
          </span>
          <h5>{title}</h5>
        </div>
      </div>
      <motion.div
        initial={{
          opacity: 0,
          height: 0,
          overflow: "hidden",
        }}
        animate={{
          opacity: collapse ? 1 : 0,
          height: collapse ? "auto" : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
