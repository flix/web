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

                        <p>
                            As software developers, I hope we all strive to write correct and maintainable code.
                            Today, I want to share some code fragments where by accident I failed in these two goals.
                        </p>

                        <p>
                            I want to show you some real-world code, taken from the Flix compiler, and then ask you to
                            discover what is wrong with the code. Then, later, I will argue how programming languages
                            can help avoid such problems. (Note: The Flix compiler is currently written in Scala, so the
                            examples are in Scala, but the lessons learned are applied to the Flix programming language.
                            I hope that makes sense.)
                        </p>

                        <p>
                            Let us begin our journey with the following code fragment:
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

                        <p>
                            Did you spot the issue?
                        </p>

                        <p>
                            If not, look again.
                        </p>

                        <p>
                            Ok, got it?
                        </p>

                        <p>
                            The problem is the following: In the case for <code>Unary</code> the local
                            variable <code>e</code> holds the result of the recursion on <code>exp</code>. But by
                            mistake the reconstruction of <code>Unary</code> uses <code>exp</code> and
                            not <code>e</code> as intended. The local variable <code>e</code> is unused. Consequently,
                            the specific transformations applied by <code>visitExp</code> under unary expressions are
                            silently discarded. This bug was in Flix compiler for some time.
                        </p>

                        <p>
                            Let us continue our journey with the following code fragment:
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

                        <p>
                            Did you spot the issue?
                        </p>

                        <p>
                            If not, look again.
                        </p>

                        <p>
                            Ok, got it?
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
                                    <th scope="row">Useless Expression Statement</th>
                                    <td>An expression statement discards the result of a pure expression.</td>
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

                        <h5>Example II: Unused Enum Case</h5>

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

                        <h5>Example III: Useless Expression Statement</h5>

                        <p>
                            Given the program fragment:
                        </p>

                        <InlineEditor>
                            {`def main(): Int =
    List.map(x -> x + 1, 1 :: 2 :: Nil);
    123`}
                        </InlineEditor>

                        <p>
                            The Flix compiler emits the compile-time error:
                        </p>

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


                        <p>
                            The problem is that the evaluation of <code>List.map(x -> x + 1, 1 :: 2 :: Nil)</code> has
                            no side-effect and the result is simply discarded.
                        </p>

                        <p>
                            But this is <i>not</i> your Grandma's average compile-time error. At the time of writing, I
                            know of no other programming language that offers a similar warning / error with
                            the same precision as Flix. (If you do, please drop me a line on Gitter).
                        </p>

                        <p>
                            The key challenge is to (automatically) determine whether an expression is pure
                            (side-effect free) in the presence of polymorphism. Specifically, the call
                            to <code>List.map</code> is pure because the <i>function argument</i> <code>x -> x +
                            1</code> is pure. In other words, the purity of <code>List.map</code> depends on the purity
                            of its argument: it is <i>effect polymorphic</i>. The combination of type inference,
                            fine-grained effect inference, and effect polymorphism is a strong cocktail that I plan to
                            cover in a future blog post.
                        </p>

                        <p>
                            Note: The above is fully implemented in master, but has not yet been "released".
                        </p>

                        <h5>Final Thoughts</h5>

                        <p>
                            I believe that unused program fragments are a threat to long-term software maintenance.
                            But it is a threat that can be neutralized by better programming language support and
                            minor changes to development practices. I also believe that reporting unused program
                            fragments can help programmers &ndash; whether inexperienced or seasoned &ndash; avoid
                            stupid mistakes that wastes time during development.
                        </p>

                        <p>
                            A reasonable concern is whether working with a compiler that rejects programs with unused
                            code fragments is too cumbersome or annoying. In my experience, the answer is no. After
                            a small learning period, whenever you want to introduce a new code fragment that will not
                            immediately be used, you simple remember to prefix it with an underscore, and then later you
                            come back and remove the underscore when you want to use it.
                        </p>

                        <p>
                            While there might be a short adjustment period, the upside is <i>huge</i>: The compiler
                            provides an iron-clad guarantee that all my code is, in fact, useful. Moreover, whenever I
                            refactor some potentially very old code, I am immediately informed if some code fragment
                            becomes unused. I think such long-term maintainability concerns are significantly more
                            important than doing a little bit of extra work during the initial development.
                        </p>

                        <p>
                            Until next time, happy hacking.
                        </p>

                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Redundancies
