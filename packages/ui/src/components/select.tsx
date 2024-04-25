import Creatable, { type CreatableProps } from "react-select/creatable";
import {
  AsyncPaginate,
  type AsyncPaginateProps,
  withAsyncPaginate,
  type ComponentProps,
  type UseAsyncPaginateParams,
} from "react-select-async-paginate";
import ReactSelect, {
  components,
  type ClassNamesConfig,
  type StylesConfig,
  type DropdownIndicatorProps,
  Props,
} from "react-select";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@ui/lib/utils";


interface GroupBase<Option> {
  readonly options: readonly Option[];
  readonly label?: string;
}

function classNames<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(): ClassNamesConfig<Option, IsMulti, Group> {
  return {
    control: ({ isFocused, isDisabled }) =>
      cn(
        "border h-10 w-full rounded text-sm bg-transparent hover:cursor-pointer border-gray-200 hover:border-gray-400 dark:border-gray-800",
        isFocused && "ring-2 ring-main-700",
        isDisabled &&
          "dark:bg-gray-900/40 !cursor-not-allowed dark:text-gray-300",
      ),
    placeholder: () => `text-gray-500 dark:text-gray-400 pl-1 py-0.5`,
    input: () => `pl-1 py-0.5`,
    valueContainer: () =>
      `p-1 pb-1.5 gap-1 h-10 capitalize !overflow-x-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-black dark:scrollbar-track-black dark:scrollbar-thumb-white !flex-nowrap`,
    singleValue: (props) => {
      const data = props.data as { label: string; value: string };
      const { name: status } = props.selectProps;

      return cn(
        "ml-1",
        status &&
          "before:content-[' '] before:rounded-full before:h-2 before:w-2 before:mr-2 flex items-center",
        data.value === "Done" && "before:bg-green-500 text-green-500",
        data.value === "On Going" && "before:bg-yellow-500 text-yellow-500",
        data.value === "Pending" && "before:bg-orange-500 text-orange-500",
        data.value === "Cancel" && "before:bg-red-500 text-red-500",
      );
    },
    multiValue: (props) => {
      return `bg-gray-100 dark:bg-gray-700 rounded items-center py-0.5 pl-2 pr-1.5 gap-1.5 !min-w-max ${
        props.selectProps.placeholder === "Pilih Perusahaan"
          ? "first:bg-main-600 dark:first:bg-main-400"
          : ""
      }`;
    },
    multiValueLabel: () => `leading-6 py-0.5 whitespace-nowrap text-sm`,
    multiValueRemove: () =>
      `border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 rounded-md`,
    indicatorsContainer: () => `p-1 gap-1 `,
    clearIndicator: () =>
      `text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800`,
    indicatorSeparator: () => `hidden bg-gray-300`,
    dropdownIndicator: () =>
      `p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black dark:hover:bg-gray-800 dark:hover:text-gray-400`,
    menu: () =>
      `p-1 mt-0.5 border !z-[2] border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950 rounded-lg text-sm ring-2 ring-main-700`,
    menuList: () => `scrollbar-thin dark:scrollbar-track-dark-body`,
    groupHeading: () => `ml-3 mt-2 mb-1 text-gray-500 text-sm`,
    noOptionsMessage: () =>
      `text-gray-500 p-2 dark:bg-gray-900 bg-gray-50 border border-dashed dark:border-gray-500 border-gray-200 rounded-sm`,
    option: ({ data, isFocused, isSelected }) => {
      const d = data as { label: string; value: string };
      return cn(
        "hover:cursor-pointer px-3 py-2 rounded text-sm z-10 mb-0.5 hover:bg-main-300 dark:hover:bg-main-600",
        isFocused &&
          "bg-gray-100 active:bg-gray-200 text-black dark:text-white dark:bg-gray-900",
        isSelected &&
          "bg-main-500 text-white dark:bg-gray-200 dark:text-gray-900 ",
        d.value === "Done" && "hover:bg-green-300 dark:hover:bg-green-600",
        d.value === "On Going" &&
          "hover:bg-yellow-300 dark:hover:bg-yellow-600",
        d.value === "Pending" && "hover:bg-orange-300 dark:hover:bg-orange-600",
        d.value === "Cancel" && "hover:bg-red-300 dark:hover:bg-red-600",
      );
    },
  };
}

function styles<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(): StylesConfig<Option, IsMulti, Group> {
  return {
    input: (base) => ({
      ...base,
      "input:focus": {
        boxShadow: "none",
      },
    }),
    multiValueLabel: (base) => ({
      ...base,
      whiteSpace: "nowrap",
      overflow: "hidden",
    }),
    control: (base) => ({
      ...base,
      transition: "none",
    }),
  };
}

function DropdownIndicator<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronsUpDown
        size={16}
        className={cn("transition", props.isFocused && "rotate-90")}
      />
    </components.DropdownIndicator>
  );
}

function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: Props<Option, IsMulti, Group>) {
  return (
    <ReactSelect
      {...props}
      className="w-full"
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      classNames={classNames<Option, IsMulti, Group>()}
      components={{ DropdownIndicator }}
      styles={{
        ...styles<Option, IsMulti, Group>(),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      menuPosition="fixed"
      unstyled
      hideSelectedOptions={true}
    />
  );
}

function SelectAsync<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean = false,
>(props: AsyncPaginateProps<OptionType, Group, Additional, IsMulti> & {}) {
  return (
    <AsyncPaginate
      {...props}
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      className={cn("w-full", props.className)}
      menuPosition="fixed"
      components={{ DropdownIndicator }}
      classNames={classNames<OptionType, IsMulti, Group>()}
      styles={{
        ...styles<OptionType, IsMulti, Group>(),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      unstyled
      closeMenuOnSelect
      //hideSelectedOptions={absolute}
    />
  );
}

// Creatable
type AsyncPaginateCreatableProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean,
> = CreatableProps<OptionType, IsMulti, Group> &
  UseAsyncPaginateParams<OptionType, Group, Additional> &
  ComponentProps<OptionType, Group, IsMulti>;

type AsyncPaginateCreatableType = <
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean = false,
>(
  props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>,
) => JSX.Element;

const CreatableAsyncPaginate = withAsyncPaginate(
  Creatable,
) as AsyncPaginateCreatableType;

function SelectAsyncCreatable<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean = false,
>(props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>) {
  return (
    <CreatableAsyncPaginate
      {...props}
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      className="mt-2 w-full"
      menuPosition="fixed"
      classNames={classNames<OptionType, IsMulti, Group>()}
      styles={{
        ...styles<OptionType, IsMulti, Group>(),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      unstyled
      closeMenuOnSelect
    />
  );
}

export { Select, SelectAsync, SelectAsyncCreatable };
