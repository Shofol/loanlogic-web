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
import { useEffect, useState } from "react";
import api from "../../../@core/api/api";

export const columns = [
  {
    name: "Promotor",
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
    name: "Monto Mora",
    selector: (row) => row.default_amount,
    cell: (row) => {
      return (
        <div className="d-flex flex-column w-100">
          <p className="mb-0 fw-bold">{`${row.default_amount}`} Q</p>
        </div>
      );
    }
  },
  {
    name: "Porcentaje Mora",
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
  const [data, setData] = useState(null);
  const [rows, setRows] = useState([]);

  const formatter = new Intl.NumberFormat('en-US');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`stats/default_breakdown`);
    setData(response.data.data);
  };

  useEffect(() => {
    if (data) {
      setRows(
        data.map((item) => {
          return {
            default_amount: formatter.format(item.default_amount),
            progress: formatter.format(item.default_percentage),
            progressColor: returnColor(item.default_percentage),
            agente: `${item.user.name}`,
            subTitle: `${item.user.family_name}`
          };
        })
      );
    }
  }, [data]);

  const returnColor = (value) => {
    if (value < 4) {
      return "success";
    } else if (value >= 4 && value < 8) {
      return "warning";
    } else {
      return "danger";
    }
  };

  return (
    <Card>
      <div className="d-flex justify-content-between align-items-center">
        <CardHeader tag="h4">Mora por promotor</CardHeader>

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
          data={rows}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default MoraPorAgente;
