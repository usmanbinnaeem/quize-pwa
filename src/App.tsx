import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Title from "./Components/Title";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { fetchQuizQuestions, getCategory } from "./Components/Api/API";
// Components
import QuestionCard from "./Components/Questions/QuestionsCard";
// types
import { QuestionState, CategoryType } from "./Components/Api/API";
// Styles
import "./App.css";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const App = () => {
  let percentage = 0;
  const [category, setCategory] = useState(0);
  let [categories, setCetogories] = useState<CategoryType[]>([]);
  const [Tquestions, setTquestions] = useState(10);
  const [qtype, setQtype] = useState("multiple");
  const [qdifficulty, setQdifficulty] = useState("");
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    const fetchCategory = async () => {
      const lecategory: CategoryType[] = await getCategory();
      setCetogories(lecategory);
    };
    fetchCategory();
    console.log(fetchCategory());
  }, []);

  const callQuiz = async () => {
    //   const checkQuesLength = () => {
    //   if (Tquestions === 0) {
    //     alert("please select questions length");
    //   }
    // }
    setGameOver(false);

    const Qquestions: QuestionState[] = await fetchQuizQuestions(
      Tquestions,
      category,
      qdifficulty,
      qtype
    );

    setQuestions(Qquestions);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(parseInt(e.target.value));
  };

  if (!questions.length)
    return (
      <>
        <Title />

        <div className={classes.root}>
          {gameOver && (
            <form className="initialForm" onSubmit={(e) => e.preventDefault()}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  item
                  xs={12}
                  md={6}
                >
                  <div>
                    <select
                      style={{
                        padding: "10px",
                        width: "280px",
                        margin: "10px",
                      }}
                      required
                      name="Category"
                      onChange={(e) => handleCategory(e)}
                    >
                      <option style={{ fontWeight: 500 }} value="0">
                        Random
                      </option>
                      {categories.map((lecategory) => (
                        <option
                          style={{ fontWeight: 500 }}
                          value={lecategory.id}
                          key={lecategory.id}
                        >
                          {lecategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  item
                  xs={12}
                  md={6}
                >
                  <div>
                    <select
                      style={{
                        padding: "10px",
                        width: "280px",
                        margin: "10px",
                      }}
                      required
                      name="type"
                      onChange={(e) => setQtype(e.target.value)}
                    >
                      <option value="multiple">Multiple</option>
                      <option value="boolean">True False</option>
                    </select>
                  </div>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  item
                  xs={12}
                  md={6}
                >
                  <div>
                    <select
                      style={{
                        padding: "10px",
                        width: "280px",
                        margin: "10px",
                      }}
                      required
                      name="type"
                      onChange={(e) => setQdifficulty(e.target.value)}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  item
                  xs={12}
                  md={6}
                >
                  <div>
                    <input
                      style={{
                        padding: "10px",
                        maxWidth: "480px",
                        minWidth: "260px",
                        margin: "10px",
                      }}
                      type="number"
                      value={Tquestions}
                      id="textField"
                      onChange={(e) => setTquestions(parseInt(e.target.value))}
                    />
                  </div>
                </Grid>
                {gameOver || userAnswers.length === Tquestions ? (
                  <Button
                    style={{
                      borderRadius: "0px",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => callQuiz()}
                  >
                    Start
                  </Button>
                ) : null}
              </Grid>
            </form>
          )}
        </div>
      </>
    );

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const handleFinish = () => {
    setScore(0);
    setQuestions([]);
    setCategory(0);
    setQtype("multiple");
    setTquestions(0);
    setUserAnswers([]);
    setGameOver(true);
  };

  const nextQuestion = () => {
    const nextQ = number + 1;

    if (nextQ === Tquestions) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      <div className="wrapper">
        {!gameOver ? (
          <>
            <div>
              <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={3} component={Card} className="card">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Category: {questions[number].category}
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className="card">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Question: {number + 1}/{Tquestions}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </div>
          </>
        ) : null}

        {!gameOver ? (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={Tquestions}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          ></QuestionCard>
        ) : null}

        {!gameOver && userAnswers.length === number + 1 && (
          <Button
            style={{
              marginLeft: "49%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "0px",
            }}
            variant="contained"
            color="primary"
            onClick={nextQuestion}
          >
            {userAnswers.length === Tquestions ? (
              "Finish"
            ) : (
              <ArrowForwardIcon />
            )}
          </Button>
        )}
        {gameOver && userAnswers.length === Tquestions && (
          <div className="container">
            <Card>
              <CardContent>
                <Typography
                  style={{ marginBottom: "20px" }}
                  variant="h6"
                  gutterBottom
                >
                  Quiz completed.
                </Typography>
                <Typography style={{ marginBottom: "20px" }} variant="h3">
                  {(percentage = (score * 100) / Tquestions)}%{"  "}
                  {percentage >= 70 ? "Congratulations! " : "Soory "}
                </Typography>
                <Typography
                  style={{ marginBottom: "20px" }}
                  variant="h5"
                  gutterBottom
                >
                  Your Final score is {score}/{Tquestions}
                </Typography>
              </CardContent>
              <Button
                style={{ margin: "0px 0px 30px 30%", borderRadius: "0px" }}
                variant="contained"
                color="secondary"
                onClick={() => handleFinish()}
              >
                Try Again
              </Button>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
