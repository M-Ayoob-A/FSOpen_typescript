import type { CoursePart } from "../App"

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  
  switch (coursePart.kind) {
    case "basic":
      return <p>
        <div style={{ fontWeight: 'bold' }}>
          {coursePart.name} {coursePart.exerciseCount}
        </div>
        <div>
          Description: {coursePart.description}
        </div>
      </p>
    case "group":
      return <p>
        <div style={{ fontWeight: 'bold' }}>
          {coursePart.name} {coursePart.exerciseCount}
        </div>
        <div>
          Number of Group Projects: {coursePart.groupProjectCount}
        </div>
      </p>
    case "background":
      return <p>
        <div style={{ fontWeight: 'bold' }}>
          {coursePart.name} {coursePart.exerciseCount}
        </div>
        <div>
          Description: {coursePart.description}
        </div>
        <div>
          Background Material: {coursePart.backgroundMaterial}
        </div>
      </p>
      case "special":
      return <p>
        <div style={{ fontWeight: 'bold' }}>
          {coursePart.name} {coursePart.exerciseCount}
        </div>
        <div>
          Description: {coursePart.description}
        </div>
        <div>
          Requirements: {coursePart.requirements.join(', ')}
        </div>
      </p>
    default:
      return assertNever(coursePart)
  }
}

export default Part