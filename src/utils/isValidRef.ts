/** Checks if ref is defined and non-null */
export default function isValidRef(ref) {
  return typeof ref.current !== "undefined" && ref.current
}