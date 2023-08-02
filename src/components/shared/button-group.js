import { Button, Dropdown, InputGroup } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { HiOutlineDotsHorizontal, HiTrash, HiX } from "react-icons/hi";

export const ButtonGroup = ({ props }) => {
  const { onClickEdit, onClickDelete, isEditVisible, setEditClose } = props;

  const onClickClose = () => {
    setEditClose(false);
  };

  return (
    <InputGroup size="sm">
      <Button variant="solid" onClick={() => onClickEdit?.()}>
        {labelManager.edit}
      </Button>
      <Dropdown
        placement="bottom-end"
        trigger="hover"
        renderTitle={<Button icon={<HiOutlineDotsHorizontal />} />}        
      >
        <Dropdown.Item onClick={() => onClickDelete?.()}>
          <HiTrash className="text-red-500" />{" "}
          <span className="text-red-500">{labelManager.delete}</span>
        </Dropdown.Item>
        {isEditVisible ? (
          <Dropdown.Item onClick={onClickClose}>
            <HiX />
            {labelManager.close}
          </Dropdown.Item>
        ) : null}
      </Dropdown>
    </InputGroup>
  );
};
