export default function ZapCell({
  name,
  index,
  image,
  onClick,
}: {
  name: string;
  index: number;
  image: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex justify-start items-center w-[340px] border border-gray-300 rounded-md p-4 bg-gradient-to-r cursor-pointer from-blue-50 to-blue-100 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out my-2 transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="flex-shrink-0 mr-4">
        {image ? (
          <img
            src={image}
            alt={`Zap ${index}`}
            className="h-10 w-10 rounded-full"
          />
        ) : (
          ""
        )}
      </div>
      <div className="text-xl text-gray-700">
        <span className="font-bold text-blue-600 mr-2">{index}.</span>
        {name}
      </div>
    </div>
  );
}
