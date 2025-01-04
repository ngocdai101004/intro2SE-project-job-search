import { Buffer as NodeBuffer } from "buffer";

interface IFile {
  filename: string;
  buffer: NodeBuffer;
  mimetype: string;
}

export default IFile;
