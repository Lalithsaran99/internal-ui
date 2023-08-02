import classNames from "classnames";
import { SegmentItemOption, SvgIcon } from "components/shared";
import { Segment } from "components/ui";
import useThemeClass from "utils/hooks/useThemeClass";

export const DocumentSegmenter = (props) => {
  const { textTheme } = useThemeClass();
  const { data, icon, form, field } = props;
  return (
    <Segment
      className="flex xl:items-center flex-col xl:flex-row gap-4"
      value={[field.value]}
      onChange={(val) => form.setFieldValue(field.name, val[0])}
    >
      <>
        {data.map((item, index) => (
          <Segment.Item
            value={item.value}
            key={item.value}
            disabled={item.disabled}
          >
            {({ ref, active, value, onSegmentItemClick, disabled }) => {
              return (
                <SegmentItemOption
                  ref={ref}
                  active={active}
                  disabled={disabled}
                  className="w-full xl:w-[260px]"
                  onSegmentItemClick={onSegmentItemClick}
                >
                  <div className="flex items-center">
                    {/* <SvgIcon
                      className={classNames(
                        "text-4xl ltr:mr-3 rtl:ml-3",
                        active && textTheme
                      )}
                    >
                      {icon}
                    </SvgIcon> */}
                    <h6>{item.label}</h6>
                  </div>
                </SegmentItemOption>
              );
            }}
          </Segment.Item>
        ))}
      </>
    </Segment>
  );
};
