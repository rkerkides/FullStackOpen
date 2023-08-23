const Course = ({ course }) => {
  const Header = () => {
    return <h1>{course.name}</h1>;
  };

  //   const Total = (props) => {
  //     console.log(props);
  //     return (
  //       <p>
  //         Number of exercises{" "}
  //         {props.parts[0].exercises +
  //           props.parts[1].exercises +
  //           props.parts[2].exercises}
  //       </p>
  //     );
  //   };

  const Part = ({ part }) => {
    console.log(part);
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };

  const Content = () => {
    console.log(course.parts);
    return (
      <div>
        {course.parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header />
      <Content />
      {/* <Total course={course} /> */}
    </div>
  );
};

export default Course;
