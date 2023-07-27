import { Button, InputGroup } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { useState } from "react";
import { HiOutlineDotsHorizontal, HiTrash, HiX } from "react-icons/hi";

export const ButtonGroup = ({ props }) => {
  const { onClickEdit, onClickDelete, isEditVisible, setEditClose } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onClickClose = () => {
    setEditClose(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <InputGroup size="sm">
      <Button variant="solid" onClick={() => onClickEdit()}>
        {labelManager.edit}
      </Button>
      <Button onClick={handleToggle}>
        <HiOutlineDotsHorizontal />
      </Button>
      {isOpen && (
        <div className="absolute top-20 right-0 bg-white shadow-lg rounded">
          <ul className="py-2">
            <li
              onClick={() => onClickDelete()}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer "
            >
              <div className="flex justify-between items-center">
                <HiTrash className="text-red-500" />{" "}
                <span className="text-red-500">{labelManager.delete}</span>
              </div>
            </li>
            {isEditVisible ? (
              <li
                onClick={onClickClose}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer "
              >
                <div className="flex justify-between items-center">
                  <HiX />
                  {labelManager.close}
                </div>
              </li>
            ) : null}
          </ul>
        </div>
      )}
    </InputGroup>
  );
};
