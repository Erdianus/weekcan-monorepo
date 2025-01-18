import { atom } from "jotai";

import type { inferData, k } from "@hktekno/api";

type Event = inferData<typeof k.company.event.all>["data"][number];

const openAtom = atom(false);
const currEventAtom = atom<Event | undefined>(undefined);

export { openAtom, currEventAtom };
