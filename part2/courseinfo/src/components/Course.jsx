const Course = (props) => {
    return (
        <>
            {
                props.courses.map(course => {
                    return (
                        <div key={course.id}>
                            <Header course={course.name} />
                            <Content parts={course.parts} />
                            <Total parts={course.parts} />
                        </div>)
                })
            }
        </>
    )
}

const Header = ({ course }) => <h2>{course}</h2>

const Total = (props) => {
    //let sum = 0
    const initialValue = 0
    const sum = props.parts.reduce(
        (accumlator, currentValue) => accumlator + currentValue.exercises, initialValue
    );

    return (
        <p><strong>total of {sum} exercises</strong></p>
    )
}

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </>
    )
}

export default Course