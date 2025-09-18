import React from "react";

export default function SectionTitle({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div className="section-title mb-15">
      <h2 className='font-semibold text-red-500 mb-5 ps-9 relative before:content-[""] before:absolute before:start-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-10 before:bg-red-500 before:rounded-sm'>
        {title}
      </h2>
      <span className="font-semibold text-4xl">{subTitle}</span>
    </div>
  );
}
