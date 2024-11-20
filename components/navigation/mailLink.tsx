"use client";

interface MailLinkProps {
  children: React.ReactNode;
  mailto: string;
}

const MailLink = ({ children, mailto, ...rest }: MailLinkProps) => {
  return (
    <button
      key={mailto}
      onClick={(e) => {
        window.location.href = mailto;
        e.preventDefault();
      }}
      className="relative btn bg-secondary py-2 px-4 text-white rounded-lg ease-in-out duration-300 hover:bg-secondary/80"
      {...rest}
    >
      {children}
    </button>
  );
};
export default MailLink;
