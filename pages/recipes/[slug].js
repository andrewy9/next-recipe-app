import { useRouter } from "next/router";
import {
  sanityClient,
  urlFor,
  usePreviewSubscription,
  PortableText
} from "../../lib/sanity";

const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  mainImage,
  ingredient[]{
    unit,
    wholeNumber,
    fraction,
    ingredient->{
      name
    }
  },
  instructions
}`;

export default function OneRecipe({ data }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const { recipe } = data;
  return (
    <article>
    </article>
  )
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "recipe" && defined(slug.current)]{
      "params": {
        "slug": slug.current
      }
    }`
  )
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const recipe = await sanityClient.fetch(recipeQuery, { slug })
  return {
    props:
    {
      data: {
        recipe
      }
    }
  }
}