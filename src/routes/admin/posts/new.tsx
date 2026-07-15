import { createFileRoute, useRouter } from '@tanstack/react-router'
import { PostForm, type PostFormValues } from '~/components/PostForm'
import { createPost } from '~/server/admin-posts'

export const Route = createFileRoute('/admin/posts/new')({
  component: NewPost,
})

function NewPost() {
  const router = useRouter()
  const today = new Date().toISOString().slice(0, 10)
  const initial: PostFormValues = {
    title: '',
    excerpt: '',
    content: '',
    cover: '',
    category: 'Kegiatan Belajar',
    date: today,
    tags: '',
  }

  return (
    <PostForm
      initial={initial}
      heading="Tulis Artikel Baru"
      submitLabel="Publikasikan"
      onSubmit={async (values) => {
        await createPost({ data: values })
        await router.navigate({ to: '/admin/posts' })
        await router.invalidate()
      }}
    />
  )
}
