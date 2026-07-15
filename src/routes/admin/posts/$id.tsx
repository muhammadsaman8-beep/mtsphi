import { createFileRoute, useRouter } from '@tanstack/react-router'
import { PostForm, type PostFormValues } from '~/components/PostForm'
import { getPostById, updatePost } from '~/server/admin-posts'

export const Route = createFileRoute('/admin/posts/$id')({
  loader: ({ params }) => getPostById({ data: { id: Number(params.id) } }),
  component: EditPost,
})

function EditPost() {
  const post = Route.useLoaderData()
  const router = useRouter()

  const initial: PostFormValues = {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    cover: post.cover,
    category: post.category,
    date: post.date,
    tags: post.tags,
  }

  return (
    <PostForm
      initial={initial}
      heading="Edit Artikel"
      submitLabel="Simpan Perubahan"
      onSubmit={async (values) => {
        await updatePost({ data: { ...values, id: post.id } })
        await router.navigate({ to: '/admin/posts' })
        await router.invalidate()
      }}
    />
  )
}
