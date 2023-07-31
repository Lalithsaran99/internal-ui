export default function leaveStatusColor(status, type) {
  if (status === "Accepted") {
    return type === "bg"
      ? "bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100"
      : "text-emerald-600 dark:text-emerald-400";
  }

  if (status === "Rejected") {
    return type === "bg"
      ? "bg-red-100 dark:bg-red-500/20 dark:text-red-100"
      : "text-red-600 dark:text-red-500";
  }

  if (status === "Pending") {
    return type === "bg"
      ? "bg-red-100 dark:bg-orange-500/20 dark:text-orange-100"
      : "text-orange-600 dark:text-orange-500";
  }

  return "";
}
