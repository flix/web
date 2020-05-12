import React, {Component} from "react";
import ReactGA from "react-ga";
import {Card, CardBody, CardText, Col, Container, Row} from "reactstrap";
import InlineEditor from "../../util/InlineEditor";

class PolymorphicEffects extends Component {

    componentDidMount() {
        document.title = "Flix | Polymorphic Effects";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Container style={{"text-align": "justify"}}>
                <Row className="mb-3">
                    <Col sm={12} md={8}>

                        <h1>Polymorphic Effects with Boolean Unification</h1>

                        <p>
                            Posted May 2020 by <i>Magnus Madsen</i>.
                        </p>

                        <p>
                            But before we jump into effects, I want to begin with an amazing story from <a
                            href="https://www.digitalmars.com/articles/b60.html">Walter Bright</a>, the author of the D
                            programming language. The <a
                            href="https://www.digitalmars.com/articles/b60.html">story</a> is worth quoting in full:
                        </p>

                        <Card>
                            <CardBody>
                                <CardText>

                                    <p>
                                        I [Walter Bright] spent the first three years of my career working on flight
                                        critical mechanical
                                        designs
                                        for the Boeing 757. Although these were gearboxes, hydraulics, cables and
                                        linkages, the
                                        methodology used to make error-free systems is very applicable to software
                                        design.
                                    </p>

                                    <p>
                                        For starters is Boeing's attitude towards failure. It is not considered human
                                        error,
                                        fixable by hiring better people. It is a failure of process. The best people
                                        have
                                        bad
                                        days and make mistakes, so the solution is to change the process so the mistakes
                                        cannot
                                        happen or cannot propagate.
                                    </p>

                                    <p>
                                        One simple example is an assembly that is bolted onto the frame with 4 bolts.
                                        The
                                        obvious bolt pattern is a rectangle. Unfortunately, a rectangle pattern can be
                                        assembled
                                        in two different ways, one of which is wrong. The solution is to offset one of
                                        the bolt
                                        holes — then the assembly can only be bolted on in one orientation. The possible
                                        mechanic's mistake is designed out of the system.
                                    </p>

                                    <p>
                                        <i>This idea permeates Boeing designs. Parts can only be assembled one way, the
                                            correct way.</i> (emphasis mine).
                                    </p>
                                </CardText>
                            </CardBody>
                        </Card>

                        <p>
                            While I will not go into the current safety culture a boeing, what struck me is ...
                        </p>

                        <p>
                            separation of pure and impure code.
                        </p>

                        <p>
                            What is an effect system?
                            Why care? Why enforce?
                        </p>

                        <h2>Pure and Impure Functions</h2>

                        <p>
                            In Flix, functions are pure by default. For example, we can write:
                        </p>

                        <InlineEditor>
                            {`def inc(x: Int): Int = x + 1`}
                        </InlineEditor>

                        <p>
                            If we wanted to be explicit (but non-idiomatic) we could write:
                        </p>

                        <InlineEditor>
                            {`def inc(x: Int): Int & Pure = x + 1`}
                        </InlineEditor>

                        <p>
                            where <code>& Pure</code> specifies that <code>inc</code> is pure.
                        </p>


                        <p>
                            We can also write an impure function:
                        </p>

                        <InlineEditor>
                            {`def sayHello(): Unit & Impure = Console.printLine("Hello World!")`}
                        </InlineEditor>

                        <p>
                            where <code>& Impure</code> specifies that <code>sayHello</code> is impure.
                        </p>

                        <p>
                            The Flix type and effect system is <i>sound</i>, hence if we forget the <code>&
                            Impure</code> annotation on <code>sayHello</code> the compiler would emit a type (or rather
                            effect) error.
                        </p>

                        <p>
                            The type and effect system separates pure and impure code. If an expression is pure then it
                            always evaluates to the same value and it cannot have a side-effect. If a function is pure
                            then it always evaluates to the same value when given the same arguments. This is what
                            makes Flix functional-first: We can know and trust that pure functions behave like
                            mathematical functions.
                        </p>

                        <h2>What is Pure and What is Impure?</h2>

                        <p>
                            Any expression that does not satisfy referential transparency is impure. Informally, an
                            expression is pure if it allows equational reasoning. Obvious examples of impurity are
                            printing to the screen, reading a file from disk, or communicating over channels. Less
                            obvious examples are allocating an array, reading from an array, calling JVM methods, and so
                            on.
                        </p>

                        <h2>Higher-Order Functions</h2>

                        <p>
                            We can use the Flix type and effect system to restrict the purity/impurity of function
                            arguments passed to higher-order functions. This is useful for two reasons: (i) it can
                            more accurately capture the contract between caller and callee, and (ii) it can help prevent
                            subtle bugs in the program. We will now look at several examples of such type signatures.
                        </p>

                        <p>
                            We can enforce that the predicate <code>f</code> passed
                            to <code>Set.exists</code> is <i>pure</i>:
                        </p>

                        <InlineEditor>
                            {`def exists(f: a -> Bool, xs: Set[a]): Bool = ...`}
                        </InlineEditor>

                        <p>
                            The signature <code>f: a -> Bool</code> denotes a pure function
                            from <code>a</code> to <code>Bool</code>. Passing an impure function to Set.exists is a
                            compile-time type error. We enforce that <code>f</code> is pure because the contract
                            for <code>exists</code> makes no guarantees about how <code>f</code> is called. The
                            implementation of <code>exists</code> may call <code>f</code> on the elements
                            in <code>xs</code> in any order and any number of times. This requirement
                            is <i>beneficial</i> because its allows freedom in the implementation of <code>Set</code>,
                            including in the choice of the underlying data structure and in the implementation of its
                            operations. For example, we can implement sets using search trees or with hash tables, and
                            we can perform existential queries in parallel using fork-join. <i>If <code>f</code> was
                            impure such implementation details would leak and be observable to the client.</i>
                        </p>




                        <InlineEditor>
                            {`def foreach(f: a ~> Unit, xs: List[a]): Unit & Impure = ...`}
                        </InlineEditor>

                        <InlineEditor>
                            {`def onMouseDown(f: MouseEvent ~> Unit): Unit & Impure
                            def onMouseUp(f: MouseEvent ~> Unit): Unit & Impure = ...`}
                        </InlineEditor>

                        <InlineEditor>
                            {`def assert(f: Unit -> Bool): Unit & Pure = ...
                            def log(f: Unit -> String , l: LogLevel): Unit & Pure = ...`}
                        </InlineEditor>

                        <InlineEditor>
                            {`1 trait Eq[a] {
2 def eq(x: a, y: a): Bool & Pure
3 }`}
                        </InlineEditor>

                        <InlineEditor>
                            {` def minBy(f: a -> b, l: List[a]): a = ...
2 def maxBy(f: a -> b, l: List[a]): a = ...
3 def sortBy(f: a -> Int32, l: List[a]): List[a] = ...
4 def groupBy(f: a -> k, l: List[a]): Map[k, List[a]] = ...`}
                        </InlineEditor>

                        <InlineEditor>
                            {`spawn (2 + 2`}
                        </InlineEditor>

                        <InlineEditor>
                            {`def unfoldWithIter(next: Unit ~> Option[a]): List[a] & Impure`}
                        </InlineEditor>


                        <InlineEditor>
                            {`1 def main(): Int =
2 List.map(x -> x + 1, 1 :: 2 :: Nil);
3 123`}
                        </InlineEditor>


                        <InlineEditor>
                            {`1 -- Redundancy Error ------------------ foo.flix
2
3 >> Useless expression: It has no side-effect(s)
4 and its result is discarded.
5
6 2 | List.map(x -> x + 1, 1 :: 2 :: Nil);
7 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
8 useless expression.`}
                        </InlineEditor>

                        <h2>Polymorphic Effects</h2>

                        <InlineEditor>
                            {`def map(f: a -> b & e, xs: List[a]): List[b] & e = ...`}
                        </InlineEditor>

                        <InlineEditor>
                            {`  def >>(f: a -> b & e1, g: b -> c & e2): a -> c & {e1 /\\ e2} = x -> g(f(x))`}
                        </InlineEditor>


                        <InlineEditor>
                            {` def mapCompose(f: a -> b & e1, g: b -> c & {{(not e1) \\/ e2}}, l: List[a]):
2 List[c] & {{e1 /\\ e2}}`}
                        </InlineEditor>


                        <h2>Interior Mutability</h2>

                        <h2>Type Inference and Boolean Unification</h2>

                        <p>
                            Until next time, happy hacking.
                        </p>

                    </Col>
                </Row>
            </Container>
        );
    }

}

export default PolymorphicEffects
