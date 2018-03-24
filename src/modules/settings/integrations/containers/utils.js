import { Alert } from 'modules/common/utils';

export const save = ({
  variables,
  addMutation,
  editMutation,
  integration,
  onSave,
  refetch
}) => {
  let mutation = addMutation;

  if (integration && integration._id) {
    mutation = editMutation;
    variables._id = integration._id;
  }
  console.log(variables);
  mutation({
    variables
  })
    .then(() => {
      if (refetch) {
        refetch();
      }

      if (onSave) {
        onSave();
      }

      Alert.success('Congrats');
    })
    .catch(error => {
      Alert.error(error.message);
    });
};
