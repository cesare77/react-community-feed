import styled from "styled-components";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";

const QuestionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const CardLink = styled.div`
  text-decoration: none;
`;

const tag = "reactjs";

function Questions() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const router = useRouter();
  const { page } = router.query;
  const urlApi = `https://api.stackexchange.com/2.2/questions?${page ? 'page=${page}&' : ''}order=desc&sort=hot&tagged=${tag}&site=stackoverflow`;

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(urlApi);
      const result = await data.json();

      if (result) {
        setQuestionsCount(result.items.length);
        setQuestions(result.items);
        setHasMore(result.hasMore);
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  return (
    <QuestionsContainer>
      <h2>Questions tagged with{` ${tag} (${questionsCount})`} </h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <div>
            {questions.map((question) => (
              <Link
              key={question.question_id}
              href={`/questions/${question.question_id}`}
              passHref={true}
              className="question-link"
              >
                <CardLink>
                  <Card
                    title={question.title}
                    views={question.view_count}
                    answers={question.answer_count}
                  />
                </CardLink>
              </Link>
            ))}
          </div>
          <Pagination 
            currentPage={parseInt(page) || 1}
            hasMore={hasMore}
          />
        </>
      )}
    </QuestionsContainer>
  );
}

export default Questions;
