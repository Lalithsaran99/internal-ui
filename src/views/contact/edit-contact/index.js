import { AdaptableCard, Container, NavToggle } from "components/shared";
import { Button } from "components/ui";
import { Suspense, lazy, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectReducer } from "store/index";
import FormStep from "./components/FormStep";
import reducer from "./store";
import { setFormData, setStepStatus } from "./store/dataSlice";
import { setCurrentStep } from "./store/stateSlice";
import { useNavigate } from "react-router-dom";

injectReducer("accountDetailForm", reducer);

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
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const stepStatus = useSelector(
    (state) => state.accountDetailForm.data.stepStatus
  );
  const currentStep = useSelector(
    (state) => state.accountDetailForm.state.currentStep
  );
  const formData = useSelector(
    (state) => state.accountDetailForm.data.formData
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   dispatch(getForm());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleNextChange = (values, name) => {
    const nextStep = currentStep + 1;
    dispatch(setFormData({ [name]: values }));
    dispatch(
      setStepStatus({
        [currentStep]: { status: "complete" },
        [nextStep]: { status: "current" },
      })
    );
    dispatch(setCurrentStep(nextStep));
  };

  const onComplete = (values, name) => {
    
    dispatch(setFormData({ [name]: values }));
    dispatch(
      setStepStatus({
        [currentStep]: { status: "complete" },        
      })
    );
    navigate(-1)
  };

  const handleBackChange = () => {
    const previousStep = currentStep - 1;
    dispatch(setCurrentStep(previousStep));
  };

  const currentStepStatus = useMemo(
    () => stepStatus[currentStep].status,
    [stepStatus, currentStep]
  );

  return (
    <Container className="h-full">
      <AdaptableCard className="h-full" bodyClass="h-full">
        {currentStep !== 4 && (
          <Button
            onClick={toggleMenu}
            shape="circle"
            variant="plain"
            className={`${isOpen ? "hidden" : ""}`}
            icon={<NavToggle className="text-2xl" toggled={isOpen} />}
          />
        )}
        <div
          className={`${
            isOpen
              ? "grid lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-5 gap-4 h-full"
              : ""
          }`}
        >
          {currentStep !== 4 && (
            <div
              className={`${
                isOpen ? "flex justify-center" : "hidden"
              } 2xl:col-span-1 xl:col-span-1 lg:col-span-2`}
            >
              <div className="w-full">
                <FormStep
                  currentStep={currentStep}
                  sideCollapsed={isOpen}
                  currentStepStatus={currentStepStatus}
                  stepStatus={stepStatus}
                />
              </div>
              <Button
                onClick={toggleMenu}
                shape="circle"
                variant="plain"
                icon={<NavToggle className="text-2xl" toggled={isOpen} />}
              />
            </div>
          )}

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
                  data={formData.personalInformation}
                  onNextChange={handleNextChange}
                  currentStepStatus={currentStepStatus}
                />
              )}
              {currentStep === 1 && (
                <Identification
                  data={formData.identification}
                  onNextChange={handleNextChange}
                  onBackChange={handleBackChange}
                  currentStepStatus={currentStepStatus}
                />
              )}
              {currentStep === 2 && (
                <AddressInfomation
                  data={formData.addressInformation}
                  onNextChange={handleNextChange}
                  onBackChange={handleBackChange}
                  currentStepStatus={currentStepStatus}
                />
              )}
              {currentStep === 3 && (
                <FinancialInformation
                  data={formData.financialInformation}
                  onNextChange={onComplete}
                  onBackChange={handleBackChange}
                  currentStepStatus={currentStepStatus}
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
