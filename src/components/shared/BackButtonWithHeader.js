import { Button } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const BackButtonWithHeader = (props) => {
  const { header } = props;
  const navigate = useNavigate();
  return (
    <div className="flex items-center mb-2">
      {header ? (
        <Button
          onClick={() => navigate(-1)}
          shape="circle"
          variant="plain"
          icon={<HiArrowLeft />}
        />
      ) : (
        <Button
          onClick={() => navigate(-1)}          
          variant="plain"
          icon={<HiArrowLeft />}
        >
          {labelManager.back}
        </Button>
      )}
      {header && <h3 className="mb-2">{header}</h3>}
    </div>
  );
};
