import React from "react";
import {
  FaBook,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaMicroscope,
  FaChartLine,
  FaBrain,
  FaRocket,
} from "react-icons/fa";
import "../../styles/WidgetContent.css";

const Notes = () => {
  const semesters = [
    {
      name: "First Semester",
      icon: <FaBook />,
      link: "https://hamrocsit.com/semester/first/",
    },
    {
      name: "Second Semester",
      icon: <FaGraduationCap />,
      link: "https://hamrocsit.com/semester/second/",
    },
    {
      name: "Third Semester",
      icon: <FaChalkboardTeacher />,
      link: "https://hamrocsit.com/semester/third/",
    },
    {
      name: "Fourth Semester",
      icon: <FaLaptopCode />,
      link: "https://hamrocsit.com/semester/fourth/",
    },
    {
      name: "Fifth Semester",
      icon: <FaMicroscope />,
      link: "https://hamrocsit.com/semester/fifth/",
    },
    {
      name: "Sixth Semester",
      icon: <FaChartLine />,
      link: "https://hamrocsit.com/semester/sixth/",
    },
    {
      name: "Seventh Semester",
      icon: <FaBrain />,
      link: "https://hamrocsit.com/semester/seventh/",
    },
    {
      name: "Eighth Semester",
      icon: <FaRocket />,
      link: "https://hamrocsit.com/semester/eight/",
    },
  ];

  return (
    <div className="flex flex-col gap-6 m-5">
      {semesters.map((semester, index) => (
        <a
          key={index}
          href={semester.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-64 gap-4 cursor-pointer"
        >
          <div>{semester.icon}</div>
          <span>{semester.name}</span>
        </a>
      ))}
    </div>
  );
};

export default Notes;
