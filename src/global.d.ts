declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.pdf" {
  const value: string;
  export default value;
}

declare module "pdfjs-dist/build/pdf.worker.min?url" {
  const workerSrc: string;
  export default workerSrc;
}
