import { ReactNode } from "react";

const PaddingContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-8 w-full max-w-7xl mx-auto print:px-0 ">{children}</div>
  );
};

export default PaddingContainer;
