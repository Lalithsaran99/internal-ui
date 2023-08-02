import { AdaptableCard, Container } from "components/shared";
import { BackButtonWithHeader } from "components/shared/BackButtonWithHeader";
import NavToggleArrow from "components/shared/NavToggleArrow";
import { Button } from "components/ui";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { injectReducer } from "store/index";
import { people } from "../data";
import FormStep from "./components/FormStep";
import reducer from "./store";
import { setFormData, setStepStatus } from "./store/dataSlice";
import { setCurrentStep } from "./store/stateSlice";
import labelManager from "configs/label.config/label-manager";

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
  const params = useParams();
  const [employee, setEmployee] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!params?.id) return;
    setEmployee(people.find((id) => Number(params?.id) === id?.id));
  }, [params?.id]);

  // useEffect(() => {
  //   dispatch(getForm());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleNextChange = (values, name) => {
    const nextStep = currentStep + 1;
    dispatch(setFormData({ [name]: values }));
    dispatch(
      setStepStatus({
        [currentStep]: { status: labelManager.complete },
        [nextStep]: { status: labelManager.current },
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
    navigate(-1);
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
