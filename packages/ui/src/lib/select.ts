import type { LoadOptions } from "react-select-async-paginate";

import type { inferVariables } from "@hktekno/api";
import { k } from "@hktekno/api";
import {
  projectProgress,
  projectStatus,
  projectType,
} from "@hktekno/api/routers/project/schema";
import { taskProjectStatus } from "@hktekno/api/routers/project/task/schema";
import { axios } from "@hktekno/utils/axios";

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
const loadProjectOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.project.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
  const projects = await k.project.all.fetcher({
    ...params,
    page,
    search,
  });

  const options = projects.data.map((d) => ({
    label: `${d.project_name}`,
    value: `${d.id}`,
  }));

  return {
    options,
    hasMore: projects.meta.current_page !== projects.meta.last_page,
    additional: {
      ...params,
      page: Number(page) + 1,
    },
  };
};

const loadProjectJSONOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.project.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
  const projects = await k.project.all.fetcher({
    ...params,
    page,
    search,
  });

  const options = projects.data.map((d) => ({
    label: `${d.project_name}`,
    value: JSON.stringify({
      id: `${d.id}`,
      start_date: d.start_date,
      end_date: d.end_date,
    }),
  }));

  return {
    options,
    hasMore: projects.meta.current_page !== projects.meta.last_page,
    additional: {
      ...params,
      page: Number(page) + 1,
    },
  };
};

const loadProjectSprintOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.project.sprint.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
  const sprints = await k.project.sprint.all.fetcher({
    ...params,
    page,
    search,
  });

  const options = sprints.data.map((d) => ({
    label: `${d.title}`,
    value: `${d.id}`,
  }));

  return {
    options,
    hasMore: sprints.meta.current_page !== sprints.meta.last_page,
    additional: {
      ...params,
      page: Number(page) + 1,
    },
  };
};

const loadProjectSprintJSONOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.project.sprint.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
  const sprints = await k.project.sprint.all.fetcher({
    ...params,
    page,
    search,
  });

  const options = sprints.data.map((d) => ({
    label: `${d.title}`,
    value: JSON.stringify({
      id: `${d.id}`,
      start_date: d.start_date,
      end_date: d.end_date,
    }),
  }));

  return {
    options,
    hasMore: sprints.meta.current_page !== sprints.meta.last_page,
    additional: {
      ...params,
      page: Number(page) + 1,
    },
  };
};

const loadUserOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.user.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
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
      page: Number(page) + 1,
    },
  };
};

const loadCompanyOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.company.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
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
      page: Number(page) + 1,
    },
  };
};

const loadRoleOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.role.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
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
      page: page + 1,
    },
  };
};

const loadVenueOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.venue.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
  const datas = await k.venue.all.fetcher({ ...params, search });

  const options = datas.data.map((d) => ({
    label: `${d.name}`,
    value: `${d.id}`,
  }));

  return {
    options,
    hasMore: datas.meta.current_page !== datas.meta.last_page,
    additional: {
      ...params,
      page: Number(page) + 1,
    },
  };
};

const loadClientOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.client.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
  const datas = await k.client.all.fetcher({ ...params, search });

  const options = datas.data.map((d) => ({
    label: `${d.name}`,
    value: `${d.id}`,
  }));

  return {
    options,
    hasMore: datas.meta.current_page !== datas.meta.last_page,
    additional: {
      ...params,
      page: Number(page) + 1,
    },
  };
};

const loadProvinceOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  null
> = async (search) => {
  const res = await axios<{ data: { id: string; name: string }[] }>(
    "/api/province",
    {
      params: { search },
    },
  );

  const options = res.data.data.map((d) => ({
    label: d.name,
    value: d.id,
  }));

  return {
    options,
    hasMore: false,
  };
};

const loadCityOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  { province_id: string }
> = async (search, _, additional) => {
  const res = await axios<{ data: { id: string; name: string }[] }>(
    `/api/city/${additional?.province_id}`,
    {
      params: { search, province_id: additional?.province_id },
    },
  );

  const options = res.data.data.map((d) => ({
    label: d.name,
    value: d.id,
  }));

  return {
    options,
    hasMore: false,
  };
};

// --NOTE: Static Option
//
const optionsProjectType = () =>
  projectType.map((v) => ({ label: v, value: v }));

const optionsProjectStatus = () =>
  projectStatus.map((v) => ({ label: v, value: v }));

const optionsProjectProgress = () =>
  projectProgress.map((v) => ({ label: v, value: v }));

const optionsTaskProjectStatus = () =>
  taskProjectStatus.map((v) => ({ label: v, value: v }));

const optionsTime = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const v = `${i}`.length === 1 ? `0${i}` : `${i}`;
    return {
      label: `${v}:00`,
      value: `${v}:00`,
    };
  });
};

//

const loadOptions = Object.freeze({
  user: loadUserOptions,
  company: loadCompanyOptions,
  role: loadRoleOptions,
});

export {
  loadOptions,
  loadProjectOptions,
  loadProjectJSONOptions,
  loadProjectSprintOptions,
  loadProjectSprintJSONOptions,
  loadUserOptions,
  loadCompanyOptions,
  loadRoleOptions,
  loadVenueOptions,
  loadClientOptions,
  loadProvinceOptions,
  loadCityOptions,

  // Static
  optionsProjectType,
  optionsProjectStatus,
  optionsProjectProgress,
  optionsTaskProjectStatus,
  optionsTime,
};
