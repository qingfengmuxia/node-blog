import * as v from 'valibot';

const PostScheme = v.object({
  title: v.pipe(
    v.string('title must not be null'),
    v.nonEmpty('title must not be null')
  ),
  content: v.pipe(
    v.string('title must not be null'),
    v.nonEmpty('title must not be null')
  )
});

type PostData = v.InferOutput<typeof PostScheme>;

export function getPostData(data: unknown): PostData {
  return v.parse(PostScheme, data);
}
