import { useEffect, useState } from "react";
import useToast from "@/hooks/useToast";
import SendInvoice from "@/components/App/Cost/SendInvoice";
import Input from "@/components/common/Input";
import UserInputModal from "@/components/common/UserInputModal";
import { HiTrash } from "react-icons/hi2";
import { IoAddSharp } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { useCreateInvoiceMutation } from "@/data/services/costService";
import Spinner from "@/components/common/Spinner";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FileIcon, defaultStyles } from "react-file-icon";

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
  const [items, setItems] = useState([]);
  const [taxAmount, setTaxAmount] = useState("");
  const [note, setNote] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);
  const [createInvoice, { isLoading, isError, isSuccess }] =
    useCreateInvoiceMutation();

  const openModal = (type) => setModal({ isOpen: true, type });
  const closeModal = () => setModal({ isOpen: false, type: "" });

  const navigate = useNavigate();

  const { showToast } = useToast();

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
      newItems[index].total =
        newItems[index].quantity * newItems[index].unit_price;
    }

    setItems(newItems);
  };

  const handleReceiptFile = (e) => {
    const file = e.target.files[0];
    setReceiptFile(file);
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.total, 0);
  };

  const calculateTotalWithTax = () => {
    const subtotal = calculateTotal();
    return subtotal + taxAmount;
  };

  const handleCreateInvoice = () => {
    const invoiceData = {
      from,
      to,
      items,
      taxes: taxAmount,
      note,
      receipt_file: receiptFile,
    };
    createInvoice(invoiceData);
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("Faktura uğurlu şəkildə göndərildi", "success");
      setItems([]);
      setTo({
        name: "",
        email: "",
        address: "",
        phone: "",
      });
      setFrom({
        name: "",
        email: "",
        address: "",
        phone: "",
      });
      setReceiptFile(null);
      navigate("/cost");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Faktura göndərilə bilmədi", "error");
    }
  }, [isError]);

  return (
    <section>
      <Toaster />
      <UserInputModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
      />
      <div className="siteContainer">
        <div className="py-10">
          <h1 className="md:text-2xl text-xl font-bold">Yeni faktura yarat</h1>
          <div className="rounded-xl shadow-lg mt-10 bg-white">
            <div className="md:p-6 p-3">
              <SendInvoice from={from} to={to} openUserModal={openModal} />
            </div>
            <div className="md:p-6 p-3">
              <h1 className="text-lg text-gray-400 font-semibold">Detallar:</h1>
              <div className="pb-6 border-b border-grey/20 border-dashed">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10"
                  >
                    <Input
                      label="Ad"
                      name="name"
                      placeholder="Ad daxil edin"
                      value={item.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                    <Input
                      label="Say"
                      placeholder="Say daxil edin"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                    />
                    <Input
                      label="Vahid qiymət"
                      placeholder="Vahid qiymət daxil edin"
                      type="number"
                      value={item.unit_price}
                      onChange={(e) =>
                        handleInputChange(index, "unit_price", e.target.value)
                      }
                    />
                    <Input
                      label="Ümumi qiymət"
                      placeholder="Ümumi qiymət"
                      value={item.total}
                      readOnly
                    />
                    <button
                      onClick={() => removeItem(index)}
                      className="flex items-center gap-2 text-red-600 font-bold text-sm"
                    >
                      <HiTrash size={18} />
                      Silin
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:p-6 p-3">
              <div className="flex md:flex-row flex-col md:items-center md:justify-between justify-start gap-2">
                <button
                  onClick={addItem}
                  className="text-green-500 flex items-center gap-2 text-sm font-bold"
                >
                  <IoAddSharp size={20} />
                  Məhsul əlavə edin
                </button>
              </div>
            </div>
            <div className="md:p-6 p-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="md:w-1/2 w-full flex md:flex-row flex-col justify-end gap-4 mb-3">
                    <Input
                      label="Vergi məbləği"
                      placeholder="Vergi məbləğini daxil edin"
                      type="number"
                      value={taxAmount}
                      onChange={(e) => setTaxAmount(parseFloat(e.target.value))}
                    />
                    <Input
                      label="Qeyd"
                      placeholder="Qeyd əlavə edin"
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-auto cursor-pointer bg-gray-400/40 rounded-lg p-3">
                      <input
                        type="file"
                        id="receiptFile"
                        style={{ display: "none" }}
                        onChange={handleReceiptFile}
                      />
                      <label htmlFor="receiptFile" className="cursor-pointer">
                        <MdOutlineFileUpload size={20} />
                      </label>
                    </div>
                    <div className="flex items-center justify-center">
                      {receiptFile && (
                        <div className="mt-4 flex items-center gap-2">
                          <div className="w-7">
                            <FileIcon
                              extension={receiptFile.name.split(".").pop()}
                              {...(defaultStyles[
                                receiptFile.name.split(".").pop()
                              ] || {})}
                            />
                          </div>
                          <span className="text-sm">{receiptFile.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <span className="flex items-center justify-end gap-2 text-sm font-base text-gray-400">
                  Ümumi:{" "}
                  <span className="w-[160px] text-end text-black">
                    ₼{calculateTotalWithTax()}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={handleCreateInvoice}
            className="p-3 rounded-lg bg-black text-white flex items-center justify-center gap-2 font-semibold text-sm mb-10"
          >
            {isLoading ? <Spinner /> : "Faktura göndər"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateNewInvoice;
