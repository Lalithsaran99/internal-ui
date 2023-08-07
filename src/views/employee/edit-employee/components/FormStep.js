import { Menu } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { setStepStatus } from "../store/dataSlice";
import { setCurrentStep } from "../store/stateSlice";
import { EmployeeMenuIcon } from "../utils/EmployeeMenuIcon";

const FormStep = (props) => {
  const { currentStep, currentStepStatus, sideCollapsed, stepStatus, steps } =
    props;

  const onStepChange = (step) => {
    const selectedStepStatus = stepStatus[step].status;

    if (
      selectedStepStatus === labelManager.complete ||
      selectedStepStatus === labelManager.current
    ) {
      setCurrentStep(step);
      return;
    }

    if (step !== currentStep && step < currentStep) {
      if (currentStepStatus === labelManager.pending) {
        setStepStatus(labelManager.complete);
      }
      setCurrentStep(step);
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
                stepStatus={stepStatus[step.value]?.status}
                stepValue={step.value}
              />
            </span>
            <span className="truncate">{step.label}</span>
          </Menu.MenuItem>
        );
      })}
    </Menu>
  );
};

export default FormStep;
