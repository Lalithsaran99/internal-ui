import { Button } from "components/ui";
import { Grid } from "components/ui/Grid";
import labelManager from "configs/label.config/label-manager";
import { HiPlusCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { applicantData } from "./data";

const Applicant = () => {
  const navigate = useNavigate();

  const onRecordClick = (e) => {};

  const onCreate = () => {
    navigate("/applicant/create");
  };
  const columns = [
    {
      caption: "...",
      type: "buttons",
      width: 100,
      visible: true,
      allowHiding: false,
      buttons: [
        {
          text: "Edit",
          hint: "Edit",
          icon: "edit",
          onClick: onRecordClick,
        },
      ],
    },

    {
      dataField: "name",
      caption: labelManager.applicantData.name,
      visible: true,
      dataType: "string",
    },

    {
      dataField: "mobileNo",
      caption: labelManager.applicantData.mobileNo,
      visible: true,
      dataType: "string",
    },

    {
      dataField: "documentsToBeUploaded",
      caption: labelManager.applicantData.documentsToBeUploaded,
      visible: true,
      dataType: "string",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h3>{labelManager.applicants}</h3>
        <Button
          className="sm"
          variant="solid"
          icon={<HiPlusCircle />}
          onClick={() => onCreate()}
        >
          {labelManager.create}
        </Button>
      </div>
      <Grid column={columns} data={applicantData} id={labelManager.id} />
    </>
  );
};
export default Applicant;
