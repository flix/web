import React, {Component} from "react";
import ReactGA from "react-ga";
import {
    Button,
    Col,
    Container,
    Row,
    Table
} from "reactstrap";

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

                <Row className="mb-3">
                    <Col>
                        <h2 className="text-center">Overview</h2>
                        <Table>
                            <thead>
                            <tr>
                                <th className="w-33"/>
                                <th className="w-33 text-center">Flix</th>
                                <th className="w-33 text-center">Scala</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <th scope="row">Paradigm</th>
                                <td>functional, imperative, logic</td>
                                <td>functional, imperative, object-oriented</td>
                            </tr>

                            <tr>
                                <th scope="row">Typing Discipline</th>
                                <td>strong, static, sound</td>
                                <td>strong, static, unsound</td>
                            </tr>

                            <tr>
                                <th scope="row">Concurrency</th>
                                <td>channel and process-based</td>
                                <td>threads</td>
                            </tr>

                            <tr>
                                <th scope="row">Platform</th>
                                <td>JVM</td>
                                <td>JVM</td>
                            </tr>

                            <tr>
                                <th scope="row">Type Inference</th>
                                <td>local, complete</td>
                                <td>local, incomplete</td>
                            </tr>

                            <tr>
                                <th scope="row">Polymorphic Effects</th>
                                {this.yes()}
                                {this.no()}
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <h2 className="text-center">Language Features</h2>
                        <Table>
                            <thead>
                            <tr>
                                <th className="w-33"/>
                                <th className="w-33 text-center">Flix</th>
                                <th className="w-33 text-center">Scala</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <th scope="row">Syntax</th>
                                <td>keyword-based with braces</td>
                                <td>keyword-based with braces</td>
                            </tr>

                            <tr>
                                <th scope="row">Primitive Types</th>
                                <td>Float32, Float64, Int8, Int16, Int32, Int64</td>
                                <td>Float32, Float64, Int8, Int16, Int32, Int64</td>
                            </tr>

                            <tr>
                                <th scope="row">Algebraic Data Types</th>
                                {this.yes()}
                                {this.yes("case classes")}
                            </tr>

                            <tr>
                                <th scope="row">Pattern Matching</th>
                                {this.yes()}
                                {this.yes("case classes")}
                            </tr>

                            <tr>
                                <th scope="row">Records</th>
                                {this.yes("row polymorphic")}
                                {this.no()}
                            </tr>

                            <tr>
                                <th scope="row">Opaque Types</th>
                                {this.yes()}
                                {this.yes()}
                            </tr>

                            <tr>
                                <th scope="row">Type Aliases</th>
                                {this.yes()}
                                {this.yes()}
                            </tr>

                            <tr>
                                <th scope="row">Uniform Function Call Syntax</th>
                                {this.yes()}
                                {this.no()}
                            </tr>

                            <tr>
                                <th scope="row">Monadic Notation</th>
                                {this.yes("let*")}
                                {this.yes("for-loop")}
                            </tr>

                            <tr>
                                <th scope="row">Module System</th>

                            </tr>

                            <tr>
                                <th scope="row">User-Define operators</th>
                            </tr>

                            <tr>
                                <th scope="row">Error Model</th>
                            </tr>

                            <tr>
                                <th scope="row">Implicit Coercions</th>
                            </tr>

                            <tr>
                                <th scope="row">Tail Call Elimination</th>
                            </tr>

                            <tr>
                                <th scope="row">Standard Library</th>
                            </tr>

                            <tr>
                                <th scope="row">Safe Nulls</th>
                                {this.no()}
                                {this.yellow("Yes", "with feature flag")}
                            </tr>

                            <tr>
                                <th scope="row">String Interpolation</th>
                                {this.yes("limited")}
                                {this.yes("extensive")}
                            </tr>

                            <tr>
                                <th scope="row">Raw Strings</th>
                                {this.no("planned")}
                                {this.yes()}
                            </tr>

                            <tr>
                                <th scope="row">Other Notable Features</th>
                                <td>first-class Datalog constraints</td>
                                <td>implicit parameters, implicit conversions, type members, macros, union and
                                    intersection types
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <h2 className="text-center">Development Experience</h2>
                        <Table>
                            <thead>
                            <tr>
                                <th className="w-33"/>
                                <th className="w-33 text-center">Flix</th>
                                <th className="w-33 text-center">Scala</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <th scope="row">Integrated Development Environments (IDEs)</th>
                                {this.no()}
                                {this.yes("several")}
                            </tr>

                            <tr>
                                <th scope="row">Compiler Throughput</th>
                                <td>20,000 lines/sec</td>
                                <td>10,000 lines/sec</td>
                            </tr>
                            <tr>
                                <th scope="row">Incremental Compilation</th>
                                {this.no()}
                                {this.yes()}
                            </tr>
                            <tr>
                                <th scope="row">Parallel Compilation</th>
                                {this.yes()}
                                {this.no()}
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <h2 className="text-center">Philosophical Differences</h2>
                        <Table>
                            <thead>
                            <tr>
                                <th className="w-33"/>
                                <th className="w-33 text-center">Flix</th>
                                <th className="w-33 text-center">Scala</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <th scope="row">No Compiler Warnings, Only Errors</th>
                                {this.green("Yes")}
                                {this.no()}
                            </tr>

                            <tr>
                                <th scope="row">Compiler/Language Extensions?</th>
                                {this.no("by design")}
                                {this.yes()}
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Container>);
    }

    green(text, comment) {
        if (comment === undefined)
            return (
                <td className="text-center">
                    <span className="font-weight-bold text-success">{text}</span>
                </td>);
        else
            return (
                <td className="text-center">
                    <span className="font-weight-bold text-success">{text}</span>
                    <span className="text-muted">({comment})</span>
                </td>
            );
    }

    yellow(text, comment) {
        if (comment === undefined)
            return (
                <td className="text-center">
                    <span className="font-weight-bold text-warning">{text}</span>
                </td>);
        else
            return (
                <td className="text-center">
                    <span className="font-weight-bold text-warning">{text}</span> <span
                    className="text-muted">({comment})</span>
                </td>
            );
    }


    red(text, comment) {
        if (comment === undefined)
            return (
                <td className="text-center">
                    <span className="font-weight-bold text-danger">{text}</span>
                </td>);
        else
            return (
                <td className="text-center">
                    <span className="font-weight-bold text-danger">{text}</span> <span
                    className="text-muted">({comment})</span>
                </td>
            );
    }

    yes(text) {
        if (text === undefined)
            return <td className="text-center">
                <span className="font-weight-bold text-success">Yes</span>
            </td>;
        else
            return <td className="text-center"><span className="font-weight-bold text-success">Yes</span> <span
                className="text-muted">({text})</span></td>;
    }

    no(text) {
        if (text === undefined)
            return <td className="text-center"><span className="font-weight-bold text-danger">No</span></td>;
        else
            return <td className="text-center"><span className="font-weight-bold text-danger">No</span> <span
                className="text-muted">({text})</span></td>;
    }
}

export default Compare;
