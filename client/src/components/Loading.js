import { Spinner } from "react-bootstrap";

let borderStyles = ["border", "grow"];
let variantStyles = [
  "text-primary",
  "text-secondary",
  "text-success",
  "text-danger",
  "text-warning",
  "text-info",
  "text-dark",
];

//Create random selected spinner and colour

function randSpinner() {
  let randBorder =
    borderStyles[Math.floor(Math.random() * borderStyles.length)];
  let randVariant =
    variantStyles[Math.floor(Math.random() * variantStyles.length)];

  return (
    <Spinner animation={`${randBorder} ${randVariant}`} role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

export function Loading() {
  return randSpinner();
}
