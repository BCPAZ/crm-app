import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";

const UploadNewDocument = () => {
  return (
    <section>
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <h1 className="text-xl font-semibold">Upload document</h1>
        </div>
      </div>
      <div className="max-w-[1080px] w-full flex lg:flex-row flex-col justify-between mx-auto px-5 gap-10 py-10">
        <div className="lg:w-1/2 w-full flex flex-col gap-3">
          <SecondInput label='Select Docs *' placeholder="Type file code" type="text" />
          <SecondInput label='Select Docs *' placeholder="Type file code" type="text" />
          <Select />
          <Select />
          <Select />
          <Select />
          <SecondInput label='Author' placeholder="Write author name" type="text" />


        </div>
        <div className="lg:w-1/2 w-full">
          <p className="w-full">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
            reprehenderit sed quibusdam at aliquam, dolore fugiat quidem aut
            vitae accusantium vero, incidunt minus molestiae dolorum. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Nam ab qui
            possimus enim, nostrum culpa eveniet autem eum ipsa adipisci?
          </p>
        </div>
      </div>
    </section>
  );
};

export default UploadNewDocument;
