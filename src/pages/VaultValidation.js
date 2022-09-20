export default function validate(values) {
  let errors = {};
  if (!values.vaultId) {
    errors.vaultId = "Vault ID is required";
  } else if (!/\S+/.test(values.vaultId)) {
    errors.vaultId = "Vault ID is invalid";
  }
  return errors;
}
