import { NavToggle } from "components/shared";

import { ButtonGroup } from "components/shared/button-group";
import { Profile } from "components/shared/profile";
import { ProfileEdit } from "components/shared/profile-edit";
import { Button } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { useEffect, useState } from "react";
import { List } from "../../components/shared/list";
import { people } from "./data";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [contactId, setContactId] = useState();
  const [contact, setContact] = useState();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const onClickEdit = () => {
    navigate(`/contact/edit/${contactId}`);
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

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const editProps = {
    handleSubmit,
    data: contact,
  };

  const buttonGroupProps = {
    onClickEdit,
    onClickDelete,
  };

  return (
    <div className="container-fluid">
      <div className="flex justify-between">
        <h3 className="mb-4">{labelManager.contacts}</h3>
        <ButtonGroup props={buttonGroupProps} />
      </div>
      <div
        className={`${isOpen ? "grid grid-cols-1 sm:grid-cols-3 gap-x-4" : ""}`}
      >
        <Button
          onClick={toggleMenu}
          shape="circle"
          variant="plain"
          className={`${isOpen ? "hidden" : ""}`}
          icon={<NavToggle className="text-2xl" toggled={isOpen} />}
        />
        <div
          className={`${isOpen ? "block" : "hidden"} col-span-1 sm:col-span-1`}
        >
          <div className="flex">
            <div className="w-full">
              <List data={people} setId={setContactId} id={contactId} />
            </div>
            <Button
              onClick={toggleMenu}
              shape="circle"
              variant="plain"
              icon={<NavToggle className="text-2xl" toggled={isOpen} />}
            />
          </div>
        </div>
        <div
          className={`${isOpen ? "h-[100vh] col-span-1 sm:col-span-2" : ""}`}
        >
          <Profile data={contact} />
        </div>
      </div>
    </div>
  );
};
export default Contact;
