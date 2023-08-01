import { Menu } from "components/ui";
import { useDispatch } from "react-redux";
import { setStepStatus } from "../store/dataSlice";
import { setCurrentStep } from "../store/stateSlice";
import { EmployeeMenuIcon } from "../utils/EmployeeMenuIcon";

const steps = [
  { label: "Personal information", value: 0 },
  { label: "Identification", value: 1 },
  { label: "Address Information", value: 2 },
  { label: "Financial Information", value: 3 },
];

const FormStep = ({
  currentStep,
  currentStepStatus,
  sideCollapsed,
  stepStatus,
}) => {
  const dispatch = useDispatch();

  const onStepChange = (step) => {
    const selectedStepStatus = stepStatus[step].status;

    if (selectedStepStatus === "complete" || selectedStepStatus === "current") {
      dispatch(setCurrentStep(step));
      return;
    }

    if (step !== currentStep && step < currentStep) {
      if (currentStepStatus === "pending") {
        dispatch(setStepStatus("complete"));
      }
      dispatch(setCurrentStep(step));
    }
  };

  return (
    <Menu variant="transparent" sideCollapsed={sideCollapsed} className="px-2">
      {steps.map((step) => {
        return (
          <Menu.MenuItem
            key={step.value}
            eventKey={step.value.toString()}
            className={`mb-2`}
            onClick={() => onStepChange(step.value)}
            isActive={currentStep === step.value}
          >
            <span className="text-2xl ltr:mr-2 rtl:ml-2">
              <EmployeeMenuIcon
                stepStatus={stepStatus[step.value].status}
                stepValue={step.value}
              />
            </span>
            <span>{step.label}</span>
          </Menu.MenuItem>
        );
      })}
    </Menu>
  );
};

export default FormStep;
