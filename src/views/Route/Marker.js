export const Marker = (props) => {
  return (
    <div className="fs-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#25c76e"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#25c76e"
        style={{ width: "50px", height: "50px" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    </div>
  );
};
