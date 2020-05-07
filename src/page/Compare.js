import React, {Component} from "react";
import ReactGA from "react-ga";
import {
    Button,
    Card,
    CardBody,
    CardSubtitle, CardText,
    CardTitle,
    Col,
    Container, Label,
    ListGroup,
    ListGroupItem,
    Row,
    Table
} from "reactstrap";
import {FaCheck} from "react-icons/fa";
import {FaTimes} from "react-icons/fa";

class Compare extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: "Scala"
        }
    }

    changeLanguage(language) {
        this.setState({language: language});
    }

    componentDidMount() {
        document.title = "Flix | Compare";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Container>

                <Row className="mb-3">
                    <Col>
                        <h1>Flix compared to other programming languages</h1>

                        <p>
                            Here you will find a comparison of Flix to other similar programming languages. The
                            comparisons aim to be fair, but not unbiased. That is, for each point of comparison we aim
                            to give an fair assessment, but the choice of comparison points is biased. For example, we
                            categorically believe that static typing is better than dynamic typing.
                        </p>
                    </Col>
                </Row>

                <Row className="justify-content-md-center mb-3">
                    <Button outline className="btn-sm mr-2" onClick={() => this.changeLanguage("OCaml")}>
                        OCaml
                    </Button>

                    <Button outline className="btn-sm mr-2" onClick={() => this.changeLanguage("Haskell")}>
                        Haskell
                    </Button>

                    <Button outline className="btn-sm mr-2" onClick={() => this.changeLanguage("Scala")}>
                        Scala
                    </Button>
                </Row>

                <Row>
                    <Col>
                        <Table>
                            <thead>
                            <tr>
                                <th/>
                                <th className="text-center">Flix</th>
                                <th className="text-center">Scala</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <th scope="row">Paradigm</th>
                                <td>functional, imperative, logic, channel and process-based concurrency</td>
                                <td>functional, imperative, object-oriented, actor and thread-based concurrency</td>
                            </tr>

                            <tr>
                                <th scope="row">Typing Discipline</th>
                            </tr>

                            <tr>
                                <th scope="row">Platform</th>
                            </tr>

                            <tr>
                                <th scope="row">Type Safety</th>
                            </tr>

                            <tr>
                                <th scope="row">Type Inference</th>
                            </tr>


                            <tr>
                                <th scope="row">Everything is an expression</th>
                            </tr>


                            <tr>
                                <th scope="row">Polymorphic Effects</th>
                            </tr>


                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2>Features</h2>
                        <Table>
                            <thead>
                            <tr>
                                <th/>
                                <th className="text-center">Flix</th>
                                <th className="text-center">Scala</th>
                            </tr>
                            </thead>
                            <tbody>


                            <tr>
                                <th scope="row">Algebraic Data Types and Pattern Matching</th>
                            </tr>


                            <tr>
                                <th scope="row">Polymorphism</th>
                            </tr>

                            <tr>
                                <th scope="row">Syntax</th>
                            </tr>

                            <tr>
                                <th scope="row">Opaque Types</th>
                            </tr>

                            <tr>
                                <th scope="row">Type Aliases</th>
                            </tr>

                            <tr>
                                <th scope="row">Concurrency</th>
                            </tr>

                            <tr>
                                <th scope="row">Tuples</th>
                            </tr>

                            <tr>
                                <th scope="row">Records</th>
                            </tr>

                            <tr>
                                <th scope="row">Boxed Primitives</th>
                            </tr>


                            <tr>
                                <th scope="row"> Full Tail Calls</th>
                            </tr>

                            <tr>
                                <th scope="row">Standard Library</th>
                            </tr>

                            <tr>
                                <th scope="row">Null Values</th>
                            </tr>


                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2>Compiler</h2>
                        <Table>
                            <thead>
                            <tr>
                                <th/>
                                <th className="text-center">Flix</th>
                                <th className="text-center">Scala</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <th scope="row">Warnings/Errors</th>
                            </tr>

                            <tr>
                                <th scope="row">IDE</th>
                            </tr>

                            <tr>
                                <th scope="row">Compilation Times</th>
                                <td colSpan={2}>

                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Incremental Compilation</th>
                                {this.yes()}
                                {this.no()}
                            </tr>
                            <tr>
                                <th scope="row">Parallel Compilation</th>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Container>);
    }

    yes() {
        return <td className="text-center font-weight-bold text-success">Yes</td>;
    }

    no() {
        return <td className="text-center font-weight-bold text-danger">No</td>;
    }
}

export default Compare;
