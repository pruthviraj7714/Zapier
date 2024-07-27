export default function ZapCell({
    name, index, onClick
  } : {
    name : string,
    index : number,
    onClick : () => void
  }) {
    return (
      <div className="flex justify-center items-center w-[340px] border border-gray-300 rounded-md p-4 bg-gradient-to-r cursor-pointer from-blue-50 to-blue-100 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out my-2">
        <div onClick={onClick} className="text-xl text-gray-700"><span className="font-bold text-blue-600 mr-2">{index}.</span>{name}</div>
      </div>
    )
  }
  