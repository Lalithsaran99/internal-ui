import { useConfig } from "components/ui";

export const List = ({ data, setId, id }) => {
  const { mode } = useConfig();
  const activeColor = mode === "light" ? "bg-gray-100 " : " ";

  return (
    <ul role="list" className="divide-y divide-gray-100 overflow-y-scroll">
      {data.map((person, index) => (
        <li
          key={index}
          onClick={() => setId(person?.id)}
          className={`${
            person?.id === id ? activeColor : ""
          }hover-color-change hover:bg-gray-100 transition duration-200 flex cursor-pointer justify-between gap-x-6 py-2`}
        >
          <div className="flex gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={person.imageUrl}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6">{person.name}</p>
              <p className="mt-1 truncate text-xs leading-5">{person.email}</p>
            </div>
          </div>
          {/* <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{person.role}</p>
            {person.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen{" "}
                <time dateTime={person.lastSeenDateTime}>
                  {person.lastSeen}
                </time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )}
          </div> */}
        </li>
      ))}
    </ul>
  );
};
