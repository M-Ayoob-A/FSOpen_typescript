import Part from "./Part"
import type { CoursePart } from "../App"

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {
        courseParts.map((p: CoursePart) => <Part coursePart={p} />)
      }
    </>
  )
}

export default Content