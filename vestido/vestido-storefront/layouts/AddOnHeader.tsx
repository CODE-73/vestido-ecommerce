const AddOnHeader = () => {
  return (
    <div className="flex flex-row text-[#333] text-sm py-1 pt-2 justify-between">
      <div className="flex flex-row text-gray-500">
        {' '}
        <div>Call Us:</div>
        <div className="font-extrabold">1–234–5678901</div>
      </div>
      <div className="flex text-gray-500">
        {' '}
        <div className="text-[#333] text-sm font-bold">FREE 2-DAYS &nbsp;</div>
        <div> standard shipping on orders $255</div>
      </div>

      <div className="flex gap-3 text-gray-500 justify-end pb-2">
        <a
          href="/wishlist"
          className="hover:underline hover:text-[#333] transition duration-300"
        >
          Facebook
        </a>
        <a
          href="/wishlist"
          className="hover:underline hover:text-[#333] transition duration-300"
        >
          Twitter
        </a>
        <a
          href="/wishlist"
          className="hover:underline hover:text-[#333] transition duration-300"
        >
          Instagram
        </a>
      </div>
    </div>
  );
};
export default AddOnHeader;
