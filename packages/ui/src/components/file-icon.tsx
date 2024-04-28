import { fileExt } from '@ui/lib/utils';
import { File } from 'lucide-react';

import Image from './icon/image';
import MsExcel from './icon/msexcel';
import MsWord from './icon/msword';
import Pdf from './icon/pdf';

const FileIcon = (props: { text: string }) => {
  const type = fileExt(props.text);

  if (type === 'docx' || type === 'doc') return <MsWord />;
  if (type === 'xlsx' || type === 'xls') return <MsExcel />;
  if (type === 'png' || type === 'jpeg' || type === 'jpg') return <Image />;
  if (type === 'pdf') return <Pdf />;

  return <File />;
};

export default FileIcon;
