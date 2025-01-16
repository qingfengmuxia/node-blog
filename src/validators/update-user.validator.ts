import * as v from 'valibot';

const UpdateUserSchema = v.object({
  username: v.pipe(
    v.string('username must not be null'),
    v.nonEmpty('username must not be null')
  ),
  password: v.pipe(
    v.string('password must not be null'),
    v.nonEmpty('password must not be null'),
    v.minLength(8, 'password must equal or greater than 8 charters')
  )
});

type UpdateUserData = v.InferOutput<typeof UpdateUserSchema>;

export function getUpdateUserData(data: unknown): UpdateUserData {
  return v.parse(UpdateUserSchema, data);
}
