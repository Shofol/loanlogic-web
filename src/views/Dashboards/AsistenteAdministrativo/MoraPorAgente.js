// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  UncontrolledDropdown
} from "reactstrap";

// ** Third Party Components
import { ChevronDown, Edit, MoreVertical, Trash } from "react-feather";
import DataTable from "react-data-table-component";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

const projectsArr = [
  {
    progress: 60,
    progressColor: "info",
    agente: "Juan",
    subTitle: "Perez"
  },
  {
    progress: 15,
    progressColor: "danger",
    agente: "Juan",
    subTitle: "Perez"
  },
  {
    progress: 70,
    progressColor: "success",
    agente: "Juan",
    subTitle: "Perez"
  },
  {
    progress: 80,
    progressColor: "warning",
    agente: "Juan",
    subTitle: "Perez"
  },
  {
    progress: 50,
    progressColor: "danger",
    agente: "Juan",
    subTitle: "Perez"
  },
  {
    progress: 99,
    progressColor: "warning",
    agente: "Juan",
    subTitle: "Perez"
  },
  {
    progress: 15,
    progressColor: "danger",
    agente: "Juan",
    subTitle: "Perez"
  }
];

export const columns = [
  {
    name: "Agente",
    selector: (row) => row.agente,
    cell: (row) => {
      return (
        <div className="d-flex flex-column w-100">
          <p className="mb-0 fw-bold">{`${row.agente}`}</p>
          <p className="mb-0 text-black-50">{`${row.subTitle}`}</p>
        </div>
      );
    }
  },
  {
    name: "Progress",
    selector: (row) => row.progress,
    cell: (row) => {
      return (
        <div className="d-flex flex-column w-100">
          <small className="mb-1">{`${row.progress}%`}</small>
          <Progress
            value={row.progress}
            style={{ height: "6px" }}
            className={`w-100 progress-bar-${row.progressColor}`}
          />
        </div>
      );
    }
  }
];

const MoraPorAgente = () => {
  return (
    <Card>
      <div className="d-flex justify-content-between align-items-center">
        <CardHeader tag="h4">Mora por agente</CardHeader>

        <UncontrolledDropdown>
          <DropdownToggle
            className="icon-btn hide-arrow"
            color="transparent"
            size="sm"
            caret
          >
            <MoreVertical size={20} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
              <Edit className="me-50" size={15} />{" "}
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
              <Trash className="me-50" size={15} />{" "}
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default MoraPorAgente;
