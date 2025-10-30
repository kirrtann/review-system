import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<HeaderProps> = ({ title, subtitle }) => (
  <header className="text-center py-6">
    <h1 className="text-3xl font-extrabold ">{title}</h1>
    {subtitle && <p className="text-white text-sm mt-2">{subtitle}</p>}
  </header>
);

export default PageHeader;
