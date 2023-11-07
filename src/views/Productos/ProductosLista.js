import React, { useState, useEffect } from "react";
import { Button, Card, CardTitle, Table } from "reactstrap";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "../Reporteria/Reportería.scss";
import { Download } from "react-feather";
import API from "../../@core/api/api";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { paymentMethods } from "../../configs/data";


const ProductosLista = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [dataToDownload, setDataToDownload] = useState(null);

  function trans (string){
    let translation = string;

    var result = paymentMethods.filter(obj => {
      return obj.value === string
    })

    if(result && result[0]){ translation = result[0].label}
    return translation;
  }

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await API.get(
      `product?page=${currentPage}&sortField=id&sortOrder=ASC&pageSize=10`
    );
    setProducts([...response.data.data]);
    setTotalPages(response.data.pagination.totalPages);
  };

  // mapping the header of the table and also the csv
  const headers = [
    { label: "No.", key: "no" },
    { label: "ID Producto", key: "id" },
    { label: "Nombre del producto", key: "product_name" },
    { label: "Código del producto", key: "product_code" },
    { label: "Periodicidad de cobros", key: "frequency" },
    { label: "Duración (valor)", key: "duration" },
    //{ label: "Duración (unidad)", key: "duration_frequency" },
    { label: "Interés crédito (IVA includo)", key: "credit_interest" },
    { label: "Agencias", key: "agency" },
  ];

  // mapping the data for downloading csv file
  useEffect(() => {
    if (products) {
      let modifiedData = [];
      products.map((element, index) => {
        modifiedData = [
          ...modifiedData,
          {
            no: index + 1,
            id: element?.id,
            product_name: element?.product_name,
            product_code: element?.product_code,
            frequency: element ? trans(element.frequency) : '',
            duration: element?.duration,
            //duration_frequency: element?.duration_frequency,
            credit_interest: element?.credit_interest,
            agency: (element?.agencies || []).join(", "),
          },
        ];
      });
      setDataToDownload(modifiedData);
    }
  }, [products]);

  return (
    <Card className="p-2">
      <CardTitle>Productos</CardTitle>
      <Table className="mt-4" responsive>
        <thead>
          {/*<tr>
            <th>No.</th>
            <th>ID Producto</th>
            <th>Nombre del producto</th>
            <th>Código del producto</th>
            <th>Periodicidad de cobros</th>
            <th>Duración (valor)</th>
            <th>Duración (unidad)</th>
            <th>Interés crédito (IVA includo)</th>
  </tr>*/}
          <tr>
            {headers.map((header) => {
              return <th key={header.label}>{header.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {products.length > 0
            ? products.map((product, index) => {
              return (
                <tr
                  key={product.id}
                  className="clickable-row"
                  onClick={() => {
                    navigate(`/productos/config/${product.id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{product.id}</td>
                  <td className="nowrap">{product.product_name}</td>
                  <td>{product.product_code}</td>
                  <td>{product.frequency ? trans(product.frequency) : ''}</td>
                  <td>{product.duration}</td>
                  {/*<td>{product.duration_frequency}</td>*/}
                  <td>{product.credit_interest}</td>
                  <td>{product.agencies.join(", ")}</td>
                </tr>
              );
            })
            : null}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center my-1">
        <ReactPaginate
          nextLabel=""
          breakLabel="..."
          previousLabel=""
          pageRangeDisplayed={2}
          forcePage={currentPage - 1}
          marginPagesDisplayed={2}
          activeClassName="active"
          pageClassName="page-item"
          breakClassName="page-item"
          nextLinkClassName="page-link"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextClassName="page-item next-item"
          previousClassName="page-item prev-item"
          pageCount={Math.ceil(totalPages)}
          onPageChange={(page) => handlePagination(page)}
          containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        />
      </div>

      <div className="d-flex justify-content-center mt-2">
        {dataToDownload && (
          <CSVLink
            data={dataToDownload}
            headers={headers}
            filename={`productos.csv`}
          >
            <Button.Ripple color="primary" type="reset">
              <Download size={16} />
              <span className="align-middle mx-25">DESCARGAR</span>
            </Button.Ripple>
          </CSVLink>
        )}
      </div>
    </Card>
  );
};

export default ProductosLista;
