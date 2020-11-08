import React, { Children, ReactElement } from "react";
import { useRouter } from "next/router";
import Link from "next/link";


type Props = {
  children: ReactElement;
  activeClassName: string;
  href: string;
  as?: string
  className?: string
}


const ActiveLink = ({ children, activeClassName, ...props }: Props) => {
  const { pathname } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";
  
  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const className = pathname === props.href || pathname === props.as ?
    `${childClassName} ${activeClassName}`.trim() :
    childClassName
  
  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink
