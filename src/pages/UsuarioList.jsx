import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import { getUsuarioList, deleteUsuario } from "../../services/UsuarioService";

const UsuarioList = () => {
    const [usuarioList, setUsuarioList] = useState([]);

    useEffect(() => {
        fetchListaUsuarios();
    }, []);

    const fetchListaUsuarios = () => {
        getUsuarioList().then((res) => {
            setUsuarioList(res);
        }).catch((err) => {
            console.error("Error al obtener la lista de usuarios:", err);
        });
    };

    const removeUsuario = (id) => {
        const confirmation = window.confirm('¿Estás seguro de eliminar este usuario?');
        if (!confirmation) return;
        deleteUsuario(id).then(() => {
            fetchListaUsuarios();
        }).catch((err) => {
            console.error("Error al eliminar usuario:", err);
        });
    };

    return (
        <>
            <Menu />
            <Container>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h1>Lista de Usuarios</h1>
                                </Card.Title>
                                <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarioList.map((usuario) => (
                                    <tr key={`usuario-${usuario.id}`}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.email}</td>
                                        <td>
                                        <Link
                                            className="btn btn-primary me-2"
                                            to={`/usuarios/${usuario.id}`}
                                        >
                                            Editar
                                        </Link>
                                        <Button
                                            variant="danger"
                                            onClick={() => removeUsuario(usuario.id)}
                                        >
                                            Eliminar
                                        </Button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UsuarioList;
