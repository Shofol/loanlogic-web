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
import {
  Briefcase,
  CreditCard,
  FileText,
  Gift,
  Globe,
  User
} from "react-feather";

const SolicitudCrédito = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [valueToSubmit, setValueToSubmit] = useState({});
  const [occupation, setOccupation] = useState(null);
  const [willSkip5, setWillSkip5] = useState(false);

  const handleSubmitForm = () => {
    const form = new FormData();

    let values = { ...valueToSubmit };
    Object.entries(values).map((pair) => {
      if (pair[0] === "photos_of_bills" || pair[0] === "photos_of_the_dpi") {
        values[`${pair[0]}`].map((file) => {
          form.append(`${pair[0]}`, file);
        });
      } else if (pair[0] === "gurrentee_items") {
        form.append(`${pair[0]}`, JSON.stringify(pair[1]));
      } else {
        form.append(pair[0], pair[1]);
      }
    });

    const response = api.post("credit-application", form);
    toast.promise(
      response,
      {
        loading: "Loading",
        success: (data) => {
          return `${data.data.message}`;
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
    localStorage.setItem("occupation", occupation);
  }, [occupation]);

  const steps = [
    {
      id: "datos-crédito",
      title: "Datos crédito",
      icon: <CreditCard size={16} />,
      content: (
        <DatosCrédito
          stepper={stepper}
          onOccupationSelect={(occupation) => {
            setOccupation(occupation);
          }}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    {
      id: "datos-del-solicitante",
      title: "Datos del solicitante",
      icon: <User size={16} />,
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
      icon: <FileText size={16} />,
      content: (
        <DPINIT
          stepper={stepper}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    occupation !== "BUSINESS" && occupation !== "NOINCOME"
      ? {
          id: "asalariado",
          title: "Asalariado",
          icon: <Gift size={16} />,
          content: (
            <Asalariado
              stepper={stepper}
              onSubmit={(value) => {
                setValueToSubmit({ ...valueToSubmit, ...value });
              }}
            />
          )
        }
      : null,

    occupation !== "SALARIED" && occupation !== "NOINCOME"
      ? {
          id: "negocio-propio",
          title: "Negocio propio",
          icon: <Briefcase size={16} />,
          content: (
            <NegocioPropio
              stepper={stepper}
              skipSept5={willSkip5}
              onSubmit={(value) => {
                setValueToSubmit({ ...valueToSubmit, ...value });
              }}
            />
          )
        }
      : null,

    {
      id: "referencias",
      title: "Referencias",
      icon: <Globe size={16} />,
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
