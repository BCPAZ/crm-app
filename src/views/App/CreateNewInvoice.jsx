import { useState } from "react";
import SendInvoice from "@/components/App/Cost/SendInvoice";
import Input from "@/components/common/Input";
import UserInputModal from "@/components/common/UserInputModal";
import { HiTrash } from "react-icons/hi2";
import { IoAddSharp } from "react-icons/io5";
import { useCreateInvoiceMutation } from "@/data/services/costService";

const CreateNewInvoice = () => {
  const [modal, setModal] = useState({ isOpen: false, type: "" });
  const [from, setFrom] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [to, setTo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [items, setItems] = useState([
    { name: "Iphone 15", quantity: 1, unit_price: 2650, total: 2650 },
    { name: "Iphone 14", quantity: 4, unit_price: 2000, total: 8000 },
  ]);
  const [createInvoice] = useCreateInvoiceMutation();

  const openModal = (type) => setModal({ isOpen: true, type });
  const closeModal = () => setModal({ isOpen: false, type: "" });

  const handleModalSubmit = (userData) => {
    if (modal.type === "from") {
      setFrom(userData);
    } else if (modal.type === "to") {
      setTo(userData);
    }
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, unit_price: 0, total: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === "quantity" || field === "unit_price") {
      newItems[index].total = newItems[index].quantity * newItems[index].unit_price;
    }

    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.total, 0);
  };

  const handleCreateInvoice = () => {
    const invoiceData = {
      from,
      to,
      items,
      total: calculateTotal(),
      // additional data if necessary
    };
    createInvoice(invoiceData);
  };

  return (
    <section>
      <UserInputModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
      />
      <div className="siteContainer">
        <div className="py-10">
          <h1 className="md:text-2xl text-xl font-bold">Create new invoice</h1>
          <div className="rounded-xl shadow-lg mt-10 bg-white">
            <div className="md:p-6 p-3">
              <SendInvoice openUserModal={openModal} />
            </div>
            <div className="md:p-6 p-3">
              <h1 className="text-lg text-gray-400 font-semibold">Details:</h1>
              <div className="pb-6 border-b border-grey/20 border-dashed">
                {items.map((item, index) => (
                  <div key={index} className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
                    <Input
                      label="Title"
                      placeholder="Enter the title"
                      value={item.name}
                      onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    />
                    <Input
                      label="Quantity"
                      placeholder="Enter the quantity"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                    />
                    <Input
                      label="Unit price"
                      placeholder="Enter the unit price"
                      type="number"
                      value={item.unit_price}
                      onChange={(e) => handleInputChange(index, "unit_price", e.target.value)}
                    />
                    <Input
                      label="Total"
                      placeholder="Total price"
                      value={item.total}
                      readOnly
                    />
                    <button onClick={() => removeItem(index)} className="flex items-center gap-2 text-red-600 font-bold text-sm">
                      <HiTrash size={18} />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:p-6 p-3">
              <div className="flex md:flex-row flex-col md:items-center md:justify-between justify-start gap-2">
                <button onClick={addItem} className="text-green-500 flex items-center gap-2 text-sm font-bold">
                  <IoAddSharp size={20} />
                  Add Item
                </button>
              </div>
            </div>
            <div className="md:p-6 p-3">
              <div className="flex items-center justify-end w-full gap-2">
                <div className="flex flex-col gap-2">
                  <span className="flex items-center justify-end gap-2 text-sm font-base text-gray-400">
                    Total:{" "}
                    <span className="w-[160px] text-end text-black">
                      ${calculateTotal()}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={handleCreateInvoice}
            className="p-3 rounded-lg bg-black text-white font-semibold text-sm mb-10"
          >
            Create & Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateNewInvoice;
