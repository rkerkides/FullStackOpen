const Course = ({ course }) => {
  const Header = () => {
    return <h1>{course.name}</h1>;
  };

  const Total = () => {
    return (
      <p>
        <strong>
          Number of exercises{" "}
          {course.parts.reduce((total, part) => total + part.exercises, 0)}
        </strong>
      </p>
    );
  };

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
      <Total />
    </div>
  );
};

export default Course;
