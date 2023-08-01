import { NavToggle } from "components/shared";

import { ButtonGroup } from "components/shared/button-group";
import { Profile } from "components/shared/profile";
import { ProfileEdit } from "components/shared/profile-edit";
import { Button, Input, InputGroup } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { useEffect, useState } from "react";
import { List } from "../../components/shared/list";
import { people } from "./data";
import { useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";

const Contact = () => {
  const [contactId, setContactId] = useState();
  const [employee, setContact] = useState();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const onClickEdit = () => {
    navigate(`/employee/edit/${contactId}`);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onClickDelete = () => {
    console.log("delete");
  };

  useEffect(() => {
    if (!contactId) setContactId(1);
    setContact(people.find((id) => id.id === contactId));
  }, [contactId]);

  const buttonGroupProps = {
    onClickEdit,
    onClickDelete,
  };

  return (
    <div className="container-fluid">
      <div className="flex justify-between">
        <h3 className="mb-4">{labelManager.employees}</h3>
        <ButtonGroup props={buttonGroupProps} />
      </div>
      <div
        className={`${isOpen ? "grid grid-cols-1 sm:grid-cols-3 gap-x-4" : ""}`}
      >
        <Button
          onClick={toggleMenu}
          className={`${isOpen ? "hidden" : ""}`}
          icon={<NavToggle className="text-2xl" toggled={isOpen} />}
        />
        <div
          className={`${isOpen ? "block" : "hidden"} col-span-1 sm:col-span-1`}
        >
          <InputGroup className="mb-4">
            <Button
              onClick={toggleMenu}
              icon={<NavToggle className="text-2xl" toggled={isOpen} />}
            />
            <Input
              placeholder="Search"
              className="z-10"
              suffix={<HiOutlineSearch className="text-lg" />}
            />
          </InputGroup>
          <List data={people} setId={setContactId} id={contactId} />
        </div>
        <div
          className={`${isOpen ? "h-[100vh] col-span-1 sm:col-span-2" : ""}`}
        >
          <Profile data={employee} />
        </div>
      </div>
    </div>
  );
};
export default Contact;
