import styled from "styled-components";
import Card from "@/components/Card";
import Link from "next/link";
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

function Questions({ questions, questionsCount, hasMore, page }) {
  return (
    <QuestionsContainer>
      <h2>Questions tagged with{` ${tag} (${questionsCount})`} </h2>
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
      <Pagination currentPage={parseInt(page) || 1} hasMore={hasMore} />
    </QuestionsContainer>
  );
}

export async function getServerSideProps(context) {
  const { page } = context.query;

  const data = await fetch(
    `https://api.stackexchange.com/2.2/questions?${
      page ? `page=${page}&` : ''
    }order=desc&sort=hot&tagged=reactjs&site=stackoverflow`,
  );
  const result = await data.json();

  return {
    props: {
      questions: result.items,
      questionsCount: result.items?.length !== undefined ? result.items?.length : 0,
      hasMore: result.has_more,
      page: page || 1,
    },
  };
}

export default Questions;
