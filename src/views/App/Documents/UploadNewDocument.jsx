import Button from "@/components/common/Button";
import FileUploader from "@/components/common/FileUploader";
import SecondInput from "@/components/common/SecondInput";
import SecondTextArea from "@/components/common/SecondTextArea";
import Select from "@/components/common/Select";

const UploadNewDocument = () => {
  return (
    <section className="w-full h-full">
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <h1 className="text-xl font-semibold">Upload document</h1>
        </div>
      </div>
      <div className="max-w-[1080px] w-full flex lg:flex-row flex-col justify-between mx-auto px-5 gap-10 py-10">
        <div className="lg:w-1/2 w-full flex flex-col gap-3">
          <SecondInput column label="Select Docs *" placeholder="Type file code" type="text" />
          <SecondInput column label="Select Docs *" placeholder="Type file code" type="text" />
          <Select column />
          <Select column />
          <SecondInput column label="Author" placeholder="Write author name" type="text" />
          <FileUploader />
          <SecondInput column label="Contractor document number" placeholder="Document number" type="text" />
          <SecondTextArea column label="Comment" placeholder="Enter your comment" /> {/* labelValue doğru şekilde sağlanmış */}
          <SecondInput column label="Page size" placeholder="Page size" type="text" />
          <Button value="Upload" />
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
