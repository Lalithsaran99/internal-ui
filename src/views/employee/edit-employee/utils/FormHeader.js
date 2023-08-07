import NavToggleArrow from "components/shared/NavToggleArrow";
import { Button, Tooltip } from "components/ui";

export const ProfileFormHeader = (props) => {
  const { toggleMenu, isOpen, title, desc, employeeName } = props;
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <Tooltip title={`${isOpen ? "Hide Menu" : "Show Menu"}`}>
          <Button
            onClick={() => toggleMenu()}
            variant="plain"
            className="mb-2"
            icon={<NavToggleArrow className="text-2xl" toggled={isOpen} />}
          />
        </Tooltip>
        <div className="flex flex-col">
          {employeeName ? (
            <h3 className="mb-2">{employeeName + `'s ` + title}</h3>
          ) : (
            <h3 className="mb-2">{title}</h3>
          )}
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};
