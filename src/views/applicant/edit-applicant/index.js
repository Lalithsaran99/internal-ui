import { AdaptableCard, Container } from "components/shared";
import { BackButtonWithHeader } from "components/shared/BackButtonWithHeader";
import labelManager from "configs/label.config/label-manager";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { applicantSteps } from "./data";
import FormStep from "views/employee/edit-employee/components/FormStep";
import { people } from "views/employee/data";
import { DocumentsToBeUploaded } from "./components/DocumentsToBeUploaded";

const PersonalInformation = lazy(() =>
  import("./components/PersonalInformation")
);

const EditApplicant = () => {
  const [isOpen, setIsOpen] = useState(true);
  const params = useParams();
  const [employee, setEmployee] = useState();

  const navigate = useNavigate();
  const pending = labelManager.pending;
  const [stepStatus, setStepStatus] = useState({
    0: { status: pending },
    1: { status: pending },
  });
  const [currentStep, setCurrentStep] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!params?.id) return;
    setEmployee(people.find((id) => Number(params?.id) === id?.id));
  }, [params?.id]);

  const handleNextChange = (values, name) => {
    const nextStep = currentStep + 1;

    setStepStatus((prev) => ({
      ...prev,
      [currentStep]: { status: labelManager.complete },
      [nextStep]: { status: labelManager.current },
    }));

    setCurrentStep(nextStep);
  };

  const onComplete = (values, name) => {
    setStepStatus((prev) => ({
      ...prev,
      [currentStep]: { status: labelManager.complete },
    }));

    navigate(-1);
  };

  const handleBackChange = () => {
    const previousStep = currentStep - 1;
    setCurrentStep(previousStep);
  };

  const currentStepStatus = useMemo(
    () => stepStatus[currentStep].status,
    [stepStatus, currentStep]
  );

  return (
    <Container className="h-full">
      <AdaptableCard className="h-full" bodyClass="h-full">
        <BackButtonWithHeader />

        <div
          className={`${
            isOpen
              ? "grid lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-5 gap-4 h-full"
              : ""
          }`}
        >
          <div
            className={`${
              isOpen ? "flex justify-center" : "hidden"
            } 2xl:col-span-1 xl:col-span-1 lg:col-span-2`}
          >
            <div className="w-full">
              <FormStep
                currentStep={currentStep}
                sideCollapsed={isOpen}
                steps={applicantSteps}
                currentStepStatus={currentStepStatus}
                stepStatus={stepStatus}
              />
            </div>
          </div>

          <div
            className={
              currentStep !== 4
                ? "2xl:col-span-4 lg:col-span-3 xl:col-span-2"
                : "lg:col-span-5"
            }
          >
            <Suspense fallback={<></>}>
              {currentStep === 0 && (
                <PersonalInformation
                  // data={formData.personalInformation}
                  onNextChange={handleNextChange}
                  currentStepStatus={currentStepStatus}
                  toggleMenu={toggleMenu}
                  employeeName={employee?.name}
                  isOpen={isOpen}
                />
              )}
              {currentStep === 1 && (
                <DocumentsToBeUploaded
                  onComplete={onComplete}
                  currentStepStatus={currentStepStatus}
                  onBackChange={handleBackChange}
                  toggleMenu={toggleMenu}
                  applicantName={employee?.name}
                  isOpen={isOpen}
                />
              )}
            </Suspense>
          </div>
        </div>
      </AdaptableCard>
    </Container>
  );
};

export default EditApplicant;
