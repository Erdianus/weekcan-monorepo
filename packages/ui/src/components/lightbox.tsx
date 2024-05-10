import type { LightboxExternalProps } from "yet-another-react-lightbox";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

type LightBoxProps = LightboxExternalProps;

const LightBox = (props: LightBoxProps) => {
  return <Lightbox {...props} plugins={[Captions, Zoom]} />;
};

export type { LightBoxProps };
export { LightBox };
