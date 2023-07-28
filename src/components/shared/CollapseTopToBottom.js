import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

export const CollapseTopToBottom = (props) => {
  const { collapse, onCollapse, title, children } = props;
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => onCollapse()}
        >
          <span className="text-lg">
            {collapse ? <HiChevronRight /> : <HiChevronDown />}
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
          opacity: collapse ? 0 : 1,
          height: collapse ? 0 : "auto",
        }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
