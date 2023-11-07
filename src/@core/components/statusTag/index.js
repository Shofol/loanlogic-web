import React, { useEffect, useState } from "react";
import { Badge } from "reactstrap";

const StatusTag = ({ status }) => {
  const [color, setColor] = useState("primary");

  const translate = [
    // Applications
    { en: 'PENDING_ASSIGNMENT', es: 'PENDIENTE ASIGNACIÓN' },
    { en: 'PENDING_PRE_VALIDATION', es: 'PENDIENTE PRE VALIDACIÓN' },
    { en: 'PENDING_ADDRESS_VALIDATION', es: 'PENDIENTE VALIDACIÓN DE DIRECCIÓN' },
    { en: 'ACCEPTED', es: 'ACEPTADO' },
    { en: 'REFUSED', es: 'RECHAZADO' },
    { en: 'REFUSED_PRODUCT_NOT_FOUND', es: 'RECHAZADOPRODUCTO NO ENCONTRADO' },
    { en: 'ERROR_PRODUCT_MATCH', es: 'ERROR COINCIDENCIA DE PRODUCTO' },
    { en: 'REFUSED_REGION', es: 'RECHAZADO REGIÓN' },
    { en: 'PENDING_GUARANTY', es: 'PENDIENTE GARANTÍA' },
    { en: 'REFUSED_LOCATION_NOT_COVERED', es: 'RECHAZADO UBICACIÓN NO CUBIERTA' },
    { en: 'PENDING_DATA_VALIDATION', es: 'PENDIENTE VALIDACIÓN DE DATOS' },
    { en: 'REFUSED_INCORRECT_DATA', es: 'RECHAZADO DATOS INCORRECTOS' },
    { en: 'PENDING_VALIDATION', es: 'PENDIENTE VALIDACIÓN' },
    { en: 'REFUSED_CRITERIA', es: 'RECHAZADO CRITERIO' },
    { en: 'REFUSED_COMMITTEE', es: 'RECHAZADO COMITÉ' },
    { en: 'RECHAZADO_VALIDACIÓN', es: 'RECHAZADO VALIDACIÓN' },
    { en: 'PENDING_NIT', es: 'PENDIENTE NIT' },
    { en: 'CANCELED', es: 'CANCELADO' },

    // Credits
    { en: 'PENDING', es: 'PENDIENTE' },
    { en: 'LATE', es: 'TARDE' },
    { en: 'FINISHED', es: 'FINALIZADO' },
    { en: 'CANCELED', es: 'CANCELADO' }
    
    // X

    ]
  
    let translation = status;

    var result = translate.filter(obj => {
      return obj.en === status
    })

    console.log(result)

    if(result && result[0]){ translation = result[0].es}

  useEffect(() => {
    if (status) {
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
    }
  }, [status]);

  return (
    <Badge className="p-1" color={color}>
      {translation}
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
