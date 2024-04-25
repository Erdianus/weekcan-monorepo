import { type LoadOptions } from "react-select-async-paginate";
import k, { inferVariables } from "@repo/api/kit";

type OptionType =
  | { value: string; label: string }
  | {
      value?: string;
      label?: string;
      __isNew__?: boolean;
    };

interface GroupBase<Option> {
  readonly options: readonly Option[];
  readonly label?: string;
}

// --NOTE: Dynamic Options
const loadUserOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.user.all>
> = async (search, _, params) => {
  const users = await k.user.all.fetcher({
    ...params,
    search,
  });

  const options = users.data.map((d) => ({
    label: `${d.name}`,
    value: `${d.id}`,
  }));

  return {
    options,
    hasMore: users.meta.current_page !== users.meta.last_page,
    additional: {
      ...params,
      page: Number(params?.page!) + 1,
    },
  };
};

const loadCompanyOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.company.all>
> = async (search, _, params) => {
  const datas = await k.company.all.fetcher({ ...params, search });

  const options = datas.data.map((d) => ({
    label: `${d.company_name}`,
    value: `${d.id}`,
  }));

  return {
    options,
    hasMore: datas.meta.current_page !== datas.meta.last_page,
    additional: {
      ...params,
      page: Number(params?.page!) + 1,
    },
  };
};

const loadRoleOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.role.all>
> = async (search, _, params) => {
  const datas = await k.role.all.fetcher({ ...params, search });

  const options = datas.data.map((d) => ({
    label: `${d.role_name}`,
    value: `${d.id}`,
  }));

  return {
    options,
    hasMore: datas.meta.current_page !== datas.meta.last_page,
    additional: {
      ...params,
      page: params?.page! + 1,
    },
  };
};

// --NOTE: Static Option

const loadOptions = Object.freeze({
  user: loadUserOptions,
  company: loadCompanyOptions,
  role: loadRoleOptions,
});

export { loadOptions, loadUserOptions, loadCompanyOptions, loadRoleOptions };
