import type { LoadOptions } from "react-select-async-paginate";

import type { inferVariables } from "@hktekno/api";
import type { Meta } from "@hktekno/api/routers/meta";
import { k } from "@hktekno/api";
import { absentType } from "@hktekno/api/routers/absent/schema";
import { eventStatus } from "@hktekno/api/routers/event/schema";
import { jobStatus } from "@hktekno/api/routers/job/schema";
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

const loadWarehouseOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.inventory.warehouse.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
  const warehouses = await k.inventory.warehouse.all.fetcher({
    ...params,
    page,
    search,
  });

  const options = warehouses.data.map((d) => ({
    label: `${d.name}`,
    value: `${d.id}`,
  }));

  return {
    options,
    hasMore: warehouses.meta.current_page !== warehouses.meta.last_page,
    additional: {
      ...params,
      page: Number(page) + 1,
    },
  };
};

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

const loadJobTypeOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.jobType.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
  const datas = await k.jobType.all.fetcher({ ...params, search });

  const options = datas.data.map((d) => ({
    label: `${d.job_name}`,
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
  { page?: string | number }
> = async (search, _, params) => {
  const page = params?.page ?? 1;
  const res = await axios<{ data: { id: string; name: string }[]; meta: Meta }>(
    "https://epiai.ankcode.com/api/province",
    {
      params: { search, page },
    },
  );

  const options = res.data.data.map((d) => ({
    label: d.name,
    value: d.id,
  }));

  return {
    options,
    hasMore: res.data.meta.current_page !== res.data.meta.last_page,
    additional: {
      ...params,
      page: Number(page) + 1,
    },
  };
};

const loadCityOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  { province_id: string; page?: string | number }
> = async (search, _, additional) => {
  const page = additional?.page ?? 1;
  const res = await axios<{ data: { id: string; name: string }[]; meta: Meta }>(
    `https://epiai.ankcode.com/api/${additional?.province_id}/regency`,
    {
      params: { search, page },
    },
  );

  const options = res.data.data.map((d) => ({
    label: d.name,
    value: d.id,
  }));

  return {
    options,
    hasMore: res.data.meta.current_page !== res.data.meta.last_page,
    additional: {
      province_id: additional?.province_id ?? "",
      page: Number(page) + 1,
    },
  };
};

// HKDB = Archive
const loadDBCategoryOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.hkdb.category.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
  const datas = await k.hkdb.category.all.fetcher({ ...params, search });

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

const loadDBSkillOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.hkdb.skill.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
  const datas = await k.hkdb.skill.all.fetcher({ ...params, search });

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

const loadDBTalentOptions: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  inferVariables<typeof k.hkdb.talent.all>
> = async (search, _, params) => {
  const page = params?.page ?? 1;
  const datas = await k.hkdb.talent.all.fetcher({ ...params, search });

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

// end of HKDB

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

const optionsAbsentType = () => absentType.map((v) => ({ label: v, value: v }));

const optionsEventStatus = () =>
  eventStatus.map((v) => ({ label: v, value: v }));
const optionsJobStatus = () => jobStatus.map((v) => ({ label: v, value: v }));

function optionsYears(props?: { filterYear?: string }) {
  const oldest = 1970;
  const date = new Date();
  const recent = date.getFullYear();

  const arrItemYears: { label: string; value: string }[] = [];

  for (let i = recent; i >= oldest; i--) {
    arrItemYears.push({
      label: `${i}`,
      value: `${i}`,
    });
  }
  if (props?.filterYear) {
    return arrItemYears.filter((v) => v.value !== props.filterYear);
  }

  return arrItemYears;
}

//

const loadOptions = Object.freeze({
  user: loadUserOptions,
  company: loadCompanyOptions,
  role: loadRoleOptions,
});

export {
  loadOptions,
  loadWarehouseOptions,
  loadProjectOptions,
  loadProjectJSONOptions,
  loadProjectSprintOptions,
  loadProjectSprintJSONOptions,
  loadUserOptions,
  loadCompanyOptions,
  loadRoleOptions,
  loadVenueOptions,
  loadClientOptions,
  loadJobTypeOptions,
  loadProvinceOptions,
  loadCityOptions,
  loadDBCategoryOptions,
  loadDBSkillOptions,
  loadDBTalentOptions,

  // Static
  optionsProjectType,
  optionsProjectStatus,
  optionsProjectProgress,
  optionsTaskProjectStatus,
  optionsTime,
  optionsJobStatus,
  optionsEventStatus,
  optionsAbsentType,
  optionsYears
};
