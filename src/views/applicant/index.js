import { Button, Dialog } from "components/ui";
import { Grid } from "components/ui/Grid";
import labelManager from "configs/label.config/label-manager";
import { useState } from "react";
import { applicantData } from "./data";
import { ApplicantForm } from "./form";
import { HiPlusCircle } from "react-icons/hi";
import { AiFillSave } from "react-icons/ai";

const Applicant = () => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onRecordClick = (e) => {
    setIsEdit(true);
    setIsOpen(true);
  };

  const onCreate = () => {
    setIsOpen(true);
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

  const onDialogClose = (e) => {
    console.log("onDialogClose", e);
    setIsOpen(false);
  };

  const onDialogOk = (e) => {
    console.log("onDialogOk", e);
    setIsOpen(false);
  };
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
          Create
        </Button>
      </div>
      <Grid column={columns} data={applicantData} id={labelManager.id} />
      <Dialog
        isOpen={dialogIsOpen}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">
          {isEdit
            ? labelManager.update + " " + labelManager.applicant
            : labelManager.create + " " + labelManager.applicant}
        </h5>
        <ApplicantForm
          data={{
            firstName: "",
            lastName: "",
            dialCode: "",
            mobileNo: "",
          }}
          positiveButtonIcon={isEdit ? <AiFillSave /> : <HiPlusCircle />}
          negativeButtonLabel={labelManager.cancel}
          positiveButtonLabel={isEdit ? labelManager.save : labelManager.create}
          onNegativeClick={onDialogClose}
          onPositiveClick={onDialogOk}
        />
        {/* <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={onDialogClose}
          >
            {labelManager.cancel}
          </Button>
          <Button
            icon={isEdit ? <AiFillSave /> : <HiPlusCircle />}
            variant="solid"
            onClick={onDialogOk}
          >
            {isEdit ? labelManager.save : labelManager.create}
          </Button>
        </div> */}
      </Dialog>
    </>
  );
};
export default Applicant;
