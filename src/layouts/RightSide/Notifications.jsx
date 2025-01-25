import { useEffect, useState } from "react";
import "../../styles/WidgetContent.css";
import NotificationLoading from "../../components/UI/Loading/NotificationLoading/notificationLoading";
import { toast } from "react-toastify";
import BrokenImg from "../../assets/teacher.svg";

function Notification() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   console.log("Fetching data from API...");
  //   fetch("http://localhost:90/api/questions")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setQuestions(data?.recommendations?.reverse() || data?.reverse());
  //       setLoading(false);
  //     })

  //     .catch((error) => {
  //       setLoading(false);
  //       toast.error("Error", error);
  //     });
  // }, []);

  useEffect(() => {
    console.log("Fetching data from API...");
    fetch("http://localhost:90/api/questions")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received123:", data); // Check the data here
        setQuestions(
          data?.questions?.reverse() ||
            data?.recommendations?.reverse() ||
            data?.reverse()
        );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error", error);
      });
  }, []);

  return (
    <div className="widget__contents text-md">
      {loading ? (
        <NotificationLoading />
      ) : questions.length === 0 ? (
        <div className="widget__content">
          <p>No notifications found</p>
        </div>
      ) : (
        questions.slice(0, 5).map((question) => (
          <>
            <div key={question._id} className="flex flex-row p-2">
              {console.log("Question", question)}
              <img
                src={
                  question?.userPhoto || question?.question?.userPhoto
                    ? question?.userPhoto || question?.question?.userPhoto
                    : BrokenImg
                }
                alt="user_photo"
                className="rounded-full w-12 h-12"
              />
              <div className="widget__contentTitle">
                {/* <h5>{`${
                  question?.question?.postedBy || question.postedBy
                } posted question of ${
                  question?.question?.questionSubject ||
                  question.questionSubject
                } on ${new Date(
                  question.createdAt || question?.question?.createdAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}</h5> */}

                <h5>{`${
                  question?.question?.postedBy || question.postedBy
                } posted question of ${
                  question?.question?.questionSubject ||
                  question.questionSubject
                } on ${new Date(
                  question.createdAt || question?.question?.createdAt
                ).toLocaleDateString("en-CA")} at ${new Date(
                  question.createdAt || question?.question?.createdAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}`}</h5>
              </div>
            </div>
            <hr className="border" />
          </>
        ))
      )}
    </div>
  );
}

export default Notification;
