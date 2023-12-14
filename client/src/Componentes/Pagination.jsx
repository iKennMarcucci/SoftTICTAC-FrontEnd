import { Button } from "@/components/ui/button";

export default function Pagination({
  items,
  itemsPerPage,
  selectedPage,
  onChangePage,
}) {
  const numberOfPages = Math.ceil(items / itemsPerPage);

  const pages = [];

  for (let i = 1; i <= numberOfPages; i++) {
    const isSelected = selectedPage === i;

    pages.push(
      <Button
        key={i}
        className={
          isSelected
            ? "w-auto justify-center bg-blue-500 text-center font-normal text-white"
            : "w-auto justify-center text-center font-normal"
        }
        variant={isSelected ? "solid" : "outline"}
        onClick={() => {
          onChangePage(i);
        }}
      >
        {i}
      </Button>,
    );
  }

  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      <Button
        className="w-auto justify-center text-center font-normal"
        variant="outline"
        disabled={selectedPage === 1}
        onClick={() => onChangePage(selectedPage - 1)}
      >
        <ArrowLeftIcon className="mr-1 h-4 w-4 -translate-x-1" />
        Anterior
      </Button>
      {pages}
      <Button
        className="w-auto justify-center text-center font-normal"
        variant="outline"
        disabled={selectedPage === numberOfPages}
        onClick={() => onChangePage(selectedPage + 1)}
      >
        <ArrowRightIcon className="mr-1 h-4 w-4 -translate-x-1" />
        Siguiente
      </Button>
    </div>
  );
}

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
