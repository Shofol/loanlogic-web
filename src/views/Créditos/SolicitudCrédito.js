import React from "react";
// ** React Imports
import { useRef, useState, useEffect } from "react";

// ** Custom Components
import Wizard from "@components/wizard";
import DatosCrédito from "./DatosCrédito";
import DatosDelSolicitante from "./DatosDelSolicitante";
import DPINIT from "./DPINIT";
import Asalariado from "./Asalariado";
import NegocioPropio from "./NegocioPropio";
import Referencias from "./Referencias";
import api from "../../@core/api/api";
import { toast } from "react-hot-toast";
import { formatMessage } from "../../utility/functions/formatMessage";

const SolicitudCrédito = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [valueToSubmit, setValueToSubmit] = useState({});

  const handleSubmitForm = () => {
    const form = new FormData();

    let values = { ...valueToSubmit };
    Object.keys(values).map((key) => {
      if (key === "photo") {
        values[`${key}`].map((file) => {
          form.append(key, file);
        });
      } else {
        form.append(key, values[`${key}`]);
      }
    });
    console.log(form);

    const response = api.post("credit-application", form);
    toast.promise(
      response,
      {
        loading: "Loading",
        success: (data) => {
          resetForm();
          return `Successfully saved ${data.name}`;
        },
        error: (err) => {
          return `ERROR: ${formatMessage(err)}`;
        }
      },
      {
        style: { minWidth: "250px", fontWeight: "bold" }
      }
    );
  };

  useEffect(() => {
    console.log(valueToSubmit);
  }, [valueToSubmit]);

  const steps = [
    {
      id: "datos-crédito",
      title: "Datos crédito",
      content: (
        <DatosCrédito
          stepper={stepper}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    {
      id: "datos-del-solicitante",
      title: "Datos del solicitante",
      content: (
        <DatosDelSolicitante
          stepper={stepper}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    {
      id: "dpi-nit",
      title: "DPI/NIT",
      content: (
        <DPINIT
          stepper={stepper}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    {
      id: "asalariado",
      title: "Asalariado",
      content: (
        <Asalariado
          stepper={stepper}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    {
      id: "negocio-propio",
      title: "Negocio propio",
      content: (
        <NegocioPropio
          stepper={stepper}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },

    {
      id: "referencias",
      title: "Referencias",
      content: (
        <Referencias
          stepper={stepper}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
            handleSubmitForm();
          }}
        />
      )
    }
  ];

  return (
    <div className="horizontal-wizard">
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default SolicitudCrédito;
