import FileSaver from "file-saver";

export function download(content: BlobPart, fileName: string, contentType: string = 'application/json' ) {
  const blob = new Blob([content], {type: contentType});
  FileSaver.saveAs(blob, fileName);
}