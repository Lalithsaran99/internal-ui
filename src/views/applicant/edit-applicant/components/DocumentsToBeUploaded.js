import { DragList } from "components/shared/DragList";
import labelManager from "configs/label.config/label-manager";
import { ProfileFormHeader } from "views/employee/edit-employee/utils/FormHeader";
import { documentsRequired, documentsAdd } from "../data";
import { useState } from "react";
import "./styles.css";
import { Button, Dialog } from "components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { DocumentEditForm } from "views/applicant/edit-applicant/components/documentEditForm";
import { FormFooterButton } from "components/shared/FormFooterButton";
import { AiOutlineSave } from "react-icons/ai";
export const DocumentsToBeUploaded = (props) => {
  const {
    toggleMenu,
    isOpen,
    applicantName,
    currentStepStatus,
    onBackChange,
    onComplete,
  } = props;
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    documentsAdd: documentsAdd,
    documentsRequired: documentsRequired,
  });

  const onDragStart = (e) => {
    e.itemData = state[e.fromData][e.fromIndex];
  };

  const onCreateDocument = () => {
    setIsOpen(true);
  };

  const onAdd = (e) => {
    const tasks = [...state[e.toData]];
    tasks.splice(e.toIndex, 0, e.itemData);

    setState((prevState) => ({
      ...prevState,
      [e.toData]: tasks,
    }));
  };

  const onRemove = (e) => {
    const tasks = [...state[e.fromData]];
    tasks.splice(e.fromIndex, 1);

    setState((prevState) => ({
      ...prevState,
      [e.fromData]: tasks,
    }));
  };

  const onReorder = (e) => {
    onRemove(e);
    onAdd(e);
  };

  const onDialogClose = (e) => {
    console.log("onDialogClose", e);
    setIsOpen(false);
  };

  const onDialogOk = (e) => {
    console.log("onDialogOk", e);
    setIsOpen(false);
  };

  const onBack = () => {
    onBackChange?.();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <ProfileFormHeader
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          employeeName={applicantName}
          title={labelManager.documentsToBeUploaded}
          // desc={labelManager.documentUploadInstructions}
        />
        <Button
          variant="solid"
          className="mb-8"
          onClick={onCreateDocument}
          icon={<HiPlusCircle />}
        >
          {labelManager.add}
        </Button>
      </div>
      <div className="widget-container">
        <DragList
          listData={state.documentsAdd}
          group="tasks"
          itemName="documentsAdd"
          onDragStart={onDragStart}
          onAdd={onAdd}
          onRemove={onRemove}
          onReorder={onReorder}
          allowReordering={true}
        />
        <DragList
          listData={state.documentsRequired}
          group="tasks"
          itemName="documentsRequired"
          onDragStart={onDragStart}
          onAdd={onAdd}
          onRemove={onRemove}
          onReorder={onReorder}
          allowReordering={true}
        />
        <Dialog
          isOpen={dialogIsOpen}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
          onClose={onDialogClose}
          onRequestClose={onDialogClose}
        >
          <h5 className="mb-4">
            {labelManager.create + " " + labelManager.document}
          </h5>
          <DocumentEditForm
            data={{
              value: "",
              label: "",
              allowedFileType: "",
              uploadDescription: "",
              allowedFileTypeError: "",
            }}
            positiveButtonIcon={<HiPlusCircle />}
            negativeButtonLabel={labelManager.cancel}
            positiveButtonLabel={labelManager.create}
            onNegativeClick={onDialogClose}
            onPositiveClick={onDialogOk}
          />
        </Dialog>
      </div>
      <FormFooterButton
        positiveButtonLabel={labelManager.submit}
        negativeButtonLabel={labelManager.back}
        isNegativeButtonVisible={true}
        positiveButtonIcon={<AiOutlineSave />}
        onPositiveClick={() => onComplete?.()}
        onNegativeClick={onBack}
      />
    </>
  );
};
