import type { inferData } from "react-query-kit";
import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import type a from "../attendance";
import type p from "../project";

const dashboard = router("dashboard", {
  all: router.query({
    fetcher: async () => {
      const date = new Date();
      const year = date.getUTCFullYear();
      const month =
        date.getMonth() > 9 ? `${date.getMonth()}` : `0${date.getMonth()}`;
      const day =
        date.getUTCDate() > 9
          ? `${date.getUTCDate()}`
          : `0${date.getUTCDate()}`;

      // Project
      const project = {
        total: 0,
        done: 0,
        onGoing: 0,
        pending: 0,
      };

      const { data: projects } = await Axios<inferData<typeof p.all>>(
        "/project",
        {
          params: {
            paginate: 200,
            from: `${year}-${month}-01`,
          },
        },
      );

      project.total = projects.data.length;
      for (const item of projects.data) {
        if (item.progress === "On Going") {
          project.onGoing += 1;
        } else if (item.progress === "Done") {
          project.done += 1;
        } else if (item.progress === "Pending") {
          project.pending += 1;
        }
      }

      // task
      const task = {
        total: 0,
        done: 0,
        onGoing: 0,
        pending: 0,
      };
      const { data: tasks } = await Axios<{ data: { task_status: string }[] }>(
        "/task-project",
        {
          params: {
            paginate: 100,
            from: `${year}-${month}-01`,
          },
        },
      );

      task.total = tasks.data.length;
      for (const item of tasks.data) {
        if (item.task_status === "Done") {
          task.done += 1;
        } else if (item.task_status === "On Going") {
          task.onGoing += 1;
        } else if (item.task_status === "Pending") {
          task.pending += 1;
        }
      }

      // attendance
      const { data: attendance } = await Axios<inferData<typeof a.all>>(
        "/attendance",
        {
          params: {
            from: `${year}-${month}-${day}`,
            to: `${year}-${month}-${day}`,
            isHavePicture: 1,
          },
        },
      );

      return {
        project,
        task,
        attendance:
          attendance.data.length === 0
            ? undefined
            : {
                data: attendance.data[0]?.attendances ?? [],
              },
      };
    },
  }),
});

export { dashboard };
