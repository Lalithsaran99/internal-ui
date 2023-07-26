import { NavToggle } from "components/shared";

import { Profile } from "components/shared/profile";
import { ProfileEdit } from "components/shared/profile-edit";
import { Button } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { useEffect, useState } from "react";
import { List } from "../../components/shared/list";
import { people } from "./data";
import { ButtonGroup } from "components/shared/button-group";

const Contact = () => {
  const [contactId, setContactId] = useState();
  const [contact, setContact] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Set initial state to 'true' if you want the menu to be open by default

  const onClickEdit = () => {
    setIsEdit(true);
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

  return (
    <div className="container-fluid">
      <div className="flex justify-between">
        <h3 className="mb-4">{labelManager.contacts}</h3>
        <ButtonGroup
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
          isEdit={isEdit}
          setEdit={setIsEdit}
        />
      </div>
      <Button
        onClick={toggleMenu}
        shape="circle"
        variant="plain"
        icon={<NavToggle className="text-2xl" toggled={isOpen} />}
      />
      <div
        className={`${isOpen ? "grid grid-cols-1 md:grid-cols-3 gap-x-4" : ""}`}
      >
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } overflow-y-scroll h-[100vh] col-span-1 md:col-span-1`}
        >
          <List data={people} setId={setContactId} id={contactId} />
        </div>

        <div
          className={`${
            isOpen ? "md:col-span-2 col-span-1 overflow-y-scroll h-[100vh]" : ""
          } bg-gray-300`}
        >
          {!isEdit ? (
            <Profile data={contact} />
          ) : (
            <ProfileEdit data={contact} setEdit={setIsEdit} />
          )}
        </div>
      </div>
      {/* <div className="flex-1 bg-red-300 p-4">Column 3</div> */}
    </div>
  );
};
export default Contact;
