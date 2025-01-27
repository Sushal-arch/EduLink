/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import { Tooltip } from "@material-tailwind/react";
import {
  IoArrowDown,
  IoArrowUp,
  IoClose,
  IoCloseOutline,
} from "react-icons/io5";
import { CiChat2 } from "react-icons/ci";
// import { FiMoreHorizontal } from "react-icons/fi";
// import { CiShare2 } from "react-icons/ci";
import BrokenImg from "../../../assets/teacher.svg";
import ReactHtmlParser from "html-react-parser";
import ReactTimeAgo from "react-time-ago";
import { ToastContainer, toast } from "react-toastify";
import "../../../styles/Post.css";
import "react-responsive-modal/styles.css";
import "react-quill/dist/quill.snow.css";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../feature/userSlice";
import { Volume2 } from "lucide-react";

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={new Date(date)} locale="en-US" timeStyle="round" />
    </div>
  );
}

function Post({ post }) {
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  console.log("Post ko post", post);
  const openImageModal = () => {
    setImageModal(true);
  };

  const closeImageModal = () => {
    setImageModal(false);
  };
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const Close = <IoCloseOutline className="text-2xl" />;
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [clickedPost, setClickedPost] = useState(null);
  const openEditModal = (post) => {
    setClickedPost(post);
    setIsEditModalOpen(true);

    // console.log(clickedPost, isEditModalOpen);
  };
  // console.log("POST11", post);
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "https://edulink-backend-zx7r.onrender.com/api/subjects"
        );
        setSubjects(response.data.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);
  const resetForm = () => {
    setQuestion("");
    setSelectedSubject("");
    setImagePreview(null);
  };
  const [answer, setAnswer] = useState("");
  const [voted, setVoted] = useState(null);
  // const [showOptions, setShowOptions] = useState(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    const checkVoteStatus = async () => {
      try {
        const response = await axios.get(
          `https://edulink-backend-zx7r.onrender.com/api/votes/check`,
          { params: { questionId: post?._id, userId: user?._id } }
        );
        setVoted(response.data.voteType);
      } catch (error) {
        toast.error("Failed to check vote");
      }
    };

    checkVoteStatus();
  }, [post, user]);

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        answer: answer,
        questionId: post?._id,
        user: user,
        createdAt: new Date().toLocaleString("ne-NP", {
          timeZone: "Asia/Kathmandu",
        }),
      };
      try {
        await axios.post(
          "https://edulink-backend-zx7r.onrender.com/api/answers",
          body,
          config
        );
        setIsModalOpen(false);
        toast.success("Answer added successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } catch (error) {
        setIsModalOpen(false);
        toast.error(error?.response?.data?.message || "Failed to add answer");
      }
    }
  };

  const handleVote = async (voteType) => {
    try {
      const url = `https://edulink-backend-zx7r.onrender.com/api/votes/${voteType}`;

      if (voted === voteType) {
        await axios.delete(url, {
          params: {
            questionId: post?._id,
            userId: user?._id,
          },
        });
        setVoted(null);
        toast.success("Vote removed successfully");
      } else {
        const voteData = {
          voteType: voteType,
          questionId: post?._id,
          user: user,
        };
        const response = await axios.post(url, voteData);
        setVoted(voteType);
        toast.success(response?.data?.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  };

  const handleEdit = () => {
    openEditModal(post);
    if (post) {
      setQuestion(post.questionName);
      setSelectedSubject(post.questionSubject);
      setInputUrl(post.questionImage);
      // imgURL + post.questionImage
    }
    console.log("inputUrl", inputUrl);
  };
  const handleDelete = async () => {
    setDeleteConfirmModal(false);
    try {
      const response = await axios.delete(
        `https://edulink-backend-zx7r.onrender.com/api/questions/${post?._id}`
      );
      if (response.status == 200) {
        toast.success("Question deleted successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        toast.error("Failed to delete question");
      }
    } catch (error) {
      toast.error("Failed to delete question");
    }
  };
  // const handleEditSubmit = async () => {
  //   if (!clickedPost || !question.trim() || !selectedSubject) {
  //     toast.error("Invalid post data");
  //     return;
  //   }

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   const body = {
  //     questionName: question,
  //     questionUrl: inputUrl,
  //     questionSubject: selectedSubject,
  //     userType: user?.type,
  //     userPhoto: user?.photo,
  //     uid: user?.uid,
  //     postedBy: user?.userName,
  //     createdAt: new Date().toLocaleString("ne-NP", {
  //       timeZone: "Asia/Kathmandu",
  //     }),
  //   };

  //   try {
  //     const response = await axios.put(
  //       `http://localhost:90/api/questions/${clickedPost._id}`,
  //       body,
  //       config
  //     );

  //     setIsEditModalOpen(false);
  //     toast.success(response.data.message);
  //     setTimeout(() => {
  //       window.location.href = "/";
  //     }, 3000);
  //   } catch (error) {
  //     setIsEditModalOpen(false);
  //     toast.error(
  //       error?.response?.data?.message || "Failed to update the question"
  //     );
  //   }
  // };
  const handleEditSubmit = async () => {
    if (!clickedPost || !question.trim() || !selectedSubject) {
      toast.error("Invalid post data");
      return;
    }

    const formData = new FormData();
    formData.append("questionName", question);
    formData.append("questionSubject", selectedSubject);
    formData.append("userType", user?.type);
    formData.append("userPhoto", user?.photo);
    formData.append("uid", user?.uid);
    formData.append("postedBy", user?.userName);
    formData.append(
      "createdAt",
      new Date().toLocaleString("ne-NP", { timeZone: "Asia/Kathmandu" })
    );

    if (document.querySelector('input[type="file"]').files[0]) {
      formData.append(
        "questionImage",
        document.querySelector('input[type="file"]').files[0]
      );
    }

    try {
      const response = await axios.put(
        `https://edulink-backend-zx7r.onrender.com/api/questions/${clickedPost._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setIsEditModalOpen(false);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      setIsEditModalOpen(false);
      toast.error(
        error?.response?.data?.message || "Failed to update the question"
      );
    }
  };

  // const sortedAnswers =
  //   (post?.allAnswers)?.sort((a, b) => {
  //     const aVotes = a?.votes?.upvote ?? 0 - a?.votes?.downvote ?? 0;
  //     const bVotes = b?.votes?.upvote ?? 0 - b?.votes?.downvote ?? 0;
  //     return bVotes - aVotes;
  //   }) || [];
  const sortedAnswers =
    post?.allAnswers?.sort((a, b) => {
      const aVotes = (a?.votes?.upvote ?? 0) - (a?.votes?.downvote ?? 0);
      const bVotes = (b?.votes?.upvote ?? 0) - (b?.votes?.downvote ?? 0);
      return bVotes - aVotes;
    }) || [];

  const imgURL =
    "https://edulink-backend-zx7r.onrender.com/img/questionImages/";
  return (
    <>
      <ToastContainer autoClose={2800} />
      <div className="post rounded-md shadow-lg border hover:bg-[#F2F5FF]">
        <div className="post__info">
          <img
            src={post?.userPhoto ? post?.userPhoto : BrokenImg}
            width={48}
            className="rounded-full"
          />
          <h4 className="font-bold">{post?.postedBy}</h4>
          <small className="flex">
            [<LastSeen date={post?.createdAt} />]
          </small>
        </div>
        {/* <div className="post__body">
          <div className="post__question flex justify-between items-center">
            <p>{post?.questionName}</p>
            <Button
              onClick={() => setIsModalOpen(true)}
              size="sm"
              className="hover:bg-green-400"
            >
              Answer
            </Button>
            <Modal
              open={isModalOpen}
              closeIcon={<IoClose />}
              onClose={() => setIsModalOpen(false)}
              closeOnEsc
              center
              closeOnOverlayClick={false}
              classNames={{
                modal: "answermodal",
                modalAnimationIn: "customEnterModalAnimation",
                modalAnimationOut: "customLeaveModalAnimation",
              }}
              styles={{
                overlay: {
                  height: "auto",
                },
              }}
            >
              <div className="modal__question">
                <h1>{post?.questionName}</h1>
                <p>
                  asked by <span className="name">{post?.postedBy}</span> on{" "}
                  <span className="name">
                    {new Date(post?.createdAt).toLocaleString()}
                  </span>
                </p>
                {post && post.questionImage && (
                  <img
                    src={post.questionImage && imgURL + post.questionImage}
                    alt="url"
                  />
                )}
              </div>
              <div className="modal__answer">
                <ReactQuill
                  value={answer}
                  onChange={handleQuill}
                  placeholder="Enter your answer"
                />
              </div>
              <div className="modal__button">
                <button
                  className="cancle"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button onClick={handleSubmit} type="submit" className="add">
                  Add Answer
                </button>
              </div>
            </Modal>
            <Modal
              open={isEditModalOpen}
              closeIcon={Close}
              classNames={{
                modal: "addQuestionModal",
                modalAnimationIn: "customEnterModalAnimation",
                modalAnimationOut: "customLeaveModalAnimation",
              }}
              animationDuration={800}
              onClose={() => setIsEditModalOpen(false)}
              center
              closeOnOverlayClick={false}
              styles={{
                overlay: {
                  height: "auto",
                },
              }}
            >
              <div className="p-5">
                <div className="text-right mb-2">
                  <label htmlFor="subjects" className="font-medium mr-2">
                    Subject<span className="text-red-500">*</span>:
                  </label>
                  <select
                    id="subjects"
                    value={selectedSubject}
                    className="border p-2 rounded-md"
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">Please assign subject</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.name}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                <label htmlFor="imageUpload" className="font-medium ">
                  Question<span className="required text-red-500">*</span>:
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  type=" text"
                  className="p-3 whitespace-pre-wrap mt-4 shadow-lg border rounded-md w-full h-auto resize-none "
                  placeholder="Start your question with 'What', 'How', 'Why', etc. "
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="imageUpload" className="font-medium mt-4">
                    Upload Question Photo(optional):
                  </label>
                  <input
                    type="file"
                    accept="image"
                    name="imageUpload"
                    onChange={(e) =>
                      setInputUrl(URL.createObjectURL(e.target.files[0]))
                    }
                    className="p-3 mb-2 mt-4 shadow-lg border rounded-md w-full"
                    placeholder="Optional: Include a link that gives context or the image"
                  />
                  {inputUrl && (
                    <img
                      src={inputUrl}
                      alt="Image Preview"
                      className="mt-2 rounded-md shadow-lg"
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                </div>
                <p className="text-red-500 text-sm">
                  Note: * fields are marked as required
                </p>
              </div>
              <div className="flex flex-row justify-center items-center gap-5">
                <Button
                  onClick={handleEditSubmit}
                  type="submit"
                  size="lg"
                  className="hover:bg-green-400"
                >
                  Update Question
                </Button>
                <Button
                  className=""
                  color="red"
                  size="lg"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Modal>
          </div>
          {post && post.questionImage && (
            <img
              src={post.questionImage && imgURL + post.questionImage}
              alt="url"
              style={{ maxWidth: "100%" }}
              onClick={openImageModal}
            />
          )}
          <Modal
            open={imageModal}
            closeIcon={Close}
            classNames={{
              modal: "addQuestionModal",
              modalAnimationIn: "customEnterModalAnimation",
              modalAnimationOut: "customLeaveModalAnimation",
            }}
            animationDuration={800}
            onClose={() => setImageModal(false)}
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <img
              src={post.questionImage && imgURL + post.questionImage}
              alt="url"
              className="w-full"
            />
          </Modal>
        </div> */}
        <div className="post__body">
          <div className="post__question flex justify-between items-center">
            <div className="flex items-center !font-normal">
              <p>{post?.questionName}</p>
            </div>
            {/* <Button
              onClick={() => setIsModalOpen(true)}
              size="sm"
              className="hover:bg-green-400"
            >
              Answer
            </Button> */}
            <Modal
              open={isEditModalOpen}
              closeIcon={Close}
              classNames={{
                modal: "addQuestionModal",
                modalAnimationIn: "customEnterModalAnimation",
                modalAnimationOut: "customLeaveModalAnimation",
              }}
              animationDuration={800}
              onClose={() => setIsEditModalOpen(false)}
              center
              closeOnOverlayClick={false}
              styles={{
                overlay: {
                  height: "auto",
                },
              }}
            >
              <div className="p-5">
                <div className="text-right mb-2">
                  <label htmlFor="subjects" className="font-medium mr-2">
                    Subject<span className="text-red-500">*</span>:
                  </label>
                  <select
                    id="subjects"
                    value={selectedSubject}
                    className="border p-2 rounded-md"
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">Please assign subject</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.name}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                <label htmlFor="imageUpload" className="font-medium">
                  Question<span className="required text-red-500">*</span>:
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  type="text"
                  className="p-3 whitespace-pre-wrap mt-4 shadow-lg border rounded-md w-full h-auto resize-none"
                  placeholder="Start your question with 'What', 'How', 'Why', etc."
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="imageUpload" className="font-medium mt-4">
                    Upload Question Photo (optional):
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="imageUpload"
                    onChange={(e) =>
                      setInputUrl(URL.createObjectURL(e.target.files[0]))
                    }
                    className="p-3 mb-2 mt-4 shadow-lg border rounded-md w-full"
                    placeholder="Optional: Include a link that gives context or the image"
                  />
                  {/* Render image preview only if inputUrl is set */}
                  {inputUrl && (
                    <img
                      src={inputUrl}
                      alt="Image Preview"
                      className="mt-2 rounded-md shadow-lg"
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                </div>
                <p className="text-red-500 text-sm">
                  Note: * fields are marked as required
                </p>
              </div>

              <div className="flex flex-row justify-center items-center gap-5">
                <Button
                  onClick={handleEditSubmit}
                  type="submit"
                  size="lg"
                  className="hover:bg-green-400"
                >
                  Update Question
                </Button>
                <Button
                  color="red"
                  size="lg"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Modal>

            <Button
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(
                  post?.questionName || "No question available"
                );
                window.speechSynthesis.speak(utterance);
              }}
              className="py-[8px] px-[16px] bg-[#94c4fc] text-white rounded hover:bg-[#74A9E0] text-[12px] flex items-center gap-[4px]"
            >
              Listen <Volume2 size={16} />
            </Button>
            <Modal
              open={isModalOpen}
              closeIcon={<IoClose />}
              onClose={() => setIsModalOpen(false)}
              closeOnEsc
              center
              closeOnOverlayClick={false}
              classNames={{
                modal: "answermodal",
                modalAnimationIn: "customEnterModalAnimation",
                modalAnimationOut: "customLeaveModalAnimation",
              }}
              styles={{
                overlay: {
                  height: "auto",
                },
              }}
            >
              <div className="modal__question">
                <h1>{post?.questionName}</h1>
                <p>
                  asked by <span className="name">{post?.postedBy}</span> on{" "}
                  <span className="name">
                    {new Date(post?.createdAt).toLocaleString()}
                  </span>
                </p>
                {post && post.questionImage && (
                  <img
                    src={post.questionImage && imgURL + post.questionImage}
                    alt="url"
                  />
                )}
              </div>
              <div className="modal__answer">
                <ReactQuill
                  value={answer}
                  onChange={handleQuill}
                  placeholder="Enter your answer"
                />
              </div>
              <div className="modal__button">
                <button
                  className="cancle"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button onClick={handleSubmit} type="submit" className="add">
                  Add Answer
                </button>
              </div>
            </Modal>
          </div>
          {post && post.questionImage && (
            // <img
            //   src={post.questionImage && imgURL + post.questionImage}
            //   alt="url"
            //   style={{ maxWidth: "100%" }}
            //   onClick={openImageModal}
            // />

            <img
              src={post.questionImage} // Use the Cloudinary URL directly
              alt="Question Image"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
              onClick={openImageModal} // Opens the image in a modal
            />
          )}

          <Modal
            open={imageModal}
            closeIcon={Close}
            classNames={{
              modal: "addQuestionModal",
              modalAnimationIn: "customEnterModalAnimation",
              modalAnimationOut: "customLeaveModalAnimation",
            }}
            animationDuration={800}
            onClose={() => setImageModal(false)}
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <img
              src={post.questionImage && imgURL + post.questionImage}
              alt="url"
              className="w-full"
            />
          </Modal>
        </div>

        <div className="post__footer">
          <div className="flex items-center gap-4 text-2xl w-full justify-between mt-6">
            <div className="post__footerAction ">
              <div className="flex flex-row items-center">
                <span className="text-sm font-bold text-green-500">
                  {post?.votes?.upvote || 0}
                </span>

                <Tooltip content="Up vote">
                  <p
                    onClick={() => handleVote("upvote")}
                    className={`cursor-pointer ${
                      voted === "upvote" ? "text-blue-500" : ""
                    }`}
                  >
                    <IoArrowUp className="text-green-400" />
                  </p>
                </Tooltip>
              </div>
              <div className="flex flex-row items-center">
                <Tooltip content="Down vote">
                  <p
                    onClick={() => handleVote("downvote")}
                    className={`cursor-pointer ${
                      voted === "downvote" ? "text-red-500" : ""
                    }`}
                  >
                    <IoArrowDown className="text-red-400" />
                  </p>
                </Tooltip>
                <span className="text-sm font-bold text-red-500">
                  {post?.votes?.downvote || 0}
                </span>
              </div>
            </div>

            <p className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
              <CiChat2 />
            </p>

            <div className="post__footerLeft flex items-center gap-2">
              {/* <p className="cursor-pointer mr-2">
                <CiShare2 />
              </p> */}

              {user && (
                <>
                  <div className="flex flex-row gap-4">
                    {(user?.role === "Admin" || user?.uid === post?.uid) && (
                      <Button
                        onClick={() => setDeleteConfirmModal(true)}
                        className="option-button hover:bg-red-500"
                        size="sm"
                      >
                        Delete
                      </Button>
                    )}

                    {user?.uid === post?.uid && (
                      <Button
                        onClick={handleEdit}
                        className="option-button hover:bg-[#e99b6a]"
                        size="sm"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          <p
            style={{
              color: "rgba(0,0,0,0.5)",
              fontSize: "12px",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            {sortedAnswers.length} Answer(s)
          </p>
          <div
            style={{
              margin: "5px 0px 0px 0px ",
              padding: "5px 0px 0px 20px",
              borderTop: "1px solid lightgray",
            }}
            className="post__answer"
          >
            {sortedAnswers
              .slice(0, showAll ? sortedAnswers.length : 2)
              .map((_a, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "10px 5px",
                    borderTop: "1px solid lightgray",
                  }}
                  className="post-answer-container"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#888",
                    }}
                    className="post-answered"
                  >
                    <img
                      src={_a?.user?.photo ? _a?.user?.photo : BrokenImg}
                      alt="user"
                      className="rounded-full"
                      width={40}
                    />
                    <div
                      style={{
                        margin: "0px 10px",
                      }}
                      className="post-info"
                    >
                      <p>{_a?.user?.userName}</p>
                      <span>
                        <LastSeen date={_a?.createdAt} />
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    className="post-answer"
                  >
                    <div>{ReactHtmlParser(_a?.answer)}</div>
                    {/* <Button
                      onClick={() => {
                        const plainText = _a?.answer
                          ? _a.answer.replace(/<[^>]+>/g, "").trim()
                          : "No answer available";

                        // Speak the plain text
                        const utterance = new SpeechSynthesisUtterance(
                          plainText
                        );
                        window.speechSynthesis.speak(utterance);
                      }}
                      style={{
                        padding: "4px 8px", // Smaller padding for a compact button
                        fontSize: "10px", // Smaller font size
                        backgroundColor: "#94c4fc",
                        color: "white",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                      className="hover:bg-[#74A9E0]"
                    >
                      Listen <Volume2 size={14} />
                    </Button> */}
                  </div>
                </div>
              ))}

            {sortedAnswers.length > 2 && (
              <button
                onClick={() => setShowAll(!showAll)}
                style={{
                  marginTop: "10px",
                  background: "none",
                  border: "none",
                  color: "#333",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {showAll ? "View Less" : "View More"}
              </button>
            )}
          </div>
        </div>

        {/* <div>
          <p
            style={{
              color: "rgba(0,0,0,0.5)",
              fontSize: "12px",
              fontWeight: "bold",
              margin: "10px 0",
              cursor: sortedAnswers.length > 0 ? "pointer" : "default",
              textDecoration: sortedAnswers.length > 0 ? "underline" : "none",
            }}
            onClick={() => {
              if (sortedAnswers.length > 0) {
                setShowAll(!showAll);
              }
            }}
          >
            {sortedAnswers.length} Answer(s)
          </p>
          {showAll && (
            <div
              style={{
                margin: "5px 0px 0px 0px ",
                padding: "5px 0px 0px 20px",
                borderTop: "1px solid lightgray",
              }}
              className="post__answer"
            >
              {sortedAnswers.map((_a, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "10px 5px",
                    borderTop: "1px solid lightgray",
                  }}
                  className="post-answer-container"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#888",
                    }}
                    className="post-answered"
                  >
                    <img
                      src={_a?.user?.photo ? _a?.user?.photo : BrokenImg}
                      alt="user"
                      className="rounded-full"
                      width={40}
                    />
                    <div
                      style={{
                        margin: "0px 10px",
                      }}
                      className="post-info"
                    >
                      <p>{_a?.user?.userName}</p>
                      <span>
                        <LastSeen date={_a?.createdAt} />
                      </span>
                    </div>
                  </div>
                  <div className="post-answer">
                    {ReactHtmlParser(_a?.answer)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>
      <Modal
        open={deleteConfirmModal}
        closeIcon={Close}
        classNames={{
          modal: "logoutModal",
          overlayAnimationIn: "customEnterOverlayAnimation",
          overlayAnimationOut: "customLeaveOverlayAnimation",
          modalAnimationIn: "customEnterModalAnimation",
          modalAnimationOut: "customLeaveModalAnimation",
        }}
        animationDuration={400}
        onClose={() => setDeleteConfirmModal(false)}
        closeOnEsc
        center
        closeOnOverlayClick={false}
        styles={{
          overlay: {
            height: "auto",
          },
        }}
      >
        <div className="flex flex-col  justify-center items-center mt-4">
          <span className="text-xl">
            Are you sure you want delete this post?
          </span>
          <p className="text-sm">This post will be deleted permanently.</p>
          <div className="flex gap-4 mt-6">
            <Button onClick={handleDelete} size="lg" color="green">
              Confirm
            </Button>
            <Button
              onClick={() => setDeleteConfirmModal(false)}
              size="lg"
              color="red"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Post;
