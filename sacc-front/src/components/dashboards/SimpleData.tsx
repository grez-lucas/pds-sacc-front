function SimpleData({
  value,
  title,
  measurement,
  variant,
}: {
  value: number;
  title: string;
  measurement: string;
  variant: string;
}) {
  return (
    <div className="w-full h-full flex-col">
      <header className="w-full h-[20%] flex items-center justify-items-center p-2">
        <figure className="w-[10%] h-full">
          {(variant === "blue" || variant === "regular") && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
              />
            </svg>
          )}
          {variant === "warning" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="yellow"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          )}
            {variant === "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          )}
        </figure>
        <h1 className="w-[90%] h-full text-left text-black text-xl">{title}</h1>
      </header>
      <div className="w-full h-[80%] flex items-center justify-items-center">
        <h1
          className={`w-full h-full font-bold text-9xl text-center
          ${variant === "blue" && "text-cyan-300"}
          ${variant === "warning" && "text-yellow-400"}
          ${variant === "error" && "text-red-600"}`}
        >
          {value}{measurement}
        </h1>
      </div>
    </div>
  );
}

export default SimpleData;
