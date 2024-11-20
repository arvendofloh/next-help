"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}

const NavLink = ({ children, href, ...rest }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      key={href}
      href={href}
      className={classNames("relative", {
        active: pathname === href,
      })}
      {...rest}
    >
      {children}
    </Link>
  );
};
export default NavLink;
