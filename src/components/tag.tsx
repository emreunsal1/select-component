import CloseIcon from "../assets/close.svg";

type TagPropsType = {
  data: { image: string; label: string };
  onClick: (data: { image: string; label: string }) => void;
};

function Tag({ data, onClick }: TagPropsType) {
  return (
    <div className="tag-wrapper" onClick={(e) => e.stopPropagation()}>
      <div className="content">
        {data.image && (
          <div className="img-wrapper">
            <img
              src={
                data.image || "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              }
              alt="Tag image"
            />
          </div>
        )}

        <div className="text">{data.label}</div>
      </div>
      <div onClick={() => onClick(data)} className="back-button">
        <img src={CloseIcon} alt="Close icon" />
      </div>
    </div>
  );
}

export default Tag;
