import { JSX, SVGProps } from "react";
import { Globe, LucideIcon, Smartphone } from "lucide-react";

import Absent from "./absent";
import Chat from "./chat";
import Client from "./client";
import Company from "./company";
import Dashboard from "./dashboard";
import Facebook from "./facebook";
import Image from "./image";
import Instagram from "./instagram";
import Inventory from "./inventory";
import Item from "./item";
import JobType from "./job-type";
import Leader from "./leader";
import MsExcel from "./msexcel";
import MsWord from "./msword";
import Pdf from "./pdf";
import Progress from "./progress";
import Project from "./project";
import Report from "./report";
import Status from "./status";
import Task from "./task";
import ThumbsUp from "./thumbsup";
import Tiktok from "./tiktok";
import Time from "./time";
import Twitter from "./twitter";
import User from "./user";
import Venue from "./venue";
import Warehouse from "./warehouse";

const contactIcons: Record<
  string,
  LucideIcon | ((props: SVGProps<SVGSVGElement>) => JSX.Element)
> = {
  phone: Smartphone,
  instagram: Instagram,
  x: Twitter,
  facebook: Facebook,
  tiktok: Tiktok,
  web: Globe,
};

export {
  Absent,
  Chat,
  Client,
  Company,
  Dashboard,
  Facebook,
  Image,
  Instagram,
  Inventory,
  Item,
  JobType,
  Leader,
  MsExcel,
  MsWord,
  Pdf,
  Progress,
  Project,
  Report,
  Status,
  Task,
  ThumbsUp,
  Tiktok,
  Time,
  Twitter,
  User,
  Venue,
  Warehouse,
  contactIcons,
};
