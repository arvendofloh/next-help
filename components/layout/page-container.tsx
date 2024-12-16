import { ReactNode } from "react";

const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white px-12 w-full max-w-7xl mx-auto shadow-lg print:px-0 ">
      {children}
    </div>
  );
};

export default PageContainer;
