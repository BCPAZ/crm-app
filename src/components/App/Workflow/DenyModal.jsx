const DenyModal = ({ openModal, onCancel, onChange, onConfirm }) => {
  return (
    <div className={`bg-black/50 fixed top-0 left-0 right-0 w-full h-full flex items-center justify-center ${openModal ? 'flex' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-6 shadow-lg min-w-[450px]">
        <h1 className="text-2xl font-medium mb-4">İmtina səbəbi</h1>
        <textarea onChange={onChange} className="resize-none bg-gray-100 w-full p-2 rounded-lg text-sm h-[100px]" placeholder="İmtina səbəbini qeyd edin"></textarea>
        <div className="flex items-end justify-end gap-3 mt-4">
          <button onClick={onCancel} className="text-sm font-medium border border-gray-200 p-2 rounded-lg">Ləğv et</button>
          <button onClick={onConfirm} className="text-sm font-medium border border-gray-200 p-2 rounded-lg bg-black text-white">Təsdiqlə</button>
        </div>
      </div>
    </div>
  )
}

export default DenyModal