export default function ElementCell({
    index,
    name,
    image,
  }: {
    index: number;
    name: string;
    image: string;
  }) {
    return (
      <div className="flex items-center w-[340px] border border-gray-300 rounded-md p-4 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out my-2 cursor-pointer transform hover:scale-105">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-200 mr-4 text-blue-800 font-bold">
          {index}
        </div>
        <img src={image} alt={name} className="h-10 w-10 rounded-full mr-4 object-cover" />
        <span className="font-semibold text-gray-700">{name}</span>
      </div>
    );
  }
  