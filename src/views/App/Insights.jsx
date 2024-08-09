import Selectbox from "@/components/common/Selectbox"

const Insights = () => {
  return (
    <section>
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold w-full">
              Projects Overview
            </h1>
            <Selectbox  />
            <Selectbox outline />
            <Selectbox outline />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Insights