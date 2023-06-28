import React, { useState, useEffect } from "react";
import { Button, Card, CardTitle, Table } from "reactstrap";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "../Reportería/Reportería.scss";
import { Download } from "react-feather";
import API from "../../@core/api/api";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const ProductosLista = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await API.get(`product?page=${currentPage}&pageSize=10`);
    setProducts([...response.data.data]);
    setTotalPages(response.data.pagination.totalPages);
  };

  return (
    <Card className="p-2">
      <CardTitle>Productos</CardTitle>
      <Table className="mt-4" responsive>
        <thead>
          <tr>
            <th>No.</th>
            <th>Num. Solicitud</th>
            <th>Nombre del producto</th>
            <th>Código del producto</th>
            <th>Periodicidad de cobros</th>
            <th>Duración (valor)</th>
            <th>Duración (unidad)</th>
            <th>Interés crédito (IVA includo)</th>
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
                    <td>{product.product_name}</td>
                    <td>{product.product_code}</td>
                    <td>{product.frequency}</td>
                    <td>{product.duration}</td>
                    <td>{product.duration_frequency}</td>
                    <td>{product.credit_interest}</td>
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
        <Button.Ripple color="primary" type="reset">
          <Download size={16} />
          <span className="align-middle mx-25">DESCARGAR</span>
        </Button.Ripple>
      </div>
    </Card>
  );
};

export default ProductosLista;
