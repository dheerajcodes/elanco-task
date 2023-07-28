
import { useParams } from "react-router-dom"

export default function ResourceDetails() {

    const { slug } = useParams();

    console.log('slug', slug)

  return (
    <div>ResourceDetails: {slug}</div>
  )
}
