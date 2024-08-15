import moment from "moment";
const CommentsPanel = () => {
  const comments = [
    {
      id: 1,
      name: "Jayvion Simon",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid",
      attachment:
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
      desc: "We nede to make it aggresive with pricing because it’s in their interest to acquire us",
      createdAt: "2024-08-10T08:32:05.000000Z",
    },
    {
      id: 2,
      name: "Jayvion Simon",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid",
      desc: "We nede to make it aggresive with pricing because it’s in their interest to acquire us",
      createdAt: "2024-08-10T08:32:05.000000Z",
    },
  ];
  return (
    <section className="w-[440px] h-full">
      <div className="w-full">
        <div className="flex flex-col gap-10">
          {
            comments.map((comment,index) => (
              <div className="flex gap-x-5" key={index}>
                <div className="w-[40px] h-[40px] flex items-center justify-center overflow-hidden">
                  <img src={comment.avatar} className="w-full h-full object-cover rounded-full select-none" alt="" />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-md font-medium">{comment.name}</h4>
                    <span className="text-sm text-gray-400 font-medium">{moment(comment.createdAt).fromNow()}</span>
                  </div>
                  {
                    comment.desc && <div className="w-full">
                    <p className="w-full text-sm text-gray-500 font-base">{comment.desc}</p>
                  </div>
                  }
                  {
                    comment.attachment && <div className="w-full max-h-[250px] overflow-hidden rounded-xl select-none">
                    <img className="w-full h-full object-cover" src={comment.attachment} alt={comment.name} />
                  </div>
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default CommentsPanel;
