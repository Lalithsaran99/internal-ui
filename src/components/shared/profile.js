import { Button } from "components/ui";
import labelManager from "configs/label.config/label-manager";
import { useNavigate } from "react-router-dom";

export const Profile = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-white shadow mt-24">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
        <div className="relative">
          <div className="w-32 h-32 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
            <img src={data?.imageUrl} alt="" className="rounded-full" />
          </div>
        </div>
      </div>
      <div className="mt-20 text-center border-b pb-12">
        <h1 className="text-4xl font-medium">
          {data?.name}{" "}
          <span className="font-light text-gray-500">{data?.age}</span>
        </h1>
        <p className="font-light text-gray-600 mt-3">{data?.city}</p>
        <p className="mt-8 text-gray-500">{data?.role}</p>
        <p className="mt-2 text-gray-500">{data?.email}</p>

        <div className="text-center p-4">
          <Button
            variant="solid"
            onClick={() => navigate(`/employee/leave/${data?.id}`)}
          >
            {labelManager.navigateToLeave}
          </Button>
        </div>
      </div>

      <div className="mt-12 flex flex-col justify-center">
        <p className="text-gray-600 text-center font-light lg:px-16">
          An artist of considerable range, Ryan — the name taken by
          Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
          records all of his own music, giving it a warm, intimate feel with a
          solid groove structure. An artist of considerable range.
        </p>
      </div>
    </div>
  );
};
