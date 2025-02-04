import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import { A2HS } from "./a2hs";

export default function Page() {
  return (
    <div className="space-y-4">
      <H3>Download</H3>
      <div>
        <A2HS />
      </div>
      <div>
        <a
          href="https://play.google.com/store/apps/details?id=com.hktekno.weekcanmobile"
          target="_blank"
          className="text-main-500 underline"
        >
          Download Android
        </a>
      </div>
    </div>
  );
}
