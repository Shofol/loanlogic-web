import React, { useEffect, useState } from "react";
import { Badge } from "reactstrap";

const StatusTag = ({ status }) => {
  const [color, setColor] = useState("primary");

  useEffect(() => {
    console.log(status);
    console.log(status.includes("ERROR"));
    if (status.includes("PENDING")) {
      setColor("warning");
    } else if (status.includes("ACCEPTED")) {
      setColor("success");
    } else if (status.includes("REFUSED")) {
      setColor("dark");
    } else if (status.includes("ERROR")) {
      setColor("danger");
    } else {
      setColor("info");
    }
  }, [status]);

  return (
    <Badge className="p-1" color={color}>
      {status}
    </Badge>
  );
};

export default StatusTag;

// PENDING => ORANGE
// ACCEPTED => GREEN
// REFUSED => BLACK
// ERROR => RED
// ? => BLUE

{
  /* <Badge color='primary'>
Primary
</Badge>
<Badge color='secondary'>
Secondary
</Badge>
<Badge color='success'>
Success
</Badge>
<Badge color='danger'>
Danger
</Badge>
<Badge color='warning'>
Warning
</Badge>
<Badge color='info'>
Info
</Badge>
<Badge color='dark'>
Dark
</Badge> */
}
