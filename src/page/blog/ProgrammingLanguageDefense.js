import React, {Component} from "react";
import ReactGA from "react-ga";
import {Col, Container, Row} from "reactstrap";
import {Link} from "react-router-dom";

class ProgrammingLanguageDefense extends Component {

    componentDidMount() {
        document.title = "Flix | In Defense of Programming Languages";
        ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <Container style={{"text-align": "justify"}}>
                <Row className="mb-3">
                    <Col sm={12} md={8}>

                        <h1>In Defense of Programming Languages</h1>

                        <p>
                            Posted July 2021 by <i>Magnus Madsen</i>.
                        </p>

                        <p>
                            This blog post is written in defense of programming language enthusiasts; whether they are
                            compiler hackers, programming language hobbyists, industry professionals, or academics.
                        </p>

                        <p>
                            In this blog post, I want to examine the discourse around programming languages and
                            especially how new programming languages are received. My hope is to improve communication
                            between programming languages enthusiasts and software developers. I understand that we
                            cannot always agree, but it would be fantastic if everyone could at
                            least try to be friendly and intellectually curious!
                        </p>

                        <h2>A Few Quotes from the Internet</h2>

                        <p>
                            Let me set the stage with a few quotes from social media tech sites (e.g. Reddit,
                            HackerNews, Twitter, etc.). I have lightly edited and anonymized the following quotes:
                        </p>

                        <blockquote className="blockquote text-center">
                            <p className="mb-0">"Great! Yet-another-programming-language™. This is exactly what we
                                need; the gazillion of existing programming languages is not enough!"</p>
                            <footer className="blockquote-footer"><cite title="Source Title">Furious Panda</cite> via
                                Reddit
                            </footer>
                        </blockquote>

                        <blockquote className="blockquote text-center">
                            <p className="mb-0">"This is – by far – the worst syntax I have ever seen in a functional
                                language!"</p>
                            <footer className="blockquote-footer"><cite title="Source Title">Irate Penguin</cite> via
                                Reddit
                            </footer>
                        </blockquote>

                        <blockquote className="blockquote text-center">
                            <p className="mb-0">"The language is probably great from a technical point of view, but
                                unless Apple, Google, Mozilla, or Microsoft is on-board it is pointless."</p>
                            <footer className="blockquote-footer"><cite title="Source Title">Angry Beaver</cite> via
                                HackerNews
                            </footer>
                        </blockquote>

                        <blockquote className="blockquote text-center">
                            <p className="mb-0">"How the fuck can anyone understand such weird syntax? I hate all these
                                symbols."</p>
                            <footer className="blockquote-footer"><cite title="Source Title">Bitter
                                Turtle</cite> via Reddit
                            </footer>
                        </blockquote>

                        <blockquote className="blockquote text-center">
                            <p className="mb-0">"The examples all look horrible. The site looks horrible. This needs a
                                lot of work before it gets close to anything I would even consider using."</p>
                            <footer className="blockquote-footer"><cite title="Source Title">Enraged
                                Koala</cite> via Twitter
                            </footer>
                        </blockquote>

                        <p>
                            While all of the above quotes are in response to news about the Flix programming language
                            (on whose website you are currently reading), depressingly similar comments are frequently
                            posted in response to news about other new programming languages.
                        </p>

                        <p>
                            Why do people post such comments? And what can be done about it?
                        </p>

                        <h2>Where do such comments come from?</h2>

                        <p>
                            I think there are two main reasons, both grounded in legitimate concerns:
                        </p>

                        <p>
                            <ul>
                                <li>
                                    <b>Fatigue:</b> I think there is a sense that there are too many new programming
                                    languages coming out all the time and that it is hard to keep up. Paradoxically,
                                    I think there is both a dread of having to keep up with ever-changing programming
                                    languages (or technologies in general) and simultaneously a sense that these
                                    programming languages are all the same, and do not offer anything new.
                                </li>

                                <li>
                                    <b>Speech:</b> Programming languages are the material with which we craft programs:
                                    It is our way of "speaking" algorithmically. They are about what we say, how we say
                                    it, and even what can be said. Like prose, what is beautiful and elegant is
                                    subjective. It is not surprising then that when a new programming language comes a
                                    long and suggests a different form of expression that people may feel challenged.
                                </li>
                            </ul>
                        </p>

                        <p>
                            Of course there are also internet trolls; but lets ignore them.
                        </p>

                        <h2>A Point-by-Point Rebuttal</h2>

                        <p>
                            I will now give a point-by-point rebuttal of the most common refrains heard when a new
                            programming language is proposed.
                        </p>

                        <h5>Do we really need new programming languages?</h5>

                        <p>
                            The Flix <Link to="/faq/"> FAQ </Link> joking responds this question with a rhetorical
                            question: <i>Do we really need safer airplanes? Do we really need electric cars? Do we
                            really need more ergonomic chairs?</i>
                        </p>

                        <p>
                            While that remark may appear mocking, I think it is a valid argument. We want better
                            programming languages because we want to offer software developers better tools to write
                            their programs. There are many areas of improvement:

                            <ul>
                                <li>
                                    Improved safety: Through types, through lifetimes, through static analysis, etc.
                                </li>
                                <li>
                                    Improved performance: Allowing higher abstractions while compiling to fast code.
                                </li>
                                <li>Improved ergonomics: Better IDEs, better APIs, etc.</li>
                            </ul>

                            I don't think we are anywhere near the point where programming languages are as good as they
                            are every going to get. I think we are still in the infancy of the arc of programming
                            languages.
                        </p>

                        <h5>All programming language are the same</h5>

                        <p>
                            It strongly disagree. I think we are experiencing a period of programming language
                            fragmentation after a long period of consolidation. For the last 15-years or so, the
                            industry was dominated by C, C++, C# and Java. The market share of these programming
                            languages were always increasing. I view this as a consolidation phase where there was a
                            sense that object-oriented programming languages such as C# and Java were the way to go.
                        </p>

                        <p>
                            Today that is no longer the case. Instead, the ecosystem is much more diverse and stronger
                            for it. We have Rust. We have Scala. We have Go, Python, and JavaScript. We have Crystal and
                            Nim. We have TypeScript. We are in a period of fragmentation. After a decade (or more) of
                            OO-ossification we are finally in a new and exciting period!
                        </p>

                        <p>
                            If history repeats itself then at some point we will enter a new period of consolidation. I
                            am not sure who will "win", but whoever the winners are, I am sure that they will be
                            "better" languages than those of the last cycle.
                        </p>

                        <p>
                            (Addendum: Of course it is true that when it comes to hobby programming languages many are
                            either purely functional or purely object-oriented programming languages. But that makes
                            sense, of course hobbyist compiler hackers are interested in tinkering with the tools they
                            use at their day job. This does not mean all programming languages are the same. Rather it
                            is a question of better communication, which I will get to.)
                        </p>

                        <h5>Go / Python / Haskell is better</h5>

                        <p>
                            Yes, hopefully there is some progress. In the sense that the programming languages of
                            today should be better than the programming languages of yesterday! But that does not mean
                            that these programming languages will remain better. That is a very narrow view.
                        </p>

                        <h5>A programming language cannot be successful unless a major tech company is behind it</h5>

                        <p>
                            I think this is easily debunked by the success of PHP, Python, Ruby, Rust, and Scala.
                        </p>

                        <h5>Go doesn't have generics. Haha.</h5>

                        <p>
                            I think this comment entirely misses the point. Generics (aka parametric polymorphism) is
                            well-understood, battle-tested, and has been huge successfully in many programming
                            languages. There is nothing left to discuss, really.
                        </p>

                        <p>
                            Imagine instead if the same amount of energy was poured into discussing new exciting
                            features: algebraic effects, lifetimes, etc. Of course such a change in discourse requires
                            the community to write insight blog posts these topics.
                        </p>

                        <h2>Ideas for Better Communication</h2>

                        <p>
                            With these point in mind, I want suggest some ways to improve communication between
                            aspiring programming language designers and software developers:
                        </p>

                        <p>
                            When presenting a new programming language or when writing a blog post related to a new
                            programming language:

                            <ul>
                                <li>
                                    <b>Scope:</b> Clearly state the intended scope of the project. Is it a hobby project
                                    made for fun? Is it an open source project hoping to gain traction? Is it a research
                                    prototype? Do you see it being used? Or learned from? Or are you proud something you
                                    have built yourself?

                                    (Addendum: Regardless of where a project falls on this scale, I don't think we
                                    should ever discourage anyone for being curious. Especially not someones hobby
                                    project.)
                                </li>

                                <li>
                                    <b>Novelty:</b> What is new about the programming language? Are there some new takes
                                    on old ideas? Is there a completely novel feature? Did you fix something you found
                                    burdensome in an existing language?
                                </li>

                                <li>
                                    <b>Resources:</b> What resources are behind the programming language? Is this a
                                    hobby project? An open source project? An academic project? Do you have other
                                    developers? Are you open to collaboration? Do you have industry backing?
                                </li>

                                <li>
                                    <b>Feedback:</b> What kind of feedback are you looking for? What level of
                                    constructive criticism are you expecting?
                                </li>

                                <li>
                                    <b>Reality Check:</b> Avoid grandiose and unsubstantiated claims: Does your compiler
                                    really generate faster code than a C++ compiler? (If so, where did you "cheat"?) Are
                                    you ideas really novel?
                                </li>
                            </ul>
                        </p>

                        <p>
                            I think that the Flix website and our previous blog posts mostly live up to this advice,
                            except that we should put a greater emphasis on the discussion and what can of feedback
                            we would appreciate.
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

export default ProgrammingLanguageDefense