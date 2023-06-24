import React from "react";
// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";
import DatosCrédito from "./DatosCrédito";
import DatosDelSolicitante from "./DatosDelSolicitante";
import DPINIT from "./DPINIT";
import Asalariado from "./Asalariado";
import NegocioPropio from "./NegocioPropio";
import Referencias from "./Referencias";

const SolicitudCrédito = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "datos-crédito",
      title: "Datos crédito",
      content: <DatosCrédito stepper={stepper} />
    },
    {
      id: "datos-del-solicitante",
      title: "Datos del solicitante",
      content: <DatosDelSolicitante stepper={stepper} />
    },
    {
      id: "dpi-nit",
      title: "DPI/NIT",
      content: <DPINIT stepper={stepper} />
    },
    {
      id: "asalariado",
      title: "Asalariado",
      content: <Asalariado stepper={stepper} />
    },
    {
      id: "negocio-propio",
      title: "Negocio propio",
      content: <NegocioPropio stepper={stepper} />
    },

    {
      id: "referencias",
      title: "Referencias",
      content: <Referencias stepper={stepper} />
    }
  ];

  return (
    <div className="horizontal-wizard">
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default SolicitudCrédito;
