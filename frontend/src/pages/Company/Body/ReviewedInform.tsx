interface ReviewedInformProps {
  setIsReviewed: (isReviewed: boolean) => void;
}

const ReviewedInform = ({ setIsReviewed }: ReviewedInformProps) => {
  return (
    <div
      className="container p-4"
      style={{
        border: "1px solid lightgray",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <strong className="fs-5 mb-3">You have reviewed this company.</strong>
      <p>Do you want to change your review?</p>
      <button
        className="btn btn-primary ms-auto"
        onClick={() => {
          setIsReviewed(false);
        }}
      >
        Edit review
      </button>
    </div>
  );
};

export default ReviewedInform;
