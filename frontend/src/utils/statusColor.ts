export default function getStatusClassColor(status:string):string {
  switch (status) {
    case "New":
      return "bg-blue-600 text-white";
    case "In Progress":
      return "bg-amber-500";
    case "Resolved":
      return "bg-green-600 text-white";
    default:
      return "bg-white";
  }
}
