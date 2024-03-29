import { AdaptableCard, Container } from "components/shared";
import { BackButtonWithHeader } from "components/shared/BackButtonWithHeader";
import labelManager from "configs/label.config/label-manager";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { people } from "../data";
import FormStep from "./components/FormStep";
import { employeeSteps } from "./data";

const PersonalInformation = lazy(() =>
  import("./components/PersonalInformation")
);
const Identification = lazy(() => import("./components/Identification"));
const AddressInfomation = lazy(() => import("./components/AddressInfomation"));
const FinancialInformation = lazy(() =>
  import("./components/FinancialInformation")
);

const EditContact = () => {
  const [isOpen, setIsOpen] = useState(true);
  const params = useParams();
  const [employee, setEmployee] = useState();
  const navigate = useNavigate();
  const pending = labelManager.pending;
  const [stepStatus, setStepStatus] = useState({
    0: { status: pending },
    1: { status: pending },
    2: { status: pending },
    3: { status: pending },
  });
  const [currentStep, setCurrentStep] = useState(0);
  // const formData = useSelector(
  //   (state) => state.accountDetailForm.data.formData
  // );

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
                steps={employeeSteps}
                currentStepStatus={currentStepStatus}
                setCurrentStep={setCurrentStep}
                setStepStatus={setStepStatus}
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
                <Identification
                  // data={formData.identification}
                  onNextChange={handleNextChange}
                  onBackChange={handleBackChange}
                  currentStepStatus={currentStepStatus}
                  toggleMenu={toggleMenu}
                  employeeName={employee?.name}
                  isOpen={isOpen}
                />
              )}
              {currentStep === 2 && (
                <AddressInfomation
                  // data={formData.addressInformation}
                  onNextChange={handleNextChange}
                  onBackChange={handleBackChange}
                  currentStepStatus={currentStepStatus}
                  toggleMenu={toggleMenu}
                  employeeName={employee?.name}
                  isOpen={isOpen}
                />
              )}
              {currentStep === 3 && (
                <FinancialInformation
                  // data={formData.financialInformation}
                  onComplete={onComplete}
                  onBackChange={handleBackChange}
                  currentStepStatus={currentStepStatus}
                  toggleMenu={toggleMenu}
                  employeeName={employee?.name}
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

export default EditContact;
