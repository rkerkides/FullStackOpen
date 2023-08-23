const Course = ({ course }) => {
  const Header = ({ course }) => {
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

  const Part = (props) => {
    console.log(props);
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    );
  };

  const Content = ({ course }) => {
    console.log({ course });
    return (
      <div>
        <Part
          part={course.parts[0].name}
          exercises={course.parts[0].exercises}
        />
        <Part
          part={course.parts[1].name}
          exercises={course.parts[1].exercises}
        />
        <Part
          part={course.parts[2].name}
          exercises={course.parts[2].exercises}
        />
      </div>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      {/* <Total course={course} /> */}
    </div>
  );
};

export default Course;
