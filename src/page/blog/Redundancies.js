import React, {Component} from "react";
import ReactGA from "react-ga";
import {Col, Container, Row} from "reactstrap";
import InlineEditor from "../../util/InlineEditor";

class Redundancies extends Component {

    componentDidMount() {
        document.title = "Flix | Redundancies as Compile-Time Errors";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Container style={{"text-align": "justify"}}>
                <Row className="mb-3">
                    <Col sm={12} md={8}>

                        <h1>Redundancies as Compile-Time Errors</h1>

                        <p style={{"color": "grey"}}>

                            As software developers, we hopefully all want to write correct and maintainable code.
                            As we go through these examples, imagine that they are only a small fraction of a large
                            codebase written
                            several people.
                            All of these examples real-world examples taken from the Flix compiler.
                        </p>

                        <p style={{"color": "grey"}}>

                            We begin with the following code fragment:
                        </p>

                        <InlineEditor>
                            {`case Expression.ApplyClo(exp, args, tpe, loc) =>
    val e = visitExp(exp)
    val as = args map visitExp
    Expression.ApplyClo(e, as, tpe, loc)

case Expression.ApplyDef(sym, args, tpe, loc) =>
    val as = args map visitExp
    Expression.ApplyDef(sym, as, tpe, loc)

case Expression.Unary(op, exp, tpe, loc) =>
    val e = visitExp(exp)
    Expression.Unary(op, exp, tpe, loc)

case Expression.Binary(op, exp1, exp2, tpe, loc) =>
    val e1 = visitExp(exp1)
    val e2 = visitExp(exp2)
    Expression.Binary(op, e1, e2, tpe, loc)`}
                        </InlineEditor>

                        <p style={{"color": "grey"}}>

                            Do you spot the issue? If not look closer... OK, got it? The problem is that in the case for
                            unary expressions, while there is a recursive call on <code>exp</code> with its result
                            stored in the local variable <code>e</code>, the constructor mistakenly uses
                            the <code>exp</code> local variable.

                            XXX: This has been in the compiler for a long time. What could have helped? More tests
                            cases, sure.
                            Or: What about a compiler that warns or gives errors about unused variables? The Scala
                            compiler is mum.
                        </p>


                        <p style={{"color": "grey"}}>

                            Now consider the following:
                        </p>


                        <InlineEditor>
                            {`case ResolvedAst.Expression.IfThenElse(exp1, exp2, exp3, tvar, evar, loc) =>
    for {
        (tpe1, eff1) <- visitExp(exp1)
        (tpe2, eff2) <- visitExp(exp2)
        (tpe3, eff3) <- visitExp(exp3)
        condType <- unifyTypM(mkBoolType(), tpe1, loc)
        resultTyp <- unifyTypM(tvar, tpe2, tpe3, loc)
        resultEff <- unifyEffM(evar, eff1, eff2, loc)
    } yield (resultTyp, resultEff)`}
                        </InlineEditor>

                        <p style={{"color": "grey"}}>

                            Do you see the problem? If not, look closer... Ok, got it?
                        </p>

                        <p style={{"color": "grey"}}>

                            The problem is that the local variable <code>eff3</code> is not used; it should have been
                            used in the next-to-last line where the effect of the entire if-then-else expression is
                            computed. While this particular bug did not make it into any release of Flix, it did
                            cause a lot of head-scratching until it was discovered.
                        </p>

                        <InlineEditor>
                            {`
                            
    /**
      * Returns the disjunction of the two effects \`eff1\` and \`eff2\`.
      */
    def mkOr(ef1f: Type, eff2: Type): Type = eff1 match { // TODO: Notice ef1f
      case Type.Cst(TypeConstructor.Pure) => Pure
      case Type.Cst(TypeConstructor.Impure) => eff2
      case _ => eff2 match {
        case Type.Cst(TypeConstructor.Pure) => Pure
        case Type.Cst(TypeConstructor.Impure) => eff1
        case _ => Type.Apply(Type.Apply(Type.Cst(TypeConstructor.Or), eff1), eff2)
      }
    }
                            `}
                        </InlineEditor>

                        <p style={{"color": "grey"}}>

                            Notice the spelling mistake off the argument,
                            but this function is an inne rfunction.
                        </p>

                        <p style={{"color": "grey"}}>

                            What about the beast of the following function?
                        </p>

                        <InlineEditor>
                            {`/**
 * Returns the result of looking up the given \`fieldName\` on the given \`className\`.
 */
def lookupNativeField(className: String, fieldName: String, loc: SourceLocation): Result[Field, NameError] = try {
    // retrieve class object.
    val clazz = Class.forName(className)
    
    // retrieve the matching static fields.
    val fields = clazz.getDeclaredFields.toList.filter {
      case field => field.getName == fieldName && Modifier.isStatic(field.getModifiers)
    }
    
    // match on the number of fields.
    fields.size match {
      case 0 => Err(NameError.UndefinedNativeField(className, fieldName, loc))
      case 1 => Ok(fields.head)
      case _ => throw InternalCompilerException("Ambiguous native field?")
    }
} catch {
    case ex: ClassNotFoundException => Err(NameError.UndefinedNativeClass(className, loc))
}`}
                        </InlineEditor>

                        <p style={{"color": "grey"}}>

                            Do you see any problems?
                        </p>

                        <InlineEditor>
                            {`
                            
  /**
    * Returns the Flix Type of a Java Type
    */
  private def getGenericFlixType(t: java.lang.reflect.Type)(implicit flix: Flix): Type = {
    t match {
      case arrayType: java.lang.reflect.GenericArrayType =>
        val comp = arrayType.getGenericComponentType
        val elmType = getGenericFlixType(comp)
        mkArray(elmType)
      case c: Class[_] =>
        getFlixType(c)
      case _ =>
        // TODO: Can we do better than this for Parametric Types?
        Type.freshTypeVar()
    }
  }
                            `}
                        </InlineEditor>

                        <p style={{"color": "grey"}}>
                            Preamble...
                            Xie and Engler paper.
                            Talk about maintinable. WOrking on a large project. Deadcode being maintained.
                            Bugs lurking.
                            Spoil it here or start with
                        </p>


                        <p style={{"color": "grey"}}>
                            Do you see the problem? Well, the function is never called, and is in fact deadcode.
                            That did not prevent it from surving in the source code for an extended period.
                        </p>

                        <p>
                            The Flix compiler emits a <i>compile-time error</i> for the following redundancies:
                        </p>

                        <p>
                            <table className="table table-striped small">
                                <thead>
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">Unused Def</th>
                                    <td>A function is declared, but never used.</td>
                                </tr>
                                <tr>
                                    <th scope="row">Unused Enum</th>
                                    <td>An enum type is declared, but never used.</td>
                                </tr>
                                <tr>
                                    <th scope="row">Unused Enum Case</th>
                                    <td>A case (variant) of an enum is declared, but never used.</td>
                                </tr>
                                <tr>
                                    <th scope="row">Unused Formal Parameter</th>
                                    <td>A formal parameter is declared, but never used.</td>
                                </tr>
                                <tr>
                                    <th scope="row">Unused Type Parameter</th>
                                    <td>A function or enum declares a type parameter, but it is never used.</td>
                                </tr>
                                <tr>
                                    <th scope="row">Unused Local Variable</th>
                                    <td>A function declares a local variable, but it is never used.</td>
                                </tr>
                                <tr>
                                    <th scope="row">Shadowed Local Variable</th>
                                    <td>A local variable hides another local variable.</td>
                                </tr>
                                <tr>
                                    <th scope="row">Unconditional Recursion</th>
                                    <td>A function unconditionally recurses on all control-flow paths.</td>
                                </tr>
                                <tr>
                                    <th scope="row">Useless Statement Expression</th>
                                    <td>A statement expression discards the result of a pure expression.</td>
                                </tr>
                                </tbody>
                            </table>
                        </p>

                        <p>
                            As the Flix language grows, we will continue to expand the above list, and to ensure that
                            the Flix compiler rejects programs with unused program constructs.
                        </p>

                        <p>
                            Let us look at three examples of these compile-time errors.
                        </p>

                        <h5>Example I: Unused Local Variable</h5>

                        <p>
                            Given the program fragment:
                        </p>


                        <InlineEditor>
                            {`def main(): Bool =
    let l1 = List.range(0, 10);
    let l2 = List.intersperse(42, l1);
    let l3 = List.range(0, 10);
    let l4 = List.map(x -> x :: x :: Nil, l2);
    let l5 = List.flatten(l4);
    List.exists(x -> x == 0, l5)`}
                        </InlineEditor>

                        <p>
                            The Flix compiler emits the compile-time error:
                        </p>


                        <InlineEditor>
                            {`-- Redundancy Error -------------------------------------------------- foo.flix

>> Unused local variable 'l3'. The variable is not referenced within its scope.

4 |     let l3 = List.range(0, 10);
            ^^
            unused local variable.


Possible fixes:

  (1)  Use the local variable.
  (2)  Remove local variable declaration.
  (3)  Prefix the variable name with an underscore.


Compilation failed with 1 error(s).`}
                        </InlineEditor>

                        <p>
                            The error message offers suggestions for how to fix the problem or how to make the compiler
                            shut up (by explicitly marking the variable as unused with an underscore).
                        </p>

                        <p>
                            Programming languages like Elm and Rust implement a similar feature.
                        </p>

                        <h5>Example: Unused Enum Case</h5>

                        <p>
                            Given the enum declaration:
                        </p>

                        <InlineEditor>
                            {`enum Color {
    case Red,
    case Green,
    case Blue
}`}
                        </InlineEditor>

                        <p>
                            If only <code>Red</code> and <code>Green</code> are used then we get the Flix compile-time
                            error:
                        </p>

                        <InlineEditor>
                            {`-- Redundancy Error -------------------------------------------------- foo.flix

>> Unused case 'Blue' in enum 'Color'.

4 |     case Blue
             ^^^^
             unused tag.

Possible fixes:

  (1)  Use the case.
  (2)  Remove the case.
  (3)  Prefix the case with an underscore.

Compilation failed with 1 error(s).`}
                        </InlineEditor>

                        <p>
                            Again, programming languages like Elm and Rust implement a similar feature.
                        </p>

                        <h5>Example: Useless Expression</h5>

                        <InlineEditor>
                            {`def main(): Int =
    List.map(x -> x + 1, 1 :: 2 :: Nil);
    123`}
                        </InlineEditor>

                        <InlineEditor>
                            {`-- Redundancy Error -------------------------------------------------- foo.flix

>> Useless expression: It has no side-effect(s) and its result is discarded.

2 |     List.map(x -> x + 1, 1 :: 2 :: Nil);
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        useless expression.


Possible fixes:

  (1)  Use the result computed by the expression.
  (2)  Remove the expression statement.
  (3)  Introduce a let-binding with a wildcard name.



Compilation failed with 1 error(s).`}
                        </InlineEditor>


                        <p style={{"color": "grey"}}>

                            XXX: Should have examples with unused type param
                        </p>


                        <h5>The Development Experience</h5>

                        <p style={{"color": "grey"}}>


                            It is reasonable to wonder how this impacts the development experience.
                            Afterall, while a program is being written, it is not yet complete
                            and not all definitions, types, variable might be in used.
                        </p>

                        <p style={{"color": "grey"}}>

                            I will admit that in the beginning it can feel like a pain that the compiler is so strict.
                            But after a while you learn to work with the compiler. Now, when I am introducing a new
                            local variable -- not yet used --
                            I simply name it with an underscore and then later when I return to use it, I rename it to
                            its proper name.
                            The same goes for a function. (XXX: Allow functions with undersore)
                            The same applies for enums, etc.
                        </p>

                        <p style={{"color": "grey"}}>

                            While there might be an adjustment period, the upside is huge: I can now be sure that all
                            my code is being used and I can immediately be warned when some code becomes unused.
                            If there is onething I have learned When building a big project, I think maintainability
                            beocmes much more important than writing the initial code.
                        </p>

                        <p style={{"color": "grey"}}>

                            Until next time, happy hacking.
                        </p>

                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Redundancies
