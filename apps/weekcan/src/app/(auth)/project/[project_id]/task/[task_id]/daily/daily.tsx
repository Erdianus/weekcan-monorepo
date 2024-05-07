"use client";

import { k } from "@hktekno/api";

const DailyTaskProject = () => {
  const a = k.project.task.all.getKey();
  console.log(a);

  return <>Makan mandi</>;
};

export default DailyTaskProject;
